import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";

type ButtonProps = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx(classes.button, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
