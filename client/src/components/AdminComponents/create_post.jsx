import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import upload_icon from '../../assets/upload.png';
import axios from 'axios';

import { UserContext } from '../LoginComponents/UserContext';

const PostForm = ({ onClick }) => {
    const { AdminId } = useContext(UserContext);
    const navigateHome = useNavigate();

    const [RenderingComponent, setRenderingComponent] = useState(null);
    const [PreListDisabilities, SetPreListDisabilities] = useState(['Sensory Disabilities', 'Physical Disabilities', 'Intellectual Disabilities', 'Mental Health Disabilities', 'Learning Disabilities', 'Invisible Disabilities']);
    const [SelectedDisabilities, SetSelectedDisabilities] = useState([]);

    const SortPreListDisabilities = () => {
        SetPreListDisabilities([...PreListDisabilities].sort());
    }

    const SortSelectedDisabilities = () => {
        SetSelectedDisabilities([...SelectedDisabilities].sort());
    }

    const AddDisability = (disability) => {
        let Copy_PreListDisabilities = [...PreListDisabilities];
        let Copy_SelectedDisabilities = [...SelectedDisabilities];

        let indexOf_disability = Copy_PreListDisabilities.indexOf(disability);
        if (indexOf_disability !== -1) {
            Copy_PreListDisabilities.splice(indexOf_disability, 1);
            Copy_SelectedDisabilities.push(disability);
            SetPreListDisabilities(Copy_PreListDisabilities);
            SetSelectedDisabilities(Copy_SelectedDisabilities);
        }
    }

    const RemoveAddedDisability = (disability) => {
        let Copy_SelectedDisabilities = [...SelectedDisabilities];
        let Copy_PreListDisabilities = [...PreListDisabilities];

        let indexOf_disability = Copy_SelectedDisabilities.indexOf(disability);
        if (indexOf_disability !== -1) {
            Copy_SelectedDisabilities.splice(indexOf_disability, 1);
            Copy_PreListDisabilities.push(disability);
            SetPreListDisabilities(Copy_PreListDisabilities);
            SetSelectedDisabilities(Copy_SelectedDisabilities);
        }
    }

    const handleParentSelectedComponent = () => {
        onClick('dashboard');
    }

    useEffect(() => {
        const inputElement = document.getElementById('imageInput');
        inputElement.addEventListener('change', handleImageUpload);

        return () => {
            inputElement.removeEventListener('change', handleImageUpload);
        };
    }, []);

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
                    imgElement.classList.add('mt-5', 'mr-5', 'min-w-[300px]', 'rounded-lg');
                    imageContainerDiv.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = new FormData(document.getElementById('postForm'));

        // const Data = {
        //     category: formData.get('category'),
        //     title: formData.get('title'),
        //     date: formData.get('date'),
        //     time: formData.get('time'),
        //     location: formData.get('location'),
        //     description: formData.get('description'),
        //     uploadImages: formData.getAll('uploadImages'),
        //     target_audience: SelectedDisabilities
        // }

        // console.log(Data);

        // const response = await axios.post(`/Posting`, Data);


        // Logging formData for debugging
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        const formData = new FormData(event.target);

        try {
            const response = await fetch('/Posting', {
                method: 'POST',
                body: formData
            });

            const feedback = await response.json();
            if (feedback.status) {
                alert('Post is uploaded');
                handleParentSelectedComponent();
            }
        } catch (error) {
            console.error(error);
        }


    }

    return (
        <>
            {RenderingComponent === true && <p>Rendering new Component</p>}

            {RenderingComponent === null && (
                <div className="flex flex-row justify-center flex-grow gap-2 pr-5 bg-gray-100 text-darkColor">
                    <div className="flex flex-col grow">
                        <div className="flex items-center justify-between gap-2 py-5 pl-5 mb-3">
                            <h1 className="flex text-2xl font-medium md:text-4xl">Create Post</h1>
                            <p>{AdminId}</p>
                        </div>

                        <div className="flex flex-col gap-5 pl-5 md:mx-10">
                            <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm" onSubmit={handleSubmit}>
                                <input name="creator_id" type="hidden" value={AdminId}></input>
                                <input name="targetAudience" type="hidden" value={SelectedDisabilities}></input>
                                <div className="flex flex-col w-full gap-3 md:flex-row">
                                    <div className="flex flex-col w-full gap-3">
                                        <select className="w-full py-2 pl-2 bg-white border rounded-lg border-darkColor" name="category" required>
                                            <option defaultValue>-Choose Post Type-</option>
                                            <option value="event">Event Posting</option>
                                            <option value="job">Job Posting</option>
                                        </select>
                                        <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="text" name="title" placeholder="Title" required />
                                        <div className="flex flex-col gap-3 md:flex-row">
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 mr-5 bg-white border rounded-lg border-darkColor" type="date" name="date" />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="time" name="time" placeholder="01/01/2024" />
                                            </div>
                                        </div>
                                        <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" name="location" placeholder="Location" />
                                    </div>
                                    <div className="">
                                        <div className="relative flex">
                                            <div className="flex items-center justify-center w-full bg-white border rounded-lg border-darkColor h-52 md:w-52">
                                                <img className="h-20" src={upload_icon} alt="upload image icon" />
                                                <input id="imageInput" className="absolute inset-0 opacity-0 cursor-pointer" type="file" name="uploadImages" placeholder="upload file" multiple />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <textarea className="px-3 py-2 border rounded-md border-darkColor" type="textarea" name="description" placeholder="Event Description" rows="10"></textarea>
                                <div className='flex flex-wrap items-center gap-2 p-2 bg-white border rounded-lg border-darkColor'>
                                    <p className='pr-2'>Target Audience:</p>
                                    {SelectedDisabilities.map((Disability) => (
                                        <button
                                            key={Disability}
                                            className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'
                                            onClick={() => RemoveAddedDisability(Disability)}
                                        >
                                            <p className='text-lg'>{Disability}</p>
                                            <svg className='hidden h-5 text-red-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g fill="none" fillRule="evenodd">
                                                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                    <path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.122L12 9.878L6.697 4.575A1.5 1.5 0 1 0 4.575 6.697L9.878 12l-5.303 5.303a1.5 1.5 0 0 0 2.122 2.122L12 14.122z" />
                                                </g>
                                            </svg>
                                        </button>
                                    ))}
                                    {/* {PreListDisabilities.map((Disability) => (
                                        <button
                                            key={Disability}
                                            className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'
                                            onClick={() => AddDisability(Disability)}
                                        >
                                            <p className='text-lg'>{Disability}</p>
                                            <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M19 13H5v-2h14v2z" />
                                            </svg>
                                        </button>
                                    ))} */}
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <div className='flex gap-2 mt-2 w-fit md:justify-start'>
                                        {PreListDisabilities.map((Disability) => (
                                            <button
                                                key={Disability}
                                                className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group'
                                                onClick={() => AddDisability(Disability)}
                                            >
                                                <p className='text-lg'>{Disability}</p>
                                                <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                            </button>
                                        ))}
                                    </div>

                                </div>
                                <button className="w-2/4 p-3 mx-auto my-3 text-white rounded-lg bg-primary-light scaleHover" type="submit">Post</button>
                            </form>
                        </div>
                    </div>
                    <div id="imageContainerDiv" className='flex flex-wrap justify-center'></div>
                </div>
            )}
        </>
    )
}

export default PostForm;
