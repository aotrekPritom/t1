"use client";
import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Button } from "antd";

const VideoCall = ({ channel }: { channel: string }) => {
  const [startVideoCall, setStartVideoCall] = useState(false);

  const rtcProps = {
    appId: "abe7bde135224510945661323359b4d5", 
    channel: 'f', // Your Agora channel
    token:
      "007eJxTYFgj9/nf184ZDAmJNXK7de3bTmZszzlcdEGgKztm17tJR1kVGBKTUs2TUlINjU2NjExMDQ0sTUzNzAyNjYyNTS2TTFJMAxzl0xsCGRnufq9lYmSAQBCfkSGNgQEAHJQeSQ==", // Set token to null for testing mode
  };

  const callbacks = {
    EndCall: () => setStartVideoCall(false),
  };

  return startVideoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col p-6 bg-gray-50 rounded-md shadow-md border">
      <h2 className="text-2xl font-semibold mb-4">Join Live Session!</h2>
      <Button
        type="primary"
        size="large"
        className="mb-4"
        onClick={() => setStartVideoCall(true)}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "16px",
        }}
      >
        Join
      </Button>
    </div>
  );
};

export default VideoCall;
