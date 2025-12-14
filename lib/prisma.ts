typescript 
"import { PrismaClient } from ""@prisma/client"";"

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // 💡 จุดสำคัญที่สุด: ต้องระบุ Type ให้ถูกต้อง
`   var prisma: undefined
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

"if (process.env.NODE_ENV !== ""production"") globalThis.prisma = prisma;"