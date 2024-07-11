import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageStringUtils } from '../../utils';
import upload_icon from '../../assets/upload.png';

const EditFormComponent = (props) => {
    const navigate = useNavigate();

    // deconstructive function from the parent component set as the props of this child Component
    const { SetComponent } = props;

    const OriginalData = props.EditingData;

    const [InputData, setInputData] = useState({
        id: props.EditingData.id,
        event_title: props.EditingData.event_title,
        scheduled_date: props.EditingData.scheduled_date,
        scheduled_time: props.EditingData.scheduled_time,
        location: props.EditingData.location,
        description: props.EditingData.description,
        post_type: props.EditingData.post_type
    });

    const imagefiles = props.EditingData.imagefiles.split(',');

    const HandleInputChange = (e) => {
        // deconstructing the name and the value of the selected event target
        const { name, value } = e.target;

        setInputData(prevData => ({ ...prevData, [name]: value }));
    };

    const SaveChanges = () => {
        // check the variable if there is changes
        // if there is a change execute the backend
        // if there no changes simple set the active component to the job_posting

        if (
            (OriginalData.event_title === InputData.event_title) &&
            (OriginalData.scheduled_date === InputData.scheduled_date) &&
            (OriginalData.scheduled_time === InputData.scheduled_time) &&
            (OriginalData.location === InputData.location) &&
            (OriginalData.description === InputData.description)
        ) {
            SetComponent('job_posting');
        } else {
            fetch('/jobeditpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(InputData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('response is not ok in edit_post at SaveChanges() function');
                }
            })
            .catch(error => {
                console.log(error);
            })

            alert('The Post has been updated.');

            if (InputData.post_type === 'event_post') {
                SetComponent('event_posting');
            } else {
                SetComponent('job_posting');
            }
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center flex-grow gap-2 pr-5 bg-gray-100 text-darkColor">
                <div className="flex flex-col grow">
                    <div className="flex items-center justify-between gap-2 py-5 pl-5 mb-3 ">
                        <h1 className="flex text-2xl font-medium md:text-4xl">
                            Edit Post
                        </h1>
                    </div>
                    <div className="flex flex-col gap-5 pl-5 md:mx-10 ">
                        <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm">
                            <div className="flex flex-col w-full gap-3 md:flex-row">
                                <div className="flex flex-col w-full gap-3">
                                    {/* <!-- Title Input --> */}
                                    <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="text" name="event_title" placeholder="Title" value={InputData.event_title} onChange={HandleInputChange} />
                                    {/* <!-- Date and Time Input --> */}
                                    <div className="flex flex-col gap-3 md:flex-row">
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full px-3 py-2 mr-5 bg-white border rounded-lg border-darkColor" type="date" name="scheduled_date" value={InputData.scheduled_date} onChange={HandleInputChange} />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="time" name="scheduled_time" placeholder="01/01/2024" value={InputData.scheduled_time} onChange={HandleInputChange} />
                                        </div>
                                    </div>
                                    {/* <!-- location --> */}
                                    <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" name="location" placeholder="Location" value={InputData.location} onChange={HandleInputChange} />
                                </div>
                                {/* <!-- this area is for file uploading --> */}
                                <div className="">
                                    {/* <!-- image here --> */}
                                    <div className="relative flex">
                                        {/* <!-- Image display sample here  --> */}
                                        {/* <!-- upload button --> */}
                                        <div className="flex items-center justify-center w-full bg-white border rounded-lg border-darkColor h-52 md:w-52" >
                                            {/* <!-- image upload icon --> */}
                                            <img className="h-20" src={upload_icon} alt="upload image icon" />
                                            <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file" multiple />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Textarea for event description --> */}
                            <textarea className="px-3 py-2 border rounded-md border-darkColor" type="textarea" name="description" placeholder="Event Description" rows="10" value={InputData.description} onChange={HandleInputChange}></textarea>
                            {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                            <div className='flex flex-wrap items-center gap-2 p-2 bg-white border rounded-lg border-darkColor'>
                                <p className='pr-2'>Target Audience:</p>
                                {/* selected container */}
                                <div className='flex flex-wrap gap-2'>
                                    {/* disability container */}
                                    <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'>
                                        {/* disability name */}
                                        <p className='text-lg'>Disability</p>
                                        <svg className='hidden h-5 text-red-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>
                                    </button>
                                </div>
                            </div>
                            {/* options container */}
                            <div className='flex flex-row gap-2'>
                                <div className='flex gap-2 mt-2 w-fit md:justify-start'>
                                    {/* disability container */}
                                    <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group'>
                                        {/* disability name */}
                                        <p className=''>Disability</p>
                                        <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                            <input id="creator_id" type="hidden" name="creator_id" />
                            <button className="w-2/4 p-3 mx-auto my-3 text-white rounded-lg bg-primary-light scaleHover" type="button" onClick={SaveChanges}>Confirm Changes</button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-fit">
                    <div id="imageContainerDiv"></div>
                </div>
            </div>
        </>
    );
};

export default EditFormComponent;
