import { getAllPosts } from "@/lib/mdx";
import WritingHub from "@/components/blog/WritingHub";

export const metadata = {
  title: "Writing",
  description: "Thoughts, tutorials, and deep dives on software engineering and life.",
  openGraph: {
    title: "Writing | Sunil Karki",
    description: "Thoughts, tutorials, and deep dives on software engineering and life.",
    url: "/writing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Sunil Karki",
    description: "Thoughts, tutorials, and deep dives on software engineering and life.",
  },
  alternates: {
    canonical: "/writing",
    languages: {
      "ne-NP": "/ne/writing",
    },
  },
};

export default async function WritingPage() {
  // Fetch both blogs and essays
  const blogPosts = await getAllPosts("blog");
  const essays = await getAllPosts("essays");

  // Tag them with their respective types
  const taggedBlogPosts = blogPosts.map(post => ({ ...post, type: "blog" }));
  const taggedEssays = essays.map(post => ({ ...post, type: "essays" }));

  // Combine and sort by date descending
  const allPosts = [...taggedBlogPosts, ...taggedEssays].sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return <WritingHub allPosts={allPosts} />;
}
