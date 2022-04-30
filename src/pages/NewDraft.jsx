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

import  OutlineGenerator  from '../components/OutlineGenerator'


export default function NewDraft() {
  const toast = useToast()
  const history = useHistory()
  const {currentUser} = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  const [data, setData] = useState('')

  const handleAdd = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)

    try{
      const res = await addDoc(collection(db, `${currentUser.uid}`),{
        title: title,
        description: description,
        timeStamp: serverTimestamp(),
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
      })
      setIsSubmitting(false);
      history.push({
        pathname: '/outline',
        title: title,
        description: description,
        articleId: res.id
      });
    }
    catch(err){
      toast({
        description: err,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <Layout>
      <Heading>
        {title ? title : 'Untitled Draft'}
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          New Draft
        </Badge>
      </Heading>

      <Card maxW='xl' mx='auto' mt={4}>
        <chakra.form
          onSubmit={handleAdd}
          >
          <Stack spacing='6'>
            <FormControl id='title'>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name='title'
                type='text'
                placeholder='All about whales'
                required />
            </FormControl>

            <FormControl id='description'>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name='description'
                type='text-area'
                placeholder = 'An article about whales. Talk about what they like to eat, where they live, their lifecycles, and their interactions with humans.'
                required />
            </FormControl>



            <Button
              isLoading={isSubmitting}
              type='submit'
              colorScheme='primary'
              size='lg'
              fontSize='md'
              >
              Continue
            </Button>
          </Stack>
        </chakra.form>

      <Container maxW='container.lg' overflowX='auto' py={4}></Container>
      </Card>

    </Layout>

  )
}
