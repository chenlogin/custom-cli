import React, { useContext } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Badge, Button, Space } from 'antd'
import { Context } from '@/store'

const ButtonGroup = Button.Group

const App: React.FC = () => {
  const { state, dispatch } = useContext(Context)

  const increase = () => {
    dispatch({
      type: 'increment',
      payload: state.count
    })
  }

  const decline = () => {
    let newCount = state.count - 1
    if (newCount < 0) {
      newCount = 0
      return
    }
    dispatch({
      type: 'decrement',
      payload: state.count
    })
  }

  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <Space direction="vertical">
        <Space size="large">
          <Badge count={state.count} />
          <ButtonGroup>
            <Button onClick={decline} icon={<MinusOutlined />} />
            <Button onClick={increase} icon={<PlusOutlined />} />
          </ButtonGroup>
        </Space>
      </Space>
    </div>
  )
}

export default App
