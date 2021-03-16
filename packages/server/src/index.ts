import express from "express";
import compression from "compression";
import session from "express-session";

const PORT = parseInt(process.env.PORT ?? "8080");
const IP = process.env.IP ?? "0.0.0.0";

const app = express();

app.use(compression());
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
    },
  })
);
app.use(express.static("../app/build/"));

app.listen(PORT, IP, () => console.log(`Server up on ${IP}:${PORT}`));
