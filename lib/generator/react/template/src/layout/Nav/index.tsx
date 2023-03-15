/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { NavLink, useMatches, useMatch } from 'react-router-dom'
import router from '@/router'

const Empty = () => '' as unknown as JSX.Element

const Nav = () => {
  const { routes = [] } = router
  const matches = useMatches()
  const child = routes.find(route => route.path === matches[0].pathname)

  return (
    <React.Fragment>
      <Empty />
      <ul className="sider">
        {child?.children?.map(({ id, path }) => (
          <li key={id}>
            <NavLink
              to={`${matches[0]?.pathname}\\${path as string}`}
              className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
            >
              {id}
            </NavLink>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default Nav
