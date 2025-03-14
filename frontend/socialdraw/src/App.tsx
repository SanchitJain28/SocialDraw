import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./components/Home";
import FileUpload from "./components/FileUpload";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
         <LandingPage/>
        } />
      </Routes>
      <Routes>
        <Route path="/uploadFile" element={<FileUpload/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
