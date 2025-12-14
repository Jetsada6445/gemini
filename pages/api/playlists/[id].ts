// file: pages/api/playlists/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query; // คือ playlistId

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Playlist ID is required' });
  }

  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true } // ดึงข้อมูลผู้สร้างมาด้วย
        },
        songs: {
          include: {
            song: true // ดึงข้อมูล Song จาก PlaylistSong
          },
          orderBy: { addedAt: 'asc' } // เรียงตามเวลาที่เพิ่ม
        }
      }
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // จัดรูปแบบข้อมูลให้ดูง่ายขึ้น
    const songsList = playlist.songs.map(ps => ({
      ...ps.song,
      addedAt: ps.addedAt
    }));

    res.status(200).json({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        owner: playlist.user.name,
        songs: songsList
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch playlist' });
  } finally {
    await prisma.$disconnect();
  }
}