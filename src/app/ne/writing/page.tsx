import { getAllPosts } from "@/lib/mdx";
import WritingHub from "@/components/blog/WritingHub";

export const metadata = {
  title: "लेखहरू",
  description: "सफ्टवेयर इन्जिनियरिङ र जीवनका विचार र ट्यूटोरियलहरू।",
  openGraph: {
    title: "लेखहरू | Sunil Karki",
    description: "सफ्टवेयर इन्जिनियरिङ र जीवनका विचार र ट्यूटोरियलहरू।",
    url: "/ne/writing",
  },
  twitter: {
    card: "summary_large_image",
    title: "लेखहरू | Sunil Karki",
    description: "सफ्टवेयर इन्जिनियरिङ र जीवनका विचार र ट्यूटोरियलहरू।",
  },
  alternates: {
    canonical: "/ne/writing",
    languages: {
      "en-US": "/writing",
    },
  },
};

export default async function WritingPage() {
  // Fetch both blogs and essays
  // Fetch both blogs and essays in Nepali
  const blogPosts = await getAllPosts("blog", "ne");
  const essays = await getAllPosts("essays", "ne");

  // Tag them with their respective types
  const taggedBlogPosts = blogPosts.map(post => ({ ...post, type: "blog" }));
  const taggedEssays = essays.map(post => ({ ...post, type: "essays" }));

  // Combine and sort by date descending
  const allPosts = [...taggedBlogPosts, ...taggedEssays].sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return <WritingHub allPosts={allPosts} />;
}
