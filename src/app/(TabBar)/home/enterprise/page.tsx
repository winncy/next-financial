"use client";

import { Attachments, AttachmentsProps, Sender } from "@ant-design/x";
import React, { useEffect, useRef, useState } from "react";
import { CloudUploadOutlined, LinkOutlined } from "@ant-design/icons";
import { Badge, Button, GetProp, GetRef } from "antd";
import SuggestBox, { SuggestBoxProps } from "@/component/SuggestBox";
import { getSuggestData } from "@/service/data";
import useVoiceRecorder from "@/hook/useVoiceRecorder";
import { handleVoiceTranscribe } from "@/service/voice";

const Page = () => {
  const [allowSpeech, setAllowSpeech] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GetProp<AttachmentsProps, "items">>([]);
  const senderRef = useRef<GetRef<typeof Sender>>(null);
  const [showSuggest, setShowSuggest] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>();
  const [showVoiceHandleDesc, setShowVoiceHandleDesc] =
    useState<boolean>(false);
  const [suggests, setSuggests] = useState<SuggestBoxProps[]>([]);
  const { startRecording, stopRecording, isRecording, recordingStatus } =
    useVoiceRecorder({
      handleVoice: async (voiceBlob: Blob) => {
        console.log("录音大小", voiceBlob.size);
        const result = (await handleVoiceTranscribe(voiceBlob)) as never;
        const text = result["text"];
        console.log("说话内容", text);
        setInputValue(text as string);
      },
    });

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
          {showSuggest &&
            suggests.map((s, index) => (
              <SuggestBox
                key={s.title + index}
                title={s.title}
                description={s.description}
              />
            ))}
        </div>
      </div>
      {showVoiceHandleDesc && (
        <div className="absolute right-0 bottom-0 text-sm text-gray-300">
          {recordingStatus}
        </div>
      )}
      <div className="absolute bottom-8 w-[60%] min-w-[800px] bg-white">
        <Sender
          header={senderHeader}
          value={inputValue}
          prefix={
            <Badge dot={items.length > 0 && !open}>
              <Button onClick={() => setOpen(!open)} icon={<LinkOutlined />} />
            </Badge>
          }
          placeholder={"请输入问题，按回车进行提问"}
          onChange={setInputValue}
          allowSpeech={
            allowSpeech && {
              recording: isRecording,
              onRecordingChange: (recording) => {
                console.log(`Mock Customize Recording: ${recording}`);
                if (recording) {
                  setShowVoiceHandleDesc(true);
                  startRecording().then(() => {
                    console.log("开始录音方法");
                  });
                } else {
                  stopRecording().then(() => {
                    console.log("结束录音方法");
                    setTimeout(() => {
                      setShowVoiceHandleDesc(false);
                    }, 5000);
                  });
                }
              },
            }
          }
        />
      </div>
    </div>
  );
};

export default Page;
