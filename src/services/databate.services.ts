import { Collection, Db, MongoClient } from "mongodb";
import { config } from "dotenv";
import User from "~/model/schemas/User.schema";
config();

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME, USERS_COLLECTION } =
  process.env;

if (
  !DB_USERNAME ||
  !DB_PASSWORD ||
  !DB_CLUSTER ||
  !DB_NAME ||
  !USERS_COLLECTION
) {
  console.warn("Missing required DB env variables");
}

const uri = `mongodb+srv://${encodeURIComponent(DB_USERNAME as string)}:${encodeURIComponent(
  DB_PASSWORD as string,
)}@${DB_CLUSTER}/?appName=database`;

class DatabateService {
  private client: MongoClient;
  private db?: Db;

  constructor() {
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      await this.db.command({ ping: 1 });
      console.log("Connected to database");
    } catch (error) {
      console.error("Could not connect to the database", error);
      throw error;
    }
  }

  get users(): Collection<User> {
    if (!this.db) {
      throw new Error(
        "Database not connected. Call databateService.connect() first.",
      );
    }
    return this.db.collection(USERS_COLLECTION as string);
  }
}

const databateService = new DatabateService();
export default databateService;
