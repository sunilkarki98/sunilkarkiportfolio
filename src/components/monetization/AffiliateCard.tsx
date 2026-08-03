import Image from "next/image";

export const AffiliateCard = ({ title, description, url, imageUrl, ctaText = "View Product" }: { title: string, description: string, url: string, imageUrl?: string, ctaText?: string }) => {
  return (
    <div className="not-prose flex flex-col md:flex-row items-center gap-6 p-6 my-8 bg-white rounded-2xl border border-gray-300 hover:border-black transition-colors group shadow-sm">
      {imageUrl && (
        <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-base text-gray-700 mb-4 leading-relaxed font-medium">{description}</p>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm border border-black"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default AffiliateCard;
