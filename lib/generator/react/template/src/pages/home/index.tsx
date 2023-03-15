import React from 'react'
import { Tag } from 'antd'
import HelloWorld from '@/components/HelloWorld'
import './home.scss'

function Index() {
  return (
    <div className="main">
      <div className="heading">
        <div className="region">
          <HelloWorld msg="欢迎使用 CM 脚手架!" />
          <p className="subtitle">快速搭建前端项目的脚手架工具</p>
          <p className="subtitle">
            <Tag color="blue">AntD</Tag>
          </p>
        </div>
      </div>
      <div className="content">
        <div className="left">
          <p className="desc">SPA项目</p>
          <p className="desc sm">React + TypeScript</p>
          <p className="desc sm">Antd + Mobx + React-router</p>
        </div>
        <div className="right">
          <div className="link">
            <a className="page-link" href="/other/page1">
              Go To Page1
            </a>
          </div>
          <div className="link">
            <a className="page-link" href="/other/page2">
              Go To Page2
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
