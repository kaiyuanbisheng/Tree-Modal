import React, { useState } from 'react'
import ThreeModal from './component/threeModal'
import { Button } from 'antd'
import './App.css';
const App = () => {
  const [visible, setVisible] = useState(false)
  const openModal = () => {
    setVisible(true)
  }
  return (
    <div>
      <Button type='primary' onClick={openModal}>Open Modal</Button>
      <ThreeModal visible={visible} setVisible={setVisible} />
    </div>
  )
}
export default App
