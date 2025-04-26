"use client";

import { Button, Form, Input, Table, TableProps, Tag, Tooltip } from "antd";
import "@ant-design/v5-patch-for-react-19";
import useModal from "antd/es/modal/useModal";
import ReportDetail from "@/app/(admin)/(analysis)/feasibility/report/ReportDetail";
import ReportHeader from "@/app/(admin)/(analysis)/feasibility/report/ReportHeader";
import ReportSummary from "@/app/(admin)/(analysis)/feasibility/report/ReportSummary";
import { useEffect, useState } from "react";
import { getReportData } from "@/service/data";

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
  const [reportData, setReportData] = useState<ReportDataType[]>([]);

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

  useEffect(() => {
    getReportData().then(setReportData);
  }, []);

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
          <Button type={"primary"}>对比分析</Button>
        </div>
      </div>
      <Table<ReportDataType>
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
