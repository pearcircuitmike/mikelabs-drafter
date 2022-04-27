import { useColorModeValue, Heading, Text, Button} from '@chakra-ui/react'
import { Card } from './Card'

import * as React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { doc, addDoc, collection, query, orderBy, getDocs, onSnapshot,   deleteDoc } from 'firebase/firestore'
import { db } from "../utils/init-firebase"

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'


export const DraftCard = ({id, title, description, serverTimestamp}) => {
    const {currentUser} = useAuth()
    const onDeleteDraft = (id) =>
    deleteDoc(doc(db, `${currentUser.uid}/${id}`));

    return(
    <Card key={id} maxW='xl' mx='auto' mt={4}>
          <Heading mb={4} as='h2' size='lg'>{title}</Heading>
          <Text>{serverTimestamp}</Text>
          <Text>{description}</Text>

          <Button mt={6} mr={3}><EditIcon /></Button>
          <Button mt={6} colorScheme="red" onClick={() => onDeleteDraft(id)} ><DeleteIcon /></Button>
      </Card>
    )
  }
