import { useMemo } from 'react';
import '@/styles/promptAnimations.css';

interface PromptAnimationStyles {
  containerClassName: string;
  textClassName: string;
  wrapperClassName: string;
}

export const usePromptAnimation = (index: number, isExiting?: boolean): PromptAnimationStyles => {
  const styles = useMemo(() => {
    const baseContainerClasses = [
      'prompt-bubble',
      'w-full',
      'p-4',
      'rounded-xl',
      'text-left',
      'group',
      'text-sm',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'transform',
      'hover:scale-102',
      'hover:shadow-lg',
      'backdrop-blur-sm',
    ].join(' ');

    const gradientClasses = index === 0
      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20'
      : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20';

    const animationClass = index === 0 
      ? (isExiting ? 'prompt-left-exit' : 'prompt-left')
      : (isExiting ? 'prompt-right-exit' : 'prompt-right');

    const textColorClasses = index === 0
      ? 'text-blue-200 group-hover:text-blue-400'
      : 'text-pink-200 group-hover:text-pink-400';

    const baseTextClasses = [
      'transition-colors',
      'duration-300',
      'relative',
      'z-10',
    ].join(' ');

    const wrapperClasses = [
      'w-full',
      'max-w-3xl',
      'space-y-4',
    ].join(' ');

    return {
      containerClassName: `${baseContainerClasses} ${gradientClasses} ${animationClass}`,
      textClassName: `${baseTextClasses} ${textColorClasses}`,
      wrapperClassName: wrapperClasses,
    };
  }, [index, isExiting]);

  return styles;
};
