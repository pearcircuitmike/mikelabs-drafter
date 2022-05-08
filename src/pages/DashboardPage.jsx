import { Button,
Heading,
useToast,
Container,  Spacer, Flex
} from '@chakra-ui/react'
import  React from 'react'
import { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'

import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import {collection, onSnapshot } from 'firebase/firestore'
import { db } from "../utils/init-firebase"

import {DraftCard } from "../components/DraftCard"
import {DashboardEmpty } from "../components/DashboardEmpty"

import { AddIcon } from '@chakra-ui/icons'



export default function DashboardPage() {
  const history = useHistory()
  const {currentUser} = useAuth()
  const [drafts, setDrafts] = useState([]);
  const toast = useToast()
  const draftsRef = collection(db,  `${currentUser.uid}`);


  useEffect(() => {
    try{

      return onSnapshot(
      draftsRef,
      (snapshot) => {
        setDrafts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
    }
    catch(error){
      toast({
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  }, []);


  return (
    <Layout>
    <Flex minWidth='max-content' alignItems='center' gap='2'>
      <Heading>
        Dashboard
      </Heading>
      <Spacer />
      <Button colorScheme='green' onClick={() => history.push('/new-draft')}>
        <AddIcon w={3} h={3} mr={1.5}/> New Draft
        </Button>
      </Flex>


      <Container maxW='container.lg' overflowX='auto'py={4}>
          {drafts && drafts.length > 0
            ? drafts && drafts.map((drafts) => <DraftCard key={drafts.id} {...drafts}/>)
            : <DashboardEmpty/> }

        </Container>

    </Layout>

  )
}
