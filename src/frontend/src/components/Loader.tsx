import { Loader } from 'lucide-react';

const LoaderComponent = ({ height, isSidebar }: { height?: number; isSidebar?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center w-full pointer-events-none h-screen ${
        !isSidebar ? 'bg-[var(--primary-main-bg)]' : ''
      }`}
      style={height ? { height } : {}}
    >
      <div className="">
        <Loader className="size-8 animate-spin text-[#4B9770]" />
      </div>
    </div>
  );
};

export default LoaderComponent;
