"use client";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";
import { Building2, Cog, Factory } from "lucide-react";

type MenuItem = Required<MenuProps>["items"][number];

const TabBar = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const [current, setCurrent] = useState("/analysis/enterprise");

  const items: MenuItem[] = [
    {
      label: "企业分析",
      key: "/analysis/enterprise",
      icon: <Building2 size={16} />,
    },
    {
      label: "行业分析",
      key: "/analysis/industry",
      icon: <Factory size={16} />,
    },
    {
      label: "指标模型",
      key: "/config/model",
      icon: <Cog size={16} />,
    },
  ];
  return (
    <div className="flex h-full w-full items-stretch">
      <div className="flex flex-1 items-end">
        <Menu
          style={{ paddingLeft: "20%", borderBottom: "none" }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div className="flex items-center pr-8">
        <Button>退出</Button>
      </div>
    </div>
  );
};

export default TabBar;
