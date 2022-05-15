import {Heading } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import Hero  from '../components/homepage/Hero'
import GridListWithCTA  from '../components/homepage/GridListWithCTA'


export default function Homepage(){

  return (
    <Layout>
      <Hero/>
      <GridListWithCTA/>
    </Layout>


  )
}
