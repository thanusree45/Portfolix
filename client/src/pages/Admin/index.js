import React from 'react'
import Header from '../../components/Header'
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminCourses from './AdminCourses';
import AdminContact from './AdminContact';
import { useEffect } from 'react';

const { TabPane } = Tabs;
function Admin() {
    const { portfolioData } = useSelector((state) => state.root);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/admin-login");
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <div className='flex justify-between'>
                <h1 className='text-2xl p-5 text-primary'>Portfolio Admin</h1>
                <p type='submit' className="p-5 text-xl text-primary pr-4 cursor-pointer"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/admin-login");
                    }}>Logout</p>
            </div>
            {
                portfolioData && <div className='mt-5 p-5'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Intro" key="1">
                            <AdminIntro />
                        </TabPane>
                        <TabPane tab="About" key="2">
                            <AdminAbout />
                        </TabPane>
                        <TabPane tab="Experiences" key="3">
                            <AdminExperiences />
                        </TabPane>
                        <TabPane tab="Projects" key="4">
                            <AdminProjects />
                        </TabPane>
                        <TabPane tab="Courses" key="5">
                            <AdminCourses />
                        </TabPane>
                        <TabPane tab="Contact" key="6">
                            <AdminContact />
                        </TabPane>
                    </Tabs>
                </div>
            }
        </div >
    )
}

export default Admin