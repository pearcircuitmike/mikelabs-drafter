import React from 'react'
import { Layout } from '../components/Layout'
import { Heading ,  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink} from '@chakra-ui/react'
  import { ChevronRightIcon } from '@chakra-ui/icons'

import { useAuth } from '../contexts/AuthContext'
import EditorComponent from '../components/EditorComponent'

export default function EditorPage(props) {
  const {currentUser} = useAuth()
  const outline = props.location.outline;
  const articleId = props.location.articleId;



  return (
    <Layout>
      <Heading>
        Complete draft
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

      <EditorComponent outline={outline} articleId={articleId} authorId={currentUser.uid}/>

    </Layout>
  )
}
