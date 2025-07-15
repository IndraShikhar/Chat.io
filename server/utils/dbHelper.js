import mongoose from "mongoose";

export const getDB = async (db) => {
  return mongoose.connection.useDb(db, { useCache: true });
};
