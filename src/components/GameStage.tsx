import { useEffect, useRef, useState } from "react";

const GameStage = () => {
  const totalTime = 12;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [elapsed, setElapsed] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // ✅ Smooth 60fps timer
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const delta = (timestamp - startTimeRef.current) / 1000;
      const clamped = Math.min(delta, totalTime);

      const progress = clamped / totalTime;
      setElapsed(progress);

      setTimeLeft(Math.max(totalTime - Math.floor(clamped), 0));

      if (clamped < totalTime) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Game Stage */}
      <div
        id="game-stage"
        className="relative h-full aspect-[9/16] overflow-hidden shadow-2xl"
      >
        {/* Background */}
        <img
          src="/bg-red.webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="bg"
        />

        {/* Top Chips */}
        <img
          src="/chips.webp"
          className="absolute top-[-2%] left-1/2 -translate-x-1/2 w-[30%] object-contain z-20"
          alt="chips"
        />

        {/* ✅ Timer */}
        <div
          className="
            absolute
            top-1/3
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[10%]
            aspect-square
            z-30
            flex
            items-center
            justify-center
          
          "
        >
          {/* Timer PNG */}
          <img
            src="/timerprogress.webp"
            className="absolute bg-black/90 p-[5%] rounded-full inset-0 w-full h-full object-contain"
            alt="timer"
          />

          {/* ✅ Mask Layer (Pure Hide/Reveal) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                transparent ${elapsed * 360}deg,
                black 0deg
              )`,
            }}
          />

          {/* ✅ Timer Number (Auto Scales with Image Size) */}
          <div className="relative font-bold text-white text-[100%] leading-none">
            {timeLeft}
          </div>
        </div>

        {/* Bottom Border */}
        <img
          src="/tablebuttomborder.webp"
          className="absolute bottom-0 left-0 h-[25%] w-full object-cover object-top z-40"
          alt="border"
        />
      </div>
    </div>
  );
};

export default GameStage;
