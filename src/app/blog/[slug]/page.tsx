
import { getPostData, getAllPostIds, TocEntry } from '@/lib/posts';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
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
    const slug = params.slug;
    let post;
    try {
        post = await getPostData(slug);
    } catch (error) {
        notFound();
    }
    
    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <Card>
                <div className="mb-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={400}
                        data-ai-hint={post.dataAiHint}
                        className="w-full rounded-t-lg shadow-lg object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    />
                </div>
                <CardContent className="p-6 md:p-8">
                    <article className="prose dark:prose-invert max-w-none">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 mt-0">{post.title}</h1>
                        
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
                            <Card className="mb-12 not-prose bg-background/50">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl font-semibold mb-0 mt-0">Table of Contents</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0">
                                    {renderToc(post.toc)}
                                </CardContent>
                            </Card>
                        )}

                        <CodeBlockWrapper>
                            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                        </CodeBlockWrapper>
                    </article>
                </CardContent>
            </Card>
        </main>
    );
}
