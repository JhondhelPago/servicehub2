import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import upload_icon from '../../assets/upload.png'
import { renderIntoDocument } from 'react-dom/test-utils';

import sample from '../../assets/sample_img.jpg'
import sample2 from '../../assets/sample2.jpg'
import sample3 from '../../assets/sample3.jpg'

import { useContext } from 'react';
import { UserContext } from '../LoginComponents/UserContext';

const PostForm = ({ onClick }) => {

    const { AdminId } = useContext(UserContext);

    const [RenderingComponent, setRenderingComponent] = useState(null);

    const navigateHome = useNavigate();



    const [PreListDisabilities, SetPreListDisabilities] = useState(['Sensory Disabilities', 'Physical Disabilities', 'Intellectual Disabilities', 'Mental Health Disabilities', 'Learning Disabilities', 'Invisible Disabilities']);

    const [SelectedDisabilities, SetSelectedDisabilities] = useState([]);


    //function to update the Selected Disabities
    const AddDisability = (disability) => {

        let Copy_SelectedDisabilities = [...SelectedDisabilities];
    
        //remove from the PreListDisabilities
        let Copy_PreListDisabilities = [...PreListDisabilities];

        let indexOf_disabilitiy = Copy_PreListDisabilities.indexOf(disability);

        if(indexOf_disabilitiy !== -1){

            //if found remove the element on the array using the splice method
            Copy_PreListDisabilities.splice(indexOf_disabilitiy, 1);


            //adding the procedure
            Copy_SelectedDisabilities.push(disability);


            //updating the useState variable of two List
            SetPreListDisabilities(Copy_PreListDisabilities);
            // console.log('Assigned new PreListDisability')

            SetSelectedDisabilities(Copy_SelectedDisabilities);
            // console.log('Assigned new SelectedDisabilities');

            //displaying the updated useState
            // console.log(`PreListDisabilities: ${PreListDisabilities}`);
            // console.log(`SelectedDisabilities: ${SelectedDisabilities}`);

        }
    }


    const RemoveAddedDisabilitiy = () => {

    }

    const handleParentSelectedComponent = () => {
        onClick('dashboard');
    }

    useEffect(() => {
        const inputElement = document.getElementById('imageInput');
        inputElement.addEventListener('change', handleImageUpload);

        return () => {
            // Cleanup: Remove the event listener when the component unmounts
            inputElement.removeEventListener('change', handleImageUpload);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    const handleImageUpload = (event) => {
        let files = event.target.files;
        const imageContainerDiv = document.getElementById('imageContainerDiv');
        imageContainerDiv.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageUrl = event.target.result;
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = 'Uploaded Image';
                    imgElement.classList.add('mt-5', 'mr-5', 'min-w-[300px]', 'rounded-lg',);
                    imageContainerDiv.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);


        try {

            const response = await fetch('/Posting', {
                method: 'POST',
                body: formData
            });


            const feedback = await response.json();
            console.log(feedback)
            if (feedback.status) {
                console.log('Successful submission!');
                // setRenderingComponent(true);
                alert('Post is uploaded')
                handleParentSelectedComponent();

            }


        } catch (error) {
            throw error
        }

    }



    //execute after the initial render
    useEffect(() => {

    }, []);


    //execute after there is a change on this dependencies
    useEffect(() => {

        console.log(`State of the PreListDisabilities: ${PreListDisabilities}`);
        console.log(`State of the SelectedDisabilities: ${SelectedDisabilities}`);

    }, [PreListDisabilities, SelectedDisabilities]);



    return (
        <>

            {RenderingComponent === true && (
                <p>Rendering new Component</p>
            )}


            {RenderingComponent === null && (



                <div className="flex flex-row justify-center flex-grow gap-2 pr-5 bg-gray-100 text-darkColor">

                    <div className="flex flex-col grow">

                        <div className="flex items-center justify-between gap-2 py-5 pl-5 mb-3 ">
                            <h1 className="flex text-2xl font-medium md:text-4xl">
                                Create Post
                            </h1>
                            <p>{AdminId}</p>
                        </div>


                        <div className="flex flex-col gap-5 pl-5 md:mx-10 ">
                            <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-3 md:flex-row">
                                    <div className="flex flex-col w-full gap-3">
                                        {/* <!-- post type selection --> */}
                                        <select className="w-full py-2 pl-2 bg-white border rounded-lg border-darkColor" name="category" required>
                                            <option defaultValue>-Choose Post Type-</option>
                                            <option value="event">Event Posting</option>
                                            <option value="job">Job Posting</option>
                                        </select>
                                        {/* <!-- Title Input --> */}
                                        <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="text" name="title" placeholder="Title" required />
                                        {/* <!-- Date and Time Input --> */}
                                        <div className="flex flex-col gap-3 md:flex-row">
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 mr-5 bg-white border rounded-lg border-darkColor" type="date" name="date" />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="time" name="time" placeholder="01/01/2024" />
                                            </div>
                                        </div>
                                        {/* <!-- location --> */}
                                        <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor " name="location" placeholder="Location" />
                                    </div>
                                    {/* <!-- this is area is for file uploading --> */}
                                    <div className="">
                                        {/* <!-- image here --> */}
                                        <div className="relative flex">
                                            {/* <!-- Image display sample here  -->
                                            
                                            <!-- upload button --> */}
                                            <div className="flex items-center justify-center w-full bg-white border rounded-lg border-darkColor h-52 md:w-52 " >
                                                {/* <!-- image upload icon --> */}
                                                <img className="h-20" src={upload_icon} alt="upload image icon" />
                                                <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file" multiple />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Textarea for event description --> */}
                                <textarea className="px-3 py-2 border rounded-md border-darkColor" type="textarea" name="description" placeholder="Event Description" rows="10"></textarea>

                                {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                                <div className='flex items-center p-2 bg-white border rounded-lg border-darkColor'>
                                    <p className='pr-2'>Target Audience:</p>

                                    {/* selected container */}
                                    <div className='flex flex-wrap gap-2 grow'>

                                        {/* disability container */}
                                        <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'>
                                            {/* disability name */}
                                            <p className='text-lg'>Disability 1</p>
                                            <svg className='hidden h-5 text-red-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>
                                        </button>

                                    </div>


                                    {SelectedDisabilities && SelectedDisabilities.map((Disability) => {
                                        return (
                                            <>
                                                {/* selected container */}
                                                <div className='flex flex-wrap gap-2 grow'>

                                                {/* disability container */}
                                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'>
                                                    {/* disability name */}
                                                    <p className='text-lg'>{Disability}</p>
                                                    <svg className='hidden h-5 text-red-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>
                                                </button>

                                                </div>
                                            
                                            </>
                                        )
                                    })}

                                </div>

                                {/* options container */}
                                

                                {PreListDisabilities && PreListDisabilities.map((Disability) => {
                                    return (
                                        <>
                                            <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                            {/* disability container */}
                                            <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability(Disability)}}>
                                                {/* disability name */}
                                                <p className=''>{Disability}</p>
                                                <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                            </button>

                                            </div>
                                        </>
                                    )
                                })}

                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                    {/* disability container */}
                                    <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Sensory Disabilities')}}>
                                        {/* disability name */}
                                        <p className=''>Sensory Disabilities </p>
                                        <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                    </button>

                                </div>

                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                {/* disability container */}
                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Physical Disabilities')}}>
                                    {/* disability name */}
                                    <p className=''>Physical Disabilities</p>
                                    <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                </button>

                                </div>

                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                {/* disability container */}
                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Intellectual Disabilities')}}>
                                    {/* disability name */}
                                    <p className=''>Intellectual Disabilities</p>
                                    <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                </button>

                                </div>

                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                {/* disability container */}
                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Mental Health Disabilities')}}>
                                    {/* disability name */}
                                    <p className=''>Mental Health Disabilities</p>
                                    <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                </button>

                                </div>


                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                {/* disability container */}
                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Learning Disabilities')}}>
                                    {/* disability name */}
                                    <p className=''>Learning Disabilities</p>
                                    <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                </button>

                                </div>


                                <div className='flex flex-wrap justify-center gap-2 mt-2 md:justify-start'>

                                {/* disability container */}
                                <button className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full border-darkColor group' onClick={() => {AddDisability('Invisible Disabilities')}}>
                                    {/* disability name */}
                                    <p className=''>Invisible Disabilities</p>
                                    <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                </button>

                                </div>





                                <input id="creator_id" type="hidden" name="creator_id" value={AdminId} />
                                <button className="w-2/4 p-3 mx-auto my-3 text-white rounded-lg bg-primary-light scaleHover" type="submit" >Post</button>
                            </form>
                        </div>

                    </div>

                    {/* <div id="imageContainerDiv"> */}
                    <div className="flex flex-col gap-4 w-fit">
                        <div id="imageContainerDiv" ></div>
                        {/* <SampleImg
                            imgsrc={sample}
                        ></SampleImg>
                        <SampleImg
                            imgsrc={sample2}
                        ></SampleImg>
                        <SampleImg
                            imgsrc={sample3}
                        ></SampleImg> */}
                    </div>


                </div>
            )}
        </>
    );


}

// const SampleImg = ({
//     imgsrc,
// }) => {
//     {
//         return (
//             <>
//                 <img className="rounded-lg" src={imgsrc} alt="" />
//             </>
//         )
//     }
// }

export default PostForm;