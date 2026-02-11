import React, { useEffect, useRef, useState } from "react";
import { useCoinThrow } from "./useCoinThrow";

const GameStage = () => {
  const totalTime = 12;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [progress, setProgress] = useState(0);

  // ✅ Active chip index
  const [activeChip, setActiveChip] = useState(0);

  // ✅ Landed chips stack
  const [betStacks, setBetStacks] = useState({
    dragon: [] as any[],
    tie: [] as any[],
    tiger: [] as any[],
  });

  // ✅ Betting refs
  const dragonRef = useRef<HTMLDivElement>(null);
  const tieRef = useRef<HTMLDivElement>(null);
  const tigerRef = useRef<HTMLDivElement>(null);

  // ✅ Balance coin ref (throw start)
  const balanceCoinRef = useRef<HTMLDivElement>(null);

  // ======================================================
  // ✅ CHIP DATA
  // ======================================================
  const chips = [
    { value: 20, basePos: "80% 40%" },
    { value: 50, basePos: "4% 45%" },
    { value: 100, basePos: "4% 84%" },
    { value: 200, basePos: "81% 79%" },
    { value: 500, basePos: "3.8% 25.8%" },
    { value: 2000, basePos: "79% 98%" },
  ];

  const activeRingPos = "9.6% 2%";

  const digitSprites: Record<string, string> = {
    "0": "0% 95.52%",
    "1": "28.5% 91.4%",
    "2": "0% 99.6%",
    "3": "30% 100%",
    "4": "40% 100%",
    "5": "8% 95.52%",
    "6": "60% 100%",
    "7": "70% 100%",
    "8": "80% 100%",
    "9": "90% 100%",
  };

  const chipCurve = [
    { left: "8%", bottom: "55%" },
    { left: "23%", bottom: "50%" },
    { left: "38%", bottom: "45%" },
    { left: "52%", bottom: "45%" },
    { left: "67%", bottom: "50%" },
    { left: "82%", bottom: "55%" },
  ];

  // ======================================================
  // ✅ THROW SYSTEM
  // ======================================================
  const { flyingCoins, throwChip } = useCoinThrow(
    activeChip,
    chips,
    setBetStacks
  );

  // ======================================================
  // ✅ TIMER
  // ======================================================
  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const delta = (timestamp - start) / 1000;
      const clamped = Math.min(delta, totalTime);

      setProgress(clamped / totalTime);

      const left = Math.max(totalTime - clamped, 0);
      setTimeLeft(Math.ceil(left));

      if (clamped < totalTime) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const elapsed = progress;

  // ======================================================
  // ✅ UI RENDER
  // ======================================================
  return (
    <div className="w-full h-[100svh] flex justify-center items-center bg-black">
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

        {/* TIMER */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square z-30 flex items-center justify-center">
          <img
            src="/timerprogress.webp"
            className="absolute inset-0 bg-black rounded-full p-[2%] w-full h-full object-contain"
            alt="timer"
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                transparent ${elapsed * 360}deg,
                black 0deg
              )`,
            }}
          />

          <div className="relative font-bold text-white text-[90%]">
            {timeLeft}
          </div>
        </div>

        {/* BETTING AREA */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[92%] h-[26%] grid grid-cols-3 gap-[.5%] z-30">

          {/* DRAGON */}
          <div
            ref={dragonRef}
            onClick={() => throwChip("dragon", balanceCoinRef, dragonRef)}
            className="relative flex items-center justify-center"
          >
            <img src="/dragonbg.webp" className="absolute inset-0 w-full h-full" />

            {betStacks.dragon.map((coin) => (
              <div
                key={coin.id}
                className="absolute w-[26px] aspect-square"
                style={{left: `${coin.left}%`,
top: `${coin.top}%`,
                  backgroundImage: "url('/chipsui.webp')",
                  backgroundSize: "240% 680%",
                  backgroundPosition: chips[coin.chipIndex].basePos,
                }}
              />
            ))}

            <img src="/dragon.webp" className="relative w-[70%]" />
          </div>

          {/* TIE */}
          <div
            ref={tieRef}
            onClick={() => throwChip("tie", balanceCoinRef, tieRef)}
            className="relative flex items-center justify-center"
          >
            <img src="/tiebg.webp" className="absolute inset-0 w-full h-full" />

            {betStacks.tie.map((coin) => (
              <div
                key={coin.id}
                className="absolute w-[26px] aspect-square"
                style={{left: `${coin.left}%`,
top: `${coin.top}%`,
                  backgroundImage: "url('/chipsui.webp')",
                  backgroundSize: "240% 680%",
                  backgroundPosition: chips[coin.chipIndex].basePos,
                }}
              />
            ))}

            <img src="/tie.webp" className="relative w-[25%]" />
          </div>

          {/* TIGER */}
          <div
            ref={tigerRef}
            onClick={() => throwChip("tiger", balanceCoinRef, tigerRef)}
            className="relative flex items-center justify-center"
          >
            <img src="/tigerbg.webp" className="absolute inset-0 w-full h-full" />

            {betStacks.tiger.map((coin) => (
              <div
                key={coin.id}
                className="absolute w-[26px] aspect-square"
                style={{left: `${coin.left}%`,
top: `${coin.top}%`,
                  backgroundImage: "url('/chipsui.webp')",
                  backgroundSize: "240% 680%",
                  backgroundPosition: chips[coin.chipIndex].basePos,
                }}
              />
            ))}

            <img src="/tiger.webp" className="relative w-[50%]" />
          </div>
        </div>

        {/* TABLE BORDER */}
        <div className="absolute bottom-0 left-0 w-full h-[25%] z-50">
          <img
            src="/tablebuttomborder.webp"
            className="absolute inset-0 w-full h-full object-cover object-top"
            alt="border"
          />

          {/* CHIP SELECTOR */}
          {chips.map((chip, i) => {
            const digits = chip.value.toString().split("");
            const isActive = activeChip === i;

            return (
              <button
                key={i}
                onClick={() => setActiveChip(i)}
                className="absolute w-[10%] aspect-square"
                style={{
                  left: chipCurve[i].left,
                  bottom: chipCurve[i].bottom,
                }}
              >
                {/* CHIP BASE */}
                <div
                  className="absolute inset-0 rounded-full bg-no-repeat"
                  style={{
                    backgroundImage: "url('/chipsui.webp')",
                    backgroundSize: "240% 680%",
                    backgroundPosition: chip.basePos,
                  }}
                />

                {/* CHIP VALUE */}
                <div className="absolute inset-0 flex items-center justify-center gap-[2%]">
                  {digits.map((d, idx) => (
                    <div
                      key={idx}
                      className="w-[16%] aspect-square bg-no-repeat"
                      style={{
                        backgroundImage: "url('/chipsui.webp')",
                        backgroundSize: "1100% 2200%",
                        backgroundPosition: digitSprites[d],
                      }}
                    />
                  ))}
                </div>

                {/* ACTIVE RING */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full bg-no-repeat"
                    style={{
                      backgroundImage: "url('/chipsui.webp')",
                      backgroundSize: "220% 570%",
                      backgroundPosition: activeRingPos,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* PLAYER HUD */}
        <div className="absolute bottom-0 left-0 w-full h-[13%] z-[60]">

          {/* Avatar */}
          <div className="absolute left-[5%] bottom-[16%] w-[14%] aspect-square">
            <img
              src="/avatarborder.webp"
              className="absolute inset-0 w-full h-full"
            />
            <img
              src="/avatar.png"
              className="absolute inset-[12%] w-[76%] h-[76%] rounded-full"
            />
          </div>

          {/* Balance Bar */}
          <div className="absolute left-[20%] bottom-[25%] w-[50%] h-[25%]">
            <img
              src="/balacnebar.webp"
              className="absolute inset-0 w-full h-full"
            />

            {/* Start Point */}
            <div
              ref={balanceCoinRef}
              className="absolute left-[10%] top-1/2 w-[10px] h-[10px] opacity-0"
            />

            <div className="absolute left-[25%] top-1/2 -translate-y-1/2 text-white font-bold">
              12555555.40
            </div>
          </div>

          {/* Other Players */}
          <button className="absolute right-[5%] bottom-[20%] w-[12%] aspect-square">
            <img src="/otherplayers.webp" className="w-full h-full" />
          </button>
        </div>

       {flyingCoins.map((coin) => {
  const digits = coin.value.toString().split("");

  return (
    <div
      key={coin.id}
      className="fixed w-[26px] aspect-square z-[999] rounded-full"
      style={{
        left: coin.x,
        top: coin.y,
        transform: `translate(-50%,-50%) rotate(${coin.rotation}deg)`,
        backgroundImage: "url('/chipsui.webp')",
        backgroundSize: "240% 680%",
        backgroundPosition: chips[coin.chipIndex].basePos,
      }}
    >
      {/* VALUE DIGITS */}
      <div className="absolute inset-0 flex items-center justify-center gap-[2%]">
        {digits.map((d: string, idx: number) => (
          <div
            key={idx}
            className="w-[16%] aspect-square bg-no-repeat"
            style={{
              backgroundImage: "url('/chipsui.webp')",
              backgroundSize: "1100% 2200%",
              backgroundPosition: digitSprites[d],
            }}
          />
        ))}
      </div>
    </div>
  );
})}
    </div>
    </div>
  );
};

export default GameStage;