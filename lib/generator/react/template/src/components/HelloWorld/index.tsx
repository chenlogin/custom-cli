import React from 'react'
import './index.scss'

const Empty = () => '' as unknown as JSX.Element

const HelloWorld = ({ msg }: { msg: string }) => (
  <React.Fragment>
    <Empty />
    <h1 className="msg">{msg}</h1>
  </React.Fragment>
)

export default HelloWorld
