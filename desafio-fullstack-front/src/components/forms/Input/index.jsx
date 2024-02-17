import { forwardRef } from "react"


export const Input = forwardRef(({ labelClass, className, label, error, ...rest }, ref) => {
    return (
        <>
            <label className={labelClass}>{label}</label>
            <input className={className} ref={ref} {...rest} />
            {error ? <p>{error.message}</p> : null}
        </>
    )
})