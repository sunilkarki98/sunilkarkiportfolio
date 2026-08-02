'use client';
import { useState } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import NewsletterCTA from '../monetization/NewsletterCTA';

export default function WritingHub({ allPosts }) {
  const [activeTab, setActiveTab] = useState('All');
  
  // Filter posts based on active tab
  const filteredPosts = allPosts.filter(post => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Essays') return post.type === 'essays';
    if (activeTab === 'Articles') return post.type === 'blog';
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-10">
          <p className="text-base font-mono uppercase tracking-[0.2em] text-black opacity-70 mb-4 font-semibold">
            Thoughts & Deep Dives
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold text-black tracking-tight leading-[1.1]">
            Writing
          </h1>
          <p className="mt-6 text-black font-medium text-lg max-w-2xl leading-relaxed">
            A collection of technical articles, engineering tutorials, and personal essays on software development and life.
          </p>
        </div>

        {/* Tab System */}
        <div className="flex items-center gap-6 mb-12 border-b border-gray-200">
          {['All', 'Articles', 'Essays'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-lg font-bold transition-all duration-300 relative ${
                activeTab === tab ? 'text-black' : 'text-black opacity-60 hover:opacity-100'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                key={`${post.type}-${post.slug}`}
                href={`/${post.type}/${post.slug}`}
                className="group flex flex-col p-6 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-300 relative"
              >
                <div className="absolute top-6 right-6">
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white">
                    <span className="text-black transform group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-black font-bold border border-black/20 px-2 py-1 rounded-md opacity-80">
                      {post.type === 'blog' ? 'Article' : 'Essay'}
                    </span>
                    <time className="text-sm font-mono text-black font-semibold opacity-70">
                      {format(parseISO(post.frontmatter.date), "MMM d, yyyy")}
                    </time>
                  </div>

                  <h2 className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors duration-300 leading-tight mb-3 pr-8">
                    {post.frontmatter.title}
                  </h2>

                  <p className="text-black font-medium leading-relaxed line-clamp-3 opacity-80">
                    {post.frontmatter.summary}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-20 text-black opacity-70 font-medium">
              No posts found in this category.
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
