
import { useEffect, useState } from 'react'
import {GrFormClose} from 'react-icons/gr'

export function SUCCESS({response}: {response: string}) {
  const [status, setStatus] = useState('SUCCESS')

  useEffect(() => {
    setTimeout(() => {
      setStatus('')
    }, 2000)
  }, [])

  return (
    <div className={`flex justify-between items-center transition duration-300 ease-in-out max-w-[350px] min-w-[250px] bottom-0 right-0 m-3 absolute rounded bg-green-500 h-[40px]${
      status == 'SUCCESS' ? ' opacity-100 ' : '  opacity-0'
    }`}>
      <div className='ml-2'>
      {response ? response : 'No response sent'}
      </div>
      <div className='mr-2'>
        <GrFormClose />
      </div>
    </div>
  )
}
