import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageStringUtils, TimeUtils, sampleEdit } from '../../utils';


//this line grant access to the fileUpload -> where image file of the post is stored
// const images = require.context('./FileUpload', false, /\.(jpg|jpeg|png)$/);
const JobPosting = ({ TriggerSetEditData }) => {

    const [Data, setData] = useState([]);

    useEffect(() => {

        jobData();

    }, []);


    const jobData = async () => {

        try {
            const response = await fetch('/fetchingJobPost');
            const ArrayData = await response.json();

            setData(ArrayData)
        } catch (error) {

            throw error;
        }
    }



    return (
        <>
            {/* component structure here */}
            <div id="mainContentContainer" Class="pb-5 flex flex-col flex-grow bg-gray-100 text-darkColor">
                <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100 ">
                    <div className='flex flex-col gap-2'>
                        <h1 className="flex text-2xl font-medium md:text-4xl">
                            Manage Job Posts
                        </h1>
                        {Data.length > 0 && <p>Data.length : {Data.length}</p>}
                        {Data.length === 0 && <p>No  Data Found!</p>}
                    </div>
                    {/* <!-- search bar --> */}
                    <form className="flex items-center justify-between p-0 m-0 bg-transparent border rounded border-darkColor">
                        <input className="w-32 h-full p-2 bg-transparent focus:bg-white md:w-auto focus:outline-none" type="text" placeholder="Search" />
                        <button className="p-2 hover:text-white hover:bg-darkerColor" type="submit">
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" /></g></svg>
                        </button>
                    </form>
                </div>
                {/* <!--all posts container --> */}

                {Data.map((item, index) => (
                    <PostInfoDiv key={index} data={item} TriggerSetEditData={TriggerSetEditData} ReInitiateUseState={jobData}></PostInfoDiv>
                ))}
            </div>

        </>
    )

}


const PostInfoDiv = (props) => {

    const nagivate = useNavigate();

    const { ReInitiateUseState } = props;

    const ParentFunc = (EditObjectData) => {
        const { TriggerSetEditData } = props;

        TriggerSetEditData(EditObjectData);

    }

    const editFnc = (obj_props) => {
        sampleEdit();
    }


    const removeFnc = (obj_props) => {
        if (window.confirm("Are you sure to delete this post?")) {

            console.log(obj_props);
            console.log('deleting');


            //performe deletion process


            fetch('/post_delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj_props)
            })


            console.log('deleted');

        } else {
            console.log('cancel deletion');
        }

        ReInitiateUseState();
    }



    return (
        <>
            <div className="flex flex-col items-center gap-5 px-5">
                {/* <!-- post container --> */}
                <div className="flex flex-col gap-5 p-5 my-5 rounded-lg bg-gray-50 hover:shadow-lg hover:bg-white min-w-[90%] max-w-[90%]">
                    <div className="flex flex-col justify-between gap-5 xl:flex-row">
                        <div className="flex flex-row items-center gap-5">
                            <div className="w-1 h-full bg-gradient-to-b from-primary-light to-transparent"></div>
                            {/* <!-- admin name --> */}
                            <div>
                                <span className="text-xs">Post by</span>
                                <h4 className="text-xl font-semibold">{props.data.firstName}</h4>
                            </div>
                            {/* <!-- date posted --> */}
                            <div>
                                <span className="text-xs">Posted on</span>
                                <h4 className="text-xl font-normal">{props.data.date_created}</h4>
                            </div>
                        </div>
                        {/* <!-- buttons --> */}
                        <div className="grid gap-5 text-white grid-flow-dense lg:grid-flow-col">

                            <button className="flex items-center justify-between w-4/5 gap-2 p-3 mx-auto bg-orange-600 rounded-lg lg:mx-0 lg:w-auto scaleHover">
                                Archive
                                <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16v88a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-88a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16m-16 144H48v-88h160Zm16-104H32V64h192zM96 136a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8" /></svg>
                            </button>

                            <button className="flex items-center justify-between w-4/5 gap-2 p-3 mx-auto rounded-lg lg:mx-0 lg:w-auto scaleHover bg-darkColor">
                                View Stats
                                {/* <!-- show/arrow down icon - when stats are hidden --> */}
                                <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z" /></g></svg>
                                {/* <!-- hide/arrow up icon - when stats are shown --> */}
                                <svg className="hidden h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z" /></g></svg>
                            </button>

                            <button className="flex items-center justify-between w-4/5 gap-2 p-3 mx-auto rounded-lg lg:mx-0 lg:w-auto scaleHover bg-primary-light" onClick={() => { ParentFunc(props.data) }}>
                                Edit
                                <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" /></svg>
                            </button>

                        </div>
                    </div>
                    {/* <!-- post info --> */}
                    <div className="flex flex-col items-center gap-5 p-3 rounded-lg lg:flex-row bg-gradient-to-r from-gradient-primary-light-from to-transparent">
                        <div className="flex flex-col flex-grow w-full h-full gap-4">
                            <div className="flex flex-col gap-2 ">
                                {/* <!-- title --> */}
                                <h2 className="text-2xl font-semibold">{props.data.event_title}</h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* <!-- date --> */}
                                    <span className="text-lg font-light">{props.data.scheduled_date}</span>
                                    <span className="w-1 h-1 rounded-full bg-darkColor"></span>
                                    {/* <!-- time --> */}
                                    <span className="text-lg font-light">{TimeUtils._24HrTo12hr(props.data.scheduled_time)}</span>
                                    <span className="w-1 h-1 rounded-full bg-darkColor"></span>
                                    {/* <!-- location --> */}
                                    <span className="text-lg font-light">{props.location}</span>
                                </div>
                            </div>
                            {/* <!-- description --> */}
                            <p className="pr-2 overflow-auto text-justify max-h-32 lg:max-h-40">{props.data.description}</p>
                        </div>
                        {/* <!-- img --> */}
                        <img className="object-cover rounded-lg w-[20vw] h-[20vw] max-w-[20vh] max-h-[20vh] min-w-52 min-h-52 hover:cursor-pointer" onclick="enlargeImg()" id="smallImg" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(props.data.imagefiles)}`)} alt={ImageStringUtils.FirstImageElement(props.data.imagefiles)} />

                        <button className="absolute top-0 right-0 hidden p-3 m-2 bg-red-600 rounded-full" id="closeBtn" onclick="closeEnlargedImg()">
                            <svg className="text-white h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
                        </button>
                    </div>
                    {/* <!-- stats --> */}
                    <div>

                    </div>
                </div>

                {/* <!-- <form class="bg-red-900" method="post" action="/JobsPost" enctype="multipart/form-data">
                    <label for="message">Job Description</label>
                    <textarea class="z-10" id="message" name="message" rows="4"></textarea>
                    <input type="file" name="images" multiple>
                    <button class="bg-primary-extraDark text-white" type="submit">Post</button>
                </form> --> */}
            </div>
        </>
    )
}



export default JobPosting;