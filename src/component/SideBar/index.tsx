"use client";

import { ConfigProvider, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { getMenuItems } from "@/service/menu";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const SideBar = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getMenuItems().then((res) => {
      setMenuItems(
        res.map((item) => ({
          key: item.id,
          label: item.name,
          children: item.subItems?.map((subItem) => ({
            key: subItem.subUrl,
            label: subItem.subName,
          })),
        })),
      );
    });
  }, []);

  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            /* 这里是你的组件 token */
            subMenuItemBg: "white",
          },
        },
      }}
    >
      <div className="no-scrollbar flex h-full w-[230] overflow-hidden border border-white/50">
        <Menu
          mode="inline"
          style={{ height: "100%", border: 0 }}
          defaultSelectedKeys={[pathname]}
          openKeys={stateOpenKeys}
          items={menuItems}
          onOpenChange={onOpenChange}
          onSelect={(param) => {
            router.replace(param.key);
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default SideBar;
