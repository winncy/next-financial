import { SuggestBoxProps } from "@/component/SuggestBox";

export const getSuggestData = (page: string) =>
  new Promise<SuggestBoxProps[]>((resolve) => {
    if (page === "enterprise") {
      resolve([
        {
          title: "财务分析",
          description: [
            "基于七维度模型的总体分析",
            "财务风险预警",
            "现金流压力测试",
            "财务报表预测",
          ],
        },
        {
          title: "价值评估工具",
          description: [
            "七维度评估模型",
            "规模评估",
            "盈利能力评估",
            "运营能力评估",
            "成长能力评估",
            "费用结构评估",
            "WACC评估",
            "前瞻性业务指标评估",
          ],
        },
        {
          title: "风险预警系统",
          description: ["七维度风险预警分析"],
        },
        {
          title: "智能对标系",
          description: ["对标国内上市公司", "对标境外美股/其他公司"],
        },
      ] as SuggestBoxProps[]);
    } else {
      resolve([]);
    }
  });
