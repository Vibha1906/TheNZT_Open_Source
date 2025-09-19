import React from 'react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// Define the type for the props
interface AccountFieldProps {
  label: React.ReactNode;
  value?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  hideButton?: boolean;
  secondaryText?: string;
  variant?: 'outline' | 'primary' | 'secondary' | 'danger' | 'ghost';
  containerClassName?: string;
  buttonAlignment?: 'left' | 'right';
}
// Define the AccountField component
const AccountField: React.FC<AccountFieldProps> = ({
  label,
  value = '',
  buttonText,
  onButtonClick,
  hideButton = false,
  // secondaryText = '',
  variant = 'outline',
  containerClassName,
  buttonAlignment = 'left',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center sm:justify-between',
          containerClassName
        )}
      >
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg leading-tight font-medium text-[#102822]">{label}</h3>
          <span className="text-sm font-medium text-[#646262]">{value}</span>
          <div className="mt-1 flex flex-col">
            {/* {secondaryText && (
                            <span className="text-sm text-gray-500 mt-0.5">{secondaryText}</span>
                        )} */}
          </div>
        </div>
        {!hideButton && (
          <Button
            variant={variant}
            onClick={onButtonClick}
            className={cn({
              'self-start': buttonAlignment === 'left', // Aligns left
              'self-end': buttonAlignment === 'right', // Aligns right
            })}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default AccountField;
