
interface InputVerProps {
  type: 'email' | 'name' | 'password',
  input: string,
  setTrue: Function,
  setFalse: Function,
}


export function InputVer({type, input, setTrue, setFalse}: InputVerProps) {
  if(type === 'name') {
    return (
      <div className="text-my-xs text-red-600 fixed top-[370px] ">
        {input && input.split('').includes(' ') ? 'Your username cant contain spaces' : null}
        {input.split('').includes(' ') ? setFalse() : setTrue()}
      </div>
    )
  }
  if(type === 'email') {
    const isValid = input.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return (
      <div className="text-my-xs text-red-600 fixed top-[503px] ">
        {input && isValid ? null : 'Enter a valid email'}
        {input && isValid ? setTrue() : setFalse()}
      </div>
    )
  }
  if(type === 'password') {
    return (
      <div className="text-my-xs text-red-600 fixed top-[632px] ">
        {input && input.length < 4 ? 'Choose a bigger password' : null}
        {input.length < 4 ? setFalse() : setTrue()}
      </div>
    )
  }
  return (null)
}