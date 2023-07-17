import React, { useCallback, useEffect, useState } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";     //quill css file location
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';

//some extra tools or features we added as array of array
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {
  const {id: documentId} = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io("http://localhost:3001/")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])


  useEffect(() => {
      if(socket == null || quill == null) return 

      socket.once("load-document", document => {
        quill.setContents(document)
        quill.enable()
      })

      socket.emit("get-document", documentId)
  }, [socket, quill, documentId])


//this is for receiving the changes in the document
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])


  //this will run whenever there is a text change by the user, we can get this code template in quill documentation
  useEffect(() => {
    if (socket == null || quill == null) return

    //delta (small change) is something that is changing in the document
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div");
    wrapper.append(editor)
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
    q.disable()
    q.setText('Loading...')
    setQuill(q)
  }, [])


  return <div className="container" ref={wrapperRef}></div>
}


//we've written the wrapperRef so that the tools bar doesn't occur more than once
//this is the setup of quill