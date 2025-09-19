'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  content: unknown;
  className?: string;
  strokeWidth?: number;
  id?: string;
}

const CopyButton = ({ content, className = '', strokeWidth = 1.5, id }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const resetCopied = () => setTimeout(() => setCopied(false), 2000);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (copied) return;

    try {
      if (id) {
        const container = document.getElementById(id);
        if (!container) return;

        const nodes = container.querySelectorAll('.message-response');
        if (!nodes.length) {
          toast.error('No content to copy');
          return;
        }

        // Generate the HTML content
        const getFilteredHTML = () =>
          Array.from(nodes)
            .map((node) => {
              const clone = node.cloneNode(true) as HTMLElement;
              clone.querySelectorAll('.download-excel').forEach((el) => el.remove());
              return clone.outerHTML;
            })
            .join('\n');

        // Generate plain text using innerText (no Markdown, no HTML)
        const getPlainText = () =>
          Array.from(nodes)
            .map((node) => {
              const clone = node.cloneNode(true) as HTMLElement;
              clone.querySelectorAll('.download-excel').forEach((el) => el.remove());
              return clone.innerText.trim();
            })
            .join('\n\n');

        const htmlContent = getFilteredHTML();
        const plainText = getPlainText();

        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([htmlContent], { type: 'text/html' }),
              'text/plain': new Blob([plainText], { type: 'text/plain' }),
            }),
          ]);
        } else {
          await navigator.clipboard.writeText(plainText);
        }

        toast.success('Copied to clipboard');
        setCopied(true);
        resetCopied();
        console.log('[CopyButton] HTML + plain text copied to clipboard');
      } else {
        // Fallback: Copy text from `content` prop
        const text =
          typeof content === 'object' && content !== null
            ? JSON.stringify(content, null, 2)
            : String(content ?? '');

        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
        setCopied(true);
        resetCopied();
        console.log('[CopyButton] Fallback text copied to clipboard');
      }
    } catch (error) {
      console.error('[CopyButton] Copy failed', error);
      toast.error('Failed to copy');
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="icon"
            className={`text-muted-foreground ${className}`}
            aria-label="Copy content"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={strokeWidth} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied' : 'Copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
