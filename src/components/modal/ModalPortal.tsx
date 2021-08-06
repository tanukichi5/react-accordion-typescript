import React from 'react'
import ReactDOM from 'react-dom'


console.log(document.getElementById('root') as Element)

const ModalPortal: React.FC = ({
  children,
}) => {
  return (
    ReactDOM.createPortal(
      children,
      document.getElementById('root') as Element
    )
  )
}

export default ModalPortal