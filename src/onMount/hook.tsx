import { useEffect } from 'react'
import { callOnMount, OnMountComponentType } from '@/onMount'

export const useOnMount = (type: OnMountComponentType, props: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      callOnMount(type, props)
    }
  }, [])

  return null
}
