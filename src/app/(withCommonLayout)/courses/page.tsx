"use client"
import { useState } from 'react';
import { Pagination } from 'antd';
import type { NextPage } from 'next';
import { useGetAllCourseQuery } from '@/redux/api/course/courseApi';
import Card from '@/components/ui/Card';
import { TCourse } from '@/types/courseType';
import { useSearchParams } from 'next/navigation';
import CourseLoading from '@/components/LazyLoadingComponents/CourseLoading';

type Course = {
  id: number;
  title: string;
  description: string;
};


const AllCoursePage: NextPage = () => {
  const searchParams=useSearchParams();
  const searchTerm=searchParams.get('searchTerm')
      const query:Record<string,any>={};
  if(searchTerm){
    query['searchTerm']=searchTerm;
  }
    const {data,isLoading}=useGetAllCourseQuery({...query});
    const courses=data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); 
  // Calculate paginated courses based on currentPage and pageSize
  const paginatedCourses = courses?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  if (isLoading) {
    return <div className="container mx-auto  min-h-screen  pt-10">
      <h1 className='bg-gray-300 w-44 h-8 rounded-md mb-8'></h1>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 ">
      {
        Array(10).fill(1)?.map((_,index:number) => (
          <CourseLoading key={index} />
        ))
      }
    </div>
    </div>
  }

  return (
    <div className="container mx-auto  min-h-screen  pt-10">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>

      {/* Course List */}
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
        {paginatedCourses?.map((product:TCourse) => (
          <Card content={product} key={product?.id}/>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={courses?.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          // showSizeChanger
          // pageSizeOptions={['5', '10', '20']}
        />
      </div>
    </div>
  );
};

export default AllCoursePage;
