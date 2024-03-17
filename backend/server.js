import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "sushe",
  password: "matttrello1234",
  port: 5432,
});

const app = express();
const port = 3000;

db.connect();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/create-table", (req, res) => {
  let randomNumber = Math.floor(Math.random() * 9000) + 1000;
  db.query(
    "INSERT INTO tables (pin) VALUES ($1) RETURNING id",
    [randomNumber],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        if (result.rowCount === 1) {
          console.log("tavolo creato con successo");
          res.json({
            tableNumber: result.rows[0].id,
            tablePin: randomNumber,
          });
        } else {
          console.log("errore nella registrazione del tavolo");
        }
      }
    }
  );
});

app.use(bodyParser.json({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
