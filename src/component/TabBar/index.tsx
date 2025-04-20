"use client";
import { Button, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Building2, Cog, Factory, FolderSearch2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const TabBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [current, setCurrent] = useState<string>("");

  const items: MenuItem[] = [
    {
      label: "可研分析",
      key: "/feasibility",
      icon: <FolderSearch2 size={16} />,
    },
    {
      label: "企业分析",
      key: "/enterprise",
      icon: <Building2 size={16} />,
    },
    {
      label: "行业分析",
      key: "/industry",
      icon: <Factory size={16} />,
    },
    {
      label: "指标模型",
      key: "/config/model",
      icon: <Cog size={16} />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.replace(e.key);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item?.key && path.startsWith(item.key.toString())) {
        setCurrent(item.key.toString());
      }
    });
  }, [path]);

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
