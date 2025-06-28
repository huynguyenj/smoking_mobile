import React, { useState } from 'react'

export default function useOpen() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
      setIsOpen((prev) => !prev)
  }
  const handleOpen = () => {
      setIsOpen(true)
  }

  const handleClose = () => {
      setIsOpen(false)
  }
  return {isOpen, toggle, handleClose, handleOpen}
}