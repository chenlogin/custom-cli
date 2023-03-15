/* eslint-disable prettier/prettier */
import React from 'react'
import { Outlet, useMatches, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import Nav from './Nav'

function Layout() {
  const matches = useMatches()
  const breadcrumbs = matches.slice(1).map((it, idx) => {
    return idx === matches.length - 1 ? { title: it.id } : { title: <Link to={it.pathname}>{it.id}</Link> }
  })

  return (
    <div className="App">
      <Nav />
      <div id="pageContainer" className="page-container">
        <Breadcrumb items={[{ title: <Link to={'/'}>Home</Link> }, ...breadcrumbs]}></Breadcrumb>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Layout
