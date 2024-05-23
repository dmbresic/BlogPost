import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.post("/submit", (req, res)=>{
    const name = req.body.name;
    const review = req.body.review;

    const data = {name: name,
        review: review
    }

    res.render("index.ejs", data)

    console.log(name)
    console.log(review)
})

app.listen(port, ()=>{
    console.log(`application started on ${port}`);
})