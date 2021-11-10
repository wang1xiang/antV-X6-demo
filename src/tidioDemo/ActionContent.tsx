import React, { FC, useState, useRef, useEffect } from 'react'
import { Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input;

interface IProps {
  selectedNode: any
  drawerVisible: boolean
}
const ActionContent: FC<IProps> = ({ selectedNode, drawerVisible }) => {
  const refText = useRef(null);
  const refInput = useRef(null);
  const handleRemove = removedTag => {
    const { data } = selectedNode;
    data.answer = data.answer.filter(tag => tag !== removedTag);
  }
  const [inputVisible , setInputVisible] = useState(false);
  const handleInputConfirm = () => {
    const { data } = selectedNode;
    data.answer.push(refInput.current.state.value);
    setInputVisible(false);
  };
  const handleTextConfirm = () => {
    const { data } = selectedNode;
    data.content = refText.current?.resizableTextArea.props.value
  }

  useEffect(() => {
    if (drawerVisible) {
      setTimeout(() => {
        refText.current!.focus({
          cursor: 'end',
        });
      }, 200)
    }
  }, [drawerVisible])
  const { data } = selectedNode;
  const tag = data.answer.map(ans => <Tag key={ans} closable onClose={() => handleRemove(ans)} color="cyan">{ans}</Tag>)
  return (
    <>
    <TextArea ref={refText} style={{ marginBottom: '6px' }} rows={4} defaultValue={selectedNode.data.content} onBlur={() => handleTextConfirm()} />
    {tag}
    {inputVisible && (
      <Input
        ref={refInput}
        type="text"
        size="small"
        onBlur={() => handleInputConfirm()}
        onPressEnter={() => handleInputConfirm()}
      />
    )}
    {!inputVisible && (
      <Tag className="site-tag-plus" color="cyan" onClick={() => setInputVisible(true)}>
        <PlusOutlined /> 添加快捷回复
      </Tag>
    )}
    </>
  )
}

export default ActionContent
