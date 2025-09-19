import React, { Suspense } from 'react';
import SpecificChat from './component/SpecificChat';

const Chat = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex gap-x-1 items-center justify-center bg-[var(--primary-main-bg)]">
          <p className="text-xl text-[#4B9770]">Loading...</p>
        </div>
      }
    >
      <SpecificChat />
    </Suspense>
  );
};

export default Chat;
