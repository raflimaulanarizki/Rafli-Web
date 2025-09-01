
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const blogPosts = [
  {
    title: "Understanding BGP in Modern Networks",
    description: "A deep dive into the Border Gateway Protocol, its importance, and common configuration scenarios in today's internet infrastructure.",
    date: "October 26, 2023",
    image: "https://picsum.photos/600/400?random=1",
    dataAiHint: "network protocol",
    link: "#"
  },
  {
    title: "My Home Lab Setup: A Network Engineer's Playground",
    description: "An inside look at my personal home lab, the hardware I use, and how I use Proxmox and Docker for virtualization and containerization.",
    date: "September 15, 2023",
    image: "https://picsum.photos/600/400?random=2",
    dataAiHint: "server rack",
    link: "#"
  },
  {
    title: "Securing Your Network with pfSense",
    description: "A step-by-step guide to setting up a powerful open-source firewall with pfSense to protect your home or small business network.",
    date: "August 02, 2023",
    image: "https://picsum.photos/600/400?random=3",
    dataAiHint: "firewall security",
    link: "#"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <main className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              My Blog
            </h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground">
              Thoughts and tutorials on networking, system administration, and more.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to CV
            </Link>
          </Button>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href={post.link} className="block">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  data-ai-hint={post.dataAiHint}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  <Link href={post.link} className="hover:text-primary hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={post.link}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
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
