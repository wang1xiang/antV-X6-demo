import React, { useEffect, useRef } from "react";
import ports from "../utils/ports";
import { Addon } from "@antv/x6";
import { InfoCircleTwoTone } from "@ant-design/icons";

const Stencil = ({ graph }) => {
  const refStencil = useRef(null);

  useEffect(() => {
    if (graph.container) {
      const stencil = new Addon.Stencil({
        title: "tu ",
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            title: "Tiggers",
            name: "group1",
          },
          {
            title: "Conditions",
            name: "group2",
            graphHeight: 250,
            layoutOptions: {
              rowHeight: 70,
            },
          },
          {
            title: "Actions",
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
    
      refStencil.current!.appendChild(stencil.container);
      const r6 = graph.createNode({
        shape: "custom-rect",
        label: "首次访问",
        width: 60,
        height: 60,
        data: {
          type: "trigger",
          triggerType: "",
          footerIcon: InfoCircleTwoTone,
          footerContent: "这是footer",
        },
      });
      const r7 = graph.createNode({
        shape: "custom-rect",
        label: "鼠标离开窗口",
        width: 60,
        height: 60,
        data: {
          type: "trigger",
          triggerType: "",
          title: "鼠标离开窗口",
          tooltip: "鼠标离开窗口时触发",
          footerIcon: InfoCircleTwoTone,
          footerContent: "这是footer",
        },
      });
      stencil.load([r6, r7], "group1");
  
      const imageShapes = [
        {
          label: "System",
          image:
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik00IDZoMThWNEg0Yy0xLjEgMC0yIC45LTIgMnYxMUgwdjNoMTR2LTNINFY2em0xOSAyaC02Yy0uNTUgMC0xIC40NS0xIDF2MTBjMCAuNTUuNDUgMSAxIDFoNmMuNTUgMCAxLS40NSAxLTFWOWMwLS41NS0uNDUtMS0xLTF6bS0xIDloLTR2LTdoNHY3eiIvPgo8L3N2Zz4=",
          data: {},
        },
      ];
      const imageNodes = imageShapes.map((item) =>
        graph.createNode({
          shape: "custom-image",
          label: item.label,
          width: 60,
          height: 60,
          data: {
            type: "condition",
            title: "操作系统",
            tooltip: "用来判断操作系统版本",
            content: "",
            answer: ["Yes", "No"],
            footerIcon: InfoCircleTwoTone,
            footerContent: "判断客户需求",
            condition: {
              type: "",
              value: "",
            },
          },
          attrs: {
            image: {
              "xlink:href": item.image,
            },
          },
        })
      );
      stencil.load(imageNodes, "group2");
  
      const htmlNode = [
        {
          title: "快捷回复",
          tooltip: "设置答复供使用者选择",
          content: "欢迎来到我的小店",
          answer: ["随便逛逛", "推荐给我", "哈哈"],
        },
        {
          title: "文字信息",
          tooltip: "直接发送给访问者的信息",
          content: "",
          answer: ["期待您的下次光临", "哈哈"],
        },
      ];
      const htmlNodes = htmlNode.map(({ title, tooltip, content, answer }) =>
        graph.createNode({
          shape: "html",
          html: "my-html",
          width: 60,
          height: 60,
          attrs: {
            text: {
              fontSize: 12,
              fill: "#262626",
            },
          },
          data: {
            type: "action",
            title,
            tooltip,
            content,
            answer,
            footerIcon: InfoCircleTwoTone,
            footerContent: "这是footer",
          },
          // html节点添加ports
          ports: { ...ports },
        })
      );
  
      stencil.load(htmlNodes, "group3");
    }
  }, [graph]);
  return <div className="stencil" ref={refStencil}></div>;
};

export default Stencil;
