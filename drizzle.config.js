export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://Healthcare_db_owner:npg_iFA9doIQtO6T@ep-odd-paper-a5kmk66b-pooler.us-east-2.aws.neon.tech/Healthcare_db?sslmode=require",
    connectionString:
      "postgresql://Healthcare_db_owner:npg_iFA9doIQtO6T@ep-odd-paper-a5kmk66b-pooler.us-east-2.aws.neon.tech/Healthcare_db?sslmode=require",
  },
};
