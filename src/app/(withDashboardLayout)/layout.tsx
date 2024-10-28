"use client"
import { Layout } from 'antd';
import SidebarHeader from '@/components/SidebarComponents/SidebarHeader';
import SideBar from '@/components/SidebarComponents/SideBar';
import DashboardContent from '@/components/DashboardComponents/DashboardContent';
import { useState } from 'react';

const DashboardLayout  = ({children}:{children:React.ReactNode}) => {
    const [collapsed, setCollapsed] = useState(false); // Shared state for collapse

    return (
        <Layout className='h-screen'>
        <SideBar  collapsed={collapsed}/>
        <Layout>
          <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
          <DashboardContent children={children}/>          
        </Layout>
      </Layout>
    );
};

export default DashboardLayout;