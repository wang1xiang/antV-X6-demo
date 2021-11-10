import { ports } from "./registerNode";
import { InfoCircleTwoTone } from "@ant-design/icons";
const generateStencil = (graph, stencil) => {
  const r6 = graph.createNode({
    shape: "custom-circle",
    label: "连接",
    data: {
      type: 'action',
      title: 'ceshititle',
      tooltip: 'ceshitooltip',
      content: 'hello, nihao',
      answer: [
        '这是第一条测试',
        '这是第二条测试',
        '这是第三条测试',
      ],
      footerIcon: InfoCircleTwoTone,
      footerContent: '这是footer'
    }
  });
  stencil.load([r6], "group1");

  const imageShapes = [
    {
      label: "Client",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg",
    },
    {
      label: "Http",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
    },
    {
      label: "Api",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg",
    },
    {
      label: "Sql",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg",
    },
    {
      label: "Clound",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg",
    },
    {
      label: "Mq",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg",
    },
  ];
  const imageNodes = imageShapes.map((item) =>
    graph.createNode({
      shape: "custom-image",
      label: item.label,
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
      label: "html",
    },
  ];
  const htmlNodes = htmlNode.map((item) =>
    graph.createNode({
      shape: "html",
      html: "my-html",
      width: 45,
      height: 45,
      attrs: {
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      data: {
        type: 'action',
        title: 'ceshititle',
        tooltip: 'ceshitooltip',
        content: 'hello, nihao',
        answer: [
          '这是第一条测试',
          '这是第二条测试',
          '这是第三条测试',
        ],
        footerIcon: InfoCircleTwoTone,
        footerContent: '这是footer'
      },
      // html节点添加ports
      ports: { ...ports },
    })
  );

  stencil.load(htmlNodes, "group3");
};

export default generateStencil;
