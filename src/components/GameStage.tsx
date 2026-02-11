const GameStage = () => {
  return (
    <div id="game-stage" className="relative aspect-[9/16] w-full max-w-[430px] max-h-screen mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Felt */}
      <div
        id="bg-felt"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-red.webp')" }}
      />

      {/* Top Chip Rack */}
      <img
        id="top-chip-rack"
        src="/chips.webp"
        alt="Chip rack"
        className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[70%]"
      />

      {/* Center Timer Anchor */}
      <div
        id="timer-anchor"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square flex items-center justify-center"
      >
        <img
          id="timer-ring"
          src="/timerprogress.webp"
          alt="Timer ring"
          className="w-full h-full"
        />
        <div
          id="timer-text"
          className="absolute inset-0 flex items-center justify-center text-yellow-300 font-bold"
          style={{ fontSize: 'clamp(1.5rem, 8cqw, 3.5rem)' }}
        >
          8
        </div>
      </div>

      {/* Bottom Table Border */}
      <img
        id="bottom-table-border"
        src="/tablebuttomborder.webp"
        alt="Table border"
        className="absolute bottom-0 left-0 w-full"
      />

      {/* Betting Zone Anchors */}
      <div id="bet-zone-dragon" className="absolute left-0 bottom-[22%] w-1/3 h-[18%]" />
      <div id="bet-zone-tie" className="absolute left-1/3 bottom-[22%] w-1/3 h-[18%]" />
      <div id="bet-zone-tiger" className="absolute right-0 bottom-[22%] w-1/3 h-[18%]" />

      {/* Chip Spawn Area */}
      <div id="chip-spawn-area" className="absolute bottom-[10%] left-0 w-full h-[15%]" />
    </div>
  );
};

export default GameStage;
