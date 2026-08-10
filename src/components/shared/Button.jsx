import React from 'react';

export const Button = ({
  children,
  label,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  size = 'md',        // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
}) => {
  // Base classes
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Style variants
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:scale-95',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  // Size options
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {children || label}
    </button>
  );
};

// Named Export & Default Export dono shamil hain
export default Button;