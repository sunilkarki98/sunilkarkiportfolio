import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// Define the shape of our MDX metadata
export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  author?: string;
  categories?: string[];
  tags?: string[];
  isPublished?: boolean;
  readingTime?: string;
}

// Define the shape of the entire parsed MDX post
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const root = process.cwd();
const getContentPath = (type: string) => path.join(root, 'src', 'content', type);

// Get all slugs from the content directory
export const getBlogSlugs = (type: string = 'blog'): string[] => {
  const contentPath = getContentPath(type);
  // Check if directory exists
  if (!fs.existsSync(contentPath)) {
    return [];
  }
  
  const files = fs.readdirSync(contentPath);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
};

// Get a single post by its slug
export const getPostBySlug = async (slug: string, type: string = 'blog'): Promise<Post | null> => {
  try {
    const contentPath = getContentPath(type);
    const fullPath = path.join(contentPath, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontmatter: {
        ...(data as PostFrontmatter),
        readingTime: readingTime(content).text,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error);
    return null;
  }
};

// Get all posts sorted by date
export const getAllPosts = async (type: string = 'blog'): Promise<Post[]> => {
  const slugs = getBlogSlugs(type);
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug, type);
      return post;
    })
  );

  // Filter out nulls (errors reading files) and unpublished posts
  const validPosts = posts
    .filter((post): post is Post => post !== null)
    .filter((post) => post.frontmatter.isPublished !== false);

  // Sort by date descending
  return validPosts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
};
