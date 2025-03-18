import React, { useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
export default function Draw() {
    const [backgroundColor, setBackgroundColor] = useState("#0D1117"); // Set custom color

  return (
    <>  
      <div style={{ height: "100vh" ,borderRadius:"0px" }} className='custom-styles rounded-full '>
        <Excalidraw theme='dark' />
      </div>
    </>
  )
}
