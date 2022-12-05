import { InputHTMLAttributes, LegacyRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: any
}

export function Input(props: InputProps) {
  return (
    <input autoComplete='off' {...props.register(`${props.name}`)} className="text-my-xs outline-none placeholder:text-my-gray-300 placeholder:font-light px-4 py-4 border-[1px] border-[#adadad] w-full rounded-[9px] focus:border-my-blue-400"
    {...props}
    />
  )
}