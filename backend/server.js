import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors"

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

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json({ extended: false }))

app.post("/logincheck", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    const username = req.body.userName;
    const password = req.body.password;
    console.log(username)
    console.log(password)
    let check;
    
    db.query("SELECT * FROM users WHERE username = $1", [username], (err, result) => {
       console.log(result)
        if (err) {
        console.error('Errore durante la query')
        res.status(500).json({error:"errore del server"})
       } else {
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if(password === user.password) {
                res.json({check: true})
            } else {
                res.json({check: false})
            }
        } else {
            res.json({check: false})
        }
       }
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  