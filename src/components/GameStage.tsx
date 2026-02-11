import React, { useEffect, useRef, useState } from "react";

const GameStage = () => {
  const totalTime = 12;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Smooth countdown
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const delta = (timestamp - startTimeRef.current) / 1000;
      const clamped = Math.min(delta, totalTime);

      const secondsLeft = Math.max(totalTime - clamped, 0);
      setTimeLeft(Math.ceil(secondsLeft));

      if (clamped < totalTime) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Remaining ring mask
  const remaining = timeLeft / totalTime;
  const elapsed = 1 - remaining;

  return (
    <div className="w-full h-[100svh] flex justify-center items-center bg-black">
      {/* Game Stage */}
      <div className="relative h-full aspect-[9/16] overflow-hidden shadow-2xl">
        {/* Background */}
        <img
          src="/bg-red.webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="bg"
        />

        {/* Top Chips Rack */}
        <img
          src="/chips.webp"
          className="absolute top-[-2%] left-1/2 -translate-x-1/2 w-[30%] object-contain z-20"
          alt="chips"
        />

        {/* Timer */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square z-30 flex items-center justify-center">
          <img
            src="/timerprogress.webp"
            className="absolute inset-0 w-full h-full object-contain"
            alt="timer"
          />

          {/* Mask Slice */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              WebkitMask: `conic-gradient(
                black ${elapsed * 360}deg,
                transparent 0deg
              )`,
              mask: `conic-gradient(
                black ${elapsed * 360}deg,
                transparent 0deg
              )`,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Number */}
          <div className="relative font-bold text-white text-[90%] leading-none">
            {timeLeft}
          </div>
        </div>

        {/* ✅ BETTING AREA */}
        <div
          id="betting-area"
          className="
            absolute
            bottom-[25%]
            left-1/2
            -translate-x-1/2
            w-[92%]
            h-[22%]
            grid
            grid-cols-3
            gap-[2px]
            z-30
            rounded-lg
            overflow-hidden
          "
        >
          {/* Dragon */}
          <div
            id="bet-zone-dragon"
            className="relative flex flex-col items-center justify-center"
          >
            <img
              src="/dragonbg.webp"
              className="absolute inset-0 w-full h-full object-cover"
              alt="dragon bg"
            />
            <div className="relative text-white font-bold text-[clamp(12px,1.6vw,18px)] opacity-70">
              1:2
            </div>
            <img
              src="/dragon.webp"
              className="relative w-[70%] object-contain opacity-80"
              alt="dragon text"
            />
          </div>

          {/* Tie */}
          <div
            id="bet-zone-tie"
            className="relative flex flex-col items-center justify-center"
          >
            <img
              src="/tiebg.webp"
              className="absolute inset-0 w-full h-full object-cover"
              alt="tie bg"
            />
            <div className="relative text-white font-bold text-[clamp(12px,1.6vw,18px)] opacity-70">
              1:8
            </div>
            <img
              src="/tie.webp"
              className="relative w-[55%] object-contain opacity-80"
              alt="tie text"
            />
          </div>

          {/* Tiger */}
          <div
            id="bet-zone-tiger"
            className="relative flex flex-col items-center justify-center"
          >
            <img
              src="/tigerbg.webp"
              className="absolute inset-0 w-full h-full object-cover"
              alt="tiger bg"
            />
            <div className="relative text-white font-bold text-[clamp(12px,1.6vw,18px)] opacity-70">
              1:2
            </div>
            <img
              src="/tiger.webp"
              className="relative w-[70%] object-contain opacity-80"
              alt="tiger text"
            />
          </div>
        </div>

        {/* Bottom Border Overlay */}
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