import React from 'react'
import { Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import { Modal } from "antd";
import axios from 'axios';

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type ,setType] = React.useState("add");
    const onFinish =async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if(selectedItemForEdit){
                response = await axios.post('https://portfolix.onrender.com/api/portfolio/update-course',{
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            }else {
                    response = await axios.post('/api/portfolio/add-course', values);
                }
            
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const onDelete = async (item) => {
        try{
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/delete-course',{
                _id: item._id,
            });
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                dispatch(HideLoading());
            }else{
                message.error(response.data.message);
            }
        }  
        catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModal(true);
                    }}>
                    Add Course
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {courses.map((course) => (
                    <div className='shadow border p-4 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-primary text-xl font-bold'>{course.title}</h1>
                        <hr />
                        <img src={course.image} alt="" className="h-60 w-80"/>
                        <h1>Title : {course.title}</h1>
                        <h1>{course.description}</h1>
                        <p>{course.link}</p>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-red-500 text-white px-5 py-2'
                            onClick={()=>{
                                onDelete(course);
                            }}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2'
                            onClick={()=>{
                                setSelectedItemForEdit(course);
                                setShowAddEditModal(true);
                                setType("edit");
                            }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        {
            (type === "add" ||
            selectedItemForEdit) && (
            <Modal open={showAddEditModal}
                title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
                footer={null}
                onCancel={() =>{ setShowAddEditModal(false);
                    setSelectedItemForEdit(null);}
                }>
                <Form layout="vertical" onFinish={onFinish}
                   initialValues={{...selectedItemForEdit,
                   technologies: selectedItemForEdit?.technologies?.join(" , "),  }|| {}}>
                    <Form.Item name="title" label="Title">
                        <input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL">
                        <input placeholder="Image" />
                    </Form.Item>
                    <Form.Item name="link" label="Link">
                        <input placeholder="Link" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <textarea placeholder="Description" />
                    </Form.Item>
                    <div className='flex justify-end'>
                        <button className="border-primary text-primary px-5 py-2"
                            onClick={() => {
                                setShowAddEditModal(false);
                                setSelectedItemForEdit(null);
                            }}>Cancel</button>
                        <button type="submit" className="bg-primary text-white px-5 py-2">
                            {selectedItemForEdit ? "Update" : "Add"}
                        </button>
                    </div>
                </Form>
            </Modal>
        )}
        </div>
    )
}

export default AdminCourses
