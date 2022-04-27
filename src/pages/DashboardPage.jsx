import { Button,
Heading,
Stack,
useToast,
Container, Textarea, Spacer, Flex
} from '@chakra-ui/react'
import  React from 'react'
import { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'

import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

import { doc, addDoc, collection, query, orderBy, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from "../utils/init-firebase"

import {DraftCard } from "../components/DraftCard"


export default function DashboardPage() {
  const toast = useToast()
  const history = useHistory()
  const {currentUser} = useAuth()
  const draftsRef = collection(db,  `users/${currentUser.uid}/drafts`);
  const draftsQuery = query(draftsRef, orderBy("timeStamp", "asc"));
  const [drafts, setDrafts] = useState([]);


  useEffect(() => {
    return onSnapshot(
      draftsRef,
      (snapshot) => {
        setDrafts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  }, []);


  return (
    <Layout>
    <Flex minWidth='max-content' alignItems='center' gap='2'>
      <Heading>
        Dashboard
      </Heading>
        <Spacer />
      <Button colorScheme='green' onClick={() => history.push('/new-draft')}>
        + New Draft
        </Button>
      </Flex>


      <Container maxW='container.lg' overflowX='auto'py={4}>



            <p>
            {drafts && drafts.map((drafts) => <DraftCard key={drafts.id} {...drafts}/>)}
            </p>
        </Container>

    </Layout>

  )
}
