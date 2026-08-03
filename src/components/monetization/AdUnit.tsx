export const AdUnit = ({ slotId, format = "auto", responsive = true }: { slotId: string, format?: string, responsive?: boolean }) => {
  return (
    <div className="w-full my-8 bg-tertiary/50 border border-white-100/5 rounded-xl p-4 flex items-center justify-center min-h-[120px] overflow-hidden relative group">
      {/* Visual Placeholder for Development */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-secondary/50 font-bold mb-1">Advertisement</p>
        <p className="text-sm text-purple-400/50">Google AdSense Space</p>
      </div>

      {/* Actual AdSense Tag (Uncomment and configure when ready) */}
      {/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      /> */}
    </div>
  );
};

export default AdUnit;
