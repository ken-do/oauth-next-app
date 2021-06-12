import { useEffect, useState } from 'react'
import axios from 'axios'
import { getAccessToken, getRepositories, Repository } from '../utils/api'
import { Container, ListGroup, Spinner } from 'react-bootstrap'

interface RepositoriesProps {
    isLoggedIn: boolean,
}

const Repositories = ({ isLoggedIn }: RepositoriesProps) => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [repositories, setRepositories] = useState<Repository[]>([])

    useEffect(() => {
        if (isLoggedIn) {
            setIsLoading(true)
            getAccessToken().then((accessToken) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${accessToken}`;
                getRepositories().then(repos => setRepositories(repos)).catch(() => {
                    setError(true)
                }).finally(() => {
                    setIsLoading(false)
                })
            })

        }
    }, [isLoggedIn])

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="border" role="status" />
            ) : (
                <>
                    <ListGroup>
                        {repositories.map(repo => <ListGroup.Item key={repo.id}>{repo.name}</ListGroup.Item>)}
                    </ListGroup>
                    {error && <p className="danger">Error!</p>}
                </>
            )}
        </Container>
    )
}

export default Repositories