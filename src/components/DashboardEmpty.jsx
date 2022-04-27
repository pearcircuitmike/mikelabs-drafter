import { useColorModeValue, Heading, Text, Button, Box, Center} from '@chakra-ui/react'
import * as React from 'react'

export const DashboardEmpty = () => {

    return(
      <Box bg='lightgray' w='100%' p={40} mt={25} borderRadius='lg'>
      <Center>
      <Box
        mt='1'
        fontWeight='semibold'
        as='h2'
        lineHeight='tight'
        fontSize="xl"
        isTruncated
      >
        No drafts yet!
      </Box>
      </Center>

      <Center>
        <Text mt={25}>Get started by creating a new draft.</Text>
        </Center>
      </Box>
    )
  }
