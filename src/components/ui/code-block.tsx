
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';

export function CodeBlock({ children }: { children: React.ReactNode }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const getCodeContent = () => {
        if (preRef.current) {
            const codeElement = preRef.current.querySelector('code');
            return codeElement ? codeElement.innerText : '';
        }
        return '';
    };

    const handleCopy = () => {
        const code = getCodeContent();
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="relative group">
            <pre ref={preRef} className="not-prose">
                {children}
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                aria-label="Copy code"
            >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
            </Button>
        </div>
    );
}
