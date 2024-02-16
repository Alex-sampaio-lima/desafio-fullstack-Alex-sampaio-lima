import "express-async-errors"
import "reflect-metadata"
import "dotenv/config"
import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"

const DataSourceConfig = (): DataSourceOptions => {
    const entitypath: string = path.join(__dirname, "./entities/*.{ts,js}") 
    const migrationspath: string = path.join(__dirname, "./migrations/*.{ts,js}") 
    
    const dburl: string | undefined = process.env.DATABASE_URL
    if(!dburl) {
        throw new Error('"Missing env: var "DATABASE_URL"')
    }

    return {
        type: "postgres",
        url: dburl,
        // logging: true,
        entities: [entitypath],
        migrations: [migrationspath]
        // synchronize: true
    }
}

export const AppDataSource: DataSource = new DataSource(DataSourceConfig())