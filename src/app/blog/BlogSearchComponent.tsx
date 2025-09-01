
'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Grid, Home, List, Rss, Search, Tag, Folder, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = ["System", "Pemrograman", "Syntax", "Themes", "VPN", "A Category with Slug", "Cisco", "Proxmox", "pfSense"];
const allTags = ["Network", "Mikrotik", "Cisco", "Juniper", "Markdown", "Proxmox", "VRF", "Css", "CustomTag", "EIGRP", "Docker", "Homelab", "pfSense", "Security", "Firewall", "System"];

export default function BlogSearchComponent({ initialPosts }: { initialPosts: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category');
  const tagQuery = searchParams.get('tag');

  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    let results = initialPosts;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.description.toLowerCase().includes(lowercasedQuery) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(lowercasedQuery))
      );
    }

    if(categoryQuery) {
      results = results.filter(post => post.tags.map((t: string) => t.toLowerCase()).includes(categoryQuery.toLowerCase()));
    }
    
    if(tagQuery) {
      results = results.filter(post => post.tags.map((t: string) => t.toLowerCase()).includes(tagQuery.toLowerCase()));
    }

    setFilteredPosts(results);
  }, [searchQuery, categoryQuery, tagQuery, initialPosts]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const query = event.currentTarget.value;
      router.push(query ? `/blog?q=${query}` : '/blog');
    }
  };
  
  const createFilterURL = (type: 'category' | 'tag', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const lowercasedValue = value.toLowerCase();

    const currentCategory = params.get('category');
    const currentTag = params.get('tag');

    if (type === 'category') {
      if (currentCategory?.toLowerCase() === lowercasedValue) {
        params.delete('category');
      } else {
        params.set('category', value);
      }
    } else if (type === 'tag') {
       if (currentTag?.toLowerCase() === lowercasedValue) {
        params.delete('tag');
      } else {
        params.set('tag', value);
      }
    }
    
    const newQuery = params.toString();
    return newQuery ? `/blog?${newQuery}` : '/blog';
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-primary/80 text-primary-foreground p-1 rounded-md">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
         <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              My Blog
            </h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground">
              Thoughts and tutorials on networking, system administration, and more.
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8 lg:order-2">
                <div className="relative">
                    <Input placeholder="Search..." className="pr-10" onKeyDown={handleSearch} defaultValue={searchQuery}/>
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                {categories && categories.length > 0 && (
                  <Card>
                      <CardContent className="p-6">
                          <h3 className="font-headline text-lg font-semibold mb-4 flex items-center gap-2"><Grid className="h-5 w-5 text-primary"/>Categories</h3>
                          <div className="flex flex-wrap gap-2">
                              {categories.map(cat => (
                                 <Link key={cat} href={createFilterURL('category', cat)} passHref>
                                  <Badge 
                                    variant={categoryQuery?.toLowerCase() === cat.toLowerCase() ? "default" : "outline"}
                                    className="cursor-pointer"
                                  >
                                    {cat}
                                  </Badge>
                                </Link>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
                )}
                
                {allTags && allTags.length > 0 && (
                  <Card>
                      <CardContent className="p-6">
                          <h3 className="font-headline text-lg font-semibold mb-4 flex items-center gap-2"><Tag className="h-5 w-5 text-primary"/>Tags</h3>
                          <div className="flex flex-wrap gap-2">
                              {allTags.map(tag => (
                                 <Link key={tag} href={createFilterURL('tag', tag)} passHref>
                                  <Badge 
                                    variant={tagQuery?.toLowerCase() === tag.toLowerCase() ? "default" : "outline"}
                                    className="cursor-pointer"
                                  >
                                    {tag}
                                  </Badge>
                                </Link>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
                )}
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 lg:order-1">
              {filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
                <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                   <Link href={`/blog/${post.id}`} className="block">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={400}
                        data-ai-hint={post.dataAiHint}
                        className="w-full h-auto object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                  </Link>
                  <CardContent className="p-6">
                    <h2 className="font-headline text-2xl font-bold mb-2">
                       <Link href={`/blog/${post.id}`} className="hover:text-primary hover:underline">
                        {highlightText(post.title, searchQuery)}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{highlightText(post.description, searchQuery)}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: string) => (
                         <Link key={tag} href={createFilterURL('tag', tag)} passHref>
                          <Badge 
                            variant={tagQuery?.toLowerCase() === tag.toLowerCase() ? "default" : "secondary"}
                            className="cursor-pointer"
                          >
                            # {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <p>No posts found for your search.</p>
              )}
            </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-border/50 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Muhamad Rafli Maulana Rizki. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
