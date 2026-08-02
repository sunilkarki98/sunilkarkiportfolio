export default function Loading() {
  return (
    <div className="w-full h-screen bg-primary flex flex-col items-center justify-center fixed inset-0 z-[100]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="w-24 h-24 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin absolute" />
        
        {/* Inner reverse-spinning ring */}
        <div className="w-16 h-16 rounded-full border-b-2 border-l-2 border-blue-500 animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Center dot */}
        <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_#fff]" />
      </div>
      <p className="text-white mt-8 font-medium tracking-[0.2em] uppercase text-sm animate-pulse">
        Initializing...
      </p>
    </div>
  );
}
