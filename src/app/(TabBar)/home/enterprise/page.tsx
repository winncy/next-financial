"use client";

import { Attachments, AttachmentsProps, Sender } from "@ant-design/x";
import React, { useEffect, useRef, useState } from "react";
import { CloudUploadOutlined, LinkOutlined } from "@ant-design/icons";
import { Badge, Button, GetProp, GetRef } from "antd";
import SuggestBox, { SuggestBoxProps } from "@/component/SuggestBox";
import { getSuggestData } from "@/service/data";

const Page = () => {
  const [allowSpeech, setAllowSpeech] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GetProp<AttachmentsProps, "items">>([]);
  const senderRef = useRef<GetRef<typeof Sender>>(null);

  const [suggests, setSuggests] = useState<SuggestBoxProps[]>([]);

  useEffect(() => {
    setAllowSpeech(true);
    getSuggestData("enterprise").then(setSuggests);
  }, []);

  const senderHeader = (
    <Sender.Header
      title="附件"
      open={open}
      onOpenChange={setOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={items}
        onChange={({ fileList }) => setItems(fileList)}
        placeholder={(type) =>
          type === "drop"
            ? {
                title: "拖动文件至此",
              }
            : {
                icon: <CloudUploadOutlined />,
                title: "附件上传",
                description: "选择文件或拖动文件至此处上传",
              }
        }
        getDropContainer={() => senderRef.current?.nativeElement}
      />
    </Sender.Header>
  );

  return (
    <div className="flex h-full flex-col pb-24">
      <div className="flex-1 pt-[10%]">
        <div className="flex flex-wrap gap-4">
          {suggests.map((s) => (
            <SuggestBox
              key={s.title}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 w-[60%] min-w-[800px] bg-white">
        <Sender
          header={senderHeader}
          prefix={
            <Badge dot={items.length > 0 && !open}>
              <Button onClick={() => setOpen(!open)} icon={<LinkOutlined />} />
            </Badge>
          }
          placeholder={"请输入问题，按回车进行提问"}
          allowSpeech={allowSpeech}
        />
      </div>
    </div>
  );
};

export default Page;
