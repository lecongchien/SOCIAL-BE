import { Collection, Db, MongoClient } from "mongodb";
import { config } from "dotenv";
import User from "~/model/schemas/User.schema";
config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?appName=database`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

class DatabateService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 });
    } catch (error) {
      console.log(error, "error");
      throw new Error("Could not connect to the database");
      // await client.close();
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.USERS_COLLECTION as string);
  }
}

const databateService = new DatabateService();
export default databateService;
