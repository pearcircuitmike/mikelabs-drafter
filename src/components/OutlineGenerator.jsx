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

const { Configuration, OpenAIApi } = require("openai");

export default function OutlineGenerator() {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outline, setOutline] = useState('')

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleOutline = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)

    try{
      const res = await openai.createCompletion("text-davinci-002", {
        prompt: `Generate an outline for a blog post about ${outline}. Each bullet in the outlie should cover a key talking point and serve as a basis for a paragraph. Be sure to include an introduction and a conclusion too.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(res.data.choices[0].text);
      setIsSubmitting(false);
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

      <Card maxW='xl' mx='auto' mt={4}>
        <chakra.form
          onSubmit={handleOutline}
          >
          <Stack spacing='6'>

            <FormControl id='Outline prompt'>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                name='description'
                type='text-area'
                placeholder = 'Prompt goes here'
                required />
            </FormControl>



            <Button
              isLoading={isSubmitting}
              type='submit'
              colorScheme='primary'
              size='lg'
              fontSize='md'>
              Continue
            </Button>
          </Stack>
        </chakra.form>

      </Card>





  )
}
