import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  portalTarget: string
}

const ModalPortal: React.FC<Props> = (
  props,
) => {
  return (
    ReactDOM.createPortal(
      props.children,
      document.querySelector(props.portalTarget) as Element
    )
  )
}

export default ModalPortal