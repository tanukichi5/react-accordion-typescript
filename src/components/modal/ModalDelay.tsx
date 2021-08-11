import React from 'react'

interface Props {
  children?: any;
  expanded?: any;
}

const ModalDelay: React.FC<Props> = ({
  children,
  expanded
}) => {
  const [hide, setHide] = React.useState(true)

  console.log(expanded)
  
  
  React.useEffect(() => {
    if(!expanded) {
      clearTimeout()
      setTimeout(() => {
        setHide(true)
      }, 5000)
    } else {
      setHide(false)
    }
  }, [expanded])
  
  // if(!expanded) return null
  if (hide && !expanded) return null

  return (
    children
  )
}

export default ModalDelay