import React, { FC } from 'react'
import { Input, Select } from 'antd'
interface IProps {
  selectedNode: any
}
const { Option } = Select;
const TriggerContent: FC<IProps> = ({ selectedNode }) => {
  return (
    <Input.Group compact>
      <Input style={{ width: '30%' }} defaultValue="触发条件" />
      <Select onChange={(value) => selectedNode.data.triggerType = value } defaultValue={selectedNode.data.triggerType} style={{ width: '70%' }}>
        <Option value="1">每24小时发送一次</Option>
        <Option value="2">只发送一次</Option>
        <Option value="3">不限制发送</Option>
      </Select>
    </Input.Group>
  )
}

export default TriggerContent
