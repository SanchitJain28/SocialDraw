import React, { useEffect, useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { h4, WarningButton } from '../Themeclasses';
import { useDebounce } from "@uidotdev/usehooks";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'react-router';
import { Axios } from '../ApiFormat';


export default function Draw() {
  let [searchParams] = useSearchParams();

  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)
  const [sceneElements, setSceneElements] = useState<any>()
  const debouncedSceneElements = useDebounce(sceneElements, 1000);
  const notify = () => toast("Saving");

  const handleOnchange = (excalidrawElements) => {
    setSceneElements(excalidrawElements)
  }
  useEffect(() => {
   console.log(searchParams.get("id"))
  }, [])
  useEffect(()=>{
    const updateDrawing=async()=>{
      if (debouncedSceneElements) {
        // setSceneElements(excalidrawAPI.getSceneElements())
        const response=await Axios.post(`/api/update-drawing?id=${searchParams.get("id")}`,{
          drawings:sceneElements
        })
        console.log(response)
        notify()
        console.log(sceneElements)
      }
    }
    updateDrawing()
  },[debouncedSceneElements])
  return (
    <>
      <div style={{ height: "100vh", borderRadius: "0px" }} className='custom-styles rounded-full '>
        <p className={h4 +"absolute top-0 "} >Hi</p>
        <Excalidraw theme='dark' excalidrawAPI={(api) => setExcalidrawAPI(api)} onChange={handleOnchange} />
      </div>
      <ToastContainer autoClose={500}/>
      <button className={WarningButton} onClick={() => console.log(excalidrawAPI.getSceneElements())}>Change background to white</button>
    </>
  )
}
