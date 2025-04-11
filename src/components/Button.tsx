'use client';

import React from 'react';
import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

// Create a union type that extends HTMLMotionProps for button
type ButtonMotionProps = Omit<HTMLMotionProps<"button">, "className" | "children"> & {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonMotionProps> = ({
  children,
  className,
  variant = 'primary',
  icon,
  fullWidth = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'btn',
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button; 