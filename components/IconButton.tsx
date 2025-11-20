import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tooltip?: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ active, tooltip, children, className = '', ...props }) => {
  return (
    <button
      className={`
        p-3 rounded-full transition-all duration-300 ease-out
        hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20
        ${active ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;