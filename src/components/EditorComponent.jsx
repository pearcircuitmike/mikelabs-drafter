import React, {useState} from 'react'
import '../css/Editor.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, useToast} from '@chakra-ui/react'
import useInterval from '@use-it/interval';
import { doc, setDoc} from 'firebase/firestore'
import { db } from "../utils/init-firebase"
import {typewriter} from "./typewriter";

const { Configuration, OpenAIApi } = require("openai");

export default function EditorComponent(props){
  const toast = useToast()
  const [editorInst, setEditorInst] = useState()
  const [text, setText] = useState(props.outline)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const [generation, setGeneration] = useState('')
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  useInterval(() => {
    // disabled autosave for now
    //handleSave()
  }, 5000);

    const handleSave = () =>{
      try{
        setDoc(doc(db, `${props.authorId}/${props.articleId}`),{
          text: text
        }, {merge:true})
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

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData()
    setText(data)
  }



  const handlePrompt = async (event, editor) =>{
    event.preventDefault()
    setIsSubmitting(true)

    editor = editorInst
    const selection = editor.model.document.selection;
    let prompt = ''
    try{
        prompt = selection.anchor.nodeBefore._data
    }
    catch{
      prompt = ''
    }

    try{
      const res = await openai.createCompletion("text-davinci-002", {
        prompt: `This is a blog post called ${props.title}. The blog description is: ${props.description}.
                Help the writer complete the blog by providing logical, professional, insightful text.
                Create a logical completion for the following, and respond without repeating the prompt.
                Use your outside knowledge to provide facts that support the main claims.
                ${prompt}.
              `,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 2,
        presence_penalty: 2,
      });
      setIsSubmitting(false)
      const content = res.data.choices[0].text.trim();

      typewriter(content.split(" "), char => {
        const viewFragment = editor.data.processor.toView(`${char}<pre> </pre>`);
        const modelFragment = editor.data.toModel( viewFragment );
        editor.model.insertContent( modelFragment );
      }, 25)
      setGeneration(content);

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
    <div style={{marginTop: "12px"}}>
          <CKEditor
            editor={ClassicEditor}
            onReady= { editor =>{ setEditorInst(editor)}}
            data={text}
            onChange={handleCkeditorState}
          />
          <Button onClick={handlePrompt} isLoading = {isSubmitting} mr={3} mt={3} colorScheme="primary">Generate</Button>

          <Button onClick={handleSave} isLoading = {isSubmitting} mt={3}>Save</Button>
    </div>

  )
}
