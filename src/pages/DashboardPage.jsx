import { Button,
Heading,
Stack,
useToast,
Container, Textarea
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
      <Heading>
        Dashboard
      </Heading>

      <Container maxW='container.lg' overflowX='auto' py={4}>
        <Button onClick={() => history.push('/new-draft')}>
          New Draft
          </Button>


            <p>
            {drafts && drafts.map((drafts) => <p key={drafts.id} >{drafts.id}</p>)}
            </p>
        </Container>

    </Layout>

  )
}
