import prisma from '@/lib/prisma';
async function fetchSongs() {
const songs = await prisma.song.findMany({
take: 12,
orderBy: { title: 'asc' },
});
return songs;
}
export default async function Home() {
const songs = await fetchSongs();
return (
<div className="p-4">
<h1 className="text-3xl font-bold mb-6 text-white">Good evening</h1>
{/* Grid สำหรับแสดงรายการเพลง */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
{songs.length > 0 ? (
songs.map((song) => (
<div key={song.id} className="bg-zinc-800/50 hover:bg-zinc-800 transition-colors p-4 rounded-lg cursor-pointer">
<div className="w-full aspect-square bg-zinc-700 rounded-lg mb-3 flex items-center justify-center">
<p className="text-xs text-zinc-400">Album Art Placeholder</p>
</div>
<p className="font-semibold text-white truncate">{song.title}</p>
<p className="text-sm text-zinc-400 truncate">{song.artist}</p>
</div>
))
) : (
<p className="text-zinc-400">No songs found. Please add songs using Prisma Studio.</p>
)}
</div>
</div>
);
}