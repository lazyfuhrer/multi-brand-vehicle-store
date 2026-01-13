import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
