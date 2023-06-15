const sql = require('mssql');
const confiq = require('../db/config');
const createGroup = async(req,res)=>{
    const {groupName,description} = req.body;
    console.log(groupName,description)
    try{
//create a connection
let pool = await sql.connect(confiq);
console.log(pool);
const createdGroup = await pool.request()
.input('groupName',sql.VarChar,groupName)
.input('description',sql.VarChar,description)
.query('INSERT INTO phonebookgroup (groupName,description) VALUES (@groupName,@description)');
console.log(createdGroup);
res.status(200).json({
    status:'success',
    group:createdGroup.recordsets
})
    }catch(err){
        res.status(404).json({
            status:'err',
           err
        })
    }

}
const getGroups = async(req,res)=>{
  try{
let pool = await sql.connect(confiq);
const groups = await pool.request()
.query('SELECT * FROM phonebookgroup')
res.status(200).json({
    status:"success",
    groups
})
  }catch(err){
res.status(404).json({  status:'error',err})
  }
}
const getOneGroup = async(req,res)=>{
const id = req.params.id;
try{
let pool = await sql.connect(confiq);
const groupOne = await pool.request().input('id',sql.Int,id).query('SELECT * FROM phonebookgroup WHERE id = @id');
!groupOne.recordset[0]?res.status(404).json({message:"user not found"}):res.status(200).json({status:'success',
group:groupOne.recordset[0]
})
}catch(err){
res.status(404).json({message:"user not found"})
}
}
module.exports = {
    createGroup,
    getGroups,
    getOneGroup
}