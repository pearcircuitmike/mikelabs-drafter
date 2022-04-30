import React from 'react'
import { Layout } from '../components/Layout'
import { Badge, chakra, Code, Container, Heading ,  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator} from '@chakra-ui/react'
  import { ChevronRightIcon } from '@chakra-ui/icons'

import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import OutlineGenerator from '../components/OutlineGenerator'
import NewDraft from '../pages/NewDraft'

import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'


export default function Outline(props) {
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
        <BreadcrumbItem isCurrentPage="true">
          <BreadcrumbLink>Outline</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <OutlineGenerator title={title} desc={desc} articleId={articleId}/>

    </Layout>
  )
}
