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

//Random ID generation for posts, need to add to page and pass to data for function on deletion
function generateId(){
    //array of all lowercase letters
    var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"
    ,"q","r","s","t","u","v","w","x","y","z"
    ];

    //Generate a random number
    var randNum = Math.floor(Math.random() * 9999);
    //Generate random number 0-26
    var letterSelect = Math.floor(Math.random()*26);
    //empty ID to be updated
    var postId = "";
    //Test to ensure number is random
    //console.log(randNum);

    //Grab five random letters, reset in loop to prevent single number selection
    for(let i = 0; i < 5; i++){
        postId += letters[letterSelect];
        letterSelect = Math.floor(Math.random()*26);
    }
    //Gives full post ID
    postId += randNum;
    //Verify post ID exists and is random
    // console.log(postId);

    return postId;
}


app.post("/submit", (req, res)=>{
    const name = req.body.name;
    const review = req.body.review;
    const postId = generateId();

    //Data that we want sent
    const data = {name: name,
        review: review,
        postId: postId
    }

    //Creates object for data manipulation
    const summary = {
        name: name,
        review: review,
        postId: postId
    }

    //verify that the object is created
    console.log(summary);

    //add to list of objects so that it can be displayed, this is a global variable
    postList.push(summary);

    res.render("index.ejs", data)
})

app.get("/viewAll", (req, res)=>{
    //Sends the entire post list to be displayed
    const data = {postList: postList
    }

    res.render("viewAll.ejs", data)
})

//Want to get this to delet a specific post, unsure of where error is
app.post("/viewAll/updateList", (req, res)=>{

    //type in the post to be deleted --> should grab id
    var find = req.body.postId;

    //testing what the object if finding in this variable
    console.log(find);

    //want to make this more a filter as opposed to loop for time complexity purposes
    //currently loops through the posts.
    for(let i = 0; i < postList.length; i++){

        //what is it grabbing
        console.log(postList[i]);
        if(postList[i].postId === find){
            delete[postList[i]]
        }
    }

    //does this update post list?
    const data = {postList: postList
    }

    res.render("viewAll.ejs", data)
})

app.listen(port, ()=>{
    console.log(`application started on port: ${port}`);
})