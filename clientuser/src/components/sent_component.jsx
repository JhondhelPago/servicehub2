import React from "react";

const SentComponent = () => {
  return (
    <>
      {/* <!-- sent list/content container --> */}
      <div className="px-5 pb-5 h-dvh flex rounded overflow-auto">
          {/* <!-- mail list container --> */}
          <div className="w-full min-w-80 flex flex-col border-l border-y border-darkColor rounded-s overflow-hidden">
              <div className="p-2 w-full flex justify-between border-b border-darkColor bg-extra-extra-light">
                  <div className="flex gap-2">
                      <input type="checkbox"/>
                      <label for="">Select All</label>
                  </div>
                  <button className="hover:text-red-600">
                      <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
              </div>
              {/* <!-- mail items container --> */}
              <div className="pb-5 overflow-auto">
                  {/* <!-- mail seen sample --> */}
                  <div className="p-2 grid grid-cols-7 gap-4 border-b border-darkColor hoverMailItem group/del">
                      <label className="col-span-2 flex gap-2" for="">
                          <input type="checkbox"/>
                          {/* <!-- from --> */}
                          To:
                          <h6 className="truncate">User1 User1User1</h6>
                      </label>
                      {/* <!-- subject --> */}
                      <h6 className="col-span-3 truncate">SubjectSubjectSubjectSubjectSubjectSubje ctSubjectSubjectSubjectSubject</h6>
                      <h6 className="col-span-2 text-xs my-auto justify-self-end group-hover/del:hidden">00/00/00</h6>
                      <button className="col-span-2 justify-self-end hidden group-hover/del:inline hover:text-red-600">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                  </div>
                  {/* <!-- mail unread sample --> */}
                  <div className="p-2 grid grid-cols-7 gap-4 font-semibold border-b border-darkColor hoverMailItem group/del">
                      <label className="col-span-2 flex gap-2" for="">
                          <input type="checkbox"/>
                          {/* <!-- from --> */}
                          To:
                          <h6 className="truncate">User1 User1User1</h6>
                      </label>
                      {/* <!-- subject --> */}
                      <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                      <h6 className="col-span-2 text-xs my-auto justify-self-end group-hover/del:hidden">00/00/00</h6>
                      <button className="col-span-2 justify-self-end hidden group-hover/del:inline hover:text-red-600">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                  </div>
                  {/* <!-- mail active sample --> */}
                  <div className="p-2 grid grid-cols-7 gap-4 border-b border-darkColor activeMailItem group/del">
                      <label className="col-span-2 flex gap-2" for="">
                          <input type="checkbox"/>
                          {/* <!-- from --> */}
                          To:
                          <h6 className="truncate">User1 User1User1</h6>
                      </label>
                      {/* <!-- subject --> */}
                      <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                      <h6 className="col-span-2 text-xs my-auto justify-self-end group-hover/del:hidden">00/00/00</h6>
                      <button className="col-span-2 justify-self-end hidden group-hover/del:inline hover:text-red-600">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                  </div>
              </div>
          </div>
          {/* <!-- mail content view --> */}
          <div className="w-3/4 flex flex-col border border-darkColor rounded-e">
              <div className="p-4 flex flex-col gap-1 bg-extra-extra-light rounded-tr" id="takenHeight">
                  <h3 className="text-xl md:text-center font-medium break-words">SubjectSubjectSubjectSubjectSubjectSubje ctSubjectSubjectSubjectSubject</h3>
                  <div className="flex flex-col md:flex-row gap-1 justify-between">
                      <h5 className="font-light md:order-last">00/00/0000</h5>
                      <h4 className="font-light">From: <span className="font-medium">me</span></h4>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1 justify-between">
                      <h5 className="font-light md:order-last">00:00pm</h5>
                      <h4 className="font-light">From: <span className="font-medium">User1</span></h4>
                  </div>
              </div>
              {/* <!-- body --> */}
              <div className="p-4 flex flex-col gap-6 overflow-auto relative" id="remainingHeight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iusto, assumenda non animi corporis recusandae veritatis nemo tempore nihil asperiores suscipit magni voluptate repellendus molestiae, quasi architecto explicabo perferendis? Minus, quibusdam inventore? Error, cum? Aliquid dignissimos, iste voluptatem beatae adipisci similique expedita voluptates blanditiis! Beatae expedita minus quisquam, accusantium deserunt earum doloribus tempore dicta similique nihil nam eveniet, iste rerum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, molestias neque cumque pariatur voluptate aut eos dicta? Veniam non molestias placeat ipsam ea nemo possimus nostrum, dolore modi doloribus corporis expedita. Sed, reiciendis eaque. Rerum iste culpa atque qui? Natus voluptatibus aliquam maiores neque quam minima enim mollitia dignissimos odio sint voluptates nihil necessitatibus, itaque repellat veniam quo similique ad! Reprehenderit atque placeat dignissimos, asperiores vel veniam minus animi aliquam quia. Odit blanditiis saepe enim consequatur praesentium facere repudiandae. Dolorem vel aliquam 
                  <div className="px-5 flex gap-5 justify-around font-medium">
                      <button className="py-2 w-full border border-darkColor rounded scaleHover hover:bg-extra-light">Forward</button>
                      {/* <!-- <button className="py-2 w-full rounded text-white bg-primary-light scaleHover">Reply</button> --> */}
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default SentComponent;