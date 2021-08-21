import React from 'react'

export default function Button({name, type, fullWidth, clickFunction, value}) {
    return (
        <button className="profileButton" style={{width: fullWidth && "100%"}} type={type}
            onClick={() => type === 'button' && clickFunction(value)} >{name}</button>
    )
}
