import Head from 'next/head'
import { Container, Row, Card } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect } from 'react'

interface HomeProps {
    isLoggedIn: boolean
}

const Home = ({ isLoggedIn }: HomeProps) => {
    return (
        <Container className="md-container">
            <Head>
                <title>ReactJS with react-bootstrap</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <Row className="justify-content-md-between">
                <Card className="sml-card">
                    {isLoggedIn ? (
                        <Card.Body>
                            <Card.Title>My Github Repositories</Card.Title>
                            <Link href='/repositories'>View repos</Link>
                        </Card.Body>
                    ) : (
                        <Card.Body>
                            <Card.Title>Hey, try to login</Card.Title>
                            <Card.Subtitle>The whole purpose of this app is to allow you authenticate yourself. That's it ;)</Card.Subtitle>
                        </Card.Body>
                    )}
                </Card>
            </Row>
        </Container >
    )
}


export default Home