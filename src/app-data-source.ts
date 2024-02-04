import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "postgres",
    // host: "localhost", // local
    // host: "postgres", // container setting
    host: process.env.NODE_ENV === "development" ? "postgres" : "localhost",
    port: 5432,
    username: "c.huang",
    database: "hahow_project_dev",
    password: "hahow_project", // container setting
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

