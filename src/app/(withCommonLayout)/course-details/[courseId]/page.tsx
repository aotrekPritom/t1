"use client";
import React, { useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { LiaFileVideo, LiaArrowsAltHSolid } from "react-icons/lia";
import { AiOutlineDownload, AiOutlineMobile } from "react-icons/ai";
import { GiTargetPrize } from "react-icons/gi";
import { GrArticle } from "react-icons/gr";
import {  useEnrolledCourseMutation, useGetIsEnrolledCourseQuery, useGetSingleCourseByIdQuery } from "@/redux/api/course/courseApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Spin } from "antd";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// import RatingStar from "./RatingStar";
// import CourseContent from "./CourseContent";

type TProps ={
  params:{
    courseId:string;
  }
}

const CourseDetailsPage = ({params}:TProps) => {
  const [enrolledCourse,{isLoading:enrolledCourseLoading}]=useEnrolledCourseMutation();
  const {data:isEnrolled,isLoading:isEnrolledLoading}=useGetIsEnrolledCourseQuery(params.courseId);
  const {data,isLoading}=useGetSingleCourseByIdQuery(params.courseId)
  const course=data?.data;
  const {token}=useAppSelector((state:RootState)=>state.auth)
  const router=useRouter();

  const handleSubscription = async () => {
      if(token){
            // Display loading alert
    Swal.fire({
      title: "Processing...",
      text: "Enrolling in the course, please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await enrolledCourse(params.courseId);
      Swal.close(); // Close the loading alert

      // Check if enrollment was successful
      if (res?.data?.success === true) {
        router.push(`/join/${params.courseId}`)
        Swal.fire({
          title: "Success!",
          text: "You have successfully enrolled in the course!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
      }
      else{
        Swal.close();
        Swal.fire({
          title: "Unauthorized",
          text: "Please Login!",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push('/login')
      }
  };



  const CourseList = {
    name: "The Complete 2023 Web Development Bootcamp",
    description:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    creator: "Dr. Angela Yu",
    rating: 3.5,
    noOfUserRated: "304,443",
    totalStudents: "1,,074,271",
    totalHours: 74,
    totalLecture: 66,
    totalTopic: 66,
    level: "All Level",
    discountPrice: 649,
    price: 3199,
    bestSeller: true,
    thumbnail: "https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    introUrl: "",
    learning: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs",
      "After the course you will be able to build ANY website you want.",
      "Work as a freelance web developer.",
      "Master backend development with Node.",
      "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
      "Build fully-fledged websites and web apps for your startup or business.",
      "Master frontend development with React",
      "Learn professional developer best practices.",
    ],
    courseContentData: [
      {
        topicTitle: "Front-End Web Development",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intorduction to HTML",
        totalTopicDuration: "0",
        totalTopicLectures: "0",
        content: "",
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
      {
        topicTitle: "Intermexdiate HTML",
        totalTopicDuration: "30",
        totalTopicLectures: "9",
        content: [
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
          {
            lectureTitle: "How to Get Help When You're Stuck",
            duration: "03:08",
          },
        ],
      },
    ],

    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      "A computer with access to the internet",
      "No paid software required",
      "I'll walk you through, step-by-step how to get all the software installed and set up",
    ],
  };
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      title: "Personal",
      content: (
        <div>
          <h1 className="text-xl font-bold">
            Subscribe to Udemy’s top courses
          </h1>
          <p className="text-sm text-gray-600 py-2">
            Get this course, plus 10,500+ of our top-rated courses, with
            Personal Plan.
          </p>

          {isEnrolledLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : isEnrolled?.data ? (
     <Link href={`/join/${params.courseId}`}>
        <button className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold">
          Join Session
        </button>
     </Link>
      ) : (
        <button
          onClick={handleSubscription}
          className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold"
        >
          Start Subscription
        </button>
      )}

          <div className=" text-center py-2">
            <p className="text-sm text-gray-600">Starting at ₹750 per month</p>
            <p className="text-sm text-gray-600">Cancel anytime</p>
          </div>

          <div className="text-sm text-center text-gray-600  flex items-center justify-center">
            <hr className=" w-full mr-2" />
            <span className="text-sm text-gray-600">or</span>
            <hr className=" w-full  ml-2" />
          </div>

          <div className=" flex items-center  gap-2 py-2">
            <p className="text-2xl font-extrabold">
              {CourseList.discountPrice
                ? `₹${CourseList.discountPrice}`
                : `₹${CourseList.price}`}
            </p>
            <p className="text-xl text-gray-500 line-through">
              {CourseList.discountPrice && `₹${CourseList.price}`}
            </p>
          </div>

         {
          isEnrolledLoading ? (
             <button className="w-full h-10 rounded-md bg-gray-300 animate-pulse"></button>
          )
          :
          (
            <button className={`text-xl py-2 bg-transparent border-2 hover:bg-gray-400 w-full p-2 rounded-sm font-bold ${isEnrolled ? 'text-green-500' : 'text-black'} hover:text-black pointer-events-none `}>
            {
              isEnrolled ? 'You Allready Enrolled This Course' : ' Buy This Course'
            }
           
          </button>
          )
         }

          <div className=" text-center py-2">
            <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
            <p className="text-sm text-gray-600">Full Lifetime Access</p>
          </div>
        </div>
      ),
    },
    {
      title: "Team",
      content: (
        <div>
          <p className="text-sm text-gray-600 py-2">
            Subscribe to this course and 22,000+ top‑rated Udemy courses for
            your organization.
          </p>

          <button className="text-xl py-2 bg-purple-700 hover:bg-purple-600 w-full p-2 rounded-sm text-white font-bold">
            Try Eduvalt Bussiness
          </button>
        </div>
      ),
    },
  ];




  const courseIncludes = [
    { text: "62.5 hours on-demand video", icon: <LiaFileVideo /> },
    {
      text: "105 downloadable resources",
      icon: <AiOutlineDownload />,
    },
    {
      text: "7 coding exercises",
      icon: <LiaArrowsAltHSolid />,
    },
    {
      text: "Access on mobile and TV",
      icon: <AiOutlineMobile />,
    },
    { text: "70 articles", icon: <GrArticle /> },
    {
      text: "Certificate of completion",
      icon: <GiTargetPrize />,
    },
  ];


  return (
    <div>
      {/* Course Head  */}
      <div className="bg-black bg-opacity-90 py-5">
        <div className="  xl:relative px-3 container mx-auto ">
          <div className=" space-y-5 xl:w-[70%] ">
            {/* Path  */}
            <div className=" flex sm:gap-1 items-center pb-5">
              <p className="hidden text-sm text-purple-500 sm:flex items-center">
                Development
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
              <p className="text-sm text-purple-500 flex items-center">
                Web Development
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
              <p className="text-sm text-purple-500 flex items-center">
                Web Development{" "}
                <span className="text-2xl text-white">
                  <RiArrowDropRightLine />
                </span>
              </p>
            </div>

            {/* Course Intor Vdio  */}
            <div className="xl:hidden border-8 border-purple-400">
              <video
                className="h-full w-full"
                src={CourseList.introUrl}
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              ></video>
            </div>

            {/* Description */}
            <div className=" space-y-4">
              <h1 className="text-2xl sm:text-4xl text-white font-bold">
                {CourseList.name}
                {/* {course?.name} */}
              </h1>

              <p className="sm:text-xl text-white">
                Become a Full-Stack Web Developer with just ONE course. HTML,
                CSS, Javascript, Node, React, MongoDB, Web3 and DApps
              </p>

              <div className="text-sm sm:text-md flex items-center gap-1 sm:gap-2">
                <div className=" bg-yellow-300 px-2 w-min rounded">
                  {CourseList.bestSeller ? (
                    <p className=" text-sm font-semibold">BestSeller</p>
                  ) : (
                    <></>
                  )}
                </div>

                <p className="font-bold text-orange-400 text-sm">
                  {CourseList.rating}
                </p>

                <div>{/* <RatingStar rating={CourseList.rating} /> */}</div>

                <p className="text-purple-500 text-sm underline">{`(${CourseList.noOfUserRated} ratings)`}</p>

                <p className="text-white ">
                  {CourseList.totalStudents} students
                </p>
              </div>

              <p className=" text-white">
                Created By:{" "}
                <span className=" text-purple-500 ">{CourseList.creator}</span>
              </p>

              <div className=" flex gap-3">
                <p className=" text-sm text-white flex items-center gap-1">
                  <MdOutlineDoNotDisturbAlt />
                  Last Update 8/2023
                </p>
                <p className=" text-sm text-white flex items-center gap-1">
                  <BiWorld />
                  English
                </p>
              </div>
            </div>
          </div>

          {/* Course Review  */}
          <div className="my-5 xl:bg-white sticky xl:absolute xl:w-[29%] pb-5 top-0 right-0 shadow-xl">
            <div className="hidden xl:block border-4  border-purple-400">
              <video
                className="w-full h-full"
                src={CourseList.introUrl}
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              ></video>
            </div>

            <div className="flex flex-col  ">
              <div className="flex mb-4 border-b-2 justify-between">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`w-full py-3 mr-6  font-bold  focus:outline-none ${
                      activeTab === index
                        ? " text-black border-b-2 border-black"
                        : " text-gray-500"
                    }    `}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className="px-4 relative">{tabs[activeTab].content}</div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn  */}

      {/* Course Includes Item  */}
      <div className=" py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">What you will Learn</h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-3 py-2">
            {courseIncludes.map((item, index) => (
              <div key={index} className="flex  gap-3 ">
                <p>{item.icon}</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content  */}
      <div className="py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3 ">
        <h2 className="text-2xl  font-bold">Course Content</h2>
        <p className="py-2 text-gray-600">{`${CourseList.courseContentData.length} secions . ${CourseList.totalLecture} lectures . ${CourseList.totalHours} hours`}</p>

        {/* <CourseContent CourseList={CourseList} /> */}
      </div>

      {/* Requirements */}
      <div className=" py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">Requirements</h2>

          <div className="py-2">
            {CourseList.requirements.map((item, index) => (
              <li className="" key={index}>
                {item}
              </li>
            ))}
          </div>
        </div>
      </div>

      {/* Discription Full */}
      <div className="  py-[1rem] lg:w-[80%] xl:w-[75%] m-auto px-3  ">
        <div className="xl:w-[70%]">
          <h2 className="text-2xl py-2 font-bold">Description</h2>

          <div className="pb-4">
            <p>{CourseList.description}</p>
          </div>

          <div>
            <p className="">
              Throughout this comprehensive course, we cover a massive amount of
              topics thats including:
            </p>
          </div>

          <div className="py-2">
            {CourseList.courseContentData.map((item, index) => (
              <li className="" key={index}>
                {item.topicTitle}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
