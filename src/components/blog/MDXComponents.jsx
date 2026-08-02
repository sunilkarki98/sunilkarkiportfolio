import Image from 'next/image';
import Link from 'next/link';
import { AffiliateCard } from '../monetization/AffiliateCard';

export const MDXComponents = {
  a: ({ href, ...props }) => {
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
    if (isInternalLink) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }
    return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />;
  },
  img: (props) => (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full h-auto object-cover m-0" {...props} alt={props.alt || "Blog image"} />
      {props.alt && <div className="p-3 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-200">{props.alt}</div>}
    </div>
  ),
  table: (props) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-gray-300 shadow-sm">
      <table className="w-full text-left m-0" {...props} />
    </div>
  ),
  AffiliateCard,
};
