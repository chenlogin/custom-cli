import React from 'react'
import { Home, Page1, Page2 } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'

const router = createBrowserRouter([
  {
    id: 'Home',
    path: '/',
    element: <Home />
  },
  {
    id: 'Other',
    path: '/other',
    element: <Layout />,
    children: [
      {
        id: 'Page1',
        path: 'page1',
        element: <Page1 />
      },
      {
        id: 'Page2',
        path: 'page2',
        element: <Page2 />
      }
    ]
  }
])
export default router
