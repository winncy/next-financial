import { mockMenuData } from "@/service/data";

export type MenuItemType = {
  id: string;
  name: string;
  url?: string;
  subItems?: {
    subId: string;
    subName: string;
    subUrl: string;
  }[];
};

export const getMenuItems = (pathType: string) =>
  new Promise<MenuItemType[]>((resolve) => {
    resolve(mockMenuData[pathType]);
  });
