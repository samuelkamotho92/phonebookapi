const sql = require('mssql');
const confiq = require('../db/config');
const bcrypt = require('bcrypt');

const createUser = async (req,res)=>{
    const {fullNames,email,phoneNumber,workNumber,homeAddress,groupID,isAdmin,password} = req.body;
    console.log(fullNames);
    const hashedPwd = bcrypt.hashSync(password,10)
    let pool = await sql.connect(confiq);
    const userCreated = await pool.request()
    .input('fullNames',sql.VarChar,fullNames)
    .input('email',sql.VarChar,email)
    .input('phoneNumber',sql.VarChar,phoneNumber)
    .input('workNumber',sql.VarChar,workNumber)
    .input('homeAddress',sql.VarChar,homeAddress)
     .input('groupID',sql.Int ,groupID)
     .input('isAdmin',sql.Bit,isAdmin)
     .input('password',sql.VarChar,hashedPwd)
     .query('INSERT INTO users (fullNames,email,phoneNumber,workNumber,homeAddress,groupID,isAdmin,password) VALUES (@fullNames,@email,@phoneNumber,@workNumber,@homeAddress,@groupID,@isAdmin,@password)')
try{
    res.status(201).json({
        status:'success',
        userCreated
    })
}catch(err){
    res.status(404).json({
        status:'error',
        err
    })
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
    let user1 = await pool.request().input(id, sql.Int, id).query('SELECT * FROM users WHERE id = @id');
    !user1.recordset[0]? res.status(404).json({message: 'user not found'}): res.status(200).json({status: 'success',
user: user1.recordset[0]});
} catch (error) {
   res.status(404).json({message: error.message}); 
}
}

module.exports = 
{
     createUser,
     getUsers,
     getUser
}