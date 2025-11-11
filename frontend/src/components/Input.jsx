import React, { useId } from 'react'

//forwardRef for integrating with form libraries like react-hook-form

const Input = React.forwardRef(function Input({
    label = "",
    type = "text",
    className = "",
    placeholder,
    labelClassName,
    ...props
}, ref){

    const id = useId();
    return (
        <div className='w-full mb-4'>
            <label 
            className={`text-text inline-block mb-1 pl-2 ${labelClassName}`}
            htmlFor={id}>
                {label}
            </label>

            <input 
            type={type}
            className = {`border border-gray-500 outline-none rounded-xl p-2 w-full mb-4' ${className}`}
            placeholder={placeholder}
            ref={ref}
            id={id}
            {...props}
            
            />
            
        </div>
    )


})

export default Input