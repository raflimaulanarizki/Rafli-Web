
'use client';

import React, { useState, useRef, useEffect, Children } from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

const CopyButton = ({ code }: { code: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            aria-label="Copy code"
        >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
        </Button>
    );
};

export const CodeBlockWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [preElements, setPreElements] = useState<HTMLElement[]>([]);

    useEffect(() => {
        if (ref.current) {
            const pres = Array.from(ref.current.querySelectorAll('pre'));
            setPreElements(pres);
            pres.forEach(pre => {
                if (!pre.classList.contains('relative')) {
                    pre.classList.add('relative', 'group');
                }
            });
        }
    }, [children]);

    return (
        <div ref={ref}>
            {children}
            {preElements.map((pre, index) => {
                const code = pre.querySelector('code')?.innerText || '';
                return createPortal(<CopyButton code={code} />, pre, `copy-button-${index}`);
            })}
        </div>
    );
};
