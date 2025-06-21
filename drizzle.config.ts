import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(__dirname,".env.local")})
 
export default defineConfig({

  dialect: 'postgresql', 
  schema: './src/database/schema',
  out:"./src/database", 

  dbCredentials:{
    url:process.env.DATABASE_URL!
  }
})