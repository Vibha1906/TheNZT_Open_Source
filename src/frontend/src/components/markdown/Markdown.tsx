import { cn } from '@/lib/utils';
import { omit } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'unified';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { visit } from 'unist-util-visit';
import { Download } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import CodeSnippet from './CodeSnippet';
import BlinkingCursor from './BlinkingCursor';
import { MarkdownAlert, alertComponents } from './MarkdownAlert';
import Image from 'next/image';
import CustomTable from './CustomTable';
import { toast } from 'sonner';
import GraphRenderer from './GraphRenderer';

interface Props {
  allowHtml?: boolean;
  latex?: boolean;
  children: string;
  isProcessing: boolean;
  className?: string;
}

const cursorPlugin = () => {
  return (tree: any) => {
    visit(tree, 'text', (node: any, index, parent) => {
      const placeholderPattern = /\u200B/g;
      const matches = [...(node.value?.matchAll(placeholderPattern) || [])];

      if (matches.length > 0) {
        const newNodes: any[] = [];
        let lastIndex = 0;

        matches.forEach((match) => {
          const [fullMatch] = match;
          const startIndex = match.index!;
          const endIndex = startIndex + fullMatch.length;

          if (startIndex > lastIndex) {
            newNodes.push({
              type: 'text',
              value: node.value!.slice(lastIndex, startIndex),
            });
          }

          newNodes.push({
            type: 'blinkingCursor',
            data: {
              hName: 'blinkingCursor',
              hProperties: { text: 'Blinking Cursor' },
            },
          });

          lastIndex = endIndex;
        });

        if (lastIndex < node.value!.length) {
          newNodes.push({
            type: 'text',
            value: node.value!.slice(lastIndex),
          });
        }

        parent!.children.splice(index, 1, ...newNodes);
      }
    });
  };
};

const Markdown = ({ allowHtml, latex, className, children, isProcessing }: Props) => {
  // Clean up the markdown content before processing
  const cleanedContent = useMemo(() => {
    if (!children) return '';

    return (
      children
        // Fix bold markers with line breaks
        // .replace(/\*\*\s*\n\s*/g, '** ')
        // .replace(/\s*\n\s*\*\*/g, ' **')
        // Fix italic markers with line breaks
        // .replace(/\*\s*\n\s*/g, '*')
        // .replace(/\s*\n\s*\*/g, '*')
        // Fix table formatting
        // .replace(/\|\s*\n\s*/g, '| ')
        // .replace(/\s*\n\s*\|/g, ' |')
        // Normalize line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Remove trailing spaces
        .replace(/[ \t]+$/gm, '')
    );
  }, [children]);

  const rehypePlugins = useMemo(() => {
    let rehypePlugins: PluggableList = [];
    if (allowHtml) {
      rehypePlugins = [rehypeRaw as any, ...rehypePlugins];
    }
    if (latex) {
      rehypePlugins = [[rehypeKatex as any, { strict: false }], ...rehypePlugins];
    }
    return rehypePlugins;
  }, [allowHtml, latex]);

  const remarkPlugins = useMemo(() => {
    let remarkPlugins: PluggableList = [
      // markdownCleanupPlugin, // Add cleanup plugin first
      cursorPlugin,
      remarkGfm as any,
      remarkDirective as any,
      MarkdownAlert,
    ];

    if (latex) {
      remarkPlugins = [...remarkPlugins, remarkMath as any];
    }
    return remarkPlugins;
  }, [latex]);

  return (
    <div className={cn('self-stretch text-sm font-normal leading-6 text-[#2E2E2E]', className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          ...alertComponents,
          code(props) {
            console.log('props', props);
            return (
              <code
                {...omit(props, ['node'])}
                className="relative rounded px-[0.3rem] py-[0.2rem] text-sm font-semibold bg-[#CDDCC4] text-[#181818] italic "
              />
            );
          },

          // Fixed pre component
          pre({ children, ...props }: any) {
            const [content, setContent] = useState('');
            const [isReady, setIsReady] = useState(false);

            // detect code‑blocks marked “language-graph”
            const isGraphBlock =
              children &&
              typeof children === 'object' &&
              children.props?.className?.includes('language-graph');

            const getContent = (node: any): string => {
              if (typeof node === 'string') return node;
              if (node?.props?.children) return getContent(node.props.children);
              return '';
            };

            useEffect(() => {
              if (!isGraphBlock) return;

              const raw = getContent(children);
              console.log(children?.props?.children, 'children');
              // do the sentinel check
              if (raw.includes('<END_OF_GRAPH>') && !isProcessing) {
                // strip the sentinel off and trim
                const jsonText = raw.replace('<END_OF_GRAPH>', '').trim();
                setContent(jsonText);
                setIsReady(true);
              } else {
                // still streaming…
                setIsReady(false);
              }
            }, [children, isGraphBlock, isProcessing]);

            if (!isGraphBlock) {
              return <CodeSnippet {...props}>{children}</CodeSnippet>;
            }

            if (!isReady) {
              return (
                <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                    <span className="text-sm text-gray-600">Loading graph…</span>
                  </div>
                  <pre className="text-xs text-gray-500 overflow-hidden max-h-20">
                    <code>{content}</code>
                  </pre>
                </div>
              );
            }

            // when valid JSON is in `content`, render
            try {
              return <GraphRenderer codeContent={content} />;
            } catch (err) {
              return (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
                  <div className="text-red-600 text-sm mb-2">Error rendering graph</div>
                  <pre className="text-xs text-gray-500 max-h-20 overflow-auto">
                    <code>{content}</code>
                  </pre>
                </div>
              );
            }
          },

          a({ children, ...props }) {
            return (
              <a
                {...props}
                className="w-fit inline-block group"
                target="_blank"
                rel="noopener noreferrer"
                title={props.href}
              >
                <div className="border border-[#DDDAC9] text-[#A7A7A7] hover:text-gray-500 rounded-[60px] text-[10px] px-2 py-0.5 opacity-90 hover:opacity-100 flex items-center w-fit transition-all duration-200">
                  <span className="text-xs font-medium text-[#000000]">{children}</span>
                </div>
              </a>
            );
          },
          iframe: ({ src, title, width, height, ...props }: any) => {
            return (
              <div className="my-4 w-full relative overflow-hidden">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-md h-auto sm:min-height-0 min-height-[50dvh]"
                >
                  <iframe
                    src={src.startsWith('public') ? `${BASE_URL}/${src}` : src}
                    title={title || 'Embedded content'}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="h-full w-full border-none responsive-zoom"
                    {...omit(props, ['node'])}
                  />
                </AspectRatio>
              </div>
            );
          },
          img: (image: any) => {
            if (image.src !== '') {
              const handleDownload = async () => {
                try {
                  const imgSrc = image.src.startsWith('public')
                    ? new URL(image.src, BASE_URL).href
                    : image.src;

                  const response = await fetch(imgSrc, { mode: 'cors' });

                  if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = image.alt || 'image';
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                } catch (error) {
                  console.error('Error downloading image:', error);
                  toast.error('Failed to download image. Please check the image URL.');
                }
              };

              return (
                <div className="flex items-center justify-center sm:max-w-sm md:max-w-md relative">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <img
                      src={image.src.startsWith('public') ? `${BASE_URL}/${image.src}` : image.src}
                      alt={image.alt}
                      className="h-full w-full object-contain"
                    />
                  </AspectRatio>
                  <button
                    onClick={handleDownload}
                    className="mt-2 bg-white text-black py-1.5 gap-x-1 px-[0.935rem] rounded-md flex items-center shadow-[0_0_6px_rgba(0,0,0,0.2)]"
                  >
                    <Download className="text-black size-3.5" />
                    <span className="ml-2 text-xs">Download</span>
                  </button>
                </div>
              );
            }
          },
          blockquote(props) {
            return (
              <blockquote {...omit(props, ['node'])} className="mt-6 border-l-2 pl-6 italic" />
            );
          },
          em(props) {
            return <span {...omit(props, ['node'])} className="italic" />;
          },
          strong(props) {
            return <span {...omit(props, ['node'])} className="font-semibold text-[#0A0A0A]" />;
          },
          hr() {
            return <Separator />;
          },
          ul(props): any {
            return (
              <ul {...omit(props, ['node'])} className="my-3 ml-3 list-disc pl-2 [&>li]:mt-2" />
            );
          },
          ol(props) {
            return (
              <ol {...omit(props, ['node'])} className="my-3 ml-3 list-decimal pl-2 [&>li]:mt-2" />
            );
          },
          h1(props) {
            return (
              <h1
                {...omit(props, ['node'])}
                className="scroll-m-20 text-3xl font-extrabold tracking-tight mt-8 first:mt-0"
              />
            );
          },
          h2(props) {
            return (
              <h2
                {...omit(props, ['node'])}
                className="scroll-m-20 border-b border-[#E9E5D2] pb-2 text-2xl font-semibold tracking-tight mt-8 first:mt-0"
              />
            );
          },
          h3(props) {
            return (
              <h3
                {...omit(props, ['node'])}
                className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 first:mt-0"
              />
            );
          },
          h4(props) {
            return (
              <h4
                {...omit(props, ['node'])}
                className="scroll-m-20 text-base font-semibold tracking-tight mt-6 first:mt-0"
              />
            );
          },
          p(props) {
            return (
              <div
                {...omit(props, ['node'])}
                className="text-[#0A0A0A] [&:not(:first-child)]:mt-4"
                role="article"
              />
            );
          },
          table({ children }) {
            return <CustomTable children={children} />;
          },
          thead({ children, ...props }) {
            return (
              <TableHeader {...(props as any)} className="bg-[#F3F1EE]">
                {children}
              </TableHeader>
            );
          },
          tr({ children, ...props }) {
            return (
              <TableRow className="" {...(props as any)}>
                {children}
              </TableRow>
            );
          },
          th({ children, ...props }) {
            return (
              <TableHead
                className="border-l border-r px-2.5 border-[#D2D2D2] first:border-l-0 last:border-r-0"
                {...(props as any)}
              >
                {children}
              </TableHead>
            );
          },
          td({ children, ...props }) {
            return (
              <TableCell
                className="border-l border-r px-2.5 border-[#E8E3D1] first:border-l-0 last:border-r-0"
                {...(props as any)}
              >
                {children}
              </TableCell>
            );
          },
          tbody({ children, ...props }) {
            return <TableBody {...(props as any)}>{children}</TableBody>;
          },
          // @ts-expect-error custom plugin
          blinkingCursor: () => <BlinkingCursor whitespace />,
        }}
      >
        {cleanedContent}
      </ReactMarkdown>
    </div>
  );
};

export default React.memo(Markdown);
