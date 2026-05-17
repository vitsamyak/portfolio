"use client";

export default function CinematicGlowBackground() {
  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden bg-transparent">
      {/* 1. Subtle film-grain noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Soft dot grid pattern for tech/engineering feel (fades as we go down) */}
      <div
        className="absolute inset-0 z-0 h-full w-full opacity-[0.12] mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3. Ambient Lighting (Radial Glows) */}
      {/* Top Left Deep Blue Glow */}
      <div 
        className="pointer-events-none absolute left-[-10%] top-[8%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0)_70%)] blur-[120px]" 
      />
      
      {/* Mid Right Soft Amber/Orange Glow */}
      <div 
        className="pointer-events-none absolute right-[-10%] top-[35%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,rgba(249,115,22,0)_70%)] blur-[140px]" 
      />
      
      {/* Lower Left Subtle Cyan/Blue Glow */}
      <div 
        className="pointer-events-none absolute left-[-5%] bottom-[25%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,rgba(6,182,212,0)_70%)] blur-[120px]" 
      />
      
      {/* Footer Area Deep Warm Orange Glow */}
      <div 
        className="pointer-events-none absolute right-[5%] bottom-[2%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.06)_0%,rgba(234,88,12,0)_70%)] blur-[100px]" 
      />
    </div>
  );
}
