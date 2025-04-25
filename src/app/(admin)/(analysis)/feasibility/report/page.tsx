"use client";

import { Button, Form, Input, Table, TableProps, Tag, Tooltip } from "antd";
import "@ant-design/v5-patch-for-react-19";
import useModal from "antd/es/modal/useModal";
import ReportDetail from "@/app/(admin)/(analysis)/feasibility/report/ReportDetail";
import dayjs from "dayjs";
import ReportHeader from "@/app/(admin)/(analysis)/feasibility/report/ReportHeader";
import ReportSummary from "@/app/(admin)/(analysis)/feasibility/report/ReportSummary";

export interface ReportDataType {
  key: string;
  reportId?: string;
  reportName: string;
  enterprise?: string;
  industry?: string;
  keyWords: string[];
  updated: string;
  answerBotUrl?: string;
  analyseBotUrl?: string;
}

type FieldType = {
  reportName?: string;
};

const Page = () => {
  const [modal, contextHolder] = useModal();

  const showReportSummary = (report: ReportDataType) => {
    modal.info({
      title: <ReportHeader report={report} />,
      width: "60%",
      icon: <></>,
      centered: true,
      destroyOnClose: true,
      closable: true,
      footer: <></>,
      content: (
        <div className="h-[80vh]">
          <ReportSummary report={report} />
        </div>
      ),
    });
  };

  const showReportDetail = (report: ReportDataType) => {
    modal.info({
      title: <ReportHeader report={report} />,
      width: "80%",
      icon: <></>,
      centered: true,
      destroyOnClose: true,
      closable: true,
      footer: <></>,
      content: (
        <div className="h-[80vh]">
          <ReportDetail report={report} />
        </div>
      ),
    });
  };

  const dataSource: ReportDataType[] = [
    {
      key: "1",
      reportId: "1",
      reportName:
        "开源证券-九号公司-WD（689009.SH）：2024年两轮车&割草机器人持续超预期增长，全年现金分红超预期",
      enterprise: "九号公司",
      industry: "电子设备、仪器和元件",
      keyWords: [
        "行业分析|报告深入分析了九号公司在两轮车和割草机器人领域的市场表现及增长潜力。",
        "业绩增长|公司2024年营收和净利润显著增长，且2025年预期继续保持高增长态势。",
        "投资评级|维持“买入”评级，反映公司长期增长潜力和投资价值。",
      ],
      updated: "2025-04-13",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=5ef4fee21ff011f084b7c6f9a361c9f8&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=254f663c204011f0967b3ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "2",
      reportId: "2",
      reportName:
        "山西证券-中国移动（600941.SH）：重点布局5.5G、推理算力、AI投资，新业务领域开辟新业态",
      enterprise: "中国移动",
      industry: "多元电信服务",
      keyWords: [
        "5G与AI布局|重点分析中国移动在5.5G、推理算力和AI领域的投资布局。",
        "业务拓展|探讨公司在车联网、低空经济等新业务领域的突破。",
        "财务表现|关注公司资本开支缩减、分红提升以及未来业绩目标。",
      ],
      updated: "2025-04-14",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=c264efd6204111f094323ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=e5a57b50204111f0acd93ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "3",
      reportId: "3",
      reportName: "浙商证券_公司点评_江苏银行(600919)_零售不良改善",
      enterprise: "江苏银行",
      industry: "商业银行",
      keyWords: [
        "城商行|分析江苏银行作为城商行的业绩表现和市场定位。",
        "不良率改善|探讨公司零售不良率的改善及资产质量的稳定性。",
        "息差变化|关注江苏银行息差环比下降的原因及影响。",
      ],
      updated: "2025-04-19",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=fe345ede204111f0bacc3ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=12d5d0f2204211f09b133ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "4",
      reportId: "4",
      reportName:
        "光大证券-布鲁可（0325.HK）：聚焦优质IP，打造强产品力拼搭角色类玩具",
      enterprise: "布鲁可",
      industry: "家庭耐用消费品",
      keyWords: [
        "玩具行业|聚焦布鲁可在拼搭角色类玩具市场的领先地位和增长潜力。",
        "IP驱动|分析公司通过优质IP（如奥特曼、变形金刚）和产品力推动业务增长。",
        "渠道优势|强调公司线下经销渠道的广泛覆盖和市场渗透。",
      ],
      updated: "2025-04-18",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=2f9f31a6204211f0a1e93ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=436f9680204211f096793ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "5",
      reportId: "5",
      reportName:
        "国海证券-美年健康（002044.SZ）：AI赋能显效，体检龙头迈向数智化健管时代",
      enterprise: "美年健康",
      industry: "医疗保健提供商与服务",
      keyWords: ["健康管理", "业绩调整", "AI技术应用"],
      updated: "2025-04-19",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=5aec1202204211f0aed43ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=722562de204211f0988e3ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "6",
      reportId: "6",
      reportName:
        "光大证券_华测导航：业绩稳步增长，海外市场打开空间——华测导航（300627.SZ）跟踪报告之四_ws",
      enterprise: "华测导航",
      industry: "电子设备、仪器和元件",
      keyWords: ["高精度定位技术", "海外市场拓展", "研发投入"],
      updated: "2025-04-19",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=89b2b5dc204211f0b08f3ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=9bde703e204211f082363ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "7",
      reportId: "7",
      reportName:
        "光大证券_千禾味业：24年营收承压，盈利能力有所改善——千禾味业（603027.SH）2024年报与25年一季报点评_ws",
      enterprise: "千禾味业",
      industry: "食品",
      keyWords: ["调味品行业", "盈利能力改善", "战略调整"],
      updated: "2025-04-19",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=b1f74db4204211f086e53ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=c232fd72204211f0927c3ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "8",
      reportId: "8",
      reportName:
        "华龙证券_公司研究_韦尔股份（603501_SH）2024年报点评报告：智能手机、汽车市场推动CIS主业高增_2025-04-16",
      enterprise: "韦尔股份",
      industry: "半导体产品与半导体设备",
      keyWords: ["半导体行业", "智能手机与汽车市场", "研发投入"],
      updated: "2025-04-16",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=dd00dcc8204211f097d13ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        "http://localhost/chat/share?shared_id=f5a67f6c204211f086c23ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
    },
    {
      key: "9",
      reportId: "9",
      reportName:
        "太平洋钢铁日报（20250417）生态环境部：钢铁行业做好加减法抓紧谋转型",
      industry: "金属、非金属与采矿",
      keyWords: ["钢铁行业转型", "绿色技术应用", "市场动态"],
      updated: "2025-04-17",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=10fb3e38204311f0b7113ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        'http://localhost/chat/share?shared_id=201e3fd2204311f09ca83ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm"',
    },
    {
      key: "10",
      reportId: "10",
      reportName:
        "国金证券-美年健康（002044.SZ）：专业体检行业龙头，内生外延打开增长新格局",
      enterprise: "美年健康",
      industry: "医疗保健提供商与服务",
      keyWords: ["专业体检", "老龄化", "数字化转型"],
      updated: "2023-10-12",
      answerBotUrl:
        "http://localhost/chat/share?shared_id=10fb3e38204311f0b7113ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm",
      analyseBotUrl:
        'http://localhost/chat/share?shared_id=201e3fd2204311f09ca83ebb01b4a4b5&from=chat&auth=BlODMwM2M4MGJhZjExZjBiNTVhOGFmYm"',
    },
  ];

  const columns: TableProps<ReportDataType>["columns"] = [
    {
      key: "reportName",
      title: "可研报告",
      dataIndex: "reportName",
    },
    {
      key: "keyWords",
      title: "报告关键词",
      dataIndex: "keyWords",
      align: "center",
      width: 350,
      render: (_, { enterprise, industry, keyWords }) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              {industry && <Tag color="gold">{industry}</Tag>}
              {enterprise && <Tag color="blue">{enterprise}</Tag>}
            </div>
            <div className="flex">
              {keyWords.map((keyword, index) => {
                const s = keyword.split("|");
                return (
                  <Tooltip
                    key={keyword + index}
                    title={s.length > 1 ? s[1] : ""}
                  >
                    <Tag>{s[0]}</Tag>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        );
      },
    },
    {
      key: "updated",
      title: "更新日期",
      dataIndex: "updated",
      align: "center",
      width: 120,
    },
    {
      key: "status",
      title: "解析状态",
      align: "center",
      width: 90,
      render: () => <Tag color="green">成功</Tag>,
    },
    {
      key: "option",
      title: "操作",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div>
          <Button type={"link"} onClick={() => showReportSummary(record)}>
            摘要
          </Button>
          <Button type={"link"} onClick={() => showReportDetail(record)}>
            问答/分析
          </Button>
        </div>
      ),
    },
  ];

  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <div className="flex h-full flex-col overflow-y-auto px-2">
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
      <Table<ReportDataType>
        rowSelection={{ type: "checkbox" }}
        className="flex-1"
        dataSource={dataSource.sort((a, b) =>
          dayjs(a.updated).isBefore(b.updated) ? 1 : -1,
        )}
        columns={columns}
      />
      {contextHolder}
    </div>
  );
};

export default Page;
