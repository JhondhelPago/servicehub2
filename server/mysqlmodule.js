const mysql = require("mysql2");
const { StringManipulate } = require("./utilities");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "servicehub",
  })
  .promise();

//user queries
async function get_userId(email, password) {
  try {
    const [row] = await pool.query(
      `SELECT id FROM user WHERE email = ? AND password = ? `,
      [email, password]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//admin queries
async function get_adminId(email, password, role) {
  //role parameter -> possible value [Admin, Manager]

  //switch statement where
  let adminRole;

  switch (role) {
    case "Admin":
      adminRole = "regular";
      break;

    case "Manager":
      adminRole = "manager";
      break;

    default:
      throw new Error("Invalid Module Entered  from admin login form");
  }

  try {
    const [row] = await pool.query(
      `SELECT id FROM admin WHERE email = ? AND password = ? AND role = ?`,
      [email, password, adminRole]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function GetAllClientInformation() {
  try {
    //return the total registered user
    const ClientDataInformationRow = await pool.execute(`
      SELECT COUNT(*) 
      FROM user
    `);

    return ClientDataInformationRow;
  } catch (error) {
    console.log(error);
  }
}

//another function to count number of female and male
//another function to count the registred memeber lived in manila, qc, pasay
//another function to count the regitered member manila district 1, 2

async function post_EventJob(
  Type,
  Creator_id,
  EventTitle,
  ScheduledDate,
  ScheduledTime,
  Location,
  Description,
  Disability,
  filesArray
) {
  Disability = JSON.stringify(Disability);
  filesArray = JSON.stringify(filesArray);

  const Table = Type === "event" ? "event_post" : "job_post";

  // const DateNow = MyDateTime.Datenow();

  try {
    await pool.execute(
      `
        INSERT INTO ${Table}
        (creator,
        date_created,
        time_created,
        scheduled_date,
        scheduled_time,
        location,
        event_title,
        description,
        target_group,
        post_type,
        imagefiles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Creator_id,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        ScheduledDate,
        ScheduledTime,
        Location,
        EventTitle,
        Description,
        Disability,
        Table,
        filesArray,
      ]
    );
  } catch (error) {
    console.log("Error in 'post_Event' function in mysqlmodule.js");
    throw error;
  }
}

// async function post_Job(Creator_id, EventTitle, ScheduledDate, ScheduledTime, Location, Description, Disability, filesArray){

//     Disability = JSON.stringify(Disability);
//     filesArray = JSON.stringify(filesArray);

//     try{

//         await pool.execute(`

//         `)

//     }catch(error){

//         console.log('Error in \'post_Job\' function in mysqlmodule.js');
//         throw error;

//     }
// }

async function job_post_edit(
  para_postID,
  para_Event,
  para_Date,
  para_Time,
  para_Description,
  para_PostType
) {
  //query for editing the post in the MySQL Server

  try {
    await pool.execute(
      `
        UPDATE ${para_PostType}
        SET scheduled_date = ?,
            scheduled_time = ?,
            event_title = ?,
            description = ?
        WHERE id = ?`,
      [para_Date, para_Time, para_Event, para_Description, para_postID]
    );
  } catch (error) {
    console.log("Error in the post_edit function @ mysqlmodule.js");
    throw error;
  }
}

async function fetchEvent() {
  try {
    const [row] = await pool.execute(`SELECT * FROM event_post`);

    let newRow = row.map((record) => {
      record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
      record.target_group = StringManipulate.RemoveQuotation(
        record.target_group
      );

      return record;
    });

    return newRow;
  } catch (error) {
    console.log("Error in 'fetchEventPosting() function' in mysqlmodule.js");
    throw error;
  }
}

async function fetchJob() {
  try {
    const [row] = await pool.execute(
      "SELECT job_post.* , admin.firstName, admin.lastName  FROM job_post INNER JOIN admin ON job_post.creator = admin.id COLLATE utf8mb4_general_ci"
    );

    //cleaning the uncertain format of column value

    let newRow = row.map(function (record) {
      record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
      record.target_group = StringManipulate.RemoveQuotation(
        record.target_group
      );

      return record;
    });

    return newRow;
  } catch (error) {
    console.log("Error in 'fetchJob() function' in mysqlmodule.js");
    throw error;
  }
}

async function deletePost(id, post_type) {
  let table;

  post_type === "event_post" ? (table = "event_post") : (table = "job_post");

  try {
    await pool.execute(`DELETE FROM ${table} WHERE id = ${id}`);
  } catch (error) {}
}

async function FetchAdminInboxFromClient(adminId) {
  try {
    // const [row] = await pool.execute(
    //   `
    //     SELECT mail_sent.*, user.firstName
    //     FROM mail_sent
    //     JOIN user ON mail_sent.senderID = user.id COLLATE utf8mb4_general_ci
    //     WHERE mail_sent.receiverID = ?
    //     `,
    //   [adminId]
    // );
    // return row;

    const [row] = await pool.execute(
      `
      SELECT senderID
      FROM mail_sent
      WHERE receiverID = ? 
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s")
      DESC LIMIT 1000;
      `,
      [adminId]
    );

    return row;
  } catch (error) {
    throw error;
  }
}

async function FetchAdminIboxes(adminId) {
  //retrun an array of senderIDs associated with given adminId parameter as the receiverID

  try {
    const [AdminInboxes] = await pool.execute(
      `
      SELECT senderID 
      FROM mail_sent 
      WHERE receiverID = ? 
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC LIMIT 1000;
      `,
      [adminId]
    );
  } catch (error) {
    throw error;
  }
}

async function getAdmin() {
  try {
    const [AdminIdRow] = await pool.execute(
      `SELECT id FROM admin WHERE role="regular"`
    );

    if (AdminIdRow.length == 0) {
      return null;
    } else {
      return AdminIdRow;
    }
  } catch (error) {
    throw error;
  }
}

async function AdminMailInsert(MailObj) {
  try {
    await pool.execute(
      `
        INSERT INTO mail_sent
        (send_id,
        senderID,
        date_sent,
        time_sent,
        receiverID,
        subject,
        body,
        documentfile,
        imagefile,
        read_status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        0,
        MailObj.SenderId,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        MailObj.ReceiverId,
        MailObj.Subject,
        MailObj.Body,
        "docu.pdf,docu1.docx",
        "img7.png,img8.jpg",
        "unread",
      ]
    );
  } catch (error) {
    throw error;
  }
}

async function GetSentMail(id) {
  try {
    // const [SentMailArray] = await pool.execute(`SELECT * FROM mail_sent WHERE senderID = "${id}" ORDER BY STR_TO_DATE(CONCAT(date_sent, ' ', time_sent), '%Y-%m-%d %H:%i:%s') DESC`);

    const [SentMailArray] = await pool.execute(`
        SELECT 
        mail_sent.send_id,
        mail_sent.senderID,
        mail_sent.date_sent,
        mail_sent.time_sent,
        mail_sent.receiverID,
        mail_sent.subject,
        mail_sent.body,
        mail_sent.documentfile,
        mail_sent.imagefile,
        mail_sent.read_status, 
        user.id AS user_id,
        user.firstName,
        user.middleName,
        user.lastName
        FROM mail_sent JOIN user ON mail_sent.receiverID = user.id
        COLLATE utf8mb4_unicode_ci WHERE mail_sent.senderID = "${id}"
        COLLATE utf8mb4_unicode_ci ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC;
      `);
    return SentMailArray;
  } catch (error) {
    throw error;
  }
}

// async function AdminSentItems(id){

//   try{

//     const [SentItemsArray] = await pool.execute(`

//       `)

//   }catch(error){
//     throw error;
//   }
// }

const MyDateTime = {
  Timenow: () => {
    const TheDateTime = new Date();
    const option = {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    let timeString = TheDateTime.toLocaleTimeString("en-US", option);

    return timeString;
  },

  Datenow: () => {
    const TheDateTime = new Date();

    let year = TheDateTime.getFullYear();
    let month = TheDateTime.getMonth() + 1;
    let day = TheDateTime.getDate();

    return `${year}-${month}-${day}`;
  },
};

// async function show(){
//     console.log(await get_userId('sample1000@gmail.com', '1234'));
// }

// show();

// mysql query for the clientuser

async function clientuserLoginSession(email, password) {
  //return the id of this clientuser login session

  try {
    const [rowdata] = await pool.execute(
      `SELECT id FROM user WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (rowdata.length != 0) {
      return rowdata; //return the result of the query which is the id of this login credentials
    } else {
      return [null];
    }
  } catch (error) {
    throw error;
  }
}

async function ClientData(id) {
  // id = 1000
  //select (user, fist , last , addres) from user where id = id

  try {
    const [rowdata] = await pool.execute(
      `SELECT firstName, middleName, Lastname, age, gender, houseno, street, barangay, district, city, province, zipcode, phone, status FROM user WHERE id = ${id}`
    );

    if (rowdata.length != 0) {
      return rowdata;
    } else {
      return null;
    }

    // query statement
  } catch (error) {
    throw error;
  }
}

async function clientInformation(id) {
  try {
    /*
        information to from the user table

        Username
        Name
        Age
        Gender
        Address
        City
        District
        Contact No.
        Member Status
        */
    const [clientInformationRow] = await pool.execute(
      `
            SELECT (
                firstName,
                lastName,
                age,
                gender,
                barangay,
                street,
                houseno,
                district,
                city,
                phone,
                status
            ) FROM user WHERE id = ${id}
            `
    );

    if (clientInformationRow.length != 0) {
      return clientInformationRow[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function ClientMailInsert(MailObj) {
  try {
    //logic here to insert the MailSend to the mail_sent table on the database

    await pool.execute(
      `
        INSERT INTO mail_sent
        (send_id,
        senderID,
        date_sent,
        time_sent,
        receiverID,
        subject,
        body,
        documentfile,
        imagefile,
        read_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        0,
        MailObj.SenderId,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        MailObj.AssignedAdmin,
        MailObj.MailSubject,
        MailObj.MailBody,
        "sample.pdf",
        "img5.jpg,img6.png",
        "unread",
      ]
    );
  } catch (error) {
    throw error;
  }
}

async function GetClientSentMail(id) {
  try {
    // const [SentMailArray] = await pool.execute(`SELECT * FROM mail_sent WHERE senderID = "${id}" ORDER BY STR_TO_DATE(CONCAT(date_sent, ' ', time_sent), '%Y-%m-%d %H:%i:%s') DESC`);

    const [SentMailArray] = await pool.execute(`
          SELECT 
          mail_sent.send_id,
          mail_sent.senderID,
          mail_sent.date_sent,
          mail_sent.time_sent,
          mail_sent.receiverID,
          mail_sent.subject,
          mail_sent.body,
          mail_sent.documentfile,
          mail_sent.imagefile,
          mail_sent.read_status, 
          admin.id AS admin_id,
          admin.firstName,
          admin.lastName
          FROM mail_sent JOIN admin ON mail_sent.receiverID = admin.id
          COLLATE utf8mb4_unicode_ci WHERE mail_sent.senderID = "${id}"
          COLLATE utf8mb4_unicode_ci ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC;
        `);
    return SentMailArray;
  } catch (error) {
    throw error;
  }
}

async function FetchInboxOfClient(id) {
  try {
    // const [ClientInbox] = await pool.execute(`
    //   SELECT mail_sent.*, admin.firstName, admin.lastName
    //   FROM mail_sent
    //   JOIN admin ON mail_sent.senderID = admin.id
    //   COLLATE utf8mb4_general_ci WHERE mail_sent.receiverID = ?
    //   ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC
    // `,[id]);

    // return ClientInbox;

    const [ClientInbox] = await pool.execute(
      `
      SELECT senderID
      FROM mail_sent
      WHERE receiverID = ?
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC 
      LIMIT 1000;
      `,
      [id]
    );

    return ClientInbox;
  } catch (error) {}
}

async function ALL_SendMaiL(ClientReceiver_id, SenderAdminId) {
  try {
    const [SendMails] = await pool.execute(
      `
      SELECT * 
      FROM mail_sent
      WHERE senderID = ? AND receiverID = ?
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC;
      `,
      [ClientReceiver_id, SenderAdminId]
    );

    return SendMails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function dashboardQuery() {
  // id = 1000
  //select (user, fist , last , addres) from user where id = id

  try {
    const [rowdata] = await pool.execute(`SELECT * FROM user`);

    return rowdata;

    // query statement
  } catch (error) {
    throw error;
  }
}

async function getEventRegistry(userId){

  try{

    const [registrtArray] = await pool.execute(`
      SELECT event_id
      FROM event_registry
      WHERE user_id = ?
      `, [userId]);

      return registrtArray;

  }catch(error){
    throw error;
  }
}


async function getJobRegistry(userId){

  try{

    const [RegistryArray] = await pool.execute(`
        SELECT job_id
        FROM job_registry
        WHERE user_id = ?
      `, [userId]);


      return RegistryArray;
    
  }catch(error){
    throw error;
  }
}

module.exports = {
  //user function exports
  get_userId,

  //admin function exports

  MyDateTime, // Object

  get_adminId, //gettig the adminId
  post_EventJob, //inserting the Event or Job data information to the database
  fetchEvent,
  fetchJob,
  job_post_edit,
  deletePost,
  FetchAdminInboxFromClient,
  FetchAdminIboxes,
  getAdmin,
  AdminMailInsert,
  GetSentMail,
  GetAllClientInformation,

  //function query for the clientuser
  clientuserLoginSession,
  ClientData,
  clientInformation,
  ClientMailInsert,
  GetClientSentMail,
  FetchInboxOfClient,
  ALL_SendMaiL,
  dashboardQuery,
  getEventRegistry,
  getJobRegistry
};
