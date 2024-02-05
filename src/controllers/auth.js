const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select user_id, email, username, state, company from tok9jausers"
    );
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
//exports.data_balance = async (req,res) => {
//const {}
//}
exports.register = async (req, res) => {
  const {
    email,
    password,
    username,
    state,
    company,
    rcnumber,
    Phone,
    Jobtitle,
    data_balance,
    credit_balance,
  } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "insert into tok9jausers( email,password, username, state, company, rcnumber, Phone, Jobtitle, data_balance, credit_balance ) values($1 , $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        email,
        hashedPassword,
        username,
        state,
        company,
        rcnumber,
        Phone,
        Jobtitle,
        data_balance,
        credit_balance,
      ]
    );
    return res.status(201).json({
      success: true,
      message: "The registration was successful",
    });

    //console.log("validation passed");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  //return console.log(user)
  let payload = {
    id: user.user_id,
    email: user.email,
    //username: user.username
  };
  try {
    const token = await sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in Successfully",
      //payload,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    // const { rows } = await db.query("select user_id, email from users");
    return res.status(200).json({
      info: "protected info",
    });
    //console.log(rows);
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out Successfully",
      //payload,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// exports.credit = async (req, res) => {
//   let user = req.user;
//   const { data_balance, credit_balance } = req.body;
//   try {
//     const data_balance = await data_balance;
//     await db.query(
//       "insert into tok9jausers (data_balance, credit_balance) values ($1, $2)",
//       [data_balance, credit_balance]
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
//   return res.status(500).json({ error: error.message });

//   let payload = {
//     id: user.user_id
//     //  data_balance: user.data_balance,
    
//   };
//   try {
//     const token = await sign(payload, SECRET);

//     return res.status(200).cookie("token", token, { httpOnly: true }).json({
//       success: true,
//       message: "Credit assigned successfully",
//       //payload,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };
// //Create a todo

// app.post("/api/credit", async (req, res) => {
//   try {
//     const { data_balance } = req.body;
//     const newbalance = await pool.query(
//       "INSERT INTO tok9jausers (data_balance) VALUES($1) RETURNING *",
//       [data_balance]
//     );

//     res.json(newTodo.rows[0]);
//     //console.log(req.body);
//   } catch (error) {
//     console.error(err.message);
//   }
// });