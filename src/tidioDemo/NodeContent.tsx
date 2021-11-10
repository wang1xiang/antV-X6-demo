import React, { FC, useState, useRef } from 'react'
import { Drawer, Tooltip, Input, Tag } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons';

interface IProps {
  selectedNode: any;
  drawerVisible: boolean
  graph: any
  setDrawerVisible: (data: any) => void;
  changeNode: (visible: boolean) => void;
}

const NodeContent: FC<IProps> = ({ drawerVisible, setDrawerVisible, selectedNode, changeNode, graph }) => {
  const Title = () => {
    const { data } = selectedNode;
    return <>
      <p className="drawer-title">{data.title}</p>
      <Tooltip title={data.tooltip}>
        <QuestionCircleOutlined />
      </Tooltip>
    </>
  }
  const DrawerFooter = () => {
    const { data } = selectedNode;
    return <>
      <Icon component={data.footerIcon} />{data.footerContent}
    </>
  }

  const handleRemove = removedTag => {
    const { data } = selectedNode;
    data.answer = data.answer.filter(tag => tag !== removedTag);
  }
  const [inputVisible , setInputVisible] = useState(false);
  const refInput = useRef(null);
  const handleInputConfirm = () => {
    const { data } = selectedNode;
    data.answer.push(refInput.current.state.value);
    setInputVisible(false);
  };
  const DrawerContent = () => {
    const { data } = selectedNode;
    const tag = data.answer.map(ans => <Tag key={ans} closable onClose={() => handleRemove(ans)} color="cyan">{ans}</Tag>)
    return (
      <>
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
          <PlusOutlined /> New Tag
        </Tag>
      )}
      </>
    )
  }
  
  const handleClose = () => {
    setDrawerVisible(false);
    graph.cleanSelection();
  }
  return (
      <Drawer
        title={<Title />}
        placement="right"
        maskClosable={false}
        width={420}
        onClose={() => handleClose()}
        visible={drawerVisible}
        style={{ position: 'absolute' }}
      >
        
        <div className="drawer-content">
          <DrawerContent />
        </div>
        <div className="drawer-footer"><DrawerFooter /></div>
      </Drawer>
  );
}

export default NodeContent
