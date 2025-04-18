import { notFound } from "next/navigation";

export default function NotFound() {
  notFound(); // 触发同级的 not-found
}
