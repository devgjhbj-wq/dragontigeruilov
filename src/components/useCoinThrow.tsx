import { useEffect, useState } from "react";

export const useCoinThrow = (
  activeChip: number,
  chips: any[],
  setBetStacks: any
) => {
  const [flyingCoins, setFlyingCoins] = useState<any[]>([]);

  // Smooth slow landing
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // ======================================================
  // ✅ THROW CHIP FUNCTION
  // ======================================================
  const throwChip = (target: any, startRef: any, targetRef: any) => {
    if (!startRef.current || !targetRef.current) return;

    const startBox = startRef.current.getBoundingClientRect();
    const endBox = targetRef.current.getBoundingClientRect();

    // ✅ 랜덤 landing percent (stored forever)
    const landLeft = 25 + Math.random() * 50;
    const landTop = 30 + Math.random() * 40;

    // Convert percent → screen coords
    const landX = endBox.left + (landLeft / 100) * endBox.width;
    const landY = endBox.top + (landTop / 100) * endBox.height;

    const coin = {
      id: Date.now(),

      startX: startBox.left + startBox.width / 2,
      startY: startBox.top + startBox.height / 2,

      endX: landX,
      endY: landY,

      progress: 0,
      rotation: 0,

      chipIndex: activeChip,
      value: chips[activeChip].value,

      target,

      // ✅ Save landing position forever
      landLeft,
      landTop,
    };

    setFlyingCoins((prev) => [...prev, coin]);
  };

  // ======================================================
  // ✅ STRAIGHT LINE ANIMATION
  // ======================================================
  useEffect(() => {
    if (flyingCoins.length === 0) return;

    let raf: number;

    const animate = () => {
      setFlyingCoins((coins) =>
        coins
          .map((c) => {
            let p = c.progress + 0.03;
            if (p > 1) p = 1;

            const eased = easeOut(p);

            // ✅ STRAIGHT LINE PATH
            const x = c.startX + (c.endX - c.startX) * eased;
            const y = c.startY + (c.endY - c.startY) * eased;

         // ✅ Half spin only when landing (REDUCED)
let rotation = 0;
if (p > 0.85) {
  const landingPhase = (p - 0.85) / 0.15;

  // ✅ SMALL tilt only (not full spin)
  rotation = landingPhase * 70;
}
            return { ...c, progress: p, x, y, rotation };
          })
          .filter((c) => {
            if (c.progress >= 1) {
              // ✅ LAND AND STORE FIXED POSITION
              setBetStacks((prev: any) => ({
                ...prev,
                [c.target]: [
                  ...prev[c.target],
                  {
                    id: c.id,
                    chipIndex: c.chipIndex,
                    value: c.value,

                    // ✅ Fixed percent position forever
                    left: c.landLeft,
                    top: c.landTop,

                    rotation: Math.random() * 15,
                  },
                ],
              }));

              return false;
            }

            return true;
          })
      );

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [flyingCoins]);

  return { flyingCoins, throwChip };
};