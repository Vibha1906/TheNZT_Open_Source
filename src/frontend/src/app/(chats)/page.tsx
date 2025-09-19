import ChatArea from '@/components/chat/ChatArea';
import { Suspense } from 'react';

const Page = () => {
  return (
    <>
      <Suspense>
        <ChatArea />
      </Suspense>
    </>
  );
};

export default Page;
