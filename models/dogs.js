
const db = require('../helpers/database')
const dbMongo = require('../helpers/mongodb')

exports.getAll = async function getAll (limit=10, page=1) {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM dog";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}
exports.getSearch = async function getSearch (sfield,q) {
  
  const query = `SELECT ${sfield} FROM dog WHERE ${sfield} LIKE '%${q}%' `;
  const data = await db.run_query(query);
  return data;
}

exports.getBydogId = async function getBydogId (id) {
  let query = "SELECT * FROM dog WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.add = async function add (article) {  
  let keys = Object.keys(article)
  let values = Object.values(article)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO dog (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

//get a single dog by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM dog WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.deleteById = async function deleteById (id) {
  let query = "Delete FROM dog WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//get a single dog by the (unique) dogname
exports.findBydogname = async function getBydogname(dogname) {
  const query = "SELECT * FROM dog WHERE dogname = ?"
   let values = [dogname]
   let dog = await db.run_query(query, values)
  return dog;
}

exports.getAllMongo =  async function getAllMongo (page, limite, order) {
  let data = await dbMongo.run_query('dogs', {})
  return data
}

exports.getByIdMongo =  async function getByIdMongo (id) {
  let data = await dbMongo.run_query('dogs', {'authorID': parseInt(id)})
  return data
}

exports.addMongo =  async function addMongo (document) {
  let status = await dbMongo.run_insert('dogs', document)
  return status
}