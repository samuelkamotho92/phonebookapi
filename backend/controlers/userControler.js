const sql = require("mssql");
const confiq = require("../db/config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const {
    fullNames,
    email,
    phoneNumber,
    workNumber,
    homeAddress,
    groupID,
    isAdmin,
    password,
  } = req.body;
  console.log(fullNames);
  const hashedPwd = bcrypt.hashSync(password, 10);
  let pool = await sql.connect(confiq);
  const userCreated = await pool
    .request()
    .input("fullNames", sql.VarChar, fullNames)
    .input("email", sql.VarChar, email)
    .input("phoneNumber", sql.VarChar, phoneNumber)
    .input("workNumber", sql.VarChar, workNumber)
    .input("homeAddress", sql.VarChar, homeAddress)
    .input("groupID", sql.Int, groupID)
    .input("isAdmin", sql.Bit, isAdmin)
    .input("password", sql.VarChar, hashedPwd)
    .query(
      "INSERT INTO users (fullNames,email,phoneNumber,workNumber,homeAddress,groupID,isAdmin,password) VALUES (@fullNames,@email,@phoneNumber,@workNumber,@homeAddress,@groupID,@isAdmin,@password)"
    );
  try {
    res.status(201).json({
      status: "success",
      userCreated,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      err,
    });
  } finally {
    sql.close();
  }
};





const loginUser = async(req,res,next)=>{
  try{
const {email,password} = req.body;
//connection
  let pool = await sql.connect(confiq);
  const getUser = await pool.request()
  .input('email',sql.VarChar,email)
  .input('password',sql.VarChar,password)
  .query('SELECT * FROM users WHERE email = @email')

  const user = getUser.recordset[0];
  if(!user){
    res.status(404).json({
      message:'user not dound'
    })
  }else{
    //check passowrd
   const pass =  bcrypt.compareSync(password, user.password)
   if(pass){
    // res.status(404).json({message:"wrong creditials"})
const tk = jwt.sign({email:user.email,fullNames:user.fullNames},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRY});
const {password,...info} = user;
res.status(200).json({
  status:"success",
  info,
  token:tk
})
   }else{
    //create token
    res.status(404).json({message:"wrong creditials"})

   }
  }
}catch(err){
console.log('user not found')
}

}


const getUsers = async(req,res)=>{
    try{
        let pool = await sql.connect(confiq);
        const userCreated = await 
        pool.request()
        .query('SELECT * FROM users');
        console.log(userCreated.recordsets[0]);
        res.status(200).json({
            data:userCreated.recordsets
        })
    }catch(err){
        res.status(404).json({
            status:'err',
            err
        })
    }
}

const getUser = async(req, res) => {
    const id = req.params.id;
try {
    let pool =await sql.connect(confiq);
    let user1 = await pool.request().input('id', sql.Int, id).query('SELECT * FROM users WHERE id = @id');
    !user1.recordset[0]? res.status(404).json({message: 'user not found'}): res.status(200).json({status: 'success',
user: user1.recordset[0]});
} catch (error) {
   res.status(404).json({message: error.message}); 
}
}
const deleteUser = async(req, res) => {
  const id = req.params.id;
try{
await sql.connect(confiq);
await sql.query(`DELETE FROM users WHERE id = ${id}` )
res.status(200).json({
  status:"success",
  message:"User deleted successfully"
})
}catch(err){
res.status(400).json(err)
}
}

const getUsersGroup = async (req,res)=>{
const id = req.params.id;
console.log('working fine');
try{
let pool = await sql.connect(confiq);
const group= await pool.request()
.input('id',sql.Int,id)
.query('SELECT * FROM phonebookgroup WHERE id = @id');
!group.recordset[0]?res.status(404).json({message:"group not found fort user"}):res.status(200).json({status:'success',
group:groupOne.recordset[0]
})
}catch(err){
res.status(404).json(err)
}
}

module.exports = 
{
     createUser,
     getUsers,
     getUser,
     deleteUser,
     getUsersGroup,
     loginUser
}