// pages/join/[sessionId].tsx
"use client"
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function JoinSession() {
  const [isConnected, setIsConnected] = useState(false);
  const sessionId = '6e17ad56-7b5b-48b4-8b9a-eecd3d73492b'; // Replace with actual sessionId from props or context
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    socket.emit("join-session", { sessionId });

    // WebRTC configuration
    const configuration = {
        iceServers: [
           { urls: "stun:stun.l.google.com:19302" },
           { urls: "stun:stun1.l.google.com:19302" },
           { urls: "stun:stun2.l.google.com:19302" },
           { urls: "stun:stun3.l.google.com:19302" },
        ],
     };
     
    peerConnection.current = new RTCPeerConnection(configuration);

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { sessionId, candidate: event.candidate });
      }
    };

    // When a remote stream is received
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Start local video stream with error handling
    const startLocalVideoStream = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Media devices API not supported in this browser.");
          return;
        }
      
        try {
          const constraints = {
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
            audio: true,
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (localVideoRef.current) localVideoRef.current.srcObject = stream;
          stream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, stream));
          setIsConnected(true);
        } catch (error) {
          console.error("Error accessing media devices.", error);
        }
      };
      

    startLocalVideoStream();
    console.log("Checking media devices API:", navigator.mediaDevices);


    // WebRTC signaling events
    socket.on("offer", async (offer) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer);
      socket.emit("answer", { sessionId, answer });
    });

    socket.on("answer", (answer) => {
      peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", (candidate) => {
      peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      peerConnection.current?.close();
      socket.disconnect();
    };
  }, [sessionId]);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1>Session ID: {sessionId}</h1>
      <video ref={localVideoRef} autoPlay playsInline muted className="w-1/2 h-1/2 bg-gray-100"></video>
      <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 h-1/2 bg-gray-100"></video>
      {!isConnected && <p>Connecting to video and audio...</p>}
    </div>
  );
}
