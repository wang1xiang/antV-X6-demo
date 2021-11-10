import React, { FC } from 'react'
import { Select , Form} from 'antd'
interface IProps {
  selectedNode: any
}
const { Option } = Select;
const { Item } = Form;
const ConditionContent: FC<IProps> = ({ selectedNode }) => {
  console.log(selectedNode.data.condition);
  const onFormLayoutChange = (value) => {
    selectedNode.data.condition = {...selectedNode.data.condition, ...value};
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={ selectedNode.data.condition }
      onValuesChange={onFormLayoutChange}
    >
      <Item label="条件" name="type">
        <Select>
          <Option value="equal">等于</Option>
          <Option value="notEqual">不等于</Option>
        </Select>
      </Item>
      <Item label="值" name="value">
        <Select>
          <Option value="windows">Windows</Option>
          <Option value="linux">Linux</Option>
          <Option value="max">MaxOS</Option>
        </Select>
      </Item>
    </Form>
  )
}

export default ConditionContent
