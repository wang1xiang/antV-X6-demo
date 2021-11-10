import { ports } from "./registerNode";
const generateStencil = (graph, stencil) => {
  const r1 = graph.createNode({
    shape: "custom-rect",
    label: "开始",
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
    tools: [
      { name: 'boundary' },
      {
        name: 'button-remove',  // 工具名称
        args: { x: 10, y: 10 }, // 工具对应的参数
      },
    ],
  });
  const r2 = graph.createNode({
    shape: "custom-rect",
    label: "过程",
  });
  const r3 = graph.createNode({
    shape: "custom-rect",
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: "可选过程",
  });
  const r4 = graph.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "0,10 10,0 20,10 10,20",
      },
    },
    label: "决策",
  });
  const r5 = graph.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "10,0 40,0 30,20 0,20",
      },
    },
    label: "数据",
  });
  const r6 = graph.createNode({
    shape: "custom-circle",
    label: "连接",
  });
  stencil.load([r1, r2, r3, r4, r5, r6], "group1");

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
      label: item.label,
      // html节点添加ports
      ports: { ...ports },
    })
  );

  stencil.load(htmlNodes, "group3");
};

export default generateStencil;
