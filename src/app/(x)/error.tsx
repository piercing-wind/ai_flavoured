'use client' // Error components must be Client Components
 
import Image from 'next/image'
import { useEffect, useState } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
   const [eMessage, setEMessage] = useState<string>('')
   const [eName, setEName] = useState<string>('')
  useEffect(() => {
   //  Log the error to an error reporting service
    console.error(error)
    setEMessage(error.message)
    setEName(error.name)
  }, [error])
 
  return (
    <div className='w-full [h-100vh] overflow-hidden flex flex-col items-center justify-center gap-y-4'>
      <h2 className='text-2xl font-bold'>Something went wrong!</h2>
      <p className='text:xl font-semibold'>{eName}</p>
      <p className='text-lg w-[80%] text-center'>The Error Occured due to the resaon : {eMessage}</p>
      <button
      className='border p-1 px-4 rounded-md '
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>

      <div className='w-[25rem] h-[25rem] relative rounded-md shadow-sm my-5'>
         <Image
            src="/error/doggyphy.webp"
            alt="Doggyphy"
            fill
            style={{ objectFit: 'contain' }}
         />

      </div>

      <p className="text-xs">If you are keep facing this issue please raise a report to us <a className='text-blue-500' href="/support">Here</a></p>
    </div>
  )
}