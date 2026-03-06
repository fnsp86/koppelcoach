import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { POSTS, getPostBySlug } from "@/lib/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

function markdownToHtml(md: string): string {
  return md
    .trim()
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("### "))
        return `<h3>${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("## "))
        return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# "))
        return `<h2>${trimmed.slice(2)}</h2>`;
      if (trimmed.match(/^\d+\.\s\*\*/))
        return `<ol>${trimmed
          .split("\n")
          .map((line) => `<li>${line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`)
          .join("")}</ol>`;
      if (trimmed.startsWith("- "))
        return `<ul>${trimmed
          .split("\n")
          .map((line) => `<li>${line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`)
          .join("")}</ul>`;
      return `<p>${trimmed
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-leisteen hover:text-nachtblauw transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Alle artikelen
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-leisteen mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw leading-tight">
          {post.title}
        </h1>
      </header>

      <div
        className="prose prose-sm sm:prose max-w-none text-leisteen [&_h2]:text-nachtblauw [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-nachtblauw [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
      />

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-zand">
          <h2 className="text-xl font-bold text-nachtblauw mb-6">
            Lees ook
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-zand bg-warmwit p-4 transition-all hover:shadow-md"
              >
                <h3 className="text-sm font-bold text-nachtblauw mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta mt-2">
                  Lees meer <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "Samen App",
              url: "https://samenapp.nl",
            },
            publisher: {
              "@type": "Organization",
              name: "Samen App",
              url: "https://samenapp.nl",
            },
          }),
        }}
      />
    </article>
  );
}
