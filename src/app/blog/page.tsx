
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Grid, Home, List, Rss, Search, Tag, Folder, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

const blogPosts = [
  {
    title: "Virtual Routing & Forwarding (VRF)",
    description: "Virtual Routing and Forwarding (VRF) adalah teknologi virtualisasi jaringan yang memungkinkan beberapa instance routing table terpisah berjalan di perangkat jaringan yang sama.",
    date: "2024-12-25",
    readTime: "6 minutes to read",
    author: "Muhamad Rafli Maulana Rizki",
    image: "https://picsum.photos/800/400?random=1",
    dataAiHint: "network virtualization",
    tags: ["Cisco", "Network", "VRF"],
    slug: "virtual-routing-forwarding-vrf"
  },
  {
    title: "My Home Lab Setup: A Network Engineer's Playground",
    description: "An inside look at my personal home lab, the hardware I use, and how I use Proxmox and Docker for virtualization and containerization.",
    date: "September 15, 2023",
    readTime: "8 minutes to read",
    author: "Muhamad Rafli Maulana Rizki",
    image: "https://picsum.photos/800/400?random=2",
    dataAiHint: "server rack",
    tags: ["Proxmox", "Docker", "Homelab"],
    slug: "my-home-lab-setup"
  },
  {
    title: "Securing Your Network with pfSense",
    description: "A step-by-step guide to setting up a powerful open-source firewall with pfSense to protect your home or small business network.",
    date: "August 02, 2023",
    readTime: "10 minutes to read",
    author: "Muhamad Rafli Maulana Rizki",
    image: "https://picsum.photos/800/400?random=3",
    dataAiHint: "firewall security",
    tags: ["pfSense", "Security", "Firewall"],
    slug: "securing-your-network-with-pfsense"
  },
  {
    title: "Qemu Guest Agent - Proxmox",
    description: "QEMU Guest Agent adalah program yang dijalankan di dalam Guest OS yang berjalan di bawah hypervisor QEMU/KVM. Fungsinya adalah untuk menyediakan berbagai informasi dan layanan terkait Guest OS kepada hypervisor atau manajemen Proxmox seperti menjalankan command pada guest. Di Proxmox VE, QEMU Guest Agent menyediakan fitur-fitur berikut: Monitoring Sistem: QE...",
    date: "July 20, 2023",
    readTime: "5 minutes to read",
    author: "Muhamad Rafli Maulana Rizki",
    image: "https://picsum.photos/800/400?random=4",
    dataAiHint: "virtual machine",
    tags: ["System", "Proxmox"],
    slug: "qemu-guest-agent-proxmox"
  },
  {
    title: "Postfix Send Email - Proxmox",
    description: "Postfix adalah suatu software open-source yang berfungsi sebagai MTA (Mail Transfer Agent) yang digunakan untuk mengirim, menerima, dan memfilter email, Cara Postfix berkomunikasi yakni menggunakan protocol SMTP. Postfix berguna untuk send email ke mail server, contoh seperti mail company, gmail ataupun lainnya. Setting Postfix Install dependencies apt updat...",
    date: "June 10, 2023",
    readTime: "7 minutes to read",
    author: "Muhamad Rafli Maulana Rizki",
    image: "https://picsum.photos/800/400?random=5",
    dataAiHint: "email server",
    tags: ["System", "Proxmox"],
    slug: "postfix-send-email-proxmox"
  }
];

const categories = ["System", "Pemrograman", "Syntax", "Themes", "VPN", "A Category with Slug"];
const allTags = ["Network", "Mikrotik", "Cisco", "Juniper", "Markdown", "Proxmox", "VRF", "Css", "CustomTag", "EIGRP"];


function BlogSearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.description.toLowerCase().includes(lowercasedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts(blogPosts);
    }
  }, [searchQuery]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const query = event.currentTarget.value;
      router.push(`/blog?q=${query}`);
    }
  };

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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
                <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                   <Link href={`/blog/${post.slug}`} className="block">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={400}
                        data-ai-hint={post.dataAiHint}
                        className="w-full h-auto object-cover"
                      />
                  </Link>
                  <CardContent className="p-6">
                    <h2 className="font-headline text-2xl font-bold mb-2">
                       <Link href={`/blog/${post.slug}`} className="hover:text-primary hover:underline">
                        {highlightText(post.title, searchQuery)}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{highlightText(post.description, searchQuery)}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary"># {tag}</Badge>)}
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

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
                <div className="relative">
                    <Input placeholder="Search..." className="pr-10" onKeyDown={handleSearch} defaultValue={searchQuery}/>
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-headline text-lg font-semibold mb-4 flex items-center gap-2"><Grid className="h-5 w-5 text-primary"/>Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => <Badge key={cat} variant="outline">{cat}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-headline text-lg font-semibold mb-4 flex items-center gap-2"><Tag className="h-5 w-5 text-primary"/>Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            </aside>
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


export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogSearchComponent />
        </Suspense>
    )
}
