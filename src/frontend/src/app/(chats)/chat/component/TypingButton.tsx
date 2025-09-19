import React from 'react';
import { motion } from 'framer-motion';

export const TypingButton = ({ isTyping = false }) => {
  return (
    <motion.button
      disabled={isTyping}
      className={`
        px-4 py-2 rounded-full bg-white text-gray-600 font-medium
        hover:bg-gray-100 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 min-w-[80px]
      `}
      whileHover={{ scale: isTyping ? 1 : 1.05 }}
      whileTap={{ scale: isTyping ? 1 : 0.95 }}
    >
      <span>Typing</span>
      <div className="flex items-center gap-1">
        <motion.div
          className="w-1 h-1 bg-gray-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="w-1 h-1 bg-gray-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-1 h-1 bg-gray-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
        />
      </div>
    </motion.button>
  );
};
