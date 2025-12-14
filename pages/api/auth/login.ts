// file: pages/api/auth/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
// ในการใช้งานจริงจะ import 'jsonwebtoken' และ 'bcrypt'

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // ⚠️ ในการใช้งานจริง: ควรเปรียบเทียบรหัสผ่านที่ HASH แล้ว
  // const passwordMatch = await bcrypt.compare(password, user.password);
  const passwordMatch = user.password === password; // ตัวอย่างแบบไม่ปลอดภัย

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 💡 ขั้นตอนต่อไป: สร้าง JWT token
  // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // ในตัวอย่างนี้จะส่งแค่ข้อมูลผู้ใช้กลับไป
  res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.id, email: user.email, name: user.name } 
      // token
  });
  
  await prisma.$disconnect();
}