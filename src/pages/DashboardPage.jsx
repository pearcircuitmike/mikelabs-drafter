import { Button,
chakra,
FormControl,
FormLabel,
Heading,
HStack,
Input,
Stack,
useToast,
Text,
Box,
Flex,
Badge,
Container, Textarea
} from '@chakra-ui/react'
import  React from 'react'
import { useState } from 'react'
import { Layout } from '../components/Layout'

import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from "../utils/init-firebase"


export default function DashboardPage() {
  const toast = useToast()
  const history = useHistory()

  return (
    <Layout>
      <Heading>
        Dashboard
      </Heading>

      <Container maxW='container.lg' overflowX='auto' py={4}>
        <Button onClick={() => history.push('/new-draft')}>
          New Draft
          </Button>
        </Container>

    </Layout>

  )
}
