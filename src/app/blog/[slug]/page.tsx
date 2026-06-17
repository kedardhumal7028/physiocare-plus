// c:\Users\Admin\kedar\physiocare-plus\src\app\blog\[slug]\page.tsx
"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { getStoredBlogs, BlogPost } from "../page";
import { Clock, ArrowLeft, Calendar, User, Share2, Heart } from "lucide-react";

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const list = getStoredBlogs();
    const match = list.find((b) => b.slug === slug);
    if (match) {
      setBlog(match);
    }
  }, [slug]);

  // Track scrolling progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setReadingProgress(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-foreground/50 bg-brand-50/10">
        Finding clinical article details...
      </div>
    );
  }

  return (
    <>
      {/* Sticky top reading progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-brand-500/10 z-50">
        <div
          style={{ width: `${readingProgress}%` }}
          className="h-full bg-brand-500 transition-all duration-75"
        ></div>
      </div>

      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground">
        <Container>
          
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-foreground/60 hover:text-brand-500 transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Knowledge Hub</span>
          </Link>

          <article className="max-w-3xl mx-auto flex flex-col gap-8 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col gap-4">
              {/* Tags */}
              <div className="flex gap-1.5">
                {blog.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-500/10 text-brand-500 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
                {blog.title}
              </h1>

              {/* Author & Meta details */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-brand-500/10 py-4 mt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={blog.author_avatar}
                    alt={blog.author}
                    className="h-10 w-10 rounded-full object-cover border border-brand-500/10"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{blog.author}</span>
                    <span className="text-4xs text-foreground/50 font-bold uppercase tracking-wider">Clinical Physiotherapist</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-foreground/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-brand-500" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-brand-500" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md border border-brand-500/5">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Content */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-foreground/80 leading-relaxed flex flex-col gap-6 font-medium">
              {blog.content.split("\n\n").map((para, idx) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-lg font-bold text-foreground mt-4 pb-2 border-b border-brand-500/10">
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-sm font-bold text-brand-500 mt-2">
                      {para.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={idx}>
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Social triggers footer */}
            <div className="border-t border-brand-500/10 pt-6 mt-4 flex justify-between items-center text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 font-bold cursor-pointer transition-colors ${
                    liked ? "text-rose-500" : "text-foreground/60 hover:text-rose-500"
                  }`}
                >
                  <Heart className={`h-4.5 w-4.5 ${liked ? "fill-rose-500 stroke-rose-500" : ""}`} />
                  <span>{liked ? "Liked Article" : "Like"}</span>
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }}
                  className="flex items-center gap-1.5 font-bold text-foreground/60 hover:text-brand-500 cursor-pointer transition-colors"
                >
                  <Share2 className="h-4.5 w-4.5" />
                  <span>Copy Link</span>
                </button>
              </div>

              <Link href="/portal/book">
                <Button variant="primary" size="sm">Schedule Therapy</Button>
              </Link>
            </div>

          </article>
        </Container>
      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}
