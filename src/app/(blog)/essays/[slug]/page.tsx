import { getPostBySlug, getBlogSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import ArticleRenderer from "@/components/blog/ArticleRenderer";
import { Metadata } from "next";

// Support static generation
export async function generateStaticParams() {
  const slugs = getBlogSlugs('essays');
  return slugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'essays');
  if (!post) return { title: "Essay Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Sunil Karki"],
      url: `/essays/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    },
    alternates: {
      canonical: `/essays/${slug}`,
    },
  };
}

export default async function EssayPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'essays');

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <ArticleRenderer
      frontmatter={frontmatter}
      content={content}
      basePath="/essays"
      backText="Back to essays"
    />
  );
}
