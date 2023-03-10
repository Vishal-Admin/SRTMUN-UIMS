import React from 'react'

function Text({ className = "col-md-6", type = "text", setState, value, label, id, required = true, placeholder = "", inputClass = "" }) {
    return (
        <div className={`col-12 p-1 ${className}`}>
            <label htmlFor="fname" className="form-label">{label}</label>
            <input className={`form-control ${inputClass}`} id="fname" required={required} type={type} placeholder={placeholder}
                onChange={(e) => {
                    setState((pri) => {
                        return {
                            ...pri,
                            [id]: e.target.value
                        }
                    })
                }}
                value={value} />
        </div>
    )
}
export default Text