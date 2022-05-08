import { Button,
Heading,
useToast,
Container,  Flex, Text, Avatar, Center, Spinner
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import  React, {useState, useEffect} from 'react'
import { Layout } from '../components/Layout'

import { getDoc, doc} from 'firebase/firestore'
import { db } from "../utils/init-firebase"
import parse from 'html-react-parser'
import {Helmet} from "react-helmet";



export default function ArticlePage() {
  const toast = useToast()
  let { uid, articleId } = useParams();

  const [article, setArticle] = useState();
  const [copied, setCopied] = useState(false);



  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }


  useEffect( async () => {
    try{
        const articleRef = await getDoc(doc(db, uid, articleId))
        setArticle(articleRef.data())
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
    return(<div>
      <Helmet>
             <meta charSet="utf-8" />
             <title>{article.title}</title>
             <meta name="description" content={article.description}/>
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
         </Helmet>



      <Layout>
        <Container mb={6}>
        <Heading mb={4} as='h1' size='3xl'> {article.title} </Heading>
        <Flex mb={6}>
          <Center>
            <Avatar
              size='sm'
              src={article.authorPhoto}
              name={article.authorName}
              alt={article.authorName}
              mr ={2}
              />
              <Text mr={3}>{article.authorName} </Text>

            </Center>
          </Flex>

        <Text as='h2' size='sm' style={{fontStyle: "italic"}} mb={6}> {article.description} </Text>
        {parse(article.text)}
        <Button mt={6} onClick={ copy }>{!copied ? <div><LinkIcon mr={3}/>Share with Link</div> : "Copied!"}</Button>


        </Container>
      </Layout>
      </div>
    )
  }

}
