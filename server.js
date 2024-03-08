var express = require("express")
var fs = require("fs")
const rtfToHTML = require("@iarna/rtf-to-html")
const path = require("path")
const location = path.join(__dirname, "server/db/")
const db = require("electron-db")
var cors = require("cors")

var bodyParser = require("body-parser")

var app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

async function sort(order, data) {
	return await data.sort(function (a, b) {
		return new Date(a.date).getTime() > new Date(b.date).getTime()
			? order === "asc"
				? -1
				: 1
			: order === "desc"
			? 1
			: -1
	})
}

const requestsHandler = {
	getAll: ({ req, res }, tableName) => {
		if (!db.valid(tableName, location)) res.send("Table does not exist")
		db.getAll(tableName, location, async (req, data) => {
			if (req) {
				return res.json(data)
			} else {
				return res.send({ err: `Could not get ${tableName}` })
			}
		})
	}, //post
	updateById: ({ req, res }, tableName) => {
		if (!db.valid(tableName, location)) res.send("Table does not exist")
		try {
			db.updateRow(tableName, location, (where = { id: req.body.data.id }), (set = req.body.data), (succ, msg) =>
				res.send(msg)
			)
		} catch (err) {
			res.send(err)
		}
	},
	create: ({ req, res }, tableName) => {
		if (db.valid(tableName, location)) res.send("Table does not exist")
		db.insertTableContent(tableName, location, req.body, (succ, msg) => console.log("inserted entries"))
	},
	deleteOne: ({ req, res }, tableName) => {
		try {
			db.deleteRow(tableName, location, (where = { id: Number(req.params.id) }))
		} catch (err) {
			res.send(error)
		}
	},
}

app.post(`/api/characters/save`, (args) => requestsHandler.updateById(args, "characters"))
app.get("/api/characters", (args) => requestsHandler.getAll(args, "characters"))
app.put("/api/characters/add", (args) => requestsHandler.create(args, "characters"))
app.delete("/api/characters/delete/:id", (args) => requestsHandler.create(args, "characters"))

app.get("/api/filereader/:filename", function (req, res) {
	var filename = path.join(__dirname, `server/db/${req.params.filename}`)
	fs.readFile(filename, { encoding: "utf-8" }, function (err, data) {
		if (!err) {
			if (req.params.filename.split(".")[1] === "rtf") {
				rtfToHTML.fromString(data, (err, html) => {
					if (err) res.send(err)
					else return res.send(html)
				})
			} else {
				res.send(data)
			}
		} else {
			console.log(err)
		}
	})
})
// app.post("/api/entries/add/", function (req, res) {
//   console.log(req.body);
//   if (db.valid("entries", location)) {
//     db.insertTableContent("entries", location, req.body, (succ, msg) => {
//       // succ - boolean, tells if the call is successful
//       console.log("Success: " + succ);
//       console.log("Message: " + msg);
//     });
//   }
// });

// app.get("/api/entries/sort/:order", function (req, res) {
//   console.log(req.params);
//   let order = req.params.order;
//   if (db.valid("entries", location)) {
//     db.getAll("entries", location, async (succ, data) => {
//       if (succ) {
//         res.json({
//           entries: await sort(order, data),
//         });
//       } else {
//         console.log("An error has occured. " + data);
//       }
//     });
//   }
// });

// app.delete("/api/entries/delete/:id", async function (req, res) {
// 	let id_ = Number(req.params.id)
// 	const where = { id: id_ }

// 	return await db.deleteRow("entries", location, where, async (succ, msg) => {
// 		try {
// 			console.log(JSON.stringify(succ))
// 		} catch (err) {
// 			console.log(JSON.stringify(msg))
// 		}
// 	})
// })

// app.delete("/api/entries/deleteAll", function (req, res) {
//   db.clearTable("entries", location, (succ, msg) => {
//     if (succ) {
//       console.log(succ, "SUCCESS");
//     } else {
//       console.log(msg, "MSD");
//     }
//   });
// });

app.listen(3000, () => console.log(`Express server listening on port 3000`))

module.exports = app
