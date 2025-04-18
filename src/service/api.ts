type AnyType = any;

export type ResultObject = Record<string, AnyType>;
export type ResultArray = ResultObject[];
export type ResultType = ResultObject | ResultArray;

export async function fetchData(
  url: string,
  options: RequestInit = {},
): Promise<ResultType> {
  // 真实后端请求（使用 fetch 或其他请求库，如 axios）
  const response = await fetch(url, {
    ...options,
  });
  if (!response.ok) {
    throw new Error("请求失败");
  }
  return await response.json();
}

export const fetchStreamData = async (
  url: string,
  onResult: (result: string) => void,
  options: RequestInit = {},
): Promise<void> =>
  new Promise<void>(async (resolve, reject) => {
    const res = await fetch(url, options);
    if (!res.body) {
      reject("缺少返回体body");
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      onResult(chunk);
    }
    resolve();
  });

export async function postForm(
  url: string,
  form: FormData,
): Promise<ResultType> {
  return fetchData(url, {
    method: "POST",
    body: form,
  });
}
export async function postData(
  url: string,
  param?: Record<string, AnyType>,
): Promise<ResultType> {
  return fetchData(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
}

export async function postStreamData(
  url: string,
  onResult: (result: string) => void,
  param?: Record<string, AnyType>,
): Promise<void> {
  return fetchStreamData(url, onResult, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
}

export async function getData(
  url: string,
  param?: Record<string, AnyType>,
): Promise<ResultType> {
  let searchParams = new URLSearchParams(mapToStringMap(param)).toString();
  searchParams = searchParams ? `?${searchParams}` : "";
  return fetchData(`${url}${searchParams}`);
}

export async function getStreamData(
  url: string,
  onResult: (result: string) => void,
  param?: Record<string, AnyType>,
): Promise<void> {
  let searchParams = new URLSearchParams(mapToStringMap(param)).toString();
  searchParams = searchParams ? `?${searchParams}` : "";
  return fetchStreamData(`${url}${searchParams}`, onResult);
}

function mapToStringMap(
  input?: Record<string, AnyType>,
): Record<string, string> {
  if (!input) {
    return {};
  }
  return Object.entries(input).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value); // 将值转换为字符串
      return acc;
    },
    {} as Record<string, string>,
  );
}
