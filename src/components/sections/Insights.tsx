import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { FiArrowRight, FiClock } from "react-icons/fi";

const Insights = async () => {
  const posts = await getAllPosts("blog", "en");
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <Container as="section" id="insights" className="section-padding-x section-padding-y relative z-0">
      {/* Section Header */}
      <div className="mb-12 lg:mb-20">
        <SectionHeader subtitle="Insights" title="Latest writing." center={false} />
        <p className="text-text-primary/80 text-base font-normal mt-4 max-w-xl">
          Thoughts on software engineering, AI automation, and building products that matter.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
        {latestPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-bg p-6 sm:p-8 flex flex-col justify-between hover:bg-surface/50 transition-colors duration-300 min-h-[280px]"
          >
            {/* Top: Meta */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs tracking-widest text-text-secondary uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {post.frontmatter.readingTime && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                    <FiClock className="w-3 h-3" />
                    {post.frontmatter.readingTime}
                  </span>
                )}
              </div>

              {/* Categories */}
              {post.frontmatter.categories && post.frontmatter.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.frontmatter.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="font-mono text-xs tracking-wider text-text-secondary uppercase border border-border px-2 py-0.5"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="font-heading font-bold text-text-primary text-lg sm:text-xl uppercase tracking-tight mb-3 group-hover:text-text-primary/80 transition-colors leading-tight">
                {post.frontmatter.title}
              </h3>

              {/* Summary */}
              <p className="text-text-primary/80 text-base font-normal leading-relaxed line-clamp-3">
                {post.frontmatter.summary}
              </p>
            </div>

            {/* Bottom: Date + Arrow */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <span className="font-mono text-xs text-text-secondary">
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
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

      {/* View All Link */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-text-primary/70 hover:text-text-primary transition-colors uppercase tracking-widest font-mono"
        >
          View all articles <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Container>
  );
};

export default Insights;
