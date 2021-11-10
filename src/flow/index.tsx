import { useRef, useEffect, useState } from "react";
import insertCss from "insert-css";
import { Graph, Shape, Addon } from "@antv/x6";
// import { DagreLayout } from '@antv/layout'
import registerNode from "./registerNode";
import generateBindKey from "./generateBindKey";
import generateEvent from "./generateEvent";
import generateStencil from "./generateStencil";

import "./index.less";

const initCss = () => {
  insertCss(`
  .x6-widget-stencil  {
    background-color: #fff;
  }
  .x6-widget-stencil-title {
    background-color: #fff;
  }
  .x6-widget-stencil-group-title {
    background-color: #fff !important;
  }
  .x6-widget-transform {
    margin: -1px 0 0 -1px;
    padding: 0px;
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div {
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div:hover {
    background-color: #3dafe4;
  }
  .x6-widget-transform-active-handle {
    background-color: #3dafe4;
  }
  .x6-widget-transform-resize {
    border-radius: 0;
  }
  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }
  .x6-widget-selection-box {
    opacity: 0;
  }
  .my-btn{
    position: relative;
    display: inline-block;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .3s;
    margin-top: 0;
    letter-spacing: 3px
  }

  .my-btn:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
  }
`);
};
const Flow = () => {
  initCss();
  const refContainer = useRef(null);
  const refStencil = useRef(null);

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
        router: {
          name: 'er',
          args: {
            direction: 'V',
          },
        },
        connector: {
          name: "rounded", // 圆角连接器
          args: {
            radius: 20, // 半径
          },
        },
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        snap: {
          radius: 20,
        },
        createEdge() {
          return new Shape.Edge({
            labels: [
              {
                attrs: { label: { text: 'edge' } },
              },
            ],
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
      resizing: true, // 缩放
      rotating: true, // 旋转节点
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
    // #region 初始化 stencil
    const stencil = new Addon.Stencil({
      title: "流程图",
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: "基础流程图",
          name: "group1",
        },
        {
          title: "系统设计图",
          name: "group2",
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
        {
          title: "自定义节点",
          name: "group3",
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    // @ts-ignore
    refStencil.current!.appendChild(stencil.container);
    generateBindKey(graph);
    generateEvent(graph, refContainer);
    registerNode();
    generateStencil(graph, stencil);
    setGraph(graph);
    return graph;
  };

  const beautifiCation = () => {
    const model = graph.toJSON();
    console.log(model);
    // const dagreLayout  = new DagreLayout({
    //   type: 'dagre',
    //   rankdir: 'LR',
    //   align: 'UL',
    //   ranksep: 30,
    //   nodesep: 15,
    //   controlPoints: true,
    // })
    // console.log(model);
    // const newModel = dagreLayout.layout(model)
    // graph.fromJSON(newModel)
  }
  return (
    <div className="container">
      <button onClick={beautifiCation}>一键美化</button>
      <div className="stencil" ref={refStencil}></div>
      <div className="graph-container" ref={refContainer}></div>
    </div>
  );
};

export default Flow;
