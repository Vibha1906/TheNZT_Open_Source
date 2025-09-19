import { sourcesData } from '@/app/(chats)/chat/component/SpecificChat';
import Image from 'next/image';
import React from 'react';

interface SourcesProps {
  data: sourcesData[];
  onHandleCitationData: (open: boolean) => void;
}
const Sources: React.FC<SourcesProps> = ({ data, onHandleCitationData }) => {
  const sourcesData =
    data.length > 5
      ? data.slice(0, 5)
      : data.length > 4
        ? data.slice(0, 4)
        : data.length > 3
          ? data.slice(0, 3)
          : data;
  const leftShownSources = data.length - sourcesData.length;
  return (
    <div
      onClick={() => onHandleCitationData(true)}
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-[var(--primary-main-bg)] px-4 py-2.5 text-base font-medium text-[#2E2E2E] border border-[rgba(16,40,34,0.05)]"
    >
      <h2>Sources:</h2>
      <div className="flex items-center -space-x-2">
        {sourcesData.map((source, index) => (
          <div key={index} className={`-ml-1 z-${index + 1}`}>
            <Image
              src={source.favicon}
              alt="logo"
              height={24}
              width={24}
              priority={true}
              className="rounded-full border-2 border-white bg-white"
            />
          </div>
        ))}
      </div>

      {leftShownSources > 0 && (
        <h2 className="text-xs font-normal text-[#818181]">+ {leftShownSources} more </h2>
      )}
    </div>
  );
};

export default Sources;
