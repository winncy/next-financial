import { SuggestBoxProps } from "@/component/SuggestBox";
import { MenuItemType } from "@/service/menu";
import { ReportDataType } from "@/app/(admin)/(analysis)/feasibility/report/page";
import dayjs from "dayjs";

const enterprise: MenuItemType[] = [
  {
    id: "1",
    name: "财务分析",
    subItems: [
      {
        subId: "1-1",
        subName: "基于七维度模型的总体分析",
        subUrl: "/enterprise/financial/overview",
      },
      {
        subId: "1-2",
        subName: "财务风险预警",
        subUrl: "/enterprise/financial/risk-alert",
      },
      {
        subId: "1-3",
        subName: "现金流压力测试",
        subUrl: "/enterprise/financial/stress-test",
      },
      {
        subId: "1-4",
        subName: "财务报表预测",
        subUrl: "/enterprise/financial/forecast",
      },
    ],
  },
  {
    id: "2",
    name: "价值评估工具",
    subItems: [
      {
        subId: "2-1",
        subName: "七维度评估模型",
        subUrl: "/enterprise/valuation/dimensions-model",
      },
      {
        subId: "2-2",
        subName: "规模评估",
        subUrl: "/enterprise/valuation/scale",
      },
      {
        subId: "2-3",
        subName: "盈利能力评估",
        subUrl: "/enterprise/valuation/profitability",
      },
      {
        subId: "2-4",
        subName: "运营能力评估",
        subUrl: "/enterprise/valuation/operations",
      },
      {
        subId: "2-5",
        subName: "成长能力评估",
        subUrl: "/enterprise/valuation/growth",
      },
      {
        subId: "2-6",
        subName: "费用结构评估",
        subUrl: "/enterprise/valuation/cost-structure",
      },
      {
        subId: "2-7",
        subName: "WACC评估",
        subUrl: "/enterprise/valuation/wacc",
      },
      {
        subId: "2-8",
        subName: "前瞻性业务指标评估",
        subUrl: "/enterprise/valuation/forward-metrics",
      },
    ],
  },
  {
    id: "3",
    name: "风险预警系统",
    subItems: [
      {
        subId: "3-1",
        subName: "七维度风险预警分析",
        subUrl: "/enterprise/risk/dimensions-alert",
      },
    ],
  },
  {
    id: "4",
    name: "智能对标系",
    subItems: [
      {
        subId: "4-1",
        subName: "对标国内上市公司",
        subUrl: "/enterprise/benchmark/domestic",
      },
      {
        subId: "4-2",
        subName: "对标境外美股/其他公司",
        subUrl: "/enterprise/benchmark/overseas",
      },
    ],
  },
];

const industry: MenuItemType[] = [
  {
    id: "1",
    name: "行业全景概览",
    subItems: [
      {
        subId: "1-1",
        subName: "产业链全景图",
        subUrl: "/industry/overview/industrial-chain",
      },
      {
        subId: "1-2",
        subName: "市场概览",
        subUrl: "/industry/overview/market-report",
      },
      {
        subId: "1-3",
        subName: "行业地位",
        subUrl: "/industry/overview/position-assessment",
      },
      {
        subId: "1-4",
        subName: "行业情报",
        subUrl: "/industry/overview/intelligence-tracking",
      },
    ],
  },
  {
    id: "2",
    name: "竞争格局透视",
    subItems: [
      {
        subId: "2-1",
        subName: "top10企业",
        subUrl: "/industry/competition/top10-enterprises",
      },
      {
        subId: "2-2",
        subName: "竞品矩阵图",
        subUrl: "/industry/competition/matrix-map",
      },
      {
        subId: "2-3",
        subName: "行业融资与并购",
        subUrl: "/industry/competition/financing-ma",
      },
    ],
  },
  {
    id: "3",
    name: "趋势预测引擎",
    subItems: [
      {
        subId: "3-1",
        subName: "七维度风险预警分析",
        subUrl: "/industry/trend/seven-dimension-alert",
      },
    ],
  },
  {
    id: "4",
    name: "政策风险扫描",
    subItems: [
      {
        subId: "4-1",
        subName: "实时政策数据库",
        subUrl: "/industry/policy/real-time-database",
      },
      {
        subId: "4-2",
        subName: "ESG报告扫描",
        subUrl: "/industry/policy/esg-report",
      },
      {
        subId: "4-3",
        subName: "贸易战/地缘政治影响模拟器",
        subUrl: "/industry/policy/geopolitical-impact",
      },
    ],
  },
];

const feasibility: MenuItemType[] = [
  {
    id: "1",
    name: "可研报告",
    url: "/feasibility/report",
  },
  {
    id: "2",
    name: "汇总分析",
    url: "/feasibility/combine",
  },
  {
    id: "3",
    name: "对比分析",
    url: "/feasibility/comparison",
  },
];

const config: MenuItemType[] = [
  {
    id: "1",
    name: "基础指标",
    url: "/config/indicators",
  },
  {
    id: "2",
    name: "七维度模型",
    url: "/config/model",
  },
  {
    id: "3",
    name: "自定义模型",
    url: "/config/self-model",
  },
  {
    id: "4",
    name: "自定义指标",
    url: "/config/self-indicators",
  },
];

export const mockMenuData: Record<string, MenuItemType[]> = {
  enterprise,
  industry,
  feasibility,
  config,
};

const reportData: ReportDataType[] = [
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

export const getSuggestData = (page: string) =>
  new Promise<SuggestBoxProps[]>((resolve) => {
    if (mockMenuData[page]) {
      resolve(
        mockMenuData[page].map((menu) => ({
          title: menu.name,
          description: menu.subItems?.map((item) => item.subName),
          url: menu.subItems?.[0]?.subUrl,
        })) as SuggestBoxProps[],
      );
    } else {
      resolve([]);
    }
  });

export const getReportData = () =>
  new Promise<ReportDataType[]>(async (resolve) => {
    resolve(
      reportData.sort((a, b) =>
        dayjs(a.updated).isBefore(b.updated) ? 1 : -1,
      ),
    );
  });
