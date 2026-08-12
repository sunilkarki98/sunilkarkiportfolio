export default function Loading() {
  return (
    <div className="w-full h-screen bg-bg flex flex-col items-center justify-center fixed inset-0 z-[100]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="w-24 h-24 rounded-full border-t-2 border-r-2 border-accent animate-spin absolute" />
        
        {/* Inner reverse-spinning ring */}
        <div className="w-16 h-16 rounded-full border-b-2 border-l-2 border-accent-soft animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Center dot */}
        <div className="w-4 h-4 bg-text-primary rounded-full animate-pulse shadow-[0_0_15px_#fff]" />
      </div>
      <p className="text-text-primary mt-8 font-medium tracking-[0.2em] uppercase text-sm animate-pulse">
        Initializing...
      </p>
    </div>
  );
}
