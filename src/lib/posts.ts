import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
    id: string;
    [key: string]: any;
    contentHtml: string;
    toc: TocEntry[];
    readTime: string;
}

export interface TocEntry {
    label: string;
    href: string;
    level: number;
    children?: TocEntry[];
}

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return `${readTimeMinutes} minutes to read`;
}

function generateToc(content: string): TocEntry[] {
    const toc: TocEntry[] = [];
    const tree = remark().parse(content);

    visit(tree, 'heading', (node) => {
        if (node.depth === 2 || node.depth === 3) { // h2 and h3
            const text = node.children.map((child: any) => child.value).join('');
            const href = `#${slug(text)}`;
            const entry: TocEntry = { label: text, href, level: node.depth };

            if (node.depth === 2) {
                toc.push({ ...entry, children: [] });
            } else if (node.depth === 3 && toc.length > 0) {
                const parent = toc[toc.length - 1];
                if (parent.level === 2) {
                     parent.children?.push(entry);
                }
            }
        }
    });

    return toc;
}


export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const readTime = calculateReadTime(matterResult.content);

    return {
      id,
      readTime,
      ...matterResult.data
    };
  });

  return allPostsData.sort((a:any, b:any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getPostData(slugId: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slugId}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const readTime = calculateReadTime(matterResult.content);
  const toc = generateToc(matterResult.content);

  return {
    id: slugId,
    contentHtml,
    readTime,
toc,
    ...matterResult.data,
  };
}