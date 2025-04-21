"use client";

import {
  Attachments,
  AttachmentsProps,
  Bubble,
  Sender,
  useXAgent,
  useXChat,
  type BubbleProps,
} from "@ant-design/x";
import { ChartType, GPTVis, Line, withChartCode } from "@antv/gpt-vis";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CloudUploadOutlined,
  LinkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, GetProp, GetRef } from "antd";
import SuggestBox, { SuggestBoxProps } from "@/component/SuggestBox";
import { getSuggestData } from "@/service/data";
import useVoiceRecorder from "@/hook/useVoiceRecorder";
import { handleVoiceTranscribe } from "@/service/voice";
import "@ant-design/v5-patch-for-react-19";
import { postStreamData } from "@/service/api";

const Page = () => {
  const [allowSpeech, setAllowSpeech] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GetProp<AttachmentsProps, "items">>([]);
  const senderRef = useRef<GetRef<typeof Sender>>(null);
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

  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError, onUpdate }) => {
      let cachedResult = "";
      postStreamData(
        "http://localhost:8000/chat",
        (result) => {
          const message = JSON.parse(result)["message"];
          cachedResult += message;
          onUpdate(cachedResult);
        },
        {
          message,
        },
      )
        .then(() => onSuccess(cachedResult))
        .catch(onError);
    },
  });

  const { onRequest, messages } = useXChat({
    agent,
  });

  const CodeComponent = useMemo(
    () =>
      withChartCode({
        components: { [ChartType.Line]: Line },
        style: { width: 600 },
      }),
    [],
  );

  const RenderMarkdown: BubbleProps["messageRender"] = useCallback(
    (content: string) => {
      return <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>;
    },
    [CodeComponent],
  );

  const roles: GetProp<typeof Bubble.List, "roles"> = {
    ai: {
      placement: "start",
      avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
      typing: { step: 5, interval: 20 },
      style: {
        maxWidth: 600,
      },
      messageRender: RenderMarkdown,
    },
    local: {
      placement: "end",
      avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
    },
  };

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
    <div className="flex h-full flex-col pt-4 pb-24">
      {(!messages || messages.length === 0) && (
        <div className="flex-1 pt-[10%]">
          <div className="flex flex-wrap gap-4">
            {suggests.map((s, index) => (
              <SuggestBox key={s.title + index} {...s} />
            ))}
          </div>
        </div>
      )}
      {messages && (
        <div className="flex flex-1 flex-col overflow-y-hidden py-2">
          <Bubble.List
            roles={roles}
            style={{
              scrollbarWidth: "none",
            }}
            items={messages.map(({ id, message, status }) => ({
              key: id,
              role: status === "local" ? "local" : "ai",
              content: message,
            }))}
          />
        </div>
      )}
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
          onSubmit={(message) => {
            console.log(message);
            onRequest(message);
            setInputValue("");
          }}
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
