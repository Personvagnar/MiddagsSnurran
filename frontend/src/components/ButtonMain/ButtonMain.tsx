import './buttonMain.css'
import type { ReactNode } from 'react'

type ButtonMainProps = {
    text: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    onClick: () => void
    onLeftIconClick?: () => void
    onRightIconClick?: () => void
}

function ButtonMain({ text, leftIcon, rightIcon, onClick, onLeftIconClick, onRightIconClick}: ButtonMainProps) {
  return (
    <button className='btn-main' onClick={onClick}>
        <h2 className='btn-text'>{text}</h2>
        <span className='squareBtn' onClick={(e) => { e.stopPropagation(); onLeftIconClick?.()}}>{leftIcon}</span>
        <span className='squareBtn' onClick={(e) => { e.stopPropagation(); onRightIconClick?.()}}>{rightIcon}</span>
    </button>
  )
}

export default ButtonMain