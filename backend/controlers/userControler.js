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

module.exports = 
{
     createUser,
     getUsers
}