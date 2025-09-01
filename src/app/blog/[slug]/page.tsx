
import { getPostData, getAllPostIds, TocEntry } from '@/lib/posts';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React, { createElement, Fragment } from "react";
import { notFound } from 'next/navigation';
import { CodeBlockWrapper } from '@/components/ui/code-block';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

const renderToc = (items: TocEntry[]) => {
    if (!items || items.length === 0) return null;

    const createList = (items: TocEntry[], level: number) => {
        const filteredItems = items.filter(item => item.level === level);
        if (filteredItems.length === 0) return null;

        return (
            <ul className={level === 2 ? "space-y-2 list-disc list-inside" : "pl-6 mt-2 space-y-1 list-['-_'] list-inside"}>
                {filteredItems.map(item => (
                    <li key={item.href}>
                        <a href={item.href} className="hover:text-primary hover:underline">{item.label}</a>
                        {item.children && item.children.length > 0 && createList(item.children, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };
    
    return createList(items, 2);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    let post;
    try {
        post = await getPostData(params.slug);
    } catch (error) {
        notFound();
    }
    
    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <article className="prose dark:prose-invert max-w-none">
                <div className="mb-8">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={400}
                        data-ai-hint={post.dataAiHint}
                        className="w-full rounded-lg shadow-lg object-cover"
                    />
                </div>

                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{post.title}</h1>
                
                <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-8 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4"/>
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4"/>
                        <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4"/>
                        <span>{post.author}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag: string) => (
                        <Link key={tag} href={`/blog?tag=${tag}`} passHref>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-primary/80"># {tag}</Badge>
                        </Link>
                    ))}
                </div>

                {post.toc && post.toc.length > 0 && (
                    <Card className="mb-12 not-prose">
                        <CardContent className="p-6">
                            <h2 className="font-headline text-2xl font-semibold mb-4 mt-0">Table of Contents</h2>
                            {renderToc(post.toc)}
                        </CardContent>
                    </Card>
                )}

                 <CodeBlockWrapper>
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </CodeBlockWrapper>
            </article>
        </main>
    );
}
