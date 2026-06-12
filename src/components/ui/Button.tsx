"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-white/5 text-white border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(167,139,250,0.3)] group transition-[background-color,border-color,color,box-shadow,opacity] duration-300",
  ghost:
    "bg-transparent text-white/70 border border-transparent hover:text-white hover:bg-white/5 transition-[background-color,border-color,color,opacity] duration-300",
  outline:
    "bg-transparent text-white border border-white/15 backdrop-blur-md hover:border-white/30 hover:bg-white/5 transition-[background-color,border-color,color,opacity] duration-300",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wide",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", href, children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      return (
        <motion.a
          href={href}
          target={isExternal && !href.startsWith("mailto:") ? "_blank" : undefined}
          rel={isExternal && !href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={classes}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
