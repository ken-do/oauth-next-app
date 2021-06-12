import NavBar from "react-bootstrap/NavBar";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface HeaderProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const authorizeURL = `${process.env.NEXT_PUBLIC_GITHUB_AUTHORIZE_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/repositories&scope=user%20public_repo&state=MTIzMTIz`

const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const router = useRouter()

  const logout = useCallback(() => {
    localStorage.setItem('token', '')
    router.push('/')
    setIsLoggedIn(false)
  }, [])

  return (
    <NavBar bg="dark" variant="dark">
      <NavBar.Brand href="/">OAuth Next App</NavBar.Brand>
      <NavBar.Toggle />
      <NavBar.Collapse className="justify-content-end">
        <NavBar.Text>
          {isLoggedIn ? (
            <>
              <span style={{ paddingRight: 10 }}>Signed in as: <a href="#login">You</a></span>
              <Button variant="danger" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button href={authorizeURL}>Login</Button>
          )}
        </NavBar.Text>
      </NavBar.Collapse>
    </NavBar>
  );
};

export default Header;
