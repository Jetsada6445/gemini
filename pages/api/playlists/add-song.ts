// file: pages/api/playlists/add-song.ts

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
    const playlistSong = await prisma.playlistSong.create({
      data: {
        playlistId,
        songId,
      },
    });
    res.status(200).json(playlistSong);
  } catch (error: any) {
    // 💡 ถ้าเกิดข้อผิดพลาดในการเพิ่ม (เช่น เพลงซ้ำ)
    if (error.code === 'P2002') { 
        return res.status(409).json({ message: 'Song already exists in this playlist' });
    }
    console.error(error);
    res.status(500).json({ message: 'Failed to add song to playlist' });
  } finally {
    await prisma.$disconnect();
  }
}