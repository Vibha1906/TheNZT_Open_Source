import { useIsMobile } from '@/hooks/use-is-mobile';

// Improved canvas container variants with better mobile performance
export const canvasContainerVariants = {
  closed: {
    width: 0,
    opacity: 0,
    transition: {
      // Slower, smoother closing animation
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // More gradual easing
      // Ensure opacity transitions properly during close
      opacity: {
        duration: 0.3,
        delay: 0, // No delay on closing
      },
      // Add will-change for better performance
      willChange: 'width, opacity',
    },
  },
  open: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
      willChange: 'width, opacity',
    },
  },
};

// Improved content animation variants optimized for mobile
export const canvasContentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Reduced scale change for better mobile performance
    y: 10, // Reduced y movement
    transition: {
      duration: 0.25, // Faster hiding
      ease: [0.25, 0.1, 0.25, 1],
      // Ensure smooth closing by staggering the animations
      opacity: { duration: 0.2 },
      scale: { duration: 0.25 },
      y: { duration: 0.25 },
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.15, // Slight delay for content appearance
      ease: [0.25, 0.1, 0.25, 1],
      // Stagger the properties for smoother animation
      opacity: { duration: 0.3, delay: 0.15 },
      scale: { duration: 0.35, delay: 0.15 },
      y: { duration: 0.35, delay: 0.15 },
    },
  },
};

// Alternative: Mobile-specific variants for better performance
export const canvasContainerVariantsMobile = {
  closed: {
    opacity: 0,
    y: -20, // Simple slide up for mobile
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const canvasContentVariantsMobile = {
  hidden: {
    opacity: 0,
    y: 15,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Unified variants that adapt based on device
export const adaptiveCanvasContainerVariants = {
  closed: {
    // Use transform3d for hardware acceleration
    width: 0,
    opacity: 0,
    transform: 'translateZ(0)', // Force hardware acceleration
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1], // More natural easing curve
      opacity: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },
  open: {
    width: '100%',
    opacity: 1,
    transform: 'translateZ(0)',
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      opacity: {
        duration: 0.3,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  },
};

export const adaptiveCanvasContentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transform: 'translateZ(0)', // Hardware acceleration
    transition: {
      duration: 0.25,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transform: 'translateZ(0)',
    transition: {
      duration: 0.3,
      delay: 0.12,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const useCanvasVariants = () => {
  const isMobile = useIsMobile(); // Adjust breakpoint as needed

  return {
    containerVariants: isMobile ? canvasContainerVariantsMobile : canvasContainerVariants,
    contentVariants: isMobile ? canvasContentVariantsMobile : canvasContentVariants,
  };
};
