import React, {useState} from 'react'
import '../css/Editor.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, useToast} from '@chakra-ui/react'
import useInterval from '@use-it/interval';
import { doc, setDoc} from 'firebase/firestore'
import { db } from "../utils/init-firebase"

const { Configuration, OpenAIApi } = require("openai");

export default function EditorComponent(props){
  const toast = useToast()
  const [editorInst, setEditorInst] = useState()
  const [text, setText] = useState(props.outline)

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
        prompt: `This is a blog post called ${props.title}, with an outline as follows: ${props.outline} .
                Avoid repeating the same text. Help the writer complete the blog by providing logical, professional, insightful
                text that comes after: ${prompt}.
              `,
        temperature: 0.4,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });

      const content = res.data.choices[0].text.trim();
      setGeneration(content);
      console.log(generation)
      const viewFragment = editor.data.processor.toView( content );
      const modelFragment = editor.data.toModel( viewFragment );
      editor.model.insertContent( modelFragment );
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
          <Button onClick={handlePrompt}>Generate</Button>

          <Button onClick={handleSave}>Save</Button>
    </div>

  )
}
