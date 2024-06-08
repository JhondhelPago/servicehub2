const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

//functions from mysqlmodule connection
const {
    //user function imports
    get_userId,



    //admin function imports
    get_adminId,
    post_EventJob,
    fetchJob,
    fetchEvent,
    job_post_edit,
    deletePost,
    FetchAdminInboxFromClient,
    getAdmin,
    AdminMailInsert,
    GetSentMail,




    //function query for the clientuser
    clientuserLoginSession,
    ClientData,
    clientInformation,
    ClientMailInsert,
    GetClientSentMail,
    FetchInboxOfClient

} = require('./mysqlmodule.js');


//function to delete the images to the directory

function DelImage(filename) {
  const imagepath = path.join(__dirname, "FileUpload", filename);

  fs.unlink(imagepath, (err) => {
    if (err) {
      console.log("Error deleting image with the file name " + filename);
      throw err;
    }
  });
}



function RandomSelectedIndex(ArrayLength){
    const randomIndex = Math.floor(Math.random() * ArrayLength);
    return randomIndex;
}

//utilities.js -> provide utility classes and functions

const { StringManipulate } = require("./utilities.js");
const e = require("express");
const { setDefaultAutoSelectFamily } = require("net");

// express app instanciation
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "public")));

//multer configuration -> EventFile Storage Directory
const Eventstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "FileUpload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); //this line creates a new unique filename
  },
});

//object that handles the image file allocation from Events Post
const EventUpload = multer({ storage: Eventstorage }); // -> route to handle the form submission with this Multer Storage

//multer configuration -> JobPost Storage Directory
const Jobstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "JobsFile"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    x;
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

//objecct that handles the image file allocation from Jobs Post
const JobUpload = multer({ storage: Jobstorage });

app.get("/Devs", async (req, res) => {
  res.send({
    devs: ["pago", "solis", "alcoba"],
  });
});

// this form action is generic,  it will handle  tow kind of post 'event posting, job'
app.post(
  "/Posting",
  EventUpload.array("uploadImages", 10),
  async (req, res) => {
    console.log("posting action is running the blocks");

    const formData = req.body;
    const creator_id = formData.creator_id;
    const postType = formData.category;
    const title = formData.title;
    const date = formData.date;
    const time = formData.time;
    const location = formData.location;
    const description = formData.description;
    let targetAudience = formData.targetAudience;
    let filenames = req.files.map((file) => file.filename);

    //reformating the array values to strings
    targetAudience = StringManipulate.RemoveSqrBrac(targetAudience.toString());
    filenames = StringManipulate.RemoveSqrBrac(filenames.toString());

    // this is the variable that hold the files
    // let filenames;

    console.log(creator_id);
    console.log(postType);
    console.log(title);
    console.log(date);
    console.log(time);
    console.log(location);
    console.log(description);
    console.log(StringManipulate.RemoveSqrBrac(targetAudience.toString()));
    console.log(StringManipulate.RemoveSqrBrac(filenames.toString()));

    try {
      await post_EventJob(
        postType,
        creator_id,
        title,
        date,
        time,
        location,
        description,
        targetAudience,
        filenames
      );

      res.send({ status: true });
    } catch (error) {
      console.log("Error in ' /Posting Route '");
      throw error;
    }
  }
);

//fetcing jobposting from the server
app.get("/fetchingJobPost", async (req, res) => {
  try {
    const data = await fetchJob();

    //console.log(data);

    res.send(data);
  } catch (error) {
    throw error;
  }
});

//fetching eventposting from the server
app.get("/fetchingEventPost", async (req, res) => {
  try {
    const data = await fetchEvent();
    // console.log(data);
    res.send(data);
  } catch (error) {
    throw error;
  }
});

app.post("/EventsPost", EventUpload.array("images", 10), async (req, res) => {
  const formData = req.body;
  const creator_id = formData.creator_id;
  const message = formData.message;
  const filenames = req.files.map((file) => file.filename); // const filenames is an array of file names in the formdata

  console.log(filenames.length);
  console.log(creator_id);
  console.log(message);
  console.log(message == "");
  console.log(filenames);

  //do not make query execution if there is no data to insert

  if (message === "" && filenames === 0) {
    return;
  }

  //this are is the query logic for the mysql data insertion

  try {
    await post_Event(creator_id, message, filenames);

    console.log("query executed");
    //res.send({OperationStatus: true});
    res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
  } catch (error) {
    throw error;
    console.log("query failed to execute");
    //res.send({OperationStatus: false});
  }
});

app.post("/JobsPost", JobUpload.array("images", 10), (req, res) => {
  const formData = req.body;
  const message = formData.message;
  const filenames = req.files.map((file) => file.filename); // new array with file name

  console.log(message);
  console.log(filenames);

  res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
});

app.post("/edit-job-post", async (req, res) => {
  const DataReceived = req.body;
  console.log(DataReceived.id);

  try {
    await job_post_edit(
      DataReceived.id,
      DataReceived.event_title,
      DataReceived.scheduled_date,
      DataReceived.scheduled_time,
      DataReceived.description
    );

    res.send({ ok: true });
  } catch (error) {
    throw error;
  }
});

//edit selected post
app.post("/jobeditpost", async (req, res) => {
  const DataReceived = req.body;

  try {
    await job_post_edit(
      DataReceived.id,
      DataReceived.event_title,
      DataReceived.scheduled_date,
      DataReceived.scheduled_time,
      DataReceived.description,
      DataReceived.post_type
    );

    res.send({ ok: true });
  } catch (error) {
    throw error;
  }
});

app.post("/post_delete", async (req, res) => {
  const post_obj = req.body;

  //take the image file names -> array type
  const fileImages = post_obj.imagefiles.split(",");

  try {
    await deletePost(post_obj.id, post_obj.post_type);

    console.log(
      `post with id ${post_obj.id} at table ${post_obj.post_type} has been deleted.`
    );

    res.send({ ok: true });
  } catch (error) {
    req.send({ ok: false });
  }

  fileImages.forEach((filename) => {
    DelImage(filename);
  });

  console.log(`deleting post with id ${post_obj.id}`);
});

//this area is for the job posting multer configuration and route logic

//setting the module MIME type for JavaScript files
app.get("/module.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "module.js"));
});

// get request of the html files
app.get("/", (req, res) => {
  //send the login_user.html from the public folder, but the html file is on the upper directory
  res.sendFile(path.join(__dirname, "..", "public", "login_admin.html"));
});

app.get("/adminlog", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login_admin.html"));
});

app.get("/homepage", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
});

app.get("/home_admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home_admin.html"));
});

app.get("/adminCreatePost", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "create_post_admin.html"));
});

app.get("/uploadform", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "uploadform.html"));
});

app.get("/jobposting", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "jobposting.html"));
});

//app.post that will handle the form post request to validate login session
app.post("/loginSession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const row = await get_userId(email, password);

    if (row.length > 0) {
      res.send({ status: true, id: row[0].id });
    } else {
      res.send({ status: false, id: null });
    }
  } catch (error) {
    console.log(error);
    throw error;
    res.status(500).send("Something Broke!");
  }

  res.end();
});

//app.post that will handle the form post request to validate admin login session
app.post("/adminLoginSession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.module;

  //console.log(email, password, role);

  try {
    //send the id of the admin
    const row = await get_adminId(email, password, role);

    if (row.length > 0) {
      res.send({ status: true, id: row[0].id });
    } else {
      res.send({ status: false, id: null });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  res.end();
});

app.get("/FetchMailInbox/Admin/:AdminId", async (req, res) => {
  const AdminId = req.params.AdminId;

  try {
    const InboxesData = await FetchAdminInboxFromClient(AdminId);

    if (InboxesData.length > 0) {
      res.send(InboxesData);
    } else {
      res.send([]);
    }
  } catch (error) {
    throw error;
  }
});

//code below are the server logic for the clientuser

app.get("/returnboolean", async (req, res) => {
  res.send({ data: "ok" });
});

app.post("/clientuser/loginsession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const id_logsession = await clientuserLoginSession(email, password);
    const value = id_logsession[0]; //invidual element contains and object, each value is accessible by the column name of the table in the query.

    if (value == null) {
      res.send({ IdLogSession: value });
    } else {
      console.log({ IdLogSession: value });

      res.send({ IdLogSession: value.id });
    }
  } catch (error) {
    throw error;
  }

  console.log(email);
  console.log(password);
});




app.get('/ClientData/:id', async(req, res) =>{


    const id = req.params.id;

    try{

        const clientInformation = await clientInformation(id);

        res.send({'UserInformation' : clientInformation});  

    }catch(error){
        throw error;
    }

})



app.post('/ClientSendMail', async(req, res) => {

    const {SenderId, MailType, MailSubject, MailBody} = req.body;


    const AdminArray = await getAdmin();
    let AssignedAdmin;

    const RandomizedIndex = RandomSelectedIndex(AdminArray.length);

    AssignedAdmin = AdminArray[RandomizedIndex].id;


    console.log(SenderId)
    console.log(MailType);
    console.log(MailSubject);
    console.log(MailBody);
    console.log(`Assigned Admin: ${AssignedAdmin}`);


    const MailObj = {
        SenderId: SenderId,
        MailType: MailType,
        MailSubject: MailSubject,
        MailBody: MailBody,
        AssignedAdmin: AssignedAdmin
    }


    try{

        await ClientMailInsert(MailObj);


        res.send(true)

    }catch(error){
        throw error;
    }



});

app.get('/AdminSentItem/:senderID', async(req, res) => {

  const id = req.params.senderID;

  const ClientMailArray = await GetSentMail(id);
  res.send(ClientMailArray);

});



app.get('/GetAdmins', async(req, res) => {

    const AdminArray = await getAdmin();

    let AssignedAdmin;


    const RanIndex = RandomSelectedIndex(AdminArray.length);

    AssignedAdmin = AdminArray[RanIndex].id;


    res.send(AssignedAdmin);

});



app.post('/AdminMailInsert', async(req, res) => {

    const SenderId = req.body.SenderId
    const ReceiverId = req.body.MailReceiverId;
    const Subject = req.body.MailSubject;
    const Body  = req.body.MailBody;


    console.log(SenderId);
    console.log(ReceiverId);
    console.log(Subject);
    console.log(Body);

    try{
      const response = await AdminMailInsert({
        SenderId : SenderId,
        ReceiverId : ReceiverId,
        Subject : Subject,
        Body : Body
      });
    
      console.log('\nresponse details: ');

      res.send(response);

    }catch(error){
      throw error;
    }
});


app.get('/ClientSentMail/:senderID', async(req, res) => {

    const id = req.params.senderID;

    const ClientMailArray = await GetClientSentMail(id);
    res.send(ClientMailArray);

});



app.get('/FetchMailInbox/Client/:clienduserId', async(req, res) => {

  const clientId = req.params.clienduserId;
  console.log(clientId);

  try{

    const clientInboxArray = await FetchInboxOfClient(clientId);

    res.send(clientInboxArray);

  }catch(error){
    console.log(error);
    throw error;
  }

})



app.get('/kainap/events', async (req, res) => {

    // logic here to get the data from the main server using defined sql query from the mysql module
});

app.get("/ClientDataRequest/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const clientdata = await ClientData(id);

    if (clientdata == null) {
      res.send("no data found");
    } else {
      res.send(clientdata);
    }
  } catch (error) {
    throw error;
  }

  //backend logic to connect to the actual database
  //call the function from the mysqlmodule.js
});


app.get("/sample_res", (req, res) => {
  res.send("this is a response");
  res.end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
