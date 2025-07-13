import React, { useState } from 'react'

export default function useOpen() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const toggle = () => {
      setIsOpen((prev) => !prev)
  }
  const handleOpen = () => {
      setIsOpen(true)
  }

  const handleClose = () => {
      setIsOpen(false)
  }
   const handleOpen2 = () => {
      setIsOpen2(true)
  }
  const handleClose2 = () => {
    setIsOpen2(false)
  }
  return {isOpen, isOpen2, toggle, handleClose, handleOpen, handleClose2, handleOpen2}
}