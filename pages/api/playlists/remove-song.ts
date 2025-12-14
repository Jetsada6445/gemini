// file: pages/api/playlists/remove-song.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // 💡 ต้องตรวจสอบสิทธิ์ว่าผู้ใช้เป็นเจ้าของ Playlist ก่อน

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { playlistId, songId } = req.body; 

  if (!playlistId || !songId) {
    return res.status(400).json({ message: 'playlistId and songId are required' });
  }

  try {
    const result = await prisma.playlistSong.deleteMany({
      where: {
        playlistId,
        songId,
      },
    });

    if (result.count === 0) {
        return res.status(404).json({ message: 'Song not found in this playlist' });
    }
    
    res.status(200).json({ message: 'Song removed from playlist', count: result.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove song from playlist' });
  } finally {
    await prisma.$disconnect();
  }
}