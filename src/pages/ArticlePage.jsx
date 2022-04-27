import { Button,
Heading,
Stack,
useToast,
Container, Textarea, Spacer, Flex, Text, Avatar, Center, Spinner
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import  React, {useState, useEffect} from 'react'
import { Layout } from '../components/Layout'

import { collection, query, where, getDoc, documentId , doc, onSnapshot} from 'firebase/firestore'
import { db } from "../utils/init-firebase"


export default function ArticlePage() {
  const toast = useToast()
  let { uid, articleId } = useParams();

  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect( async () => {
    setIsLoading(true);
    try{
        const articleRef = await getDoc(doc(db, uid, articleId))
        setArticle(articleRef.data())
        setIsLoading(false);
    }
    catch(error){
      toast({
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
      console.log(error)
    }

  }, []);


  if(!article){
    return(
      <Layout>
        <Container>
              <Center>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  mt={50}
                />
            </Center>
        </Container>
      </Layout>
    )
  }
  else{
    return(
      <Layout>
        <Container>
        <Heading mb={3}> {article && article.title} </Heading>
        <Flex mb={6}>
          <Center>
            <Avatar
              boxSize='40px'
              src={article && article.authorPhoto}
              name={article && article.authorName}
              alt={article && article.authorName}
              mr ={3}
              />
              <Text>{article && article.authorName} </Text>
            </Center>
          </Flex>

        <Text> {article && article.description} </Text>

        </Container>
      </Layout>
    )
  }

}
