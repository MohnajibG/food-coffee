import mongoose from "mongoose";

let connecting: Promise<boolean> | null = null;

// Lazy, best-effort connection: callers should treat a `false` return as
// "logging unavailable" and continue serving the request either way.
export const ensureDbConnection = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) return true;

  const uri = process.env.MONGO_URI;
  if (!uri) return false;

  if (!connecting) {
    connecting = mongoose
      .connect(uri)
      .then(() => true)
      .catch((err) => {
        console.error("MongoDB connection failed:", err);
        connecting = null;
        return false;
      });
  }

  return connecting;
};
