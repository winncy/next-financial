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
import { ChartType, GPTVis, Line, Bar, Pie, Column, withChartCode } from "@antv/gpt-vis";
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
import { Badge, Button, GetProp, GetRef, Tooltip, message } from "antd";
import SuggestBox, { SuggestBoxProps } from "@/component/SuggestBox";
import { getSuggestData } from "@/service/data";
import useVoiceRecorder from "@/hook/useVoiceRecorder";
import { handleVoiceTranscribe } from "@/service/voice";
import "@ant-design/v5-patch-for-react-19";
import { postStreamData } from "@/service/api";
import { DownloadOutlined } from "@ant-design/icons";
import { convertToDocxAndDownload, captureChartImages } from "@/utils/docxConverter";

const Page = () => {
  const [allowSpeech, setAllowSpeech] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GetProp<AttachmentsProps, "items">>([]);
  const senderRef = useRef<GetRef<typeof Sender>>(null);
  const [inputValue, setInputValue] = useState<string>();
  const [showVoiceHandleDesc, setShowVoiceHandleDesc] =
    useState<boolean>(false);
  const [suggests, setSuggests] = useState<SuggestBoxProps[]>([]);
  const chartContainerRef = useRef<HTMLDivElement>(null);
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
        components: { [ChartType.Line]: Line,[ChartType.Bar]: Bar,[ChartType.Pie]: Pie,[ChartType.Column]: Column },
        style: { width: 600 },
      }),
    [],
  );

  const RenderMarkdown: BubbleProps["messageRender"] = useCallback(
    (content: string, status?: string) => {
      // Only show download button when the message is complete (not typing)
      const isComplete = status !== 'typing';
      
      // Function to handle document download with chart images
      const handleDownload = async () => {
        if (!chartContainerRef.current) return;
        
        try {
          // Find all chart elements in the container
          // First try to find specific chart elements
          let chartElements = chartContainerRef.current.querySelectorAll('.g2-chart, .g2plot-container, .vis-chart-container, .ant-chart');
          
          // If no specific chart elements found, try to find any SVG or canvas elements
          if (chartElements.length === 0) {
            chartElements = chartContainerRef.current.querySelectorAll('svg, canvas');
            console.log('Using fallback chart element selection, found:', chartElements.length);
          }
          
          // Debug info
          console.log('Found chart elements:', chartElements.length);
          if (chartElements.length > 0) {
            Array.from(chartElements).forEach((el, i) => {
              console.log(`Chart ${i+1} type:`, el.tagName, 'classes:', el.className);
            });
          }
          
          if (chartElements.length > 0) {
            // Show loading message
            message.loading('正在生成报告，请稍候...', 0);
            
            // Add a delay to ensure charts are fully rendered
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Capture chart images
            const chartImages = await captureChartImages(Array.from(chartElements) as HTMLElement[]);
            
            // Debug info
            console.log('Captured chart images:', chartImages.length);
            chartImages.forEach((img, i) => {
              console.log(`Image ${i+1} data URL length:`, img ? img.length : 0);
            });
            
            // Generate timestamp for filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            
            // Convert to docx with chart images
            await convertToDocxAndDownload(
              content, 
              `企业分析报告_${timestamp}.docx`,
              chartImages
            );
            
            // Hide loading message
            message.destroy();
            message.success('报告已生成并下载');
          } else {
            // No charts, just download the document
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await convertToDocxAndDownload(content, `企业分析报告_${timestamp}.docx`);
            message.success('报告已生成并下载');
          }
        } catch (error) {
          console.error('Error generating report:', error);
          message.error('报告生成失败，请重试');
        }
      };
      
      return (
        <div className="relative" ref={chartContainerRef}>
          <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
          
          {isComplete && (
            <div className="flex justify-end mt-3">
              <Tooltip title="下载为Word文档（含图表）">
                <Button 
                  type="primary" 
                  size="small" 
                  icon={<DownloadOutlined />} 
                  className="flex items-center shadow-md"
                  onClick={handleDownload}
                >
                  下载报告
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      );
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
