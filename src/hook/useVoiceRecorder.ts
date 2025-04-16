"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type VoiceRecorderType = {
  handleVoice?: (voiceBlob: Blob) => Promise<void>;
  onStart?: () => void;
  onStop?: () => void;
};

export default function useVoiceRecorder({
  handleVoice,
  onStart,
  onStop,
}: VoiceRecorderType) {
  const [status, setStatus] = useState("等待开始录音");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioContext = useRef<AudioContext | null>(null);

  // 资源清理
  const clearResources = useCallback(() => {
    mediaRecorder.current?.stream?.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    audioContext.current?.close().catch(() => {});
    mediaRecorder.current = null;
    audioContext.current = null;
  }, []);

  // 初始化录音设备
  const initializeRecorder = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext.current = new AudioContext();

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      console.log("初始化录音成功");
      return true;
    } catch (error) {
      console.error("麦克风初始化失败:", error);
      setStatus("麦克风权限被拒绝");
      return false;
    }
  }, []);

  // 开始录音
  const startRecording = useCallback(async () => {
    if (isRecording) return;

    const success = await initializeRecorder();
    if (!success) return;

    audioChunks.current = [];
    mediaRecorder.current?.start(100);
    setIsRecording(true);
    setStatus("录音进行中...");
    onStart?.();
  }, [isRecording, initializeRecorder, onStart]);

  // 停止录音
  const stopRecording = useCallback(async () => {
    if (!isRecording || !mediaRecorder.current) return;

    const stopped = new Promise<void>((resolve) => {
      mediaRecorder.current!.onstop = () => resolve();
    });

    mediaRecorder.current.stop();
    await stopped;

    setIsRecording(false);
    setStatus("处理音频中...");
    onStop?.();

    try {
      const audioBlob = new Blob(audioChunks.current, {
        type: "audio/webm;codecs=opus",
      });

      if (handleVoice) {
        await handleVoice(audioBlob);
        setStatus("录音处理完成");
      } else {
        setStatus("录音完成，无录音处理逻辑");
      }
    } catch (error) {
      console.error("音频处理失败:", error);
      setStatus("音频处理失败");
    } finally {
      clearResources();
    }
  }, [isRecording, handleVoice, onStop, clearResources]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      console.log("开始清理组件");
      clearResources();
    };
  }, [clearResources]);

  return {
    startRecording,
    stopRecording,
    recordingStatus: status,
    isRecording,
  };
}
