
interface InputVerProps {
  type: 'email' | 'name' | 'password',
  input: string,
  setFalse?: any,
}


export function InputVer({type, input, setFalse}: InputVerProps) {
  if(type === 'name') {
    return (
      <div className="text-my-xs text-red-600">
        {input}
      </div>
    )
  }
  if(type === 'email') {
    const isValid = input.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return (
      <div className="text-my-xs text-red-600">
        {input}
      </div>
    )
  }
  if(type === 'password') {
    return (
      <div className="text-my-xs text-red-600">
        {input}
      </div>
    )
  }
  return (null)
}