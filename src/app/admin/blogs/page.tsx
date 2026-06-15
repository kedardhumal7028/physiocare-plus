// c:\Users\Admin\kedar\physiocare-plus\src\app\admin\blogs\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { BlogPost, getStoredBlogs, saveBlogPost, BLOGS_STORAGE_KEY } from "@/app/blog/page";
import { BookOpen, Plus, Eye, EyeOff, Save, Trash2, Calendar, User, ArrowUpRight } from "lucide-react";

export default function AdminBlogsManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("Sports Rehab");
  const [readTime, setReadTime] = useState("5 min read");
  const [author, setAuthor] = useState("Dr. Emma Stone");
  const [featuredImage, setFeaturedImage] = useState("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500");

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setBlogs(getStoredBlogs());
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  }, [title]);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) return;

    const parsedTags = tags.split(",").map(t => t.trim()).filter(Boolean);

    saveBlogPost({
      title,
      slug,
      description,
      content,
      tags: parsedTags.length > 0 ? parsedTags : ["General Wellness"],
      readTime,
      author,
      author_avatar: author === "Dr. Emma Stone" 
        ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
        : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100",
      featured_image: featuredImage,
      is_published: true
    });

    setSubmitSuccess(true);
    setTitle("");
    setDescription("");
    setContent("");
    setTags("Sports Rehab");
    
    // Refresh lists
    setBlogs(getStoredBlogs());
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this article permanently?")) {
      const list = getStoredBlogs();
      const updated = list.filter((b) => b.id !== id);
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
      setBlogs(updated);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-foreground">
      
      {/* Header */}
      <div className="border-b border-brand-500/5 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog CMS Console</h1>
          <p className="text-xs text-foreground/50">Author physical health articles, manage tags, and review published stretching guides.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Left column: Publisher Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-card p-5 border border-brand-500/10 shadow bg-white dark:bg-neutral-900 flex flex-col gap-5">
            
            <div className="flex items-center justify-between border-b border-brand-500/10 pb-3">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-brand-500" />
                <span>Create Wellness Article</span>
              </h3>
              
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="text-3xs font-extrabold uppercase tracking-wider text-brand-500 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                {isPreviewMode ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Hide Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Show Preview Canvas</span>
                  </>
                )}
              </button>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center font-bold text-xs animate-fade-in">
                ✓ Wellness article published successfully! Loaded on `/blog`.
              </div>
            )}

            {/* Render preview instead of editor */}
            {isPreviewMode ? (
              <div className="p-4 rounded-2xl border border-brand-500/10 bg-brand-50/5 dark:bg-neutral-950/20 animate-fade-in flex flex-col gap-4 text-xs font-semibold">
                <img
                  src={featuredImage}
                  alt="Featured blog header"
                  className="w-full h-36 object-cover rounded-xl border border-brand-500/5"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-brand-500 text-[10px] font-extrabold uppercase tracking-wider">PREVIEW CANVAS</span>
                  <h2 className="text-sm font-extrabold leading-tight text-foreground">{title || "Untitled Article"}</h2>
                  <span className="text-4xs text-foreground/50 leading-none mt-1">Author: {author} • {readTime} • Tags: {tags}</span>
                </div>
                <hr className="border-brand-500/10" />
                <p className="text-4xs text-foreground/70 leading-relaxed italic">"{description || "No description written yet..."}"</p>
                <div className="text-4xs text-foreground/85 leading-normal max-h-40 overflow-y-auto pr-1 whitespace-pre-wrap font-mono">
                  {content || "No body content written yet..."}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateBlog} className="flex flex-col gap-4 text-xs text-foreground font-semibold">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 Lumbar Stretches"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Dynamic URL Slug</label>
                    <input
                      type="text"
                      disabled
                      placeholder="slug-path-auto-generated"
                      value={slug}
                      className="w-full rounded-lg border border-brand-500/10 bg-slate-50 dark:bg-neutral-900/50 text-foreground/50 px-2.5 py-1.5 text-xs outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Author Therapist</label>
                    <select
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="rounded-lg border border-brand-500/20 bg-background p-1.5 text-xs outline-none focus:border-brand-500"
                    >
                      <option>Dr. Emma Stone</option>
                      <option>Dr. Marcus Vance</option>
                      <option>Dr. Linda Carter</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Estimated Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Article Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Spinal Rehab, Stretch"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-3xs font-bold text-foreground/80">Header Thumbnail URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-3xs font-bold text-foreground/80">Short Meta Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description summarizing stretching goals..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-3xs font-bold text-foreground/80">Body Content (Markdown format supported)</label>
                  <textarea
                    required
                    rows={8}
                    placeholder="Write article details. Use ## headers and lists..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-lg border border-brand-500/20 bg-background/50 p-2.5 text-xs outline-none focus:border-brand-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-500 py-3 text-center font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-600 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>Publish Article Post</span>
                </button>
              </form>
            )}

          </div>
        </div>

        {/* Right column: Published article feed (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card p-5 border border-brand-500/10 shadow bg-white dark:bg-neutral-900 flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider pb-2 border-b border-brand-500/10">
              Published Articles ({blogs.length})
            </h3>

            <div className="flex flex-col gap-3.5 max-h-[500px] overflow-y-auto pr-1">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl border border-brand-500/5 bg-slate-50/20 dark:bg-neutral-950/20 flex flex-col gap-2 animate-fade-in group hover:border-brand-500/15"
                >
                  <div className="flex justify-between items-start text-xs font-semibold">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground leading-tight">{b.title}</span>
                      <span className="text-[10px] text-brand-500 font-bold uppercase mt-0.5">{b.author}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="text-foreground/30 hover:text-rose-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                      title="Delete article"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-4xs text-foreground/60 leading-normal">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
