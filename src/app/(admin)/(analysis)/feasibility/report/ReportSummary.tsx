import { ReportDataType } from "@/app/(admin)/(analysis)/feasibility/report/page";

const ReportSummary = ({ report }: { report: ReportDataType }) => {
  const { reportId } = report;
  return (
    <iframe
      src={`/report/${reportId}/${reportId}.html`}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      frameBorder="0"
    ></iframe>
  );
};

export default ReportSummary;
