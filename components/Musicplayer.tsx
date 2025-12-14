"use client";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'; // จำเป็นต้องติดตั้ง lucide-react
// 💡 Note: คุณอาจต้องรัน yarn add lucide-react ก่อน
export default function MusicPlayer() {
// 💡 State จำลองสำหรับเพลงที่กำลังเล่น
const currentSong = {
title: "Shape of You",
artist: "Ed Sheeran",
isPlaying: false,
};
return (
<div className="flex justify-between items-center h-full px-6">
{/* Song Info (Left) */}
<div className="flex items-center gap-4">
<div className="w-14 h-14 bg-zinc-700 flex items-center justify-center rounded-md">
<p className="text-xs text-zinc-400">Art</p>
</div>
<div>
<p className="text-sm font-semibold text-white">{currentSong.title}</p>
<p className="text-xs text-zinc-400">{currentSong.artist}</p>
</div>
</div>
{/* Player Controls (Center) */}
<div className="flex flex-col items-center gap-2">
<div className="flex gap-6">
<SkipBack className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer" />
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform">
{currentSong.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
</button>
<SkipForward className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer" />
</div>
{/* Progress Bar Placeholder */}
<div className="flex items-center gap-2 w-96">
<span className="text-xs text-zinc-400">0:00</span>
<div className="h-1 w-full bg-zinc-600 rounded-full"></div>
<span className="text-xs text-zinc-400">3:45</span>
</div>
</div>
{/* Volume Control (Right) */}
<div className="flex items-center gap-2 w-32">
<Volume2 className="w-5 h-5 text-zinc-400" />
<div className="h-1 w-full bg-zinc-600 rounded-full"></div>
</div>
</div>
);
}