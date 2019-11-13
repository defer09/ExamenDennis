var ObjectId = require('mongodb').ObjectId;

var IndexVerified = false;

function MangaModel(db){
  let mangaModel = {};
  var mangaCollection = db.collection("manga");

  if ( !IndexVerified) {
    mangaCollection.indexExists("id", (err, rslt)=>{
      if(!rslt){
        mangaCollection.createIndex(
          { "id": 1 },
          { unique: true, name:"id"},
          (err, rslt)=>{
            console.log(err);
            console.log(rslt);
        });//createIndex
      }
    }); // indexExists
  }

  return mangaModel;
}

module.exports = MangaModel;