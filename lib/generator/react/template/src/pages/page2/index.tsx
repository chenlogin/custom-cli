import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Context } from '@/store'
import { Typography } from 'antd'

const { Title } = Typography
const App: React.FC = observer(() => {
  const { state } = useContext(Context)

  return (
    <div>
      <Title level={2}>Page1 count is {state.count}</Title>
    </div>
  )
})

export default App
