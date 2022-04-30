import React, {useState} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'


import {
Grid, GridItem,
Heading,
HStack,
Input,
Stack,
useToast,
Text,
Box,
Flex,
Badge,
Container, Textarea, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator
} from '@chakra-ui/react'

export default function EditorComponent(){
  const [text, setText] = useState("Placeholder")
  return (

    <Grid templateColumns='repeat(2, 2fr)' gap={12} mt={10}>
      <GridItem w='100%' h='10' >
      <Heading mb={6} size='md'>Editor</Heading>
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
          />
      </GridItem>
      <GridItem w='100%' h='10' >
      <Heading mb={6} size='md'>Preview</Heading>

        {parse(text)}
      </GridItem>


    </Grid>

  )
}
