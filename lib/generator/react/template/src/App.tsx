import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import './index.scss'
import Provider from './store'

function App() {
  return (
    <div className="App">
      <Provider>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  )
}

export default App
