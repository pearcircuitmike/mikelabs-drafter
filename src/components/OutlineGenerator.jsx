import { Button,
chakra,
FormControl,
FormLabel,
Stack,
useToast,
Text,
ButtonGroup, IconButton
} from '@chakra-ui/react'
import  React from 'react'
import { useState } from 'react'
import { RepeatIcon } from '@chakra-ui/icons'
import { Card } from '../components/Card'

import { useHistory } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../utils/init-firebase"
import { useAuth } from '../contexts/AuthContext'



const { Configuration, OpenAIApi } = require("openai");


export default function OutlineGenerator(props) {
  const toast = useToast()
  const {currentUser} = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outline, setOutline] = useState('')
  const history = useHistory()

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleOutline = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)

    try{
      const res = await openai.createCompletion("text-davinci-002", {
        prompt: `Generate an outline for a blog post titled ${props.title} about ${props.desc}.
                Each bullet in the outline should cover a key talking point and serve as a basis
                for a paragraph. Include an introduction and a conclusion. Each bullet must be a complete sentence.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setOutline(res.data.choices[0].text.trim());

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

  const handleAdd = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)

    try{
      await setDoc(doc(db, `${currentUser.uid}/${props.articleId}`),{
        outline: outline
      }, {merge:true})
      setIsSubmitting(false);
      history.push({
        pathname: '/editor',
        outline: outline,
        articleId: props.articleId
      })
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
                <FormLabel>Title:</FormLabel>
                <Text whiteSpace="pre-wrap;" mb={6}>{props.title}</Text>
                <FormLabel>Description:</FormLabel>
                <Text whiteSpace="pre-wrap;" mb={6}>{props.desc}</Text>
                <FormLabel>Outline</FormLabel>
                <Text whiteSpace="pre-wrap;" mb={6}>{outline}</Text>
              </FormControl>

              {outline &&
                <ButtonGroup>
                  <Button
                    width="100%;"
                    isLoading={isSubmitting}
                    colorScheme='primary'
                    size='lg'
                    fontSize='md'
                    onClick={handleAdd}


                    >
                  Continue
                  </Button>
                  <IconButton
                    isLoading={isSubmitting}
                    type='submit'
                    size='lg'
                    icon={<RepeatIcon/>}
                    />
              </ButtonGroup>
            }

            {!outline &&
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  colorScheme='primary'
                  size='lg'
                  fontSize='md'>
                  Generate
                </Button>
            }

          </Stack>
        </chakra.form>

      </Card>





  )
}
