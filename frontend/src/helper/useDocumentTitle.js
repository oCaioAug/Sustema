import {useRef, useEffect } from 'react'

const useDocumentTitle = (title, pravailOnUnmount = false) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title
  }, [title])
}

export default useDocumentTitle