'use client';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { ChatSharingDialog } from '@/app/(chats)/chat/component/ChatSharingDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useRouter } from 'next/navigation';
import { handleDeleteSession } from '@/utils/session';
import DeleteConfirmationModal from '../Modals/deleteConfirmation';

interface IMobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<IMobileHeaderProps> = ({ onMenuClick }) => {
  const [showIcons, setShowIcons] = useState(false);
  const [openChatSharingModal, setOpenChatSharingModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  const params = useSearchParams();
  const pathname = usePathname();

  // Memoize sessionId to prevent unnecessary recalculations
  const sessionId = useMemo(() => {
    return params.get('search') || params.get('conversation') || '';
  }, [params]);

  // Memoize the path check
  const shouldShowIcons = useMemo(() => {
    return pathname.includes('/chat') || pathname.includes('/share');
  }, [pathname]);

  // Update showIcons when shouldShowIcons changes
  useEffect(() => {
    setShowIcons(shouldShowIcons);
  }, [shouldShowIcons]);

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
      await handleDeleteSession(sessionId);
      router.push('/');
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between bg-[#102822] fixed top-0 z-20 px-4 py-5 ">
        <button onClick={onMenuClick} className="p-1" aria-label="Open menu">
          <Image src="/icons/menu_icon.svg" alt="menu" height={28} width={28} />
        </button>

        <div className="flex relative items-center gap-x-2">
          <Image
            src="/images/logo_ia.svg"
            alt="logo"
            priority
            height={26}
            width={125}
            className="h-[26px] w-[124.927px]"
          />
        </div>
        <div>
          {showIcons ? (
            <div className="flex items-center gap-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" className="p-1" aria-label="New chat">
                      <Plus className="size-6 filter invert" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>New Thread</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger className="p-1" aria-label="More options">
                  <PiDotsThreeOutlineVerticalFill className="size-6 filter invert" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary-light p-3.5 mr-4 mt-6 rounded-xl">
                  <DropdownMenuItem
                    onClick={handleOpenChatSharingDialog}
                    className="flex gap-x-2 items-center font-medium cursor-pointer"
                  >
                    <Image
                      src="/icons/share_icon.svg"
                      alt="Share icon"
                      height={20}
                      width={20}
                      priority
                    />
                    Share
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex gap-x-1.5 items-center font-medium cursor-pointer">
                    <Image
                      src="/icons/download_icon.svg"
                      alt="Download icon"
                      height={20}
                      width={20}
                      priority
                    />
                    Download
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex gap-x-1.5 items-center font-medium cursor-pointer"
                    onClick={handleOpenDeleteModal}
                  >
                    <Image
                      src="/icons/delete_icon.svg"
                      alt="Delete icon"
                      height={20}
                      width={20}
                      priority
                    />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : // Using null instead of empty div for better performance
          null}
        </div>
      </div>

      {openChatSharingModal && (
        <ChatSharingDialog
          open={openChatSharingModal}
          onOpenChange={handleCloseChatSharingDialog}
          sessionId={sessionId}
        />
      )}

      {openDeleteModal && (
        <DeleteConfirmationModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MobileHeader;
