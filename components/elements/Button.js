import React from 'react'

const Button = ({text, type = 'button', onClick, isLoading, bg, color, extClass}) => {
    return (
        <button
            className={`btn btn-sm  font-weight-bold ${bg + ' ' + color}`}
            type={type}
            onClick={onClick}

        >
            {text}
            {isLoading && '...'}
        </button>
    )
}

export default Button
