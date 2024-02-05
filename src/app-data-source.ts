import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER || "c.huang",
    database: process.env.DB_NAME || "hahow_project_dev",
    password: process.env.DB_PASSWORD || "hahow_project",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})

export const initializeDataSource = async () => {
    try {
      await myDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      throw err;
    }
};

