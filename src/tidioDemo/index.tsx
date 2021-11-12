import { useRef, useEffect, useState } from "react";
import { Graph, Shape } from "@antv/x6";

import HeaderButton from './components/HeaderButton';
import Stencil from "./components/Stencil";
import NodeContent from './components/NodeContent';
import GenerateEdgeLabel from './components/GenerateEdgeLabel';

import registerNode from "./utils/generateNode";
import generateBindKey from "./utils/generateBindKey";
import clearEvent from "./utils/clearEvent";
import generateEvent from "./utils/generateEvent";

import "./index.less";

const Flow = () => {
  const refContainer = useRef(null);

  const [graph , setGraph] = useState<any>({});
  // 为了协助代码演示
  useEffect(() => {
    const graph = initGraph();
    return () => graph.dispose();
  }, [])
  const initGraph = () => {
    const graph = new Graph({
      container: refContainer.current!,
      grid: true,
      history: true, // 开启画布撤销功能
      mousewheel: {
        enabled: true, // 是否开启滚轮缩放交互
        zoomAtMousePosition: true, // 是否将鼠标位置作为中心缩放
        modifiers: "ctrl", // 同时按crtl和鼠标滚轮时才触发
        minScale: 0.5, // 最小倍数
        maxScale: 3, // 最大倍数
      },
      connecting: {
        // router: "manhattan", // 智能正交路由，由水平或垂直的正交线段组成，并自动避开路径上的其他节点
        // router: {
        //   name: 'er',
        //   args: {
        //     direction: 'V',
        //   },
        // },
        connector: {
          name: "smooth", // 圆角连接器
          args: {
            radius: 20, // 半径
          },
        },
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        snap: {
          radius: 40, // 自动吸附
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#A2B1C3",
                strokeWidth: 2,
                targetMarker: {
                  name: "block",
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
            tools: [
              { name: 'vertices' },
              {
                name: 'button-remove',  // 工具名称
                args: { x: 10, y: 10 }, // 工具对应的参数
              },
            ],
          });
        },
        validateConnection({ targetMagnet }) {
          // 移动边时判断是否有效
          return !!targetMagnet;
        },
      },
      highlighting: {
        // 高亮设置
        magnetAdsorbed: {
          // 连线过程自动吸附设置
          name: "stroke",
          args: {
            attrs: {
              fill: "#5F95FF",
              stroke: "#5F95FF",
            },
          },
        },
      },
      resizing: false, // 缩放
      rotating: false, // 旋转节点
      selecting: {
        // 点选/框选
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true, // 对齐线
      keyboard: true,
      clipboard: true,
    });
    
    generateBindKey(graph);
    generateEvent(graph, refContainer, setSelectedEdge, setSelectedNode, setDrawerVisible);
    registerNode();
    setGraph(graph);
    return graph;
  };

  // 边
  const [selectedEdge, setSelectedEdge] = useState<any>(null);
  const changeEdge = (label) => {
    selectedEdge.insertLabel(
      label,
      {
        silent: true // 为 true 时不触不触发 'change:labels' 事件和画布重绘。
      }
    );
  }

  // 节点
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const changeNode = (data) => {
    selectedNode.data = data;
  }
  const [drawerVisible , setDrawerVisible] = useState(false);

  // 编辑状态
  const [editState , setEditState] = useState(true);
  const changeEditState = (state) => {
    // 切换编辑状态时切换自定义事件
    if (state) {
      generateEvent(graph, refContainer, setSelectedEdge, setSelectedNode, setDrawerVisible);
    } else {
      clearEvent(graph);
    }
    setEditState(state);
  }
  return (
    <>
      <HeaderButton graph={graph} editState={editState} changeEditState={changeEditState}/>
      <GenerateEdgeLabel selectedEdge={selectedEdge} changeEdge={changeEdge}/>
      <div className="container">
        <Stencil graph={graph}/>
        <div className="graph-container" ref={refContainer}>
        <NodeContent drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} selectedNode={selectedNode} changeNode={changeNode} graph={graph}/>
        </div>
      </div>
    </>
  );
};

export default Flow;
