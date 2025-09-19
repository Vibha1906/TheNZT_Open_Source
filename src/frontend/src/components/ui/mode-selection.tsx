import { SearchMode } from '@/store/useZustandStore';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/custom-select';
import { cn } from '@/lib/utils';
import { Settings2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DropdownItem = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) => (
  <div
    className={cn(
      'flex w-full flex-col justify-center items-start px-3 py-2 cursor-pointer',
      className
    )}
  >
    <p className={cn('text-sm font-medium', titleClassName)}>{title}</p>
    <p className={cn('text-xs font-normal', subtitleClassName)}>{subtitle}</p>
  </div>
);

export const SettingsDropdown = ({
  value,
  onValueChange,
}: {
  value: SearchMode;
  onValueChange: (value: SearchMode) => void;
}) => {
  const handleValueChange = (newValue: SearchMode) => {
    onValueChange(newValue);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <div className="relative group">
        <SelectTrigger
          className={cn(
            'ring-0 focus:ring-0 focus:ring-offset-0',
            'border data-[state=closed]:border-border',
            'data-[state=open]:border-primary-main'
          )}
          aria-label="Select Model"
        >
          <Settings2 className="size-[1.125rem]" />
        </SelectTrigger>
        <div className="absolute z-10 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md -top-9 mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap shadow">
          Tools
        </div>
      </div>

      <SelectContent className="p-3 m-0 border-0 rounded-[0.675rem] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.06)] bg-[var(--primary-main-bg)]">
        <SelectItem
          value="fast"
          className={cn(
            'hover:bg-[var(--primary-chart-bg)]',
            value === 'fast' && 'bg-[rgba(127,178,157,0.16)]'
          )}
        >
          <DropdownItem
            title="Lite"
            subtitle="Rapid market response and action"
            titleClassName={value === 'fast' ? 'text-[#4B9770]' : 'text-[#373737]'}
            subtitleClassName={value === 'fast' ? 'text-black font-medium' : 'text-gray-500'}
          />
        </SelectItem>
        <SelectItem
          value="agentic-planner"
          className={cn(
            'hover:bg-[var(--primary-chart-bg)]',
            value === 'agentic-planner' && 'bg-[rgba(127,178,157,0.16)]'
          )}
        >
          <DropdownItem
            title="Core"
            subtitle="Strategic planning through agentic modeling"
            titleClassName={value === 'agentic-planner' ? 'text-[#4B9770]' : 'text-[#373737]'}
            subtitleClassName={
              value === 'agentic-planner' ? 'text-black font-medium' : 'text-gray-500'
            }
          />
        </SelectItem>
        <SelectItem
          value="agentic-reasoning"
          className={cn(
            'hover:bg-[var(--primary-chart-bg)]',
            value === 'agentic-reasoning' && 'bg-[rgba(127,178,157,0.16)]'
          )}
        >
          <DropdownItem
            title="Pro"
            subtitle="Deep reasoning and scenario simulation"
            titleClassName={value === 'agentic-reasoning' ? 'text-[#4B9770]' : 'text-[#373737]'}
            subtitleClassName={
              value === 'agentic-reasoning' ? 'text-black font-medium' : 'text-gray-500'
            }
          />
        </SelectItem>
        {/* <SelectItem
          value="deep-research"
          className={cn(
            'hover:bg-[var(--primary-chart-bg)]',
            value === 'deep-research' && 'bg-[rgba(127,178,157,0.16)]'
          )}
        >
          <DropdownItem
            title="Research"
            subtitle="In-depth research of markets, trends, and assets"
            // Use the variables for consistency
            titleClassName={value === 'deep-research' ? 'text-[#4B9770]' : 'text-[#373737]'}
            subtitleClassName={
              value === 'deep-research' ? 'text-black font-medium' : 'text-gray-500'
            }
          />
        </SelectItem> */}
      </SelectContent>
    </Select>
  );
};
