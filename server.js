var express = require("express")
var fs = require("fs")
const rtfToHTML = require("@iarna/rtf-to-html")
const path = require("path")
const location = path.join(__dirname, "server/db/")
const db = require("electron-db")
var cors = require("cors")
var { sort } = require("./utils")
var bodyParser = require("body-parser")
var app = express()
const tableNames = ["characters", "entries"]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
function errorHandling(error, req, res, next) {}
app.use(errorHandling)
app.get(`/api/:table/readAll`, (req, res) => {
	console.log(Object.keys(req))

	db.getAll(req.params.table, location, (succ, data) => res.json(data))
})
app.get(`api/:table/createTable`, (req, res) => {
	db.createTable(req.params.table, location, (succ, msg) => res.send(msg))
})
app.get(`api/:table/clearTable`, (req, res) => {
	try {
		db.deleteAll(req.params.table, location, (succ, msg) => {
			res.send(msg)
		})
	} catch (err) {
		res.send(err)
	}
})
app.post(`/api/:table/updateOne`, (req, res) => {
	try {
		db.updateRow(req.params.table, location, { id: String(req.body.id) }, req.body, (succ, msg) => res.json(req.body))
	} catch (err) {
		res.send(err)
	}
})

app.put(`/api/:table/createOne`, (req, res) => {
	try {
		db.insertTableContent(req.params.table, location, req.body, (succ, msg) => res.json(req.body.data))
	} catch (err) {
		res.send(err)
	}
})

app.delete(`/api/:table/deleteOne/:id`, (req, res) => {
	try {
		db.deleteRow(req.params.table, location, (where = { id: Number(req.params.id) }), (succ, msg) => res.write(succ))
	} catch (err) {
		res.end()
	}
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
			res.send(err)
		}
	})
})
app.listen(3000, () => console.log(`Express server listening on port 3000`))

module.exports = app
