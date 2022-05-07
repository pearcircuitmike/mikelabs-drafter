import React, {useState, useRef, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
import strip from 'strip'
import TypeAnimation from 'react-type-animation';

import {
Grid, GridItem, Button,
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

import { useHistory } from 'react-router-dom'

export default function EditorComponent(props){

  const history = useHistory()
  const [editorInst, setEditorInst] = useState()
  const [text, setText] = useState(props.outline)
  const [cursorPos, setCursorPos] = useState('')
  const [generation, setGeneration] = useState('placeholder')

  let handleCkeditorState = (event, editor) => {
    const data = editor.getData()
    setText(data)
    setCursorPos(editor.model.document.selection.getFirstPosition().path[1])
  }

  let handlePrompt = (event, editor) =>{
    editor = editorInst
    // generate prompt

    editor.model.change(
       writer => {writer.insertText(generation, editor.model.document.selection.getFirstPosition()
     )})
  }

  useEffect(() => {
    console.log(text)
  })

  return (
    <Grid templateColumns='repeat(2, 2fr)' gap={12} mt={10}>
      <GridItem w='100%' h='10' >
      <Heading mb={6} size='md'>Editor</Heading>
          <CKEditor
            editor={ClassicEditor}
            onReady= { editor =>{ setEditorInst(editor)}}
            data={text}
            onChange={handleCkeditorState}
          />
          <Button onClick={handlePrompt}>Generate</Button>

      </GridItem>
      <GridItem w='100%' h='10' >
      <Heading mb={6} size='md'>Preview</Heading>
        {text && parse(text)}
      </GridItem>

    </Grid>

  )
}
