import React, { useEffect } from 'react';
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
        target_group: props.EditingData.target_group,
        post_type: props.EditingData.post_type
    });


    const [event_title, setEvent_title] = useState(props.EditingData.event_title);
    const [scheduled_date, setScheduled_date] = useState(props.EditingData.scheduled_date);
    const [scheduled_time, setScheduled_time] = useState(props.EditingData.scheduled_time);
    const [location, setLocation] = useState(props.EditingData.location);
    const [description, setDescription] = useState(props.EditingData.description);
    const [target_group, setTarget_group] = useState(props.EditingData.target_group);
    const [post_type, setPost_type] = useState(props.EditingData.post_type);


    

    const imagefiles = props.EditingData.imagefiles.split(',');

    const HandleInputChange = (e) => {
        // deconstructing the name and the value of the selected event target
        const { name, value } = e.target;

        setInputData(prevData => ({ ...prevData, [name]: value }));
    };

    const SaveChanges = async(e) => {
        e.preventDefault();
        // check the variable if there is changes
        // if there is a change execute the backend
        // if there no changes simple set the active component to the job_posting

        const NewData = {
            id: props.EditingData.id,
            event_title: event_title,
            scheduled_date: scheduled_date,
            scheduled_time: scheduled_time,
            location: location,
            description: description,
            target_group: SelectedDisabilities.join(','),
            post_type: props.EditingData.post_type
        }

        if (
            (OriginalData.event_title === NewData.event_title) &&
            (OriginalData.scheduled_date === NewData.scheduled_date) &&
            (OriginalData.scheduled_time === NewData.scheduled_time) &&
            (OriginalData.location === NewData.location) &&
            (OriginalData.description === NewData.description) &&
            (OriginalData.target_gorup === NewData.target_group)
        ) {
            SetComponent('job_posting');
        } else {
            fetch('/jobeditpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(NewData)
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


    const [ImageFile, SetImageFile] = useState(null);

    const imagefileToArray = () => {
        if (props.EditingData.imagefiles != ''){
            const imagefile = props.EditingData.imagefiles.split(',');
            SetImageFile(imagefile);
        }
    }



    const [PreListedDisabilities, SetPreListDisabilities] = useState(['Sensory Disabilities', 'Physical Disabilities', 'Intellectual Disabilities', 'Mental Health Disabilities', 'Learning Disabilities', 'Invisible Disabilities']);
    const [SelectedDisabilities, SetSelectedDisabilities] = useState([]);

    const target_groupToArray = () => {
        if(props.EditingData.target_group != ''){
            const target_group = props.EditingData.target_group.split(',');
            console.log(target_group);
            SetSelectedDisabilities(target_group);
        }
    }
    
    const UnselectedDisability = () => {

        // let selected_disability = props.EditingData.target_group.split(',');
        // let Prelisted_disability = [...PreListedDisabilities];
        
        // console.log(`initialize Prelisted_disability: ${Prelisted_disability}`);

        // selected_disability.forEach((disability_category) => {

        //     const indexPositionToRemove = Prelisted_disability.indexOf(disability_category);

        //     if( indexPositionToRemove !== -1){
        //         Prelisted_disability.splice(indexPositionToRemove, 1);
        //     }
        // });

        // console.log(`after forEach Prelisted_disability: ${Prelisted_disability}`);
        // SetPreListDisabilities(PreListedDisabilities);

        const selected_disability = props.EditingData.target_group.split(',');
        const updatedPreListedDisabilities = PreListedDisabilities.filter(disability => !selected_disability.includes(disability));
        SetPreListDisabilities(updatedPreListedDisabilities);
        
    }

    const handleAddDisability = (disability) => {

        const toAdd = [...SelectedDisabilities, disability];
        console.log(`new state of the Selected : ${toAdd}`)
        SetSelectedDisabilities(toAdd);

        const toRemove = PreListedDisabilities.filter(item => item !== disability)
        console.log(`new state of to PreSelected: ${toRemove}`);
        SetPreListDisabilities(toRemove);
    };

    const handleRemoveDisability = (disability) => {

        const toRemove = SelectedDisabilities.filter(item => item !== disability);
        console.log(`new state of the Selected: ${toRemove}`);
        SetSelectedDisabilities(toRemove);

        const toAdd = [...PreListedDisabilities, disability]
        console.log(`new state of PreSelected: ${toAdd}`);
        SetPreListDisabilities(toAdd);
    };

    // //execute after the initial render of tghe component.
    useEffect(() => {
        imagefileToArray();
        target_groupToArray();
        UnselectedDisability();
        // console.log(props);
    }, [])

    return (
        <>
            <div className="flex flex-row justify-center flex-grow gap-2 pr-5 bg-gray-100 text-darkColor">
                <div className="flex flex-col grow">
                    <div className="flex items-center justify-between gap-2 py-5 pl-5 mb-3 ">
                        <h1 className="flex text-2xl font-medium md:text-4xl">
                            Edit Post {props.EditingData.target_group}
                        </h1>
                    </div>
                    <div className="flex flex-col gap-5 pl-5 md:mx-10 ">
                        <form className="flex flex-col gap-3" method="post" encType="multipart/form-data" id="postForm">
                            <div className="flex flex-col w-full gap-3 md:flex-row">
                                <div className="flex flex-col w-full gap-3">
                                    {/* <!-- Title Input --> */}
                                    <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="text" name="event_title" placeholder="Title" value={event_title} onChange={(e) => {setEvent_title(e.target.value)}} />
                                    {/* <!-- Date and Time Input --> */}
                                    <div className="flex flex-col gap-3 md:flex-row">
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full px-3 py-2 mr-5 bg-white border rounded-lg border-darkColor" type="date" name="scheduled_date" value={scheduled_date} onChange={(e) => {setScheduled_date(e.target.value)}} />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" type="time" name="scheduled_time" placeholder="01/01/2024" value={scheduled_time} onChange={(e) => {setScheduled_time(e.target.value)}} />
                                        </div>
                                    </div>
                                    {/* <!-- location --> */}
                                    <input className="w-full px-3 py-2 bg-white border rounded-lg border-darkColor" name="location" placeholder="Location" value={location} onChange={(e) => {setLocation(e.target.value)}} />
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
                            <textarea className="px-3 py-2 border rounded-md border-darkColor" type="textarea" name="description" placeholder="Event Description" rows="10" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                            {/* <!-- select tag for selecting audience or selection multiple audience --> */}
                            <div className='flex flex-wrap items-center gap-2 p-2 bg-white border rounded-lg border-darkColor'>
                                <p className='pr-2'>Target Audience:</p>
                                {/* selected container */}
                                <div className='flex flex-wrap gap-2'>

                                    {SelectedDisabilities && SelectedDisabilities.map((disability_category) => (
                                        // disability container 
                                            <div className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group' onClick={() => handleRemoveDisability(disability_category)}>
                                                {/* disability name */}
                                                <p className='text-lg'>{disability_category}</p>
                                                <svg className='hidden h-5 text-red-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>
                                            </div>
                                    ))}

                                </div>
                            </div>
                            {/* options container */}
                            <div className='flex flex-row gap-2'>
                                <div className='flex gap-2 mt-2 w-fit md:justify-start'>

                                    {PreListedDisabilities && PreListedDisabilities.map((disability_category) => (
                                        // disability container
                                        <div className='flex items-center justify-center gap-2 px-4 py-2 border rounded-full bg-extra-light border-darkColor group' onClick={() => {handleAddDisability(disability_category)}}>
                                            {/* disability name */}
                                            <p className=''>{disability_category}</p>
                                            <svg className='hidden h-5 text-green-600 cursor-pointer group-hover:flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <input id="creator_id" type="hidden" name="creator_id" />
                            <button className="w-2/4 p-3 mx-auto my-3 text-white rounded-lg bg-primary-light scaleHover" type="button" onClick={SaveChanges}>Confirm Changes</button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-fit">
                    <div id="imageContainerDiv">

                        {/* <img className='mt-5 mr-5 min-w[300px] rounded-lg' src={require(`../../../../server/FileUpload${filename}`)}></img> */}

                        {ImageFile && ImageFile.map((filename) => (
                             <img className='mt-5 mr-5 min-w[300px] rounded-lg' src={require(`../../../../server/FileUpload/${filename}`)}></img>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditFormComponent;
