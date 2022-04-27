import { useColorModeValue } from '@chakra-ui/react'
import { Card } from './Card'

import * as React from 'react'

export const DraftCard = ({id, title, description}) => (

  <Card key={id} maxW='xl' mx='auto' mt={4}>
        <h2>{title}</h2>
        <p>{description}</p>

    </Card>


)
