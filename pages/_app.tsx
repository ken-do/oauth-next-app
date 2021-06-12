import "../style/index.css";
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getAccessToken } from "../utils/api";

interface MyAppProps {
  Component: React.ElementType
  pageProps: object
}


export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (!isLoggedIn) {
      getAccessToken().then(token => token && setIsLoggedIn(true))
    }
  }, [isLoggedIn])

  return <><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Component {...pageProps} isLoggedIn={isLoggedIn} /></>;
}
