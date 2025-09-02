
'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const Giscus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === 'dark' ? 'dark_dimmed' : 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', 'raflimaulanarizki/Rafli-Web');
    script.setAttribute('data-repo-id', 'R_kgDOPn7ciw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOPn7ci84Cu3UE');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-lang', 'id');
    script.setAttribute('data-theme', theme);

    ref.current.appendChild(script);
  }, [theme]);

  return <section ref={ref} />;
};

export default Giscus;
