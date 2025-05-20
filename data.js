const mysql = require(`mysql-await`);

var connPool = mysql.createPool({
  connectionLimit: 5,
  host: "127.0.0.1",
  user: "C4131F24U34",
  database: "C4131F24U34",
  password: "1206",
});
// add item to listitems
async function addListItem(data) {
  const { name, description } = data;

  let res = await connPool.awaitQuery("INSERT INTO listitems (name, description) VALUES (?, ?);", [name, description]);
  return res.insertId;
}
// delete item from listitmes by id
async function deleteListItem(id) {
  let res = await connPool.awaitQuery("DELETE FROM listitems WHERE id = ?;", [id]);
  return res.affectedRows > 0;
}
// get specific listitem by id
async function getListItem(id) {
  let res = await connPool.awaitQuery("SELECT * FROM listitems WHERE id = ?;", [id]);
  res = Object.assign({}, res[0]);
  return res;
}
// get all list items from listitems
async function getAllListItems() {
  let res = await connPool.awaitQuery("SELECT * FROM listitems;");
  return res;
}
// add new comment into comment table
async function placeComment(data) {
  const {comment, id} = data;
  try {
    let comment_to_render = await connPool.awaitQuery("INSERT INTO comments (comment, listing_id) VALUES (?, ?);", [comment, id]);
    if (!comment_to_render) {
      throw new Error("Unable to add comment");
    }
    return comment_to_render.affectedRows > 0;
  } catch (err) {
    console.error(err)
  }
}
// get all comments from comment table where listing_id = listing_id
async function getComments(listing_id) {
  let res = await connPool.awaitQuery("SELECT * FROM comments WHERE listing_id = ?;", [listing_id]);
  return res;
}
// set done status of list item = listing id to status
async function setStatus(listing_id, status) {
  // let q = "UPDATE listitems SET done = ? WHERE id = ?;";
  // let arg = [status, listing_id];

  const res = await connPool.awaitQuery("UPDATE listitems SET done = ? WHERE id = ?;", [status, listing_id]);
  // console.log("I am here");
  return true;
}
// retrieve all items whose status is = status
async function getItemsByStatus(status) {
  let arg = [];
  if (status == "done") {
    arg.push(1);
  } else if (status == "notdone") {
    arg.push(0);
  }
  let res = await connPool.awaitQuery("SELECT * FROM listitems WHERE done = ?;", [arg])
  return res;
}

async function deleteComment(id) {
  let res = await connPool.awaitQuery("DELETE FROM comments WHERE id = ?;", [id]);
  return res.affectedRows > 0;
}

module.exports = {
    addListItem,
    deleteListItem,
    getListItem,
    getAllListItems,
    placeComment,
    getComments,
    setStatus,
    getItemsByStatus,
    deleteComment
};