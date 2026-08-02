'use client';
import { useEffect, useState } from 'react';

export const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Find all h1, h2 and h3 elements inside the article
    const elements = Array.from(document.querySelectorAll('article h1, article h2, article h3'))
      .map((element) => {
        // If they don't have an ID, we'll need to generate one
        if (!element.id) {
          element.id = element.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        return {
          id: element.id,
          text: element.innerText,
          level: Number(element.nodeName.charAt(1)),
        };
      });
    setHeadings(elements);

    // Setup intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-black font-semibold mb-4 uppercase tracking-wider text-sm">Table of Contents</h4>
      <ul className="space-y-2 border-l border-gray-200">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`transition-colors ${
              heading.level === 3 ? 'ml-6' : heading.level === 2 ? 'ml-3' : 'ml-0'
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`block pl-4 py-2 text-base ${
                activeId === heading.id
                  ? 'text-black border-l-2 border-black -ml-[1px] font-semibold'
                  : 'text-black opacity-70 hover:opacity-100 border-l-2 border-transparent -ml-[1px]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
