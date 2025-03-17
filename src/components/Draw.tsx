import React, { useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
export default function Draw() {
    const [backgroundColor, setBackgroundColor] = useState("#0D1117"); // Set custom color

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
      <div style={{ height: "600px" }} className='custom-styles rounded-full m-12'>
        <Excalidraw initialData={{
          appState: { viewBackgroundColor: backgroundColor },
        }}/>
      </div>
    </>
  )
}
