import { SuggestBoxProps } from "@/component/SuggestBox";
import { MenuItemType } from "@/service/menu";

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
    name: "跨报告对比",
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
