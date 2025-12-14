ไฟล์: components/Sidebar.tsx (ใช้ Server Component)
tsx
"// ไฟล์นี้ไม่ต้องมี ""use client"" แล้ว เพราะจะกลายเป็น Server Component"

"import Link from ""next/link"";"
"import prisma from ""@/lib/prisma""; // 💡 นำเข้า Prisma Client"

// *** ฟังก์ชันดึงข้อมูลจริงจากฐานข้อมูล ***
async function fetchPlaylists() {
  // 💡 เนื่องจากตอนนี้ยังไม่มีระบบ Login/Session เราจะดึง Playlist ทั้งหมด
  // 💡 ในอนาคตต้องกรองด้วย userId
  const playlists = await prisma.playlist.findMany({
    select: {
"      id: true,"
"      name: true,"
"    },"
"    take: 10, // จำกัดจำนวน Playlist ที่แสดง"
  });
  return playlists;
}

export default async function Sidebar() {
  const playlists = await fetchPlaylists();

  return (
"    <nav className=""flex w-64 flex-col gap-6 bg-zinc-900 p-6"">"
      {/* Navigation Top */}
"      <div className=""flex flex-col gap-2"">"
"        <Link href=""/"" className=""flex items-center gap-3 text-sm font-semibold text-zinc-100 hover:text-white"">"
          Home
        </Link>
"        <Link href=""/search"" className=""flex items-center gap-3 text-sm font-semibold text-zinc-400 hover:text-white"">"
          Search
        </Link>
      </div>

      {/* Your Library - Playlists */}
"      <div className=""flex flex-col gap-3"">"
"        <span className=""text-sm font-bold text-zinc-400"">YOUR LIBRARY</span>"
"        <div className=""flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-250px)]"">"
          {/* แสดงข้อมูลจริงที่ดึงมาจากฐานข้อมูล */}
          {playlists.map((playlist) => (
           <Link
              key={playlist.id}
              href={/playlist/${playlist.id}} 
"              className=""text-sm text-zinc-400 hover:text-white transition-colors"""
            >
              {playlist.name}
            </Link>
          ))}
          {playlists.length === 0 && (
"            <p className=""text-zinc-500 text-xs"">No playlists found. Start by signing up!</p>"
          )}
        </div>
      </div>
    </nav>
  );
}