// c:\Users\Admin\kedar\physiocare-plus\src\app\blog\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { Search, Clock, BookOpen, ArrowRight, User } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  readTime: string;
  author: string;
  author_avatar: string;
  featured_image: string;
  created_at: string;
  is_published: boolean;
}

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Essential Lumbar Stretches for Severe Lower Back Stiffness",
    slug: "lumbar-stretches-back-stiffness",
    description: "Cure lumbar spasms and lower back stiffness using these 5 clinical stretching targets. Highly recommended for desk software developers.",
    content: "## The Lumbar Spine Dilemma\n\nSitting at a workstation desk for 8+ hours a day places a static overload on your lumbar spine musculature, leading to severe spasms, stiffness, and chronic sciatica. These 5 targeted physical stretches are designed to restore vertebral mobility, stretch tight hip flexors, and strengthen core stabilizers.\n\n### 1. Child's Pose (Balasana)\nFocus on sinking your hips back towards your heels, extending your arms flat forward on the mat, and breathing deeply. Hold this pose for 45 seconds to stretch the lumbar paraspinal muscles.\n\n### 2. Cat-Cow Mobilization\nOn hands and knees, cycle between arching your back towards the ceiling (cat) and dipping your spine down while lifting your chest (cow). Complete 15 slow cycles to restore spinal fluid mobility.\n\n### 3. Figure-Four Piriformis Stretch\nLie on your back, cross one ankle over the opposite knee, and pull your thigh towards your chest. Hold for 30 seconds per side to release deep sciatic piriformis compression.\n\n### 4. Cobra Spine Extension\nLie face down and press up through your hands, arching your upper back while keeping your pelvis on the mat. Hold for 15 seconds to counteract slouching flexion postures.\n\n### 5. Supine Spinal Twist\nLie flat, pull your right knee to your chest, and guide it across your body to the left floor surface. Hold for 30 seconds on each side to mobilize joint facets.",
    tags: ["Spinal Alignment", "Stretch Guides"],
    readTime: "5 min read",
    author: "Dr. Emma Stone",
    author_avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100",
    featured_image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500",
    created_at: "2026-05-24T10:00:00Z",
    is_published: true
  },
  {
    id: "blog-2",
    title: "Post-Surgical Knee Recovery: Step-by-Step Restoration Milestones",
    slug: "post-surgical-knee-recovery",
    description: "Recover patellar alignment and extension range of motion safely after knee replacements, meniscus tears, or ACL repair operations.",
    content: "## Healing Post Knee Surgery\n\nWhether recovering from a total knee arthroplasty, lateral meniscus trim, or anterior cruciate ligament (ACL) reconstruction, restoring early extension, building quadricep control, and reducing joint effusion are the pillars of clinical healing.\n\n### Phase 1: Knee Extension Lock (Weeks 1 - 2)\nYour absolute priority is achieving a complete flat knee extension (0 degrees). Focus on passive knee extension hangs and towel squeeze locks to reactivate the quadriceps muscle.\n\n### Phase 2: Flexion and Gait Mobilization (Weeks 3 - 6)\nWe focus on bending the knee to 90 and then 120 degrees using slide sheets and cycling rotations. GAIT retraining helps transition patients off crutches cleanly.\n\n### Phase 3: Muscle Hypertrophy & Stability (Weeks 6+)\nTransitioning into weight-bearing stability. Exercises like step-downs, single-leg balancing, and wall-sits build patellar tracking integrity under orthopedic therapist guidance.",
    tags: ["Sports Rehab", "Recovery Plan"],
    readTime: "8 min read",
    author: "Dr. Linda Carter",
    author_avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=100",
    featured_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
    created_at: "2026-05-20T14:30:00Z",
    is_published: true
  },
  {
    id: "blog-3",
    title: "The Science of Dry Needling: How Pinned Stimulations Release Muscle Knots",
    slug: "dry-needling-science",
    description: "Learn how inserting fine needle pins directly into trigger points immediately triggers healing circulation, cures headaches, and restores posture.",
    content: "## Demystifying Dry Needling\n\nDry needling is a modern clinical treatment using thin, solid filament needles (acupuncture needles) to target myofascial trigger points—highly irritable knots inside tight muscle bands. Unlike traditional acupuncture which acts on meridian pathways, dry needling targets biological neuromuscular tissues directly.\n\n### How Trigger Points Occur\nStatic typing postures, repetitive lift strains, or stress lead to localized oxygen deprivation (ischemia) in muscle cells, locking sarcomeres in a contracted state. This forms a painful, hard muscle knot.\n\n### The Local Twitch Response (LTR)\nWhen the thin pin penetrates the trigger point, it triggers an involuntary muscle contraction known as a twitch response. This release immediate electrical tension, allowing the muscle fibers to relax.\n\n### Neurological Pain Gate Modulation\nDry needling sends sensory impulses to the spinal cord that block slow, dull pain pathways, releasing endorphins to support recovery and posture restoration.",
    tags: ["Spinal Alignment", "Sports Rehab"],
    readTime: "6 min read",
    author: "Dr. Marcus Vance",
    author_avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100",
    featured_image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=500",
    created_at: "2026-05-15T09:15:00Z",
    is_published: true
  }
];

export const BLOGS_STORAGE_KEY = "physiocare_blogs";

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") return DEFAULT_BLOGS;
  const stored = localStorage.getItem(BLOGS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(DEFAULT_BLOGS));
    return DEFAULT_BLOGS;
  }
  return JSON.parse(stored);
}

export function saveBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): BlogPost {
  const list = getStoredBlogs();
  const newPost: BlogPost = {
    ...post,
    id: `blog-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  list.push(newPost);
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(list));
  return newPost;
}

export default function BlogDashboardPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    setBlogs(getStoredBlogs());
  }, []);

  // Filter tags pool
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  // Filter articles
  const filteredBlogs = blogs.filter((blog) => {
    if (!blog.is_published) return false;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-4 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Wellness Articles</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Physical Rehab <span className="text-gradient">Knowledge Hub</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Read wellness advice from our clinicians. Explore stretching checklists, trigger-point dry needling guidelines, and post-surgery mobility restoration targets.
            </p>
          </div>

          {/* Search & Tag Filter dashboard panel */}
          <div className="glass-card p-5 border border-brand-500/10 shadow-md mb-12 bg-white dark:bg-neutral-900 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-foreground/45" />
              <input
                type="text"
                placeholder="Search articles, stretching guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2 text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Tag Filter Chips */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Tags:</span>
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-3 py-1.5 rounded-full text-4xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTag === "all"
                    ? "bg-brand-500 text-white shadow-sm"
                    : "border border-brand-500/10 text-foreground/75 hover:bg-brand-500/5"
                }`}
              >
                All tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-4xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-brand-500 text-white shadow-sm"
                      : "border border-brand-500/10 text-foreground/75 hover:bg-brand-500/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog posts grid list */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.length === 0 ? (
              <div className="col-span-3 text-xs text-foreground/45 text-center py-16">
                No matching physical therapy articles found. Check other tag categories.
              </div>
            ) : (
              filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="glass-card overflow-hidden flex flex-col justify-between border border-brand-500/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white dark:bg-neutral-900"
                >
                  <div className="flex flex-col">
                    {/* Thumbnail banner */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Content body */}
                    <div className="p-5 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5 text-4xs font-bold text-foreground/50">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-brand-500" />
                          <span>{post.readTime}</span>
                        </span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-foreground group-hover:text-brand-500 transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-4xs text-foreground/75 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Author row */}
                  <div className="px-5 pb-5 pt-3 border-t border-brand-500/5 bg-brand-50/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author_avatar}
                        alt={post.author}
                        className="h-6.5 w-6.5 rounded-full object-cover border border-brand-500/10"
                      />
                      <span className="text-[10px] text-foreground/70 font-semibold">{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      <span>Read Post</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

        </Container>
      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}
