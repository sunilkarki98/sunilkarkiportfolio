interface StatusPulseProps {
  label: string;
  className?: string;
}

const StatusPulse = ({ label, className = "" }: StatusPulseProps) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
    </span>
    <span className="text-green-400 font-medium tracking-wider uppercase text-sm">
      {label}
    </span>
  </div>
);

export default StatusPulse;
