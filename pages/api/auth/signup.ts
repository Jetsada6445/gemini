// file: pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  // ตรวจสอบว่ามีผู้ใช้อยู่แล้วหรือไม่
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // ⚠️ ในการใช้งานจริง: ควรใช้ const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password, // ⚠️ ควรเก็บ HASHED PASSWORD
        name,
      },
    });

    res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong during signup' });
  } finally {
    await prisma.$disconnect();
  }
}