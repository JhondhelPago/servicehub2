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

// User queries
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

async function clientuserLoginSession(email, password) {
  try {
    const [rowdata] = await pool.execute(
      `SELECT id FROM user WHERE email = ? AND password = ?`,
      [email, password]
    );
    if (rowdata.length != 0) {
      return rowdata; // Return the result of the query which is the id of this login credentials
    } else {
      return [null];
    }
  } catch (error) {
    throw error;
  }
}

async function clientInformation(id) {
  try {
    const [clientInformationRow] = await pool.execute(
      `
      SELECT firstName, lastName, age, gender, barangay, street, houseno, district, city, phone, status 
      FROM user 
      WHERE id = ?`, 
      [id]
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
    await pool.execute(`
      INSERT INTO mail_sent
      (send_id, senderID, date_sent, time_sent, receiverID, subject, body, documentfile, imagefile, read_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [0, MailObj.SenderId, MyDateTime.Datenow(), MyDateTime.Timenow(), MailObj.AssignedAdmin, MailObj.MailSubject, MailObj.MailBody, 'sample.pdf', 'img5.jpg,img6.png', 'unread']
    );
  } catch (error) {
    throw error;
  }
}

async function GetSentMail(id) {
  try {
    const [SentMailArray] = await pool.execute(`
      SELECT * FROM mail_sent WHERE senderID = ? ORDER BY STR_TO_DATE(CONCAT(date_sent, ' ', time_sent), '%Y-%m-%d %H:%i:%s') DESC`, 
      [id]
    );
    if (SentMailArray.length == 0) {
      return null;
    } else {
      return SentMailArray;
    }
  } catch (error) {
    throw error;
  }
}

// Admin queries
async function get_adminId(email, password, role) {
  let adminRole;

  switch (role) {
    case "Admin":
      adminRole = "regular";
      break;
    case "Manager":
      adminRole = "manager";
      break;
    default:
      throw new Error("Invalid Module Entered from admin login form");
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

  try {
    await pool.execute(
      `
        INSERT INTO ${Table}
        (creator, date_created, time_created, scheduled_date, scheduled_time, location, event_title, description, target_group, post_type, imagefiles)
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

async function job_post_edit(
  para_postID,
  para_Event,
  para_Date,
  para_Time,
  para_Description,
  para_PostType
) {
  try {
    await pool.execute(
      `
        UPDATE ${para_PostType}
        SET scheduled_date = ?, scheduled_time = ?, event_title = ?, description = ?
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
      record.target_group = StringManipulate.RemoveQuotation(record.target_group);
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
      "SELECT job_post.*, admin.firstName, admin.lastName FROM job_post INNER JOIN admin ON job_post.creator = admin.id COLLATE utf8mb4_general_ci"
    );
    let newRow = row.map(function (record) {
      record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
      record.target_group = StringManipulate.RemoveQuotation(record.target_group);
      return record;
    });
    return newRow;
  } catch (error) {
    console.log("Error in 'fetchJob() function' in mysqlmodule.js");
    throw error;
  }
}

async function deletePost(id, post_type) {
  let table = post_type === "event_post" ? "event_post" : "job_post";
  try {
    await pool.execute(`DELETE FROM ${table} WHERE id = ${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function FetchMail(adminId) {
  try {
    const [row] = await pool.execute(
      `
        SELECT mail_sent.*, user.firstName
        FROM mail_sent 
        JOIN user ON mail_sent.senderID = user.id COLLATE utf8mb4_general_ci
        WHERE mail_sent.receiverID = ?`,
      [adminId]
    );
    return row.length > 0 ? row : null;
  } catch (error) {
    throw error;
  }
}

async function getAdmin() {
  try {
    const [AdminIdRow] = await pool.execute(`SELECT id FROM admin WHERE role="regular"`);
    return AdminIdRow.length == 0 ? null : AdminIdRow;
  } catch (error) {
    throw error;
  }
}

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
    return TheDateTime.toLocaleTimeString("en-US", option);
  },
  Datenow: () => {
    const TheDateTime = new Date();
    let year = TheDateTime.getFullYear();
    let month = TheDateTime.getMonth() + 1;
    let day = TheDateTime.getDate();
    return `${year}-${month}-${day}`;
  },
};

module.exports = {
  // User function exports
  get_userId,
  clientuserLoginSession,
  clientInformation,
  ClientMailInsert,
  GetSentMail,

  // Admin function exports
  MyDateTime, // Object
  get_adminId, // Getting the adminId
  post_EventJob, // Inserting the Event or Job data information to the database
  fetchEvent,
  fetchJob,
  job_post_edit,
  deletePost,
  FetchMail,
  getAdmin,
};
