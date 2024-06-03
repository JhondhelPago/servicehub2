import React from "react";
import ComposeComponent from "./compose_component";

const InboxComponent = () => {

    

    return (
        <>
            {/* <!-- inbox list/content container --> */}
            {/* <div>
                <button className="border-2 border-gray bg-orange-400 text-white text-2xl px-4 py-2 rounded-md">Compose</button>
            </div> */}
            <div className="flex px-5 pb-5 overflow-auto rounded h-dvh">
                {/* <!-- mail list container --> */}
                <div className="flex flex-col w-full overflow-hidden border-l min-w-80 border-y border-darkColor rounded-s">
                    <div className="flex justify-between w-full p-2 border-b border-darkColor bg-extra-extra-light">
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <label for="">Select All </label>
                        </div>
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </button>
                    </div>
                    {/* <!-- mail items container --> */}
                    <div className="pb-5 overflow-auto">
                        {/* <!-- mail seen sample --> */}
                        <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del">
                            <label className="flex col-span-2 gap-2" for="">
                                <input type="checkbox" />
                                {/* <!-- from --> */}
                                <h6 className="truncate">User1 User1User1</h6>
                            </label>
                            {/* <!-- subject --> */}
                            <h6 className="col-span-3 truncate"> subjectsuvbjectsubject </h6>
                            <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">00/00/00</h6>
                            <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div>
                        {/* <!-- mail unread sample --> */}
                        <div className="grid grid-cols-7 gap-4 p-2 font-semibold border-b border-darkColor hoverMailItem group/del">
                            <label className="flex col-span-2 gap-2" for="">
                                <input type="checkbox" />
                                {/* <!-- from --> */}
                                <h6 className="truncate">User1 User1User1</h6>
                            </label>
                            {/* <!-- subject --> */}
                            <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                            <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">00/00/00</h6>
                            <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div>
                        {/* <!-- mail active sample --> */}
                        <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor activeMailItem group/del">
                            <label className="flex col-span-2 gap-2" for="">
                                <input type="checkbox" />
                                {/* <!-- from --> */}
                                <h6 className="truncate">User1 User1User1</h6>
                            </label>
                            {/* <!-- subject --> */}
                            <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                            <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">00/00/00</h6>
                            <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!-- mail content view --> */}
                <div className="flex flex-col w-3/4 border border-darkColor rounded-e">
                    <div className="flex flex-col gap-1 p-4 rounded-tr bg-extra-extra-light" id="takenHeight">
                        <h3 className="text-xl font-medium break-words md:text-center">SubjectSubjectSubjectSubjectSubjectSubje ctSubjectSubjectSubjectSubject</h3>
                        <div className="flex flex-col justify-between gap-1 md:flex-row">
                            <h5 className="font-light md:order-last">00/00/0000</h5>
                            <h4 className="font-light">From: <span className="font-medium">User1</span></h4>
                        </div>
                        <div className="flex flex-col justify-between gap-1 md:flex-row">
                            <h5 className="font-light md:order-last">00:00pm</h5>
                            <h4 className="font-light">To: <span className="font-medium">me</span></h4>
                        </div>
                    </div>
                    {/* <!-- body --> */}
                    <div className="relative flex flex-col gap-6 p-4 overflow-auto" id="remainingHeight">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iusto, assumenda non animi corporis recusandae veritatis nemo tempore nihil asperiores suscipit magni voluptate repellendus molestiae, quasi architecto explicabo perferendis? Minus, quibusdam inventore? Error, cum? Aliquid dignissimos, iste voluptatem beatae adipisci similique expedita voluptates blanditiis! Beatae expedita minus quisquam, accusantium deserunt earum doloribus tempore dicta similique nihil nam eveniet, iste rerum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, molestias neque cumque pariatur voluptate aut eos dicta? Veniam non molestias placeat ipsam ea nemo possimus nostrum, dolore modi doloribus corporis expedita. Sed, reiciendis eaque. Rerum iste culpa atque qui? Natus voluptatibus aliquam maiores neque quam minima enim mollitia dignissimos odio sint voluptates nihil necessitatibus, itaque repellat veniam quo similique ad! Reprehenderit atque placeat dignissimos, asperiores vel veniam minus animi aliquam quia. Odit blanditiis saepe enim consequatur praesentium facere repudiandae. Dolorem vel aliquam
                        <div className="flex justify-around gap-5 px-5 font-medium">
                            <button className="w-full py-2 border rounded border-darkColor scaleHover hover:bg-extra-light">Forward</button>
                            <button className="w-full py-2 text-white rounded bg-primary-light scaleHover">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InboxComponent;