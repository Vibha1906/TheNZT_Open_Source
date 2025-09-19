'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Button from '@/app/(dashboard)/components/Button';
import { toast } from 'sonner';
import ApiServices from '@/services/ApiServices';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface IChatSharingDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  type?: string;
  messageId?: string;
}

export const ChatSharingDialog: React.FC<IChatSharingDialog> = ({
  open,
  onOpenChange,
  sessionId,
  type,
  messageId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sharedChatUrl, setSharedChatUrl] = useState(`${window.location.origin}/share....`);
  const [linkCreated, setLinkCreated] = useState(false);

  const params = useSearchParams();
  useEffect(() => {
    if (!open) return;

    const createLink = async () => {
      setIsLoading(true);

      try {
        if (type && messageId) {
          await ApiServices.updateMessageAccess(sessionId, messageId);
          setSharedChatUrl(`${window.location.origin}/share?message=${messageId}`);
        } else {
          await ApiServices.updatePublicSession(sessionId);
          setSharedChatUrl(`${window.location.origin}/share?conversation=${sessionId}`);
        }

        setLinkCreated(true);
      } catch (error: any) {
        console.error('Link creation error:', error);
        toast.error(error.response?.data?.detail || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    createLink();
  }, [open, sessionId, type, messageId]);

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    setLinkCreated(false);
    setSharedChatUrl(`${window.location.origin}/share....`);
    setIsLoading(false);
  };

  const handleCopyLink = async () => {
    if (window.navigator) {
      try {
        await navigator.clipboard.writeText(sharedChatUrl);
        toast.success('Link copied');
      } catch (error) {
        console.log('error', error);
        toast.error('sorry, link could not get copied, Please try again after some time');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="w-full bg-[var(--primary-main-bg)] rounded-lg p-0 gap-0 mx-auto max-w-[calc(100%-2rem)] sm:max-w-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4 pt-6 pb-0">
          <DialogTitle className="p-0">
            <div className="relative mb-4">
              <h4 className="text-lg font-semibold text-black">Share Public link to this thread</h4>
              <p className="text-xs font-normal text-[#616161]">
                Your name and any messages you add after sharing stay private.{' '}
                <a className="underline text-[#4B9770]">Learn more..</a>
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 mb-10 w-full overflow-hidden ">
          {/* Desktop View */}
          <div className="sm:flex hidden w-full rounded-[6rem] p-2 px-5 bg-[var(--primary-chart-bg)] items-center justify-between">
            <span className="max-w-[70%] w-[70%] truncate text-sm text-black">
              {isLoading ? 'Creating link...' : sharedChatUrl}
            </span>
            {linkCreated ? (
              <Button onClick={handleCopyLink} className="rounded-[58px]">
                Copy Link
              </Button>
            ) : (
              <Button disabled className="rounded-[3.5rem]">
                {isLoading ? <Loader className="animate-spin text-white" /> : 'Create Link'}
              </Button>
            )}
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-5 mt-4 " id="sravan">
            <div className="w-full bg-[#FCFCFA] rounded-[2rem] px-4 py-2 overflow-hidden">
              <p className="text-sm text-black truncate" title={sharedChatUrl}>
                {isLoading ? 'Creating link...' : sharedChatUrl}
              </p>
            </div>

            <div className="flex items-center justify-center">
              {linkCreated ? (
                <Button onClick={handleCopyLink} className="rounded-[3.5rem]">
                  Copy Link
                </Button>
              ) : (
                <Button disabled className="rounded-[3.5rem]">
                  {isLoading ? <Loader className="animate-spin text-white" /> : 'Create Link'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
