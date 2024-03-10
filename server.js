var express = require("express")
var fs = require("fs")
const rtfToHTML = require("@iarna/rtf-to-html")
const path = require("path")
const location = path.join(__dirname, "server/db/")
const db = require("electron-db")
var cors = require("cors")

var bodyParser = require("body-parser")
var { sort } = require("./utils")
var app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const memoryHandler = {
	createTable: (req, res, tableName) => {
		db.createTable(tableName, location, (succ, msg) => {
			res.send(msg)
		})
	},
	clearTable: (req, res, tableName) => {
		console.log("deletasdadsadseOne")

		db.clearTable(tableName, location, (succ, msg) => {
			res.send(msg)
		})
	},
	readAll: (req, res, tableName) => {
		db.getAll(tableName, location, (succ, data) => {
			if (data && succ) {
				console.log(succ + data)
				res.json(data)
			} else {
				res.send({ err: `Could not get ${tableName}` })
			}
		})
	}, //post
	updateById: (req, res, tableName, where, set) => {
		// gere
		// try {
		console.log(req.body.data.id, "ID!")
		db.updateRow(tableName, location, where, set, (succ, msg) => res.json(req.body.data))
		// } catch (err) {
		// 	res.send(err)
		// }
	},
	createOne: (req, res, tableName) => {
		console.log("REQ!" + req)
		db.insertTableContent(tableName, location, req.body, (succ, msg) => {
			res.send(msg)
		})
	},
	deleteOneById: async (req, res, tableName, where) => {
		try {
			db.deleteRow(tableName, location, where, (succ, msg) => res.write(succ))
		} catch (err) {
			res.end()
		}
	},
}

const tableName = ["characters", "entries"]

app.get(`/api/${tableName[1]}/readAll`, (req, res) => memoryHandler.readAll(req, res, tableName[1])) // ✅
app.get(`/api/${tableName[0]}/readAll`, (req, res) => memoryHandler.readAll(req, res, tableName[0])) // ✅

app.post(`/api/${tableName[0]}/updateOne`, (req, res) => {
	memoryHandler.updateById(req, res, tableName[0], { id: String(req.body.data.id) }, req.body.data)
})
// app.put(`/api/${tableName[1]}/updateOne/:id`, (req, res) =>
// 	memoryHandler.updateById(req, res, tableName[1], { id: Number(req.params.id) }, req.body)
// ),
// app.post(`/api/${tableName[1]}/updateOne`, (req, res) => memoryHandler.updateById(req, res, tableName[1])),

app.put(`/api/${tableName[0]}/createOne`, (req, res) => res.send(memoryHandler.createOne(req, res, tableName[0]))) // ✅
app.put(`/api/${tableName[1]}/createOne`, (req, res) => res.send(memoryHandler.createOne(req, res, tableName[1]))) // ✅

app.put(
	`/api/${tableName[0]}/deleteOne/:id`,
	(req, res) => memoryHandler.deleteOneById(req, res, tableName[0], (where = { id: Number(req.body.data.id) })) // ✅
)
app.delete(`/api/${tableName[1]}/deleteOne/:id`, (req, res) => {
	memoryHandler.deleteOneById(req, res, tableName[1], (where = { id: Number(req.params.id) })) // ✅
})

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

app.get("/api/entries/sort/:order", function (req, res) {
	let order = req.params.order
	db.getAll("entries", location, async (succ, data) => {
		if (succ) {
			res.json({
				entries: await sort(order, data),
			})
		} else {
			console.log("An error has occured. " + data)
		}
	})
})

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
