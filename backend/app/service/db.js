// app/service/mongo.js
const { Service } = require('egg');

class MongoService extends Service {
  constructor(ctx) {
    super(ctx);
    const { host, port, name } = this.config.mongo.client;
    const url = `mongodb://${host}:${port}`;
    const MongoClient = require('mongodb').MongoClient;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = name;
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    }
    return this.db;
  }

  async create(collection, doc) {
    const db = await this.connect();
    return await db.collection(collection).insertOne(doc);
  }

  async find(collection, query) {
    const db = await this.connect();
    return await db.collection(collection).find(query).toArray();
  }

  async update(collection, query, update) {
    const db = await this.connect();
    return await db.collection(collection).updateOne(query, { $set: update });
  }

  async delete(collection, query) {
    const db = await this.connect();
    return await db.collection(collection).deleteOne(query);
  }
}

module.exports = MongoService;
