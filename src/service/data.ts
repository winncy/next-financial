import { SuggestBoxProps } from "@/component/SuggestBox";

export const getSuggestData = (page: string) =>
  new Promise<SuggestBoxProps[]>((resolve) => {
    if (page === "enterprise") {
      resolve([
        {
          title: "财务健康诊断",
          description: ["三表联动分析", "财务舞弊红黄灯预警", "现金流压力测试"],
        },
        {
          title: "价值评估工具箱",
          description: ["多模型估值版", "股东回报穿图", "无形资产评估模块"],
        },
        {
          title: "运营效率显微镜",
          description: ["供应链韧性评分", "客户价值分层模型", "人均效能仪表盘"],
        },
        {
          title: "风险预警系统",
          description: [
            "财务杠杆警报器",
            "股权质押/商誉减值实时追踪",
            "做空信号扫描",
          ],
        },
        {
          title: "智能对标分析",
          description: ["自定义对标组", "动态杜邦分析树", "战略差异热力图"],
        },
      ] as SuggestBoxProps[]);
    } else {
      resolve([]);
    }
  });
