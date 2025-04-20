import { SuggestBoxProps } from "@/component/SuggestBox";
import { MenuItemType } from "@/service/menu";

export const mockMenuData: MenuItemType[] = [
  {
    id: "1",
    name: "财务分析",
    subItems: [
      {
        subId: "1-1",
        subName: "基于七维度模型的总体分析",
        subUrl: "/analysis/enterprise/financial/overview",
      },
      {
        subId: "1-2",
        subName: "财务风险预警",
        subUrl: "/analysis/enterprise/financial/risk-alert",
      },
      {
        subId: "1-3",
        subName: "现金流压力测试",
        subUrl: "/analysis/enterprise/financial/stress-test",
      },
      {
        subId: "1-4",
        subName: "财务报表预测",
        subUrl: "/analysis/enterprise/financial/forecast",
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
        subUrl: "/analysis/enterprise/valuation/dimensions-model",
      },
      {
        subId: "2-2",
        subName: "规模评估",
        subUrl: "/analysis/enterprise/valuation/scale",
      },
      {
        subId: "2-3",
        subName: "盈利能力评估",
        subUrl: "/analysis/enterprise/valuation/profitability",
      },
      {
        subId: "2-4",
        subName: "运营能力评估",
        subUrl: "/analysis/enterprise/valuation/operations",
      },
      {
        subId: "2-5",
        subName: "成长能力评估",
        subUrl: "/analysis/enterprise/valuation/growth",
      },
      {
        subId: "2-6",
        subName: "费用结构评估",
        subUrl: "/analysis/enterprise/valuation/cost-structure",
      },
      {
        subId: "2-7",
        subName: "WACC评估",
        subUrl: "/analysis/enterprise/valuation/wacc",
      },
      {
        subId: "2-8",
        subName: "前瞻性业务指标评估",
        subUrl: "/analysis/enterprise/valuation/forward-metrics",
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
        subUrl: "/analysis/enterprise/risk/dimensions-alert",
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
        subUrl: "/analysis/enterprise/benchmark/domestic",
      },
      {
        subId: "4-2",
        subName: "对标境外美股/其他公司",
        subUrl: "/analysis/enterprise/benchmark/overseas",
      },
    ],
  },
];

export const getSuggestData = (page: string) =>
  new Promise<SuggestBoxProps[]>((resolve) => {
    if (page === "enterprise") {
      resolve(
        mockMenuData.map((menu) => ({
          title: menu.name,
          description: menu.subItems?.map((item) => item.subName),
        })) as SuggestBoxProps[],
      );
    } else {
      resolve([]);
    }
  });
