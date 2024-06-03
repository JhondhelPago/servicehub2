import React from "react";

const ComposeComponent = () => {
  return (
    <>
      {/* <!-- compose container --> */}
      <div className="px-5 pb-5 h-dvh flex justify-center rounded overflow-auto">
          {/* <!-- form container --> */}
          <form className="p-2 w-full md:w-3/5 flex flex-col gap-5 rounded">
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" for="">To:</label>
                  {/* <input className="grow py-2 px-4 rounded bg-white" type="text"/> */}
                  <select className="grow py-2 px-4 rounded bg-white" >
                    <option value='' disabled selected hidden >Please Select Mail Type</option>
                    <option value='inquiry'>Inquiries</option>
                    <option value='request'>Request</option>
                  </select>
              </div>
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" for="">Subject:</label>
                  <input className="grow py-2 px-4 rounded bg-white" type="text"/>
              </div>
              {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
              <textarea className="w-full h-full py-2 px-4 rounded bg-white" name="" id="" cols="30" rows="10"></textarea>
              <div className="w-2/6 mx-auto text-center">
                  <button className="w-full py-2 rounded text-white bg-primary-light scaleHover">Send</button>
              </div>
          </form>
      </div>
    </>
  )
}

export default ComposeComponent;