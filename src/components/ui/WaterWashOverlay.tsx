"use client";

export function WaterWashOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen opacity-70"
      aria-hidden="true"
    >
      {/* 1. Organic blue-violet waves of slow ambient illumination */}
      <div className="absolute -inset-[50%] w-[200%] h-[200%] animate-ocean-wash-1 opacity-25">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 35% 25%, rgba(65, 115, 215, 0.22) 0%, rgba(95, 75, 195, 0.12) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. Counter-flowing secondary light wash for gentle fluid interference */}
      <div className="absolute -inset-[50%] w-[200%] h-[200%] animate-ocean-wash-2 opacity-20">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 65% 75%, rgba(45, 140, 225, 0.18) 0%, rgba(120, 65, 205, 0.1) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* 3. Subtle caustic shimmer light band drifting from surface */}
      <div className="absolute inset-0 animate-ocean-shimmer opacity-15">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(180, 220, 255, 0.18) 0%, rgba(100, 160, 255, 0.05) 50%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}
