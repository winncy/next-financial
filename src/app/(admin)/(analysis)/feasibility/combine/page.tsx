"use client";

import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Table,
  TableProps,
} from "antd";
import "@ant-design/v5-patch-for-react-19";
import useModal from "antd/es/modal/useModal";
import { useEffect, useState } from "react";
import { getCombinedData } from "@/service/data";
import ReportHeader from "@/app/(admin)/(analysis)/feasibility/report/ReportHeader";
import ReportSummary from "@/app/(admin)/(analysis)/feasibility/report/ReportSummary";
import { ReportDataType } from "@/app/(admin)/(analysis)/feasibility/report/page";
import EnterpriseSummary from "@/app/(admin)/(analysis)/feasibility/combine/EnterpriseSummary";

export interface CombineDataType {
  key: string;
  reportCount: number;
  enterprise?: string;
  industry?: string;
  updated: string;
}

const Page = () => {
  const [modal, contextHolder] = useModal();
  const [reportData, setReportData] = useState<CombineDataType[]>([]);
  const [combineType, setCombineType] = useState<string>("enterprise");

  useEffect(() => {
    getCombinedData(combineType).then((data) => {
      if (combineType === "enterprise") {
        setReportData(data.filter((f) => !!f.enterprise));
      } else {
        setReportData(data);
      }
    });
  }, [combineType]);

  const showCombineSummary = (enterprise?: string, industry?: string) => {
    const name = enterprise || industry;
    if (!name) {
      alert("报告正在生成中...");
      return;
    }
    modal.info({
      title: `${enterprise || industry} 汇总分析报告`,
      width: "60%",
      icon: <></>,
      centered: true,
      destroyOnClose: true,
      closable: true,
      footer: <></>,
      content: (
        <div className="h-[80vh]">
          <EnterpriseSummary name={name} />
        </div>
      ),
    });
  };

  const handleCombineTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    setCombineType(value);
  };

  const columns: TableProps<CombineDataType>["columns"] = [
    ...(combineType === "enterprise"
      ? [
          {
            key: "enterprise",
            title: "公司",
            dataIndex: "enterprise",
          },
        ]
      : []),
    {
      key: "industry",
      title: "行业",
      dataIndex: "industry",
    },
    {
      key: "reportCount",
      title: "报告数量",
      dataIndex: "reportCount",
      align: "center",
      width: 350,
    },
    {
      key: "option",
      title: "操作",
      width: 200,
      align: "center",
      render: (_, { reportCount, enterprise, industry }) => (
        <div>
          {reportCount > 1 ? (
            <Button
              type={"link"}
              onClick={() => showCombineSummary(enterprise, industry)}
            >
              汇总分析报告
            </Button>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-2">
      <div className="flex justify-between pb-4">
        <Radio.Group
          value={combineType}
          onChange={handleCombineTypeChange}
          optionType="button"
          buttonStyle={"solid"}
          options={[
            { value: "enterprise", label: "按企业汇总" },
            { value: "industry", label: "按行业汇总" },
          ]}
        />
      </div>
      <Table<CombineDataType>
        rowSelection={{ type: "checkbox" }}
        className="flex-1"
        dataSource={reportData}
        columns={columns}
      />
      {contextHolder}
    </div>
  );
};

export default Page;
