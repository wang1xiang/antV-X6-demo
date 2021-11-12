import { Graph } from "@antv/x6";
import ports from './ports';

// 注册节点
const registerNode = () => {
  Graph.registerNode(
    "custom-rect",
    {
      inherit: "rect",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-polygon",
    {
      inherit: "polygon",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: {
        ...ports,
        items: [
          {
            group: "top",
          },
          {
            group: "bottom",
          },
        ],
      },
    },
    true
  );

  Graph.registerNode(
    "custom-circle",
    {
      inherit: "circle",
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-image",
    {
      inherit: "rect",
      width: 52,
      height: 52,
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "image",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        body: {
          stroke: "#5F95FF",
          fill: "#5F95FF",
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: "left",
          textVerticalAnchor: "top",
          fontSize: 12,
          fill: "#fff",
        },
      },
      ports: { ...ports },
    },
    true
  );
  Graph.registerHTMLComponent('my-html', (node) => {
    const wrap = document.createElement('div')
    wrap.style.height = '100%'
    wrap.innerHTML = `
      <div class="my-btn">
        ${node.data.title}
      </div>
      <div class="my-content">
        ${node.data.tooltip}
      </div>
      `
    return wrap
  })
}
export default registerNode;