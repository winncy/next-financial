import { Tag, Tooltip } from "antd";
import { ReportDataType } from "@/app/(admin)/(analysis)/feasibility/report/page";

const ReportHeader = ({ report }: { report: ReportDataType }) => {
  const { reportName, enterprise, industry, keyWords } = report;
  return (
    <div className="flex flex-col gap-2">
      {reportName}
      <div>
        <Tag color={enterprise ? "blue" : "gold"}>{enterprise || industry}</Tag>
        {keyWords.map((value, index) => {
          const s = value.split("|");
          return (
            <Tooltip key={value + index} title={s.length > 1 ? s[1] : ""}>
              <Tag>{s[0]}</Tag>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
export default ReportHeader;
