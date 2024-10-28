/* eslint-disable @typescript-eslint/no-unused-expressions */
// "use client";
// import { useEffect } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// // Agora client setup
// const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

// type TProps = {
//   sessionData: {
//     agoraToken: string;
//     channelName: string;
//   };
//   uid: number;
// };

// const LiveSessionTeacher = ({ sessionData, uid }: TProps) => {
//   useEffect(() => {
//     const { channelName, agoraToken } = sessionData;

//     const initAgora = async () => {
//       try {
//         // Set client role to "host" explicitly before joining
//         await client.setClientRole("host");

//         // Join the channel as the teacher (host)
//         await client.join(
//           "d2eda946468a4cdb83003ade550708cc", // Replace with your Agora App ID
//           channelName,
//           agoraToken,
//           uid
//         );
//         console.log("Host joined the channel:", channelName);

//         // Create and publish local video and audio tracks
//         const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
//         const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//         await client.publish([localVideoTrack, localAudioTrack]);

//         localVideoTrack.play("local-video");
//         console.log("Host's local video is playing, and audio is published.");
//       } catch (error) {
//         console.error("Failed to initialize Agora as a host:", error);
//       }
//     };

//     initAgora();

//     // Clean up on component unmount
//     return () => {
//       client.leave();
//       client.removeAllListeners();
//       console.log("Teacher left the channel");
//     };
//   }, [sessionData, uid]);

//   const endCall = async () => {
//     await client.leave();
//   };

//   return (
//     <div>
//       <h2>Teacher Live Stream</h2>
//       <div
//         id="local-video"
//         style={{ width: "400px", height: "300px", backgroundColor: "#000" }}
//       ></div>
//       <button onClick={endCall}>End Call</button>
//     </div>
//   );
// };

// export default LiveSessionTeacher;

"use client";
import { useEffect } from "react";
import AgoraRTC, { ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

type TProps = {
  sessionData: {
    agoraToken: string;
    channelName: string;
  };
  uid: number;
};

const LiveSessionTeacher = ({ sessionData, uid }: TProps) => {
  useEffect(() => {
    const { channelName, agoraToken } = sessionData;

    let localVideoTrack: ILocalVideoTrack | null = null;
    let localAudioTrack: ILocalAudioTrack | null = null;

    const initAgora = async () => {
      if (client.connectionState !== "DISCONNECTED") {
        console.warn(
          "Client is already connected or connecting, skipping join."
        );
        return;
      }

      try {
        await client.setClientRole("host");
        await client.join(
          "d2eda946468a4cdb83003ade550708cc",
          channelName,
          agoraToken,
          uid
        );
        console.log("Teacher joined the channel:", channelName);

        // Create and publish local video and audio tracks
        localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish([localVideoTrack, localAudioTrack]);

        localVideoTrack.play("local-video");
        console.log(
          "Teacher's local video is playing, and audio is published."
        );
      } catch (error) {
        console.error("Failed to initialize Agora as a teacher:", error);
      }
    };

    initAgora();

    return () => {
      client.leave().then(() => {
        console.log("Teacher left the channel");
        client.removeAllListeners();
        localVideoTrack && localVideoTrack.close();
        localAudioTrack && localAudioTrack.close();
      });
    };
  }, [sessionData, uid]);

  return (
    <div>
      <h2>Teacher Live Stream</h2>
      <div
        id="local-video"
        style={{ width: "400px", height: "300px", backgroundColor: "#000" }}
      ></div>
      <button onClick={() => client.leave()}>End Call</button>
    </div>
  );
};

export default LiveSessionTeacher;
