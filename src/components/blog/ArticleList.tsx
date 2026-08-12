import Link from "next/link";
import { format, parseISO } from "date-fns";

import { Post } from "@/lib/mdx";

export default function ArticleList({ title, description, posts, basePath }: { title: string, description: string, posts: Post[], basePath: string }) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#fafafa]">
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="mb-20 border-b border-gray-200 pb-12">
          <p className="text-base font-mono uppercase tracking-[0.2em] text-gray-500 mb-4 font-semibold">
            Writing & Insights
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold text-black tracking-tight leading-[1.1]">
            {title}
          </h1>
          <p className="mt-6 text-black font-medium text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Posts List - Minimal Light Style */}
        <div className="space-y-0">
          {posts.map((post, index) => (
            <Link
              href={`${basePath}/${post.slug}`}
              key={post.slug}
              className="group block"
            >
              <article className={`py-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 ${index !== posts.length - 1 ? 'border-b border-gray-200' : ''}`}>
                {/* Date Column */}
                <div className="md:w-36 shrink-0">
                  <time className="text-sm font-bold font-mono text-black">
                    {format(parseISO(post.frontmatter.date), "MMM d, yyyy")}
                  </time>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {post.frontmatter.categories?.map((cat) => (
                      <span
                        key={cat}
                        className="text-sm font-bold uppercase tracking-wider text-black"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-black group-hover:text-gray-700 transition-colors duration-300 leading-tight mb-3">
                    {post.frontmatter.title}
                  </h2>

                  <p className="text-black font-medium text-[16px] leading-relaxed mb-4 max-w-2xl">
                    {post.frontmatter.summary}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="text-black group-hover:text-gray-700 transition-colors underline underline-offset-4">
                      Read article →
                    </span>
                    <span className="text-black">
                      {post.frontmatter.readingTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <p className="text-black font-medium">No articles found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
