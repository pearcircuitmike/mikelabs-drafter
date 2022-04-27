import { Heading, Container, Badge, Button } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from "../utils/init-firebase"

export default function DashboardPage() {
  const handleAdd = async (e) =>{
    e.preventDefault()

    try{
      const res = await addDoc(collection(db, "cities"),{
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        timeStamp: serverTimestamp()
      })
    }
    catch(err){
      console.log(err);
    }


    console.log(res);
    console.log(res.id);
  }

  return (
    <Layout>
      <Heading>
        Protected page
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Dashboard Page
        </Badge>
      </Heading>
      <Button onClick={handleAdd}>hi</Button>

      <Container maxW='container.lg' overflowX='auto' py={4}></Container>

    </Layout>
  )
}
