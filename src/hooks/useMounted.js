import {useEffect, useRef} from 'react'

export default function useMounted(){

  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true // fires when mounted
    return() => {
      mounted.current =false
    }
  }, [])

  return mounted
}
