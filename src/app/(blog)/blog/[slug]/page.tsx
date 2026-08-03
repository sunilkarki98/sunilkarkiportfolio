import { getPostBySlug, getBlogSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import ArticleRenderer from "@/components/blog/ArticleRenderer";
import { Metadata } from "next";

// Support static generation
export async function generateStaticParams() {
  const slugs = getBlogSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'blog');
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Sunil Karki"],
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'blog');

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <ArticleRenderer
      frontmatter={frontmatter}
      content={content}
      basePath="/blog"
      backText="Back to blog"
    />
  );
}
