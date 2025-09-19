'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoaderComponent from '../Loader';
import { Loader } from 'lucide-react';

interface WaitUntilResponseProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitUntilResponse: React.FC<WaitUntilResponseProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg p-6 sm:max-w-md flex flex-col items-center text-center">
        <Loader className="size-8 animate-spin text-[#4B9770]" />
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">Please Wait</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 text-sm">
          Wait until the current response is completed before continuing.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WaitUntilResponse;
