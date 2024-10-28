// "use client";

// import React, { useState } from "react";
// import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";

// type LiveSessionProps = {
//   sessionData: {
//     agoraToken: string;
//     channelName: string;
//   };
//   uid: number;
//   role: "host" | "audience"; // "host" for teacher, "audience" for student
// };

// const LiveSession: React.FC<LiveSessionProps> = ({
//   sessionData,
//   uid,
//   role,
// }) => {
//   const [isJoined, setIsJoined] = useState(true);
//   const { channelName, agoraToken } = sessionData;

//   const rtcProps: PropsInterface = {
//     appId: "d2eda946468a4cdb83003ade550708cc", // Replace with your actual Agora App ID
//     channel: channelName,
//     token: agoraToken,
//     layout: layout.grid,
//     uid,
//     role,
//   };

//   const callbacks = {
//     EndCall: () => {
//       setIsJoined(false);
//       console.log(
//         `${role === "host" ? "Teacher" : "Student"} left the channel`
//       );
//     },
//   };

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <h2>
//         {role === "host" ? "Teacher's Live Stream" : "Student Live Session"}
//       </h2>
//       {isJoined ? (
//         <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//       ) : (
//         <p>You have left the session.</p>
//       )}
//       <button onClick={() => setIsJoined(false)} style={{ marginTop: "10px" }}>
//         End Call
//       </button>
//     </div>
//   );
// };

// export default LiveSession;
