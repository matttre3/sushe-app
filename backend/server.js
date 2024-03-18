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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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

app.get("/get-all-orders", (req, res) => {
  const tableNumber = req.query.tableNumber;
  db.query(
    "SELECT dish, SUM(quantity) AS total_quantity FROM orders WHERE table_id = $1 GROUP BY dish",
    [tableNumber],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        console.log(result.rows);
        res.json(result.rows);
      }
    }
  );
});

app.get("/get-order-details", (req, res) => {
  const tableNumber = req.query.tableNumber;
  db.query(
    `SELECT dish,username,SUM(quantity) AS total_quantity FROM orders WHERE table_id = ${tableNumber} GROUP BY dish, username`,
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        console.log(result.rows);
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

app.post("/add-dish", (req, res) => {
  const dishNumber = req.body.dishNumber;
  const dishQuantity = req.body.dishQuantity;
  const userName = req.body.userName;
  const tableNumber = req.body.tableNumber;

  db.query(
    "INSERT INTO orders (username, table_id, dish, quantity) VALUES ($1, $2, $3, $4)",
    [userName, tableNumber, dishNumber, dishQuantity],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        res.status(200).send();
      }
    }
  );
});

app.patch("/edit-order", (req, res) => {
  const id = req.body.id;
  const dishNumber = req.body.dishNumber;
  const dishQuantity = req.body.dishQuantity;

  db.query(
    "UPDATE orders SET quantity = $1, dish = $2 WHERE id = $3",
    [dishQuantity, dishNumber, id],
    (err, result) => {
      if (err) {
        console.error("errore durante la query");
      } else {
        res.status(200).send();
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
