import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Relatie tips en advies voor koppels",
  description:
    "Artikelen over relaties, communicatie, date-ideeen en meer. Praktische tips om jullie relatie te versterken.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4">
          Blog
        </h1>
        <p className="text-base text-leisteen max-w-lg mx-auto">
          Praktische tips en inzichten om jullie relatie te versterken. Van
          communicatie tot date-ideeen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-zand bg-warmwit p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 text-xs text-leisteen mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
            <h2 className="text-lg font-bold text-nachtblauw mb-2 group-hover:text-terracotta transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-leisteen leading-relaxed mb-4">
              {post.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-terracotta group-hover:gap-2 transition-all">
              Lees meer <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
