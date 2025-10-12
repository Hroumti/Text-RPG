import Render from "./components/render"
import Notice from "./components/notice";
import { ContextProvider } from "./components/context"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatBar from "./components/statBar";
import Home from "./components/home";
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <ContextProvider>  
        <div className="root-container">
          <StatBar/>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/render'} element={<Render/>}/>
            <Route path={'/notice'} element={<Notice/>}/>

          </Routes>
        </div>
      </ContextProvider>
    </BrowserRouter>
    
  )
}

export default App
