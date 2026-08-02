import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const root = process.cwd();
const getContentPath = (type) => path.join(root, 'src', 'content', type);

// Get all slugs from the content directory
export const getBlogSlugs = (type = 'blog') => {
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
export const getPostBySlug = async (slug, type = 'blog') => {
  try {
    const contentPath = getContentPath(type);
    const fullPath = path.join(contentPath, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontmatter: {
        ...data,
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
export const getAllPosts = async (type = 'blog') => {
  const slugs = getBlogSlugs(type);
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug, type);
      return post;
    })
  );

  // Filter out nulls (errors reading files) and unpublished posts
  const validPosts = posts
    .filter((post) => post !== null)
    .filter((post) => post.frontmatter.isPublished !== false);

  // Sort by date descending
  return validPosts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
};
