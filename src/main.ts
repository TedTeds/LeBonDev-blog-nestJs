import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from "path";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as mySqlSession from "express-mysql-session";
import { localData } from "./middlewares/localsData";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  app.setBaseViewsDir(join(__dirname, "..", "view"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'root',
  database:'blog',
  
}

//debogage

// somewhere in your initialization file
const MySQLStore = mySqlSession (session)
const store = new MySQLStore (options)
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
  app.use(localData)
  await app.listen(3000);
}
bootstrap();
