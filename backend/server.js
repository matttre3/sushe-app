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

app.use(bodyParser.json({ extended: false }));
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

app.post("/checklogintable", (req, res) => {
  const loginTableNumber = req.body.loginTableNumber;
  const loginTablePin = req.body.loginTablePin;

  db.query(
    "SELECT * FROM tables WHERE id = $1",
    [loginTableNumber],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        if (result.rows.length > 0) {
          const table = result.rows[0];
          if (loginTablePin == table.pin) {
            res.json({ check: true });
            console.log("e giusto fra");
          } else {
            res.json({ check: false });
          }
        }
      }
    }
  );
});

app.get("/get-orders", (req, res) => {
  const tableNumber = req.query.tableNumber;
  const userName = req.query.userName;
  console.log(req.query);
  db.query(
    "SELECT * FROM orders WHERE table_id = $1 AND username = $2",
    [tableNumber, userName],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.post("/deleteorder", (req, res) => {
  const orderId = req.body.orderId;

  db.query("DELETE FROM orders WHERE id = $1", [orderId], (err, result) => {
    if (err) {
      console.error("errore durante la query");
    } else {
      res.status(200).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
