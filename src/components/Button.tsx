import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRed?: boolean;
}

let className = "text-my-sm px-4 py-3 font-medium text-white shadow-[0px 4px 19px rgba(119, 147, 65, 0.3)] w-full rounded-[10px] bg-my-blue-500"


export function Button(props: ButtonProps) {
  return (
    <button className={clsx(
      "text-my-sm px-4 py-3 font-medium text-white shadow-[0px 4px 19px rgba(119, 147, 65, 0.3)] w-full rounded-[10px] bg-my-blue-500",
      props.isRed ? "bg-red-500" : "bg-my-blue-500"
    )
    }
    {...props}
    >{props.children}</button>
  )
}