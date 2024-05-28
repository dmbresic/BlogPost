import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

const postList = [];

app.post("/submit", (req, res)=>{
    const name = req.body.name;
    const review = req.body.review;

    const data = {name: name,
        review: review
    }

    const summary = name + ": " + review;

    postList.push(summary);

    res.render("index.ejs", data)

    console.log("Name: " + name)
    console.log("Review: " + review)
})

app.get("/viewAll", (req, res)=>{
    const data = {postList: postList
    }

    res.render("viewAll.ejs", data)
})

app.listen(port, ()=>{
    console.log(`application started on port: ${port}`);
})