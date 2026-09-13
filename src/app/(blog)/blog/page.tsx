import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { FiArrowRight, FiClock, FiArrowLeft } from "react-icons/fi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Sunil Karki",
  description:
    "Thoughts on software engineering, AI automation, and building products that matter.",
};

export default async function BlogPage() {
  const posts = await getAllPosts("blog", "en");
  const featured = posts[0];
  const remaining = posts.slice(1);

  return (
    <main className="min-h-screen bg-bg">
      {/* ── HERO HEADER ── */}
      <div className="max-w-[1400px] mx-auto section-padding-x pt-32 sm:pt-40 pb-0">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary transition-colors uppercase tracking-widest font-mono mb-16 group"
        >
          <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to home
        </Link>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-text-secondary uppercase mb-3 block">
              {"{"} INSIGHTS {"}"}
            </span>
            <h1 className="font-heading font-bold text-text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
              Writing.
            </h1>
          </div>
          <p className="text-text-primary/80 text-base font-normal max-w-sm leading-relaxed md:pb-2">
            Exploring software engineering, AI systems, and the craft of
            building products that scale.
          </p>
        </div>

        <div className="w-full h-px bg-border" />
      </div>

      {posts.length === 0 ? (
        <div className="max-w-[1400px] mx-auto section-padding-x py-32 text-center">
          <p className="text-text-secondary font-mono text-sm uppercase tracking-widest">
            No articles yet. Check back soon.
          </p>
        </div>
      ) : (
        <>
          {/* ── FEATURED ARTICLE ── */}
          {featured && (
            <div className="max-w-[1400px] mx-auto section-padding-x py-12 sm:py-16">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {/* Left: Large Index + Meta */}
                  <div className="lg:w-1/3 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-6 block">
                        Featured Article
                      </span>
                      <span className="font-heading font-bold text-text-primary/10 text-[120px] sm:text-[160px] leading-none block -ml-2">
                        01
                      </span>
                    </div>
                    <div className="flex items-center gap-6 mt-auto pt-6">
                      <span className="font-mono text-xs text-text-secondary">
                        {new Date(
                          featured.frontmatter.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {featured.frontmatter.readingTime && (
                        <span className="flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                          <FiClock className="w-3 h-3" />
                          {featured.frontmatter.readingTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:w-2/3 flex flex-col justify-center border-l border-border pl-8 lg:pl-16">
                    {/* Categories */}
                    {featured.frontmatter.categories &&
                      featured.frontmatter.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featured.frontmatter.categories.map((cat) => (
                            <span
                              key={cat}
                              className="font-mono text-xs tracking-wider text-text-secondary uppercase border border-border px-2.5 py-1"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}

                    <h2 className="font-heading font-bold text-text-primary text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight mb-6 leading-tight group-hover:text-text-primary/80 transition-colors">
                      {featured.frontmatter.title}
                    </h2>

                    <p className="text-text-primary/80 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mb-8">
                      {featured.frontmatter.summary}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs text-text-primary/70 group-hover:text-text-primary transition-colors uppercase tracking-widest font-mono">
                      Read article{" "}
                      <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ── REMAINING ARTICLES ── */}
          {remaining.length > 0 && (
            <div className="max-w-[1400px] mx-auto section-padding-x pb-16">
              <div className="w-full h-px bg-border mb-12" />

              <span className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-8 block">
                All Articles — {String(posts.length).padStart(2, "0")} Total
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {remaining.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-bg p-8 sm:p-10 flex flex-col justify-between hover:bg-surface/30 transition-colors duration-300 min-h-[300px] border border-border -mt-px -ml-px"
                  >
                    {/* Top */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs tracking-widest text-text-secondary uppercase">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        {post.frontmatter.readingTime && (
                          <span className="flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                            <FiClock className="w-3 h-3" />
                            {post.frontmatter.readingTime}
                          </span>
                        )}
                      </div>

                      {/* Categories */}
                      {post.frontmatter.categories &&
                        post.frontmatter.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.frontmatter.categories
                              .slice(0, 2)
                              .map((cat) => (
                                <span
                                  key={cat}
                                  className="font-mono text-xs tracking-wider text-text-secondary uppercase border border-border px-2 py-0.5"
                                >
                                  {cat}
                                </span>
                              ))}
                          </div>
                        )}

                      <h3 className="font-heading font-bold text-text-primary text-lg sm:text-xl uppercase tracking-tight mb-3 group-hover:text-text-primary/80 transition-colors leading-tight">
                        {post.frontmatter.title}
                      </h3>

                      <p className="text-text-primary/80 text-base font-normal leading-relaxed line-clamp-3">
                        {post.frontmatter.summary}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                      <span className="font-mono text-xs text-text-secondary">
                        {new Date(
                          post.frontmatter.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <FiArrowRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
