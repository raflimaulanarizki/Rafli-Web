
import { getSortedPostsData } from '@/lib/posts';
import BlogSearchComponent from "./BlogSearchComponent";
import { Suspense } from 'react';


// This is now a Server Component
export default function BlogPage() {
    const allPostsData = getSortedPostsData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogSearchComponent initialPosts={allPostsData} />
        </Suspense>
    )
}
