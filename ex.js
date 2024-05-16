const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://awakyy:M2007644aTlas@cluster0.twi7zs4.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Nome da coleção
const COLLECTION_NAME = 'users';

async function withMongoDb(callback) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
    const db = client.db('cluster0');
    const collection = db.collection(COLLECTION_NAME);

    return await callback(collection);
  } catch (error) {
    console.error('Erro ao trabalhar com o MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}

//funções 

async function readData() {
    return withMongoDb(async (collection) => {
      const data = await collection.find({}).toArray();
      return data;
    });
  }
  
  async function writeData(data) {
    return withMongoDb(async (collection) => {
      await collection.deleteMany({});
      await collection.insertMany(data);
    });
  }
  
  async function findUserByNickname(nickname) {
    return await withMongoDb(async (collection) => {
      return await collection.findOne({ nickname: nickname });
    });
  }  
  
  async function findUserById(id) {
     return await withMongoDb(async (collection) => {
      return await collection.findOne({id: id});
    });
  }


  

module.exports = { withMongoDb, readData, findUserByNickname, findUserById, writeData };