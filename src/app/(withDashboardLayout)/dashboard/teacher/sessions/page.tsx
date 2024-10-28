"use client";

import { useGetAllCourseByTeacherQuery } from "@/redux/api/course/courseApi";
import { TCourse } from "@/types/courseType";
import { Table } from "antd";
import React, { useState } from "react";

// Define the table columns
const columns = [
  {
    title: "Course ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Course Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price ($)",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price}`,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const TeacherSessionPage = () => {
  const { data, isLoading } = useGetAllCourseByTeacherQuery({});
  const courses = data?.data || []; // Ensure courses is an array

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: courses.length,
  });

  // Handle pagination change
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sessions</h2>
      <Table
        columns={columns}
        dataSource={courses}
        loading={isLoading}
        rowKey={(course:TCourse) => course.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TeacherSessionPage;
