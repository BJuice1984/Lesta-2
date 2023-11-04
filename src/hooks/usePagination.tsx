import { useState, useEffect } from 'react'
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  DESKTOP_NUMBER,
  TABLET_NUMBER,
  MOBILE_NUMBER,
  DESKTOP_MORE_NUMBER,
  TABLET_MORE_NUMBER,
} from '../constants/constants'

function usePagination() {
  const [numberOfShips, setnumberOfShips] = useState(0)
  const [numberMoreShips, setnumberMoreShips] = useState(0)
  const [clientWidth, setClientWidth] = useState(
    document.documentElement.clientWidth
  )

  useEffect(() => {
    if (clientWidth >= DESKTOP_WIDTH) {
      setnumberOfShips(DESKTOP_NUMBER)
      setnumberMoreShips(DESKTOP_MORE_NUMBER)
      return
    } else if (clientWidth < DESKTOP_WIDTH && clientWidth > TABLET_WIDTH) {
      setnumberOfShips(TABLET_NUMBER)
      setnumberMoreShips(TABLET_MORE_NUMBER)
      return
    } else {
      setnumberOfShips(MOBILE_NUMBER)
      setnumberMoreShips(TABLET_MORE_NUMBER)
      return
    }
  }, [clientWidth])

  const handleChangeClientWidth = () => {
    setTimeout(() => {
      setClientWidth(document.documentElement.clientWidth)
    }, 1500)
  }

  useEffect(() => {
    window.addEventListener('resize', handleChangeClientWidth)
    return () => {
      window.removeEventListener('resize', handleChangeClientWidth)
    }
  }, [clientWidth])

  const handleLoadMore = () => {
    setnumberOfShips(numberOfShips + numberMoreShips)
  }

  return {
    handleLoadMore,
    numberOfShips,
  }
}

export default usePagination
