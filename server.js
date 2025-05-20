// The first things to setup is any initial express middleware
// For this todo list, the first few things I need to do are require express
// and any other middleware I may need
const express = require("express");
const data = require("./data");

const app = express();
const PORT = 4131;

app.use(express.static("resources"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "pug");
app.set("views", "templates");

// Below here I shall define endpoints for the new todo-list app
// Get:
// mainpage
// items

app.get("/", async (req, res) => {
    let status = "all"
    if (req.query.status) {
        status = req.query.status;
    }
    if (status == "all") {
        items_to_render = await data.getAllListItems();
    } else {
        items_to_render = await data.getItemsByStatus(status);
    }
    // Use data.js to access all todo list items
    // Then filter the todo list items by the value of status

    res.render("mainpage.pug", { items: items_to_render, title: "Two Dues"});
});

app.get("/item/:id", async (req, res) => {
    let item_id = req.params.id;
    if (!item_id) {
        return res.status(400).json({err: "Could not find id to render"});
    }
    try {
        let status = "Listing Status: ";
        let item_to_render = await data.getListItem(item_id);
        let comments_to_render = await data.getComments(item_id);
        // console.log(item_to_render);
        // console.log(comments_to_render);
        if(!item_to_render) {
            return res.status(404).json({err: "Not Found."});
        }
        if (item_to_render.done) {
            status += "Complete";
        } else {
            status += "Incomplete";
        }
        res.render("item.pug", { item: item_to_render, comments: comments_to_render, status, title: "Todo Listing" });
    } catch (err) {
        return res.status(500).json({err: "Internal Server Error"});
    }
});

app.post("/api/createitem", async (req, res) => {
    const {name, description} = req.body;
    // console.log(name);
    // console.log(description);
    if (!name || !description) {
        return res.status(400).json({msg: "Missing information..."});
    }
    try {
        // here we try adding the list item using data.js

        const item_to_create = await data.addListItem(req.body);
        if (!item_to_create) {
            return res.status(400).json({msg: "Did not create item successfully"});
        }
        return res.status(201).json({msg: "Success"});
    } catch (err) {
        return res.status(500).json({err: "Internal Server Error"});
    }
});

app.post("/api/updatestatus", async (req, res) => {
    const {id, status} = req.body;
    // this tripped me up, if I don't chekc null for the status, it will
    // actually evaluate the statement to true unintentionally
    // the database stores TRUE and FALSE values as 0 and 1
    // respectively, so therefore, !status out evaluate 0 to true and
    // return 404 when we don't want that...
    if (!id || status == null) {
        return res.status(404).json({msg: "Listing Not Found"});
    }
    // console.log(id);
    // console.log(status);
    try{
        const item_to_update = await data.setStatus(id, status);
        if (item_to_update) {
            return res.status(204).send();
        }
        return res.status(404).json({msg: "Something went wrong, could not update status"});
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"})
    }
});

app.post("/api/createcomment", async (req, res) => {
    const {comment, id} = req.body;
    // console.log(comment);
    // console.log(id);

    if (!comment) {
        return res.status(400).json({msg: "Missing information..."});
    }
    try {
        const comment_to_create = await data.placeComment(req.body);
        if (!comment_to_create) {
            return res.status(400).json({msg: "Did not create comment successfully"});
        }
        return res.status(201).json({msg: "Success"});
    } catch (err) {
        return res.status(500).json({err: "Internal Server Error"});
    }
});

app.delete("/api/deleteitem", async (req, res) => {
    const {id_to_delete} = req.body;
    if (!id_to_delete) {
        return res.status(404).json({msg: "Missing listing id to delete"});
    }
    try {
        // console.log(id_to_delete);
        const item_to_delete = await data.deleteListItem(id_to_delete);
        if (item_to_delete) {
            return res.status(204).send();
        }
        // here we would try to delete the item by id using data.js
        return res.status(404).json({msg: "Could not process delete request"});
    } catch (err) {
        return res.status(500).json({err: "Internal Server Error"});
    }
});

app.delete("/api/deletecomment", async (req, res) => {
    const {id_to_delete} = req.body;
    // console.log("eat apple");
    // console.log(id_to_delete);
    if (!id_to_delete) {
        return res.status(404).json({msg: "Cannot find comment to delete"});
    }
    // console.log(id_to_delete);

    try {
        const comment_to_delete = await data.deleteComment(id_to_delete);
        if (comment_to_delete) {
            return res.status(204).send();
        }
        return res.status(404).json({msg: "Could not delete comment"});
    } catch (err) {
        return res.status(500).json({err: "Internal Server Error"});
    }
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + String(PORT));
});
