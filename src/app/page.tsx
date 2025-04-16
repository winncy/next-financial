"use client";

import { Bubble, Sender } from "@ant-design/x";
import { Button } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [allowSpeech, setAllowSpeech] = useState(false);

  useEffect(() => {
    setAllowSpeech(true);
  }, []);

  return (
    <div className="App">
      <Bubble content="Hello world!" />
      <Button type="primary">开始</Button>
      <Sender allowSpeech={allowSpeech} />
    </div>
  );
}
