import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {MainPage, PostPage} from './pages'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
