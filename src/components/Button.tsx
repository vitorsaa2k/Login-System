import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { Oval } from "react-loader-spinner";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRed?: boolean;
  isSubmitting?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button className={clsx(
      "text-my-sm px-4 py-3 font-medium text-white shadow-[0px 4px 19px rgba(119, 147, 65, 0.3)] w-full rounded-[10px] flex justify-center",
      props.disabled ? 'bg-my-blue-700' : 'bg-my-blue-500',
      props.isRed ? "bg-red-500 hover:bg-red-600" : "bg-my-blue-500 hover:bg-my-blue-700",
      props.className,
    )
    }
    {...props}
    >{props.isSubmitting 
      ?
      <Oval 
        height={18} 
        width={18} 
        color={'#FFF'}
        secondaryColor={'#e6e6e6'}
        strokeWidth={5}
        strokeWidthSecondary={5}
      
      /> 
      : props.children}</button>
  )
}