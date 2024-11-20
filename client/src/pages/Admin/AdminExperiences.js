import React from 'react'
import { Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import { Modal } from "antd";
import axios from 'axios';

function AdminExperiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type ,setType] = React.useState("add");
    const onFinish =async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if(selectedItemForEdit){
                response = await axios.post('/api/portfolio/update-experience',{
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            }else {
                    response = await axios.post('/api/portfolio/add-experience', values);
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
            const response = await axios.post('/api/portfolio/delete-experience',{
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
                    Add Experience
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {experiences.map((experience) => (
                    <div className='shadow border p-5 border-gray-400 flex flex-col'>
                        <h1 className='text-primary text-xl font-bold'>{experience.period}</h1>
                        <hr mb-1 />
                        <div>
                            <h1 className='font-bold'>Role : </h1>
                            <p>{experience.title}</p>
                        </div>
                        <div><h1 className='font-bold'>Organisation/Company : </h1>
                        <p>{experience.company}</p>
                        </div>
                        <h1>{experience.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-red-500 text-white px-5 py-2'
                            onClick={()=>{
                                onDelete(experience);
                            }}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2'
                            onClick={()=>{
                                setSelectedItemForEdit(experience);
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
                   initialValues={selectedItemForEdit || {}}>
                    <Form.Item name="period" label="Period">
                        <input placeholder="Period" />
                    </Form.Item>
                    <Form.Item name="company" label="Company/ Org.">
                        <input placeholder="Company" />
                    </Form.Item>
                    <Form.Item name="title" label="Role">
                        <input placeholder="Role" />
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

export default AdminExperiences