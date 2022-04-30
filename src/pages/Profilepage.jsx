import React from 'react'
import { Layout } from '../components/Layout'
import { Badge, chakra, Code, Container, Heading } from '@chakra-ui/react'
import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import  OutlineGenerator  from '../components/OutlineGenerator'


export default function Profilepage() {
  const {currentUser} = useAuth()

  return (
    <Layout>
      <Heading>
        Profile page
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Protected Page
        </Badge>
      </Heading>
      <OutlineGenerator/>

      <Container maxW='container.lg' overflowX='auto' py={4}></Container>
      <chakra.pre>
        {JSON.stringify(currentUser, null, 2)}
      </chakra.pre>
    </Layout>
  )
}
