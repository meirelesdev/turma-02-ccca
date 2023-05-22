import pgp from "pg-promise";
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
  pgp: any;
  static instance: PgPromiseDatabase;

  private constructor() {
    this.pgp = pgp()("postgres://admin:123456@localhost:5440");
  }

  static getInstance(): PgPromiseDatabase {
    if (!PgPromiseDatabase.instance) {
      PgPromiseDatabase.instance = new PgPromiseDatabase();
    }
    return PgPromiseDatabase.instance;
  }

  many(query: string, parameters: any[]) {
    return this.pgp.query(query, parameters);
  }

  one(query: string, parameters: any[]) {
    return this.pgp.oneOrNone(query, parameters);
  }

  none(query: string, parameters: any[]) {
    return this.pgp.none(query, parameters);
  }
}
