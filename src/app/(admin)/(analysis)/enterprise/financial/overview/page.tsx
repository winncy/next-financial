"use client";

import { useEffect } from "react";
import { useDebounceFn } from "ahooks";
import ListTitle from "@/app/(admin)/(analysis)/enterprise/financial/overview/ListTitle";
import Image from "next/image";
import ListModelResult, {
  ModelRowType,
} from "@/app/(admin)/(analysis)/enterprise/financial/overview/ListModelResult";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const modelResults: ModelRowType[] = [
  {
    modelName: "一、资产规模",
    modelSummary: [
      "2020-2023年间，公司营业收入从0.89亿元跃升至7.59亿元（CAGR=104%），营业成本同步扩张但增速趋缓，2023年成本增幅34%首次低于营收增速（41%）。",
      "盈利质量显著提升，净利润以年均120%的增速从0.15亿元增长至1.63亿元，其中2022年同比激增283%展现经营杠杆威力。",
      "资产规模加速裂变，净资产四年间增长21.5倍至4.30亿元，2021年通过资本运作实现670%爆发增长，奠定持续扩张基础。",
    ],
    results: [
      {
        name: "营业收入",
        items: [0.89, 2.55, 5.37, 7.59],
      },
      {
        name: "营业成本",
        items: [0.62, 2.0, 3.94, 5.41],
      },
      {
        name: "毛利",
        items: [0.27, 0.55, 1.43, 2.18],
      },
      {
        name: "净利润",
        items: [0.15, 0.34, 1.02, 1.63],
      },
      {
        name: "总资产",
        items: [0.64, 2.3, 4.09, 5.64],
      },
      {
        name: "总负债",
        items: [0.44, 0.76, 1.42, 1.34],
      },
      {
        name: "净资产",
        items: [0.2, 1.54, 2.67, 4.3],
      },
    ],
  },
  {
    modelName: "二、盈利能力",
    modelSummary: [
      '2020-2023年间，公司毛利率呈现"V型修复"趋势：从30.3%短暂下滑至2021年21.6%后，通过成本管控与产品结构优化回升至28.7%（2023）。',
      "净利率表现更为亮眼，从16.9%阶梯式攀升至21.5%，2022年毛利率回升3个百分点时，净利率同步跳升6个百分点（13.3%→19.0%），揭示费用集约化管理的超预期成效。",
    ],
    results: [
      {
        name: "ROE",
        items: [0.2, 1.2, 2.2, 3.2],
      },
      {
        name: "ROA",
        items: [0.23, 0.15, 0.25, 0.29],
      },
      {
        name: "毛利率",
        type: "percent",
        items: [0.3034, 0.2157, 0.2663, 0.2872],
      },
      {
        name: "净利率",
        type: "percent",
        items: [0.169, 0.133, 0.19, 0.215],
      },
    ],
  },
  {
    modelName: "三、运营能力",
    modelSummary: [
      '公司运营能力呈现"短期优化-中期调整-库存持续改善"的复合态势，存货管理能力已成为核心竞争优势，但需关注应收款项周期延长可能带来的现金流风险。',
      "建议结合现金流量表进一步分析资金链健康状况。",
    ],
    results: [
      {
        name: "应收账款周转天数",
        items: [106.64, 66.26, 71.14, 73.33],
      },
      {
        name: "应付账款周转天数",
        items: [64.52, 46.24, 63.49, 65.1],
      },
      {
        name: "存货周转天数",
        items: [0.0, 48.93, 44.2, 35.26],
      },
    ],
  },
  {
    modelName: "四、成长能力",
    modelSummary: [
      '公司呈现"爆发-透支-调整"的非线性成长轨迹，2021-2022年验证了商业模式的可复制性，但2023年暴露盈利模型抗风险能力不足。建议重点关注：',
      "① 2024年营收能否守住正增长底线",
      "② 应付账款周期是否触发供应链反制",
      "③ 现金流高增是否伴随应收款坏账率上升",
      "（注：需结合行业景气度周期判断是系统性下滑还是个体经营失误）",
    ],
    results: [
      {
        name: "营收增速",
        items: [0.0, 186.6, 110.08, 41.43],
      },
      {
        name: "归母净利润增速",
        items: [0.0, 126.7, 190.19, 58.12],
      },
      {
        name: "经营活动现金流量净额增速",
        items: [0.0, -515.26, 228.58, 443.79],
      },
    ],
  },
  {
    modelName: "五、前瞻性业务指标",
    modelSummary: [
      '公司前瞻性指标显示其处于"零预收安全垫+库存动态平衡"的业务形态，建议关注：',
      "存货跌价准备计提比例变化（隐性风险暴露程度）",
      "下游客户集中度（解释预收为零的合理性）",
      "存货品类结构（原材料/在产品/产成品占比反映供应链控制力）",
    ],
    results: [
      {
        name: "预收",
        items: [0, 0, 0, 0],
      },
      {
        name: "合同负债",
        items: [0, 0, 0, 0],
      },
      {
        name: "存货",
        items: [0.14, 0.4, 0.57, 0.49],
      },
    ],
  },
  {
    modelName: "六、费用指标",
    modelSummary: [
      '公司已走过"野蛮降费-规模增效-精细调整"的完整周期，当前费用结构呈现销售费用筑底、研发投入僵化、财务操纵空间收缩的特征。建议重点关注：',
      "① 2024年销售费用率是否突破35%预警线",
      '② 研发费用率能否突破2.5%的"心理关卡"',
      "③ 财务费用绝对值变动与应付账款周转天数的相关性验证",
      "（注：需比对行业均值评估费用效率，当前数据反映企业处于制造业中游费用控制水平）",
    ],
    results: [
      {
        name: "销售费用率",
        type: "percent",
        items: [0.47, 0.33, 0.28, 0.3],
      },
      {
        name: "研发费用率",
        type: "percent",
        items: [0.024, 0.0223, 0.0223, 0.0223],
      },
      {
        name: "财务费用率",
        type: "percent",
        items: [2.99, 0.82, -1.0, -0.27],
      },
      {
        name: "营业成本/营业收入",
        type: "percent",
        items: [0.7, 0.78, 0.73, 0.71],
      },
      {
        name: "管理费用",
        items: [6.34, 4.02, 4.61, 4.54],
      },
    ],
  },
  //   '建议重点关注：',
  // "① 2024年是否重启适度杠杆（0.3-0.35为弹性区间）",
  //   "② 应付账款占比是否突破流动负债50%警戒线",
  //   "③ ROE与ROIC的剪刀差变化（验证资本使用效率）",
  //   "（注：需结合行业平均负债率评估战略激进程度，当前数据反映企业处于制造业保守型资本结构阵营）",
  {
    modelName: "七、资本结构",
    modelSummary: [
      '公司资本结构经历"危机出清-增长适配-预防性收缩"的三段式蜕变，当前0.24的负债率既是财务安全的勋章，也可能是增长桎梏的信号。',
    ],
    results: [
      {
        name: "资产负债率",
        items: [0.69, 0.33, 0.35, 0.24],
      },
    ],
  },
];

const Page = () => {
  const { run: handleSelection } = useDebounceFn(
    () => {
      const text = window.getSelection()?.toString();
      if (text) {
        console.log("Selected text:", text);
      }
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [handleSelection]);

  return (
    <div className="flex h-full flex-col gap-2">
      <Breadcrumb
        separator=">"
        items={[
          { title: <HomeOutlined /> },
          { title: "基于七维度模型的总体分析" },
          { title: "北京xxx科技有限公司" },
        ]}
      />
      <ListTitle
        titles={["", "2020", "2021", "2022", "2023", ""]}
        summary={
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">单位：亿元</div>
            <div className="flex items-center gap-4">
              <div className="cursor-pointer">
                <Image src={"/p1.png"} alt={""} width={20} height={20} />
              </div>
              <div className="cursor-pointer">
                <Image src={"/p2.png"} alt={""} width={20} height={20} />
              </div>
            </div>
          </div>
        }
      />
      <div className="flex-1 overflow-y-auto">
        {modelResults.map((item, index) => (
          <ListModelResult key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
