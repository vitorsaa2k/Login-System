import { ReactNode } from "react";
import { Button } from "./Button";
import { Title } from "./Title";


interface ModalProps {
  children: ReactNode
  isOpen?: boolean
  deleteAccount?: Function
  close?: Function
}




export function Modal({children, deleteAccount, close}: ModalProps) {


  return (
    <>
    <div onClick={() => close?.()} className="bg-gray-300 fixed bottom-0 left-0 right-0 top-0 bg-black/70"></div>
    <div className="bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 rounded flex flex-col gap-5 items-center">
      <Title>
        {children}
      </Title>
      <div className="flex gap-3">
        <Button onClick={() => deleteAccount?.() && close?.()}>Ok</Button>
        <Button onClick={() => close?.()} isRed>Cancel</Button>
      </div>
    </div>
    </>
  )
}