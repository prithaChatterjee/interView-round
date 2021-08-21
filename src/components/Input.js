import React from 'react'

const Input = ({label,type, value,name, handlechange, error}) => {
    return (
        <div className="form-field">
            <div className="form-field__control">
                <label style={{color: error ? "red": "#b11adc"}} className="form-field__label active">{label}</label>
                <input autoComplete="off" style={{borderColor: error && "red"}} type={type} className="form-field__input" value={value} name={name} 
                    onChange={(e) => handlechange(e)} />
            </div>
        </div>
    )
}

export default Input