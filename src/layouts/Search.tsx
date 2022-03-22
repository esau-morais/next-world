import { InputHTMLAttributes } from 'react'

export default function Search(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center pl-4 rounded-lg bg-slate-200">
      <input
        type="text"
        className="w-full h-full p-4 bg-transparent border-none outline-none"
        {...props}
      />
    </div>
  )
}
