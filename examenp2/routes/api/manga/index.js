var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function initMangaApi(db){
 var mangaColl = db.collection('manga');
  router.get('/', (req, res, next)=>{
    mangaColl.find().toArray((err, mangas)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraerde la base de datos"});
      }
      return res.status(200).json(mangas);
    });
  }); // get all
  
  router.get('/:id', (req, res, next)=>{
    var id = new ObjectID(req.params.id);
    mangaColl.findOne({"_id": id} , (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No se Puede Obtener Intente de Nuevo"});
      }
      return res.status(200).json(doc);
    });//findOne
  }); // /:id

  router.post('/', (req, res, next)=>{
    var newManga = Object.assign(
      {},
      {
        "nombre":"",
        "autor":"",
        "paisOrigen":"",
        "numeroTomos":0,
        "uso":"",
        "estado": [Ongoing | Completed | Hiatsu |Dicontinued],
        "keyWords":[],
        "categorias":[]
      },
      req.body
    );
    plantasColl.insertOne(newManga, (err, rslt)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"No se pudo agregar nueva"});
      }
      if(rslt.ops.length===0){
        console.log(rslt);
        return res.status(404).json({ "error": "No se pudo agregar nueva" });
      }
      return res.status(200).json(rslt.ops[0]);
    });
  });//post

  return router;

}// end examodel

module.exports = initMangaApi;