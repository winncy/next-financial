export const handleVoiceTranscribe = (voiceBlob: Blob) =>
  new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("audio", voiceBlob, "recording.webm");
    // console.log("formData", formData);
    const response = await fetch("http://127.0.0.1:5001/transcribe", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      reject("语音识别失败");
    }
    const result = await response.json();
    resolve(result);
  });
