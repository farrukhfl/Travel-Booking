import React from 'react'

const Input = ({
    type,
    placeholer,
    register,
    className,
    id = undefined,
    step = undefined
}) => {

    const  defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"

  return (
    <div>
        <input type={type} className={className ? className : defaultClassName}
        placeholder={placeholer} step={step} id={id} {...register}  />
      
    </div>
  )
}

export default Input
