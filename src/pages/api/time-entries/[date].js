import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }
  
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }
  
  if (req.method === 'GET') {
    try {
      const timeEntries = await prisma.timeEntry.findMany({
        where: {
          userId: session.user.id,
          date: {
            gte: startOfDay(targetDate),
            lte: endOfDay(targetDate),
          },
        },
        orderBy: {
          checkIn: 'asc',
        },
      });

      const logs = timeEntries.map(entry => ({
        checkIn: entry.checkIn,
        checkOut: entry.checkOut,
        id: entry.id,
      }));

      // Calculate totals
      const totalMinutes = logs.reduce((total, log) => {
        if (log.checkOut) {
          const minutes = Math.abs(new Date(log.checkOut) - new Date(log.checkIn)) / (1000 * 60);
          return total + minutes;
        }
        return total;
      }, 0);

      res.status(200).json({
        logs,
        date: targetDate.toISOString(),
        totalMinutes: Math.floor(totalMinutes),
        sessions: logs.length,
      });
    } catch (error) {
      console.error('Error fetching time entries:', error);
      res.status(500).json({ error: 'Failed to fetch time entries' });
    }
  } else if (req.method === 'POST') {
    try {
      const { checkIn, checkOut } = req.body;
      
      if (!checkIn) {
        return res.status(400).json({ error: 'Check-in time is required' });
      }
      
      const timeEntry = await prisma.timeEntry.create({
        data: {
          userId: session.user.id,
          date: startOfDay(targetDate),
          checkIn: new Date(checkIn),
          checkOut: checkOut ? new Date(checkOut) : null,
        },
      });

      res.status(201).json(timeEntry);
    } catch (error) {
      console.error('Error creating time entry:', error);
      res.status(500).json({ error: 'Failed to create time entry' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
