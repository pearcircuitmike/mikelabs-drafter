import React from 'react'
import { Layout } from '../components/Layout'
import { Badge, chakra, Code, Container, Heading } from '@chakra-ui/react'
import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import OutlineGenerator from '../components/OutlineGenerator'


export default function Profilepage() {
  const {currentUser} = useAuth()
  const title = "mike"
  const desc = "desc"

  return (
    <Layout>
      <Heading>
        Outline
      </Heading>

      <OutlineGenerator title={title} desc={desc}/>

    </Layout>
  )
}
