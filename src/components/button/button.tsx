import React from "react";
import classNames from "classnames";
interface ButtonProps {
  children: React.ReactNode | String;

  //icon
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  //style
  primary?: boolean;
  secondary?: boolean;
  className?: string;
  //size
  small?: boolean;
  large?: boolean;
  full?: boolean;
  extra?: boolean;
  //order
  hidden?: boolean;

  [rest: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  extra,
  full,
  large,
  hidden,
  leftIcon,
  primary,
  rightIcon,
  secondary,
  small,
  ...rest
}) => {
  const styles = classNames(
    "flex items-center border rounded-md",
    {
      "border-slate-500 bg-teal-500 text-white hover:bg-teal-400": primary,
      "border-secondary-3 bg-secondary-3 text-white": secondary,
      "py-2 px-4 text-sm": small,
      "py-4 px-12 text-lg": large,
      "w-full flex justify-center py-2 ": full,
      "opacity-50 cursor-not-allowed": hidden,
    },
    className
  );
  return (
    <button {...rest} className={styles}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
