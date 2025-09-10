import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { checkIn, checkOut } = req.body;
      
      const timeEntry = await prisma.timeEntry.update({
        where: {
          id: id,
          userId: session.user.id,
        },
        data: {
          checkIn: new Date(checkIn),
          checkOut: checkOut ? new Date(checkOut) : null,
        },
      });

      res.status(200).json(timeEntry);
    } catch (error) {
      console.error('Error updating time entry:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Time entry not found' });
      }
      res.status(500).json({ error: 'Failed to update time entry' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.timeEntry.delete({
        where: {
          id: id,
          userId: session.user.id,
        },
      });

      res.status(200).json({ message: 'Time entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting time entry:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Time entry not found' });
      }
      res.status(500).json({ error: 'Failed to delete time entry' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
