
'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const postsData: { [key: string]: any } = {
    'virtual-routing-forwarding-vrf': {
        title: "Virtual Routing & Forwarding (VRF) - Lab",
        description: "Virtual Routing and Forwarding (VRF) adalah teknologi virtualisasi jaringan yang memungkinkan beberapa instance routing table terpisah berjalan di perangkat jaringan yang sama.",
        date: "2024-12-25",
        readTime: "8 minutes to read",
        author: "Muhamad Rafli Maulana Rizki",
        tags: ["Cisco", "Network", "VRF"],
        image: "https://picsum.photos/1200/400?random=1",
        dataAiHint: "network router"
    },
    'my-home-lab-setup': {
        title: "My Home Lab Setup: A Network Engineer's Playground",
        description: "An inside look at my personal home lab, the hardware I use, and how I use Proxmox and Docker for virtualization and containerization.",
        date: "September 15, 2023",
        readTime: "8 minutes to read",
        author: "Muhamad Rafli Maulana Rizki",
        tags: ["Proxmox", "Docker", "Homelab"],
        image: "https://picsum.photos/1200/400?random=2",
        dataAiHint: "server rack"
    },
    'securing-your-network-with-pfsense': {
        title: "Securing Your Network with pfSense",
        description: "A step-by-step guide to setting up a powerful open-source firewall with pfSense to protect your home or small business network.",
        date: "August 02, 2023",
        readTime: "10 minutes to read",
        author: "Muhamad Rafli Maulana Rizki",
        tags: ["pfSense", "Security", "Firewall"],
        image: "https://picsum.photos/1200/400?random=3",
        dataAiHint: "firewall security"
    },
    'qemu-guest-agent-proxmox': {
        title: "Qemu Guest Agent - Proxmox",
        description: "QEMU Guest Agent adalah program yang dijalankan di dalam Guest OS yang berjalan di bawah hypervisor QEMU/KVM...",
        date: "July 20, 2023",
        readTime: "5 minutes to read",
        author: "Muhamad Rafli Maulana Rizki",
        tags: ["System", "Proxmox"],
        image: "https://picsum.photos/1200/400?random=4",
        dataAiHint: "virtual machine"
    },
    'postfix-send-email-proxmox': {
        title: "Postfix Send Email - Proxmox",
        description: "Postfix adalah suatu software open-source yang berfungsi sebagai MTA (Mail Transfer Agent) yang digunakan untuk mengirim, menerima, dan memfilter email...",
        date: "June 10, 2023",
        readTime: "7 minutes to read",
        author: "Muhamad Rafli Maulana Rizki",
        tags: ["System", "Proxmox"],
        image: "https://picsum.photos/1200/400?random=5",
        dataAiHint: "email server"
    }
};

const getPostData = (slug: string) => {
    return postsData[slug] || null;
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostData(params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <article className="prose dark:prose-invert prose-lg max-w-none">
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
                    {post.tags.map(tag => <Badge key={tag} variant="secondary"># {tag}</Badge>)}
                </div>

                <Card className="mb-12">
                    <CardContent className="p-6">
                        <h2 className="font-headline text-2xl font-semibold mb-4">Table of Contents</h2>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>
                                <a href="#lab1" className="hover:text-primary hover:underline">Lab#1 - VRF Local</a>
                                <ul className="pl-6 mt-2 space-y-1 list-['-_'] list-inside">
                                    <li><a href="#lab1-config" className="hover:text-primary hover:underline">Configuration</a></li>
                                    <li><a href="#lab1-results" className="hover:text-primary hover:underline">Check the results</a></li>
                                </ul>
                            </li>
                            <li>
                               <a href="#lab2" className="hover:text-primary hover:underline">Lab#2 - VRF + OSPF</a>
                                <ul className="pl-6 mt-2 space-y-1 list-['-_'] list-inside">
                                    <li><a href="#lab2-config" className="hover:text-primary hover:underline">Configuration</a></li>
                                    <li><a href="#lab2-results" className="hover:text-primary hover:underline">Check the results</a></li>
                                </ul>
                            </li>
                        </ul>
                    </CardContent>
                </Card>


                <div id="lab1" className="scroll-mt-20">
                    <h2 className="font-headline text-3xl font-bold mt-12 mb-4">Lab#1 - VRF Local</h2>
                    <Image
                        src="https://placehold.co/800x400/27272a/e5e5e5?text=Network+Diagram"
                        alt="Network Diagram for VRF Local Lab"
                        width={800}
                        height={400}
                        data-ai-hint="network diagram"
                        className="w-full rounded-lg shadow-md my-6"
                    />
                    <p>Pada lab kali ini akan melakukan konfigurasi VRF Local dengan membuat dua VRF instance yang berbeda:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>VRF net1 yang terhubung ke interface Ethernet0/0 dan Ethernet0/2</li>
                        <li>VRF net2 yang terhubung ke interface Ethernet0/1 dan Ethernet0/3</li>
                    </ul>
                </div>

                <div id="lab1-config" className="scroll-mt-20">
                    <h3 className="font-headline text-2xl font-bold mt-8 mb-4">Configuration</h3>
                    <p>Here you would put the configuration details for the lab.</p>
                </div>
                
                 <div id="lab1-results" className="scroll-mt-20">
                    <h3 className="font-headline text-2xl font-bold mt-8 mb-4">Check the results</h3>
                    <p>Here you would show how to check the results.</p>
                </div>

                 <div id="lab2" className="scroll-mt-20">
                    <h2 className="font-headline text-3xl font-bold mt-12 mb-4">Lab#2 - VRF + OSPF</h2>
                     <p>Content for the second lab would go here.</p>
                </div>
                 <div id="lab2-config" className="scroll-mt-20">
                    <h3 className="font-headline text-2xl font-bold mt-8 mb-4">Configuration</h3>
                     <p>Configuration for the second lab.</p>
                </div>
                 <div id="lab2-results" className="scroll-mt-20">
                    <h3 className="font-headline text-2xl font-bold mt-8 mb-4">Check the results</h3>
                     <p>Results for the second lab.</p>
                </div>


            </article>
        </main>
    );
}
