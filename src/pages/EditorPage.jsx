import React from 'react'
import { Layout } from '../components/Layout'
import { Heading ,  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink} from '@chakra-ui/react'
  import { ChevronRightIcon } from '@chakra-ui/icons'

import { useAuth } from '../contexts/AuthContext'
import EditorComponent from '../components/EditorComponent'

import { useLocation } from 'react-router-dom'


export default function EditorPage(props) {
  const {currentUser} = useAuth()
  const title = props.location.title;
  const desc = props.location.description;
  const articleId = props.location.articleId;

  return (
    <Layout>
      <Heading>
        Generate Outline
      </Heading>

      <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink>Details</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Outline</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage="true">
          <BreadcrumbLink>Writing</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <EditorComponent title={title} desc={desc} articleId={articleId}/>

    </Layout>
  )
}
