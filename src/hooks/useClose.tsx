import { useEffect } from 'react'

function useClose() {
  function useEscClose(closeModal: () => void) {
    useEffect(() => {
      function handleEsc(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          closeModal()
        }
      }

      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }, [closeModal])
  }

  function useClickClose(closeModal: () => void, openedClass: string) {
    useEffect(() => {
      function handleClickClose(e: MouseEvent) {
        const target = e.target as Element
        if (target.className.includes(openedClass)) {
          closeModal()
        }
      }

      document.addEventListener('mousedown', handleClickClose)
      return () => document.removeEventListener('mousedown', handleClickClose)
    }, [closeModal, openedClass])
  }

  return {
    useEscClose,
    useClickClose,
  }
}

export default useClose
