import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function VideoPlayerCard({ video }) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play();
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const toggleExpand = () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  };

  return (
    <div
      ref={wrapperRef}
      className="group relative rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg"
    >
      <video
        ref={videoRef}
        src={video.video_url}
        className="w-full aspect-video bg-black"
        muted={muted}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      />

      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <span className="w-16 h-16 rounded-full bg-secondary/90 text-[#16202B] flex items-center justify-center">
            <Play size={28} className="ml-1" />
          </span>
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="text-white hover:text-secondary transition-colors"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-white hover:text-secondary transition-colors"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        <button
          onClick={toggleExpand}
          aria-label="Expand"
          className="text-white hover:text-secondary transition-colors"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {(video.title || video.description) && (
        <div className="p-3 bg-[#0e1620]">
          {video.title && <h4 className="text-white font-semibold text-sm">{video.title}</h4>}
          {video.description && (
            <p className="text-gray-400 text-xs mt-1 line-clamp-2">{video.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
