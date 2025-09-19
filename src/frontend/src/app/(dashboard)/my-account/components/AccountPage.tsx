'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';
import AccountField from './AccopuntField';
import { useAuthStore } from '@/store/useZustandStore';
import { DeleteAccountModal } from './DeleteAccountModal';
import { LogoutDialog } from '@/components/layout/components/LogoutDialog';
import { OtpPasswordResetDialog } from '@/app/(auth)/components/ResetPassword';
import UploadProfilePhotoDialog from './UploadProfilePhoto';
const AccountPage = () => {
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [openProfilePhotoDialog, setOpenProfilePhotoDialog] = useState(false);
  const [image, setImage] = useState('');

  const { username, email, profilePicture } = useAuthStore();

  const handleContactClick = () => {
    const to = 'tech@iaisolution.com';
    const subject = 'Help Request';
    const body = 'Hi team,\n\nI need assistance with';

    // This creates a specific URL for Gmail's compose window
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // This opens the Gmail link in a new browser tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="lg:max-w-2xl w-full px-4 py-8 mt-4 md:mt-0 ">
      <div className="space-y-10">
        <motion.h1 className="text-2xl text-center font-medium text-[#102822] py-6 border-b border-primary-100 hidden md:block">
          My Account
        </motion.h1>

        {/* Profile Section */}
        <motion.section className="w-full">
          <div className="flex flex-col w-full sm:flex-row items-start sm:items-center">
            <div className="flex w-full items-center gap-x-6 mb-4 sm:mb-0">
              <ProfileAvatar
                name={username || ''}
                size="md"
                className="mr-4 flex-shrink-0"
                image={profilePicture ? profilePicture : image}
              />
              <div className="w-full">
                <AccountField
                  label={username || ''}
                  value={email || ''}
                  buttonText="Change Profile Photo"
                  onButtonClick={() => setOpenProfilePhotoDialog(true)}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Account Information Section */}
        <motion.section className="space-y-7">
          <AccountField label="Full Name" value={username || ''} hideButton={true} />
          {/* <AccountField
                      label="Username"
                      value={username || ""}
                      buttonText="Change Username"
                      onButtonClick={() => console.log('Change username')}
                  /> */}
          <AccountField label="Email" value={email || ''} hideButton={true} />
          <AccountField
            label="Password"
            value="••••••••••"
            buttonText="Change Password"
            onButtonClick={() => setIsOtpDialogOpen(true)}
            containerClassName="!flex-row !justify-between"
          />
          {/* <AccountField
                      label="Current Plan"
                      value="Free Plan"
                      buttonText="Learn about Pro Plan"
                      onButtonClick={() => console.log('Change password')}
                  /> */}
        </motion.section>
        <hr className="w-full border-primary-100" />

        {/* Subscription Section */}
        <motion.section className="space-y-7">
          <AccountField
            label="Support"
            hideButton={false}
            buttonText="Contact"
            variant="primary"
            containerClassName="!flex-row !justify-between"
            // Add the onClick handler to the button
            onButtonClick={handleContactClick}
          />
          <AccountField
            label="You are logged in as"
            value={email || ''}
            buttonText="Logout"
            variant="primary"
            onButtonClick={() => setLogoutDialogOpen(true)}
            buttonAlignment="right"
          />
          {/* <AccountField
                      label="Log out of all devices"
                      value='Devices or browsers where you are signed in'
                      buttonText="Log out from all devices"
                      variant='primary'
                      onButtonClick={() => console.log('Change username')}
                  /> */}
          <AccountField
            label="Delete account"
            value="Permanently delete your account and data"
            buttonText="Learn More"
            variant="outline"
            onButtonClick={() => setDeleteAccountModalOpen(true)}
            buttonAlignment="right"
          />
        </motion.section>
      </div>

      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
      />
      <LogoutDialog open={logoutDialogOpen} onHandleChange={() => setLogoutDialogOpen(false)} />
      <OtpPasswordResetDialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen} />
      <UploadProfilePhotoDialog
        isOpen={openProfilePhotoDialog}
        onOpenChange={setOpenProfilePhotoDialog}
        setImage={setImage}
      />
    </div>
  );
};

export default AccountPage;
