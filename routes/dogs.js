const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/dogs')
const prefix = '/api/v1/dogs';
const router = Router({prefix: prefix});

router.get('/', getAll)
router.get('/search', bodyParser(), doSearch)
router.post('/', bodyParser(), createDog)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})',bodyParser(), updateDog)
router.get('/delete/:id([0-9]{1,})', deleteDog)

async function doSearch(ctx, next){


    let {limit=20, page=1, fields="",q=""} = ctx.request.query;

    // ensure params are integers
    limit = parseInt(limit);
    page = parseInt(page);
    
    // validate values to ensure they are sensible
    limit = limit > 100 ? 100 : limit;
    limit = limit < 1 ? 10 : limit;
    page = page < 1 ? 1 : page;
   let result="";
  // search by single field and field contents 
   //need to validate q input
  if (q!="")
    result= await model.getSearch(fields,q)
    else
    result= await model.getAll(limit, page);
    if (result.length) {

  ctx.body = result;
}
        }

async function getAll(ctx) {

  const {page=1, limit=100, order="dateCreated", direction='ASC'} = ctx.request.query;
  const result = await model.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(post => {
      // extract the post fields we want to send back (summary details)
      const {id, dogname,dogtype,dogage,gender,site} = post;
      // add links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      return {id, dogname,dogtype,dogage,gender,site};
    });
    ctx.body = body;
    
  }
}


async function getById(ctx) {
  let id = ctx.params.id
  let dog = await model.getById(id)
  if (dog.length) {
    ctx.body = dog[0]
  }
}

async function createDog(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
}

async function updateDog(ctx) {
  // TODO edit an existing dog
   const body = ctx.request.body
   let id = ctx.params.id
 // console.log("route-dog " , body)
 // console.log("route-id ",id)
  let result = await model.update(body,id)
  if (result) {
    ctx.status = 201
    ctx.body = `Dog with id ${id} updated` 
  } 
}

async function deleteDog(ctx) {
  // TODO delete an existing dog
   let id = ctx.params.id
  let dog = await model.deleteById(id)
  ctx.status=201
    ctx.body = `Dog with id ${id} deleted`
}

module.exports = router;
