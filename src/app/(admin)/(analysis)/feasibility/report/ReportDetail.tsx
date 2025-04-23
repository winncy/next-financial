import { ReportDataType } from "@/app/(admin)/(analysis)/feasibility/report/page";
import PdfViewer from "@/component/PdfViewer";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

const ReportDetail = ({ report }: { report: ReportDataType }) => {
  const { reportId, answerBotUrl, analyseBotUrl } = report;
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);
  const [docType, setDocType] = useState<"pdf" | "md">("pdf");
  const [botType, setBotType] = useState<"answer" | "analyse">("answer");

  const showChatFrame = () => {
    setTimeout(() => {
      setPdfLoaded(true);
    }, 1000);
  };

  const handleDocTypeChange = (e: RadioChangeEvent) => {
    setDocType(e.target.value);
  };

  const handleBotTypeChange = (e: RadioChangeEvent) => {
    setBotType(e.target.value);
  };

  return (
    <div className="flex h-full min-w-0 gap-4">
      <div className="relative flex-1 bg-white shadow">
        <Radio.Group
          size={"small"}
          onChange={handleDocTypeChange}
          value={docType}
          className="absolute top-[-30] right-4"
        >
          <Radio.Button value="pdf">pdf</Radio.Button>
          <Radio.Button value="md">markdown</Radio.Button>
        </Radio.Group>
        {docType === "pdf" && (
          <PdfViewer
            url={`/report/${reportId}/origin.pdf`}
            onLoad={showChatFrame}
          />
        )}
        {docType === "md" && (
          <iframe
            src={`/report/${reportId}/full.html`}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
          ></iframe>
        )}
      </div>
      <div className="relative flex-1 bg-white shadow">
        <Radio.Group
          size={"small"}
          onChange={handleBotTypeChange}
          value={botType}
          className="absolute top-[-30] right-4"
        >
          <Radio.Button value="answer">资料问答助手</Radio.Button>
          <Radio.Button value="analyse">数据分析助手</Radio.Button>
        </Radio.Group>
        {(pdfLoaded || docType === "md") && (
          <iframe
            src={botType === "answer" ? answerBotUrl : analyseBotUrl}
            style={{ width: "100%", height: "100%", minHeight: "600px" }}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
