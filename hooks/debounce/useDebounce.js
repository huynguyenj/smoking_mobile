import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react'

export default function useDebounce() {
  const [value, setValue] = useState('')
  const [time, setTime] = useState(0)
  const debounceSearch = debounce(async (value) => {
    setValue(value)
  }, time)
  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])
  return {
    value,
    setTime,
    debounceSearch
  }
}