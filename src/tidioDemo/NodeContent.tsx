import React, { FC } from 'react'
import { Drawer, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons';
import ConditionContent from './ConditionContent';
import TriggerContent from './TriggerContent';
import ActionContent from './ActionContent';
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
  const NodeContent = () => {
    const { data } = selectedNode;
    const comType = {
      trigger: <TriggerContent selectedNode={selectedNode}/>,
      condition: <ConditionContent selectedNode={selectedNode}/>,
      action: <ActionContent selectedNode={selectedNode} drawerVisible={drawerVisible} />
    }
    return comType[data.type];
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
          <NodeContent />
        </div>
        <div className="drawer-footer"><DrawerFooter /></div>
      </Drawer>
  );
}

export default NodeContent
