import React, { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FileDown } from 'lucide-react';
import { VscFilePdf } from 'react-icons/vsc';
import { PiMarkdownLogo } from 'react-icons/pi';
import { BsFiletypeDocx } from 'react-icons/bs';

// Define the available file formats
export type FileFormat = 'pdf' | 'md' | 'docx';

// Define the props interface
interface DownloadDropdownProps {
  icon?: ReactNode;
  onDownload: (format: FileFormat) => void;
  className?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
  tooltipText?: string;
  disabled?: boolean;
  formats?: FileFormat[];
}

// Format configuration for extensibility
const formatConfig: Record<FileFormat, { icon: React.ComponentType; label: string }> = {
  pdf: { icon: VscFilePdf, label: 'PDF' },
  md: { icon: PiMarkdownLogo, label: 'Markdown' },
  docx: { icon: BsFiletypeDocx, label: 'DOCX' },
};

export const DownloadDropdown: React.FC<DownloadDropdownProps> = ({
  onDownload,
  icon,
  className = '',
  iconSize = 20,
  iconStrokeWidth = 1.5,
  tooltipText = 'Download',
  disabled = false,
  formats = ['pdf', 'md', 'docx'], // Default to all formats
}) => {
  const handleDownload = (format: FileFormat) => {
    if (!disabled) {
      onDownload(format);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="z-[500]" asChild>
              {icon ? (
                icon
              ) : (
                <FileDown
                  strokeWidth={iconStrokeWidth}
                  className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ width: iconSize, height: iconSize }}
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        {formats.map((format) => {
          const { icon: Icon, label } = formatConfig[format];
          return (
            <DropdownMenuItem
              key={format}
              onClick={() => handleDownload(format)}
              className="flex gap-x-1.5 items-center cursor-pointer"
              disabled={disabled}
            >
              <Icon /> {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
