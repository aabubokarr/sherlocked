export function BackgroundAmbience() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[50%] bg-indigo-900/15 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-pink-900/10 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]" />
    </div>
  );
}
