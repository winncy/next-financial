"use client";

import { Button, Form, Input, Table, TableProps, Tag, Tooltip } from "antd";
import "@ant-design/v5-patch-for-react-19";

interface DataType {
  key: string;
  reportName: string;
  enterprise?: string;
  industry?: string;
  keyWords: string[];
  updated: string;
}

type FieldType = {
  reportName?: string;
};

const Page = () => {
  const dataSource: DataType[] = [
    {
      key: "1",
      reportName:
        "开源证券-九号公司-WD（689009.SH）：2024年两轮车&割草机器人持续超预期增长，全年现金分红超预期",
      enterprise: "九号公司",
      keyWords: [
        "行业分析|报告深入分析了九号公司在两轮车和割草机器人领域的市场表现及增长潜力。",
        "业绩增长|公司2024年营收和净利润显著增长，且2025年预期继续保持高增长态势。",
        "投资评级|维持“买入”评级，反映公司长期增长潜力和投资价值。",
      ],
      updated: "2025-04-05",
    },
    {
      key: "2",
      reportName:
        "山西证券-中国移动（600941.SH）：重点布局5.5G、推理算力、AI投资，新业务领域开辟新业态",
      enterprise: "中国移动",
      keyWords: [
        "5G与AI布局|重点分析中国移动在5.5G、推理算力和AI领域的投资布局。",
        "业务拓展|探讨公司在车联网、低空经济等新业务领域的突破。",
        "财务表现|关注公司资本开支缩减、分红提升以及未来业绩目标。",
      ],
      updated: "2025-04-05",
    },
    {
      key: "3",
      reportName: "浙商证券_公司点评_江苏银行(600919)_零售不良改善",
      enterprise: "江苏银行",
      keyWords: [
        "城商行|分析江苏银行作为城商行的业绩表现和市场定位。",
        "不良率改善|探讨公司零售不良率的改善及资产质量的稳定性。",
        "息差变化|关注江苏银行息差环比下降的原因及影响。",
      ],
      updated: "2025-04-05",
    },
    {
      key: "4",
      reportName:
        "光大证券-布鲁可（0325.HK）：聚焦优质IP，打造强产品力拼搭角色类玩具",
      enterprise: "布鲁可",
      keyWords: [
        "玩具行业|聚焦布鲁可在拼搭角色类玩具市场的领先地位和增长潜力。",
        "IP驱动|分析公司通过优质IP（如奥特曼、变形金刚）和产品力推动业务增长。",
        "渠道优势|强调公司线下经销渠道的广泛覆盖和市场渗透。",
      ],
      updated: "2025-04-05",
    },
    {
      key: "5",
      reportName:
        "国海证券-美年健康（002044.SZ）：AI赋能显效，体检龙头迈向数智化健管时代",
      enterprise: "美年健康",
      keyWords: ["健康管理", "业绩调整", "AI技术应用"],
      updated: "2025-04-05",
    },
    {
      key: "6",
      reportName:
        "光大证券_华测导航：业绩稳步增长，海外市场打开空间——华测导航（300627.SZ）跟踪报告之四_ws",
      enterprise: "华测导航",
      keyWords: ["高精度定位技术", "海外市场拓展", "研发投入"],
      updated: "2025-04-05",
    },
    {
      key: "7",
      reportName:
        "光大证券_千禾味业：24年营收承压，盈利能力有所改善——千禾味业（603027.SH）2024年报与25年一季报点评_ws",
      enterprise: "千禾味业",
      keyWords: ["调味品行业", "盈利能力改善", "战略调整"],
      updated: "2025-04-05",
    },
    {
      key: "8",
      reportName:
        "华龙证券_公司研究_韦尔股份（603501_SH）2024年报点评报告：智能手机、汽车市场推动CIS主业高增_2025-04-16",
      enterprise: "韦尔股份",
      keyWords: ["半导体行业", "智能手机与汽车市场", "研发投入"],
      updated: "2025-04-05",
    },
    {
      key: "9",
      reportName:
        "太平洋钢铁日报（20250417）生态环境部：钢铁行业做好加减法抓紧谋转型",
      industry: "钢铁行业",
      keyWords: ["钢铁行业转型", "绿色技术应用", "市场动态"],
      updated: "2025-04-05",
    },
  ];

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "reportName",
      title: "可研报告",
      dataIndex: "reportName",
    },
    {
      key: "keyWords",
      title: "报告关键词",
      dataIndex: "keyWords",
      width: 350,
      render: (_, { enterprise, industry, keyWords }) => {
        return (
          <div>
            {(enterprise || industry) && (
              <Tag color={enterprise ? "blue" : "gold"}>
                {enterprise || industry}
              </Tag>
            )}
            {keyWords.slice(0, 2).map((keyword, index) => {
              const s = keyword.split("|");
              return (
                <Tooltip key={keyword + index} title={s.length > 1 ? s[1] : ""}>
                  <Tag>{s[0]}</Tag>
                </Tooltip>
              );
            })}
          </div>
        );
      },
    },
    {
      key: "updated",
      title: "更新日期",
      dataIndex: "updated",
      align: "center",
      width: 150,
    },
    {
      key: "option",
      title: "操作",
      width: 200,
      align: "center",
      render: () => (
        <div>
          <Button type={"link"}>查看</Button>
          <Button type={"link"}>摘要</Button>
        </div>
      ),
    },
  ];

  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex gap-4">
            <Form.Item<FieldType>
              label="报告名称"
              name="reportName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button type="default" htmlType="reset">
                重置
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className="flex gap-4">
          <Button type={"primary"}>上传</Button>
          <Button type={"primary"}>汇总分析</Button>
        </div>
      </div>
      <Table<DataType>
        rowSelection={{ type: "checkbox" }}
        className="flex-1"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default Page;
