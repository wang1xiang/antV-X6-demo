import React, { FC } from "react";
import { Button, Tooltip } from "antd";
import { DagreLayout } from "@antv/layout";
import {
  RedoOutlined,
  UndoOutlined,
  ZoomOutOutlined,
  ZoomInOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface IProps {
  graph: any;
  editState: boolean;
  changeEditState: (state: boolean) => void;
}

const HeaderButton: FC<IProps> = ({ graph, editState, changeEditState }) => {
  const buttonList = [
    {
      title: "回退，对应键盘crtl+z",
      index: "1",
      icon: <UndoOutlined />,
    },
    {
      title: "前进，对应键盘crtl+shift+z",
      index: "2",
      icon: <RedoOutlined />,
    },
    {
      title: "缩小，对应键盘crtl+—",
      index: "3",
      icon: <ZoomOutOutlined />,
    },
    {
      title: "回退，对应键盘crtl++",
      index: "4",
      icon: <ZoomInOutlined />,
    },
    {
      title: "布局",
      index: "5",
      icon: <DeleteOutlined />,
    },
  ];

  const ToolButton = ({ title, index, icon }) => {
    return (
      <Tooltip title={title}>
        <Button
          shape="circle"
          className="header-button"
          icon={icon}
          onClick={() => changeGraph(index)}
        />
      </Tooltip>
    );
  };
  const changeGraph = (index) => {
    if (index === '5') {
      const dagreLayout = new DagreLayout({
        type: "dagre",
        rankdir: "TB",
        ranksep: 50,
        nodesep: 60,
      });
      const { cells } = graph.toJSON();

      const data = {
        edges: cells.filter(cell => cell.shape === 'edge'),
        nodes: cells.filter(cell => cell.shape !== 'edge'),
      };
      const model = dagreLayout.layout(data);
      graph.fromJSON(model);
    }
  };
  const RenderRightButton = () => {
    if (editState) {
      return (
        <>
          <Button onClick={() => changeEditState(false)}>取消</Button>
          <Button type="primary" onClick={() => changeEditState(false)}>
            保存
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button>返回</Button>
          <Button type="primary" onClick={() => changeEditState(true)}>
            编辑
          </Button>
        </>
      );
    }
  };
  return (
    <div className="header">
      <div>
        {buttonList.map((bt) => {
          const { title, icon, index } = bt;
          return <ToolButton key={index} index={index} title={title} icon={icon} />;
        })}
      </div>
      <div className="setting-button">
        <RenderRightButton />
      </div>
    </div>
  );
};

export default HeaderButton;
