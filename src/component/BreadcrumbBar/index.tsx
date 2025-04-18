import { Breadcrumb } from "antd";

const BreadcrumbBar = () => {
  return (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: "企业分析",
        },
        {
          title: <a href="">财务分析</a>,
        },
        {
          title: "基于七维度模型的总体分析",
        },
      ]}
    />
  );
};

export default BreadcrumbBar;
