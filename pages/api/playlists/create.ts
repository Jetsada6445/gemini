// file: pages/api/playlists/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // 💡 สมมติว่า userId ถูกดึงมาจาก token หรือ session แล้ว
  const FAKE_USER_ID = 'your_logged_in_user_id'; 
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, description } = req.body;
  const userId = FAKE_USER_ID; // ใช้ user ID จริงจากการตรวจสอบสิทธิ์

  if (!name || !userId) {
    return res.status(400).json({ message: 'Name and userId are required' });
  }

  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create playlist' });
  } finally {
    await prisma.$disconnect();
  }
}