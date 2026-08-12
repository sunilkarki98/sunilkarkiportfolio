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
      images: [
        {
          url: "/mylogo.png",
          width: 800,
          height: 600,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: ["/mylogo.png"],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        "ne-NP": `/ne/blog/${slug}`,
      },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.summary,
    author: {
      "@type": "Person",
      name: frontmatter.author || "Sunil Karki",
    },
    image: "https://www.sunilkarki98.com.np/mylogo.png",
    publisher: {
      "@type": "Organization",
      name: "Sunil Karki",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sunilkarki98.com.np/mylogo.png"
      }
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url: `https://www.sunilkarki98.com.np/blog/${slug}`,
  };

  let faqJsonLd = null;
  if (frontmatter.faq && Array.isArray(frontmatter.faq)) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: frontmatter.faq.map((item: any) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ArticleRenderer
        frontmatter={frontmatter}
        content={content}
        basePath="/blog"
        backText="Back to blog"
        slug={slug}
      />
    </>
  );
}
