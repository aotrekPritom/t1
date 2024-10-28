"use client"
import Card from "@/components/ui/Card";
import { useGetAllCourseQuery } from "@/redux/api/course/courseApi";
import { TCourse } from "@/types/courseType";
import { Spin } from "antd";

const PopularCourse = () => {
  const { data: courseData, isLoading } = useGetAllCourseQuery({});
    //  console.log(courseData)
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
              courseData?.data?.map((item: TCourse) => (
                <Card key={item?.id} content={item} />
              ))
            )
        }
      </div>
    </div>
  );
};

export default PopularCourse;
