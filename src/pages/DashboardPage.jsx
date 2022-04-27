import { Heading, Container, Badge } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'

export default function DashboardPage() {
  return (
    <Layout>
      <Heading>
        Dashboard
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Dashboard Page
        </Badge>
      </Heading>
      <Container maxW='container.lg' overflowX='auto' py={4}></Container>
    </Layout>
  )
}
