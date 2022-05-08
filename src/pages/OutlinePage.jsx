import React from 'react'
import { Layout } from '../components/Layout'
import { Heading ,  Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import OutlineGenerator from '../components/OutlineGenerator'

export default function OutlinePage(props) {
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
        <BreadcrumbItem isCurrentPage="true">
          <BreadcrumbLink>Outline</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <OutlineGenerator title={title} desc={desc} articleId={articleId}  />

    </Layout>
  )
}
