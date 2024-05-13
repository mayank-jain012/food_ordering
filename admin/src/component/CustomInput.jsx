// import React from 'react'

const CustomInput = (props) => {
    const { label, type, i_id, i_class, name, val, onChng, onBlr } = props
    return (
        <div className='form-floating mb-3'>
            <input
                id={i_id}
                placeholder={label}
                className={`form-control ${i_class}`}
                type={type}
                name={name}
                value={val}
                onBlur={onBlr}
                onChange={onChng}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    )
}

export default CustomInput