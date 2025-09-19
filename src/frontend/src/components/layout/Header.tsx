'use client';

import { EllipsisVertical, Share } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import { ChatSharingDialog } from '@/app/(chats)/chat/component/ChatSharingDialog';
import { useSearchParams } from 'next/navigation';
import DeleteConfirmationModal from '../Modals/deleteConfirmation';
import { handleDeleteSession, removeItemById } from '@/utils/session';
import { useRouter } from 'next/navigation';
import { useSessionHistoryStore } from '@/store/useSessionHistory';

interface HeaderProps {
  heading: string;
  isSharedPage?: boolean;
}
const Header: React.FC<HeaderProps> = ({ heading, isSharedPage = false }) => {
  const truncatedHeading = heading.length > 150 ? heading.slice(0, 150) + '...' : heading;
  const router = useRouter();

  const [openChatSharingModal, setOpenChatSharingModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const setSessionHistoryData = useSessionHistoryStore((s) => s.setSessionHistoryData);
  const params = useSearchParams();

  // Memoize sessionId to prevent unnecessary recalculations
  const sessionId = useMemo(() => {
    return params.get('search') || params.get('conversation') || '';
  }, [params]);

  // Memoize callback to prevent unnecessary re-renders
  const handleOpenChatSharingDialog = useCallback(() => {
    setOpenChatSharingModal(true);
  }, []);

  const handleCloseChatSharingDialog = useCallback((open: boolean) => {
    setOpenChatSharingModal(open);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    if (sessionId) {
      setSessionHistoryData((prev) => removeItemById(prev, sessionId));
      await handleDeleteSession(sessionId);
      router.push('/');
    }
  };

  return (
    <>
      <div className="hidden lg:flex md:h-[80px] h-auto ml-4 lg:ml-0 border-b border-primary-100 w-full justify-between items-center p-[30px_36px] bg-[var(--primary-main-bg)]">
        <div className="flex flex-1 min-w-0 items-center gap-x-4">
          <h2 className="truncate text-black text-lg font-medium leading-normal">
            {truncatedHeading}
          </h2>
          {/* <span className="text-black text-lg font-semibold">/</span>
          <span className="text-[#4B9770] text-lg font-medium leading-normal">+ Finverse</span> */}
        </div>

        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-[0px]">
            {!isSharedPage && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={handleOpenChatSharingDialog}
                      className="flex items-center gap-x-1 cursor-pointer hover:opacity-80"
                    >
                      <Share strokeWidth={1.5} className="w-[20px] h-[20px]" />{' '}
                      {/* 👈 Smaller size */}
                      <span className="text-sm font-medium text-black w-[44px] h-[20px]">
                        Share
                      </span>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )}
            {!isSharedPage && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:border-none">
                  <EllipsisVertical className="w-[20px] h-[20px]" />
                  {/* more icon   */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary-light p-3.5 rounded-xl">
                  <DropdownMenuItem
                    className="flex gap-x-1.5 items-center font-medium cursor-pointer"
                    onClick={handleOpenDeleteModal}
                  >
                    <Image
                      src="/icons/delete_icon.svg"
                      alt="icon"
                      height={20}
                      width={20}
                      priority
                    />
                    Delete
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem className="flex gap-x-1.5 items-center font-medium cursor-pointer">
                  <FileDown className="w-5 h-5" />
                  Download
                </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {!isSharedPage && (
        <ChatSharingDialog
          open={openChatSharingModal}
          onOpenChange={handleCloseChatSharingDialog}
          sessionId={sessionId || ''}
        />
      )}

      {!isSharedPage && openDeleteModal && (
        <DeleteConfirmationModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Header;
