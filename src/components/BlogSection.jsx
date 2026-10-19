import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

export default function BlogSection({ onBlogClick, onViewAllBlogs }) {
  return (
    <section id="blog" className="w-full py-7 md:py-10 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-[#111D27] tracking-tight">
            Latest from Our Blog
          </h2>

          <button
            onClick={onViewAllBlogs}
            className="group inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#17212B] hover:text-[#E91E32] transition-colors cursor-pointer"
          >
            <span>View All Blogs</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-[#E91E32]" />
          </button>
        </div>

        {/* 4 Blog Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onBlogClick && onBlogClick(post)}
              className="bg-white border border-[#E5E9ED] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-[#F5F6F7]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#111D27] group-hover:text-[#E91E32] transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Meta & Read More */}
              <div className="px-3.5 pb-3.5 pt-0 flex items-center justify-between border-t border-[#F1F5F9] mt-auto">
                <span className="text-[11px] text-[#737D87] font-medium pt-2">
                  {post.date}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E91E32] group-hover:underline pt-2">
                  <span>Read More</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
