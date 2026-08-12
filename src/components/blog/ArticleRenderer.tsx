import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { MDXComponents } from "./MDXComponents";
import TableOfContents from "./TableOfContents";
import ProgressBar from "./ProgressBar";
import NewsletterCTA from "@/components/monetization/NewsletterCTA";
import FaqSection from "./FaqSection";

import { Post } from "@/lib/mdx";

export default function ArticleRenderer({ frontmatter, content, basePath, backText, slug }: { frontmatter: Post["frontmatter"]; content: string; basePath: string; backText: string; slug: string }) {
  const isNepali = basePath.startsWith("/ne");
  const toggleUrl = isNepali ? `/blog/${slug}` : `/ne/blog/${slug}`;
  const toggleText = isNepali ? "Read in English (EN)" : "नेपालीमा पढ्नुहोस् (NE)";

  return (
    <>
      <ProgressBar />
      
      {/* Light Mode Wrapper */}
      <div className="min-h-screen pt-32 pb-24 bg-[#fafafa]">
        {/* Swapped layout: TOC on the left (reverse column order on large screens) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row-reverse justify-between gap-16">
          
          {/* Main Article Content */}
          <main className="w-full lg:max-w-3xl mx-auto lg:mx-0 relative z-10">
            
            {/* Back Link */}
            <Link 
              href={basePath} 
              className="inline-flex items-center gap-2 text-sm text-black opacity-80 hover:opacity-100 font-bold transition-all duration-300 mb-10 font-mono"
            >
              ← {backText}
            </Link>
            
            {/* Post Header */}
            <header className="mb-16 border-b border-gray-200 pb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6 opacity-80">
                {frontmatter.categories?.map((cat) => (
                  <span key={cat} className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                    {cat}
                  </span>
                ))}
                <span className="text-black font-bold">·</span>
                <time className="text-sm font-mono text-black font-bold">
                  {format(parseISO(frontmatter.date), "MMMM d, yyyy")}
                </time>
                <span className="text-black font-bold">·</span>
                <span className="text-sm font-mono text-black font-bold">
                  {frontmatter.readingTime}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-black tracking-tight leading-[1.15] mb-6">
                {frontmatter.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
                <p className="text-xl text-black font-medium leading-relaxed max-w-2xl opacity-90">
                  {frontmatter.summary}
                </p>
                <Link 
                  href={toggleUrl}
                  className="shrink-0 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors border border-black shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {toggleText}
                </Link>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                  SK
                </div>
                <div>
                  <p className="text-black font-black text-base">{frontmatter.author || "Sunil Karki"}</p>
                  <p className="text-black text-sm font-mono font-bold">{isNepali ? "कम्प्युटर इन्जिनियर" : "Computer Engineer"}</p>
                </div>
              </div>
            </header>

            {/* Rendered MDX - Clean Light Prose Styling */}
            <article className="prose prose-lg max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-black
              prose-h1:font-semibold prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-[2rem] prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-gray-300 prose-h2:pb-4
              prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-6
              prose-p:text-black prose-p:font-normal prose-p:leading-[1.85] prose-p:text-[20px] prose-p:mb-8
              prose-a:text-black prose-a:font-bold prose-a:no-underline prose-a:border-b prose-a:border-gray-400 hover:prose-a:border-black
              prose-strong:text-black prose-strong:font-semibold prose-strong:text-[20px]
              prose-code:text-black prose-code:bg-gray-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-bold prose-code:font-mono
              prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-300 prose-pre:rounded-xl prose-pre:shadow-sm prose-pre:text-black
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-100 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-black prose-blockquote:font-medium prose-blockquote:not-italic
              prose-li:text-black prose-li:font-medium prose-ul:list-disc prose-ol:list-decimal
              prose-img:rounded-xl prose-img:border prose-img:border-gray-300 prose-img:shadow-sm
              prose-table:border-collapse prose-table:w-full prose-th:text-left prose-th:p-3 prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:text-black prose-th:font-bold prose-td:p-3 prose-td:border prose-td:border-gray-300 prose-td:text-black prose-td:font-medium
            ">
              <MDXRemote 
                source={content} 
                components={MDXComponents} 
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  }
                }}
              />
            </article>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <FaqSection faq={frontmatter.faq || []} />
            </div>

            {/* Newsletter CTA */}
            <div className="mt-16 border-t border-gray-200 pt-16">
              <NewsletterCTA />
            </div>
            
          </main>

          {/* Sticky Sidebar - Now on the left because of flex-row-reverse */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0 relative">
            <div className="sticky top-32">
              <TableOfContents />
              
              {/* Share / Author Card */}
              <div className="mt-10 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <p className="text-xs font-mono uppercase tracking-wider text-black font-black mb-4">{isNepali ? "लेखक" : "Written by"}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <p className="text-black font-black text-base">Sunil Karki</p>
                    <p className="text-black text-sm font-bold">{isNepali ? "कम्प्युटर इन्जिनियर" : "Computer Engineer"}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </>
  );
}
