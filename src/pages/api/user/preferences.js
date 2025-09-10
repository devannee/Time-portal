import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          theme: true,
          darkMode: true,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      res.status(500).json({ error: 'Failed to fetch user preferences' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { theme, darkMode } = req.body;
      
      const user = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          ...(theme && { theme }),
          ...(darkMode !== undefined && { darkMode }),
        },
      });

      res.status(200).json({
        theme: user.theme,
        darkMode: user.darkMode,
      });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      res.status(500).json({ error: 'Failed to update user preferences' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
