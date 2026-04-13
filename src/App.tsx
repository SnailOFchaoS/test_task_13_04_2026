import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import {MainPage, PostPage} from './pages'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
