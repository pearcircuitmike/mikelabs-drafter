import React from 'react'
import { Layout } from '../components/Layout'
import { Badge, chakra, Code, Container, Heading } from '@chakra-ui/react'
import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import OutlineGenerator from '../components/OutlineGenerator'


export default function Outline(props) {
  const {currentUser} = useAuth()
  const title = props.location.title;
  const desc = props.location.description;
  const articleId = props.location.articleId;

  return (
    <Layout>
      <Heading>
        Outline
      </Heading>

      <OutlineGenerator title={title} desc={desc} articleId={articleId}/>

    </Layout>
  )
}
