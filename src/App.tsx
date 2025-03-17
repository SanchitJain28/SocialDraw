import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./components/Home";
import FileUpload from "./components/FileUpload";
import Login from "./components/login";
import SignUp from "./components/signup";
import { Toaster } from "./components/ui/sonner"
import Draw from "./components/Draw";

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
      <Routes>
        <Route path="/login" element={
          <div>
            <Login/>
          </div>
        } />
      </Routes>
      <Routes>
        <Route path="/signup" element={
          <div>
             <Toaster />
            <SignUp/>
          </div>
        } />
      </Routes>
      <Routes>
        <Route path="/draw" element={
          <div>
             <Toaster />
            <Draw/>
          </div>
        } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
