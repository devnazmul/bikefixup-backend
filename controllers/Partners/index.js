const connection = require('../../db')
const createData = (req,res)=>{
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      });
}
const getData = (req,res)=>{

}
const updateData = (req,res)=>{

}
const deleteData = (req,res)=>{

}

module.exports={
    createData,
    getData,
    updateData,
    deleteData
}