import React from 'react';
import { FileText, Maximize2 } from 'lucide-react';
import Markdown from '@/components/markdown/Markdown';
import { TypingButton } from './TypingButton';

interface ICanvasPreviewCard {
  isProcessing: boolean;
  content: string;
  handleCanvasCardClick: () => void;
}

const CanvasPreviewCard: React.FC<ICanvasPreviewCard> = ({
  isProcessing,
  content,
  handleCanvasCardClick,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto ">
      <div className="rounded-xl bg-[#F3F1EE80] border border-primary-light shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#1B362F]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-white" />
            <span className="font-medium text-white">Canvas Report</span>
          </div>
          <button
            onClick={handleCanvasCardClick}
            className="p-1.5 hover:bg-[#D2D2D2] rounded transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          <div className="max-h-60 h-auto sm:px-5 px-3 sm:pt-6 pt-4 overflow-y-auto bg-[#E8E5D8]">
            <Markdown isProcessing={isProcessing} allowHtml={true}>
              {content}
            </Markdown>

            {isProcessing && (
              <div className="flex items-center justify-center">
                <TypingButton />
              </div>
            )}

            {/* Shadow overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPreviewCard;
