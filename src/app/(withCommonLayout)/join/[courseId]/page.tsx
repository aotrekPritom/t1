import VideoCall from "@/components/JoinPageComponents/VideoCall";
import Image from "next/image";
import React from "react";
type TProps = {
  params: {
    courseId: string;
  }
}
const JoinCoursePage = ({ params }: TProps) => {
  return (
    <div className="container mx-auto py-20">
      <div className="space-y-10 mb-10">
        <p className="text-3xl font-bold text-[#1A3178]">Congratulation</p>
        <div className="">
          <VideoCall channel="pritom" />
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-y-2 md:gap-y-0 md:p-0 p-2 ">
        <div className="col-span-1 flex flex-col gap-2 order-2">

           <iframe
            src="https://www.youtube.com/embed/2NU5SkQWZak"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="md:w-[300px] w-full h-full rounded-md"
          />
           <iframe
            src="https://www.youtube.com/embed/2NU5SkQWZak"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="md:w-[300px] w-full h-full rounded-md"
          />
        </div>

        <div className="col-span-3 order-1">
          {/* add video */}
                     <iframe
            src="https://www.youtube.com/embed/2NU5SkQWZak"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            
            className="w-full md:h-[430px] h-full rounded-md "
          />


        </div>
      </div>
    </div>
  );
};

export default JoinCoursePage;
