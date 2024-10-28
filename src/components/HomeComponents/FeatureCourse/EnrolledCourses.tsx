"use client"

import Card from "@/components/ui/Card";
import { useGetEnrolledCoursesQuery } from "@/redux/api/course/courseApi";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TCourse, TEnrolledCourse } from "@/types/courseType";
import {  Spin } from "antd";

const EnrolledCourses = () => {
    const user=useAppSelector((state : RootState)=>state.auth.user) as TUser;
    const {data,isLoading}=useGetEnrolledCoursesQuery(user?.id);
    const courses=data?.data;
    // console.log(courses)
    return (
        <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {
            isLoading ?
              (
                <Spin/>
              )
              :
              (
                courses?.map((item: TEnrolledCourse) => (
                  <Card key={item?.id} content={item?.course} />
                ))
              )
          }
        </div>
      </div>
    );
};

export default EnrolledCourses;