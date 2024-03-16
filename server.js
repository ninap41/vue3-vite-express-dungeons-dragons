var fs = require("fs")
const rtfToHTML = require("@iarna/rtf-to-html")

const path = require("path")
const location = path.join(__dirname, "server/db/")
const db = require("electron-db")
var { sort } = require("./utils")

var app = require("express")()
app.use(require("body-parser").json())
app.use(require("cors")())

async function requestHandler(func) {

	return (req, res, next) => {
		if (db.valid(String(table))) {
			try {
				return func.call(this, req, res, next)
			} catch (e) {
				next(e)
			}
		} else {
			return db.createTable(req.params.table, location, (succ) => res.send("created table")).call(this, req, res, next)
		}
	}
}

//sorted too
app.get("/api/:table/readAll", (req, res) => {
	requestHandler(
		db.getAll(req.params.table, location, async (succ, data) => {
			res.json(await sort((order = req.query.order || "asc"), data))
		})
	)
})

app.get(`/api/:table/check`, (req, res) => {
	requestHandler(db.createTable(req.params.table, location, (succ, msg) => res.send(msg)))
})

app.get(`/api/clearTable`, (req, res) => {
	requestHandler(
		db.deleteAll(req.params.table, location, (succ, msg) => {
			res.send(msg)
		})
	)
})
app.post(`/api/:table/updateOne`, (req, res) => requestHandler(
		db.updateRow(req.params.table, location, { id: String(req.body.id) }, req.body, () => res.json(req.body))
	)
)

app.put(`/api/:table/createOne`, (req, res) => {
	requestHandler(db.insertTableContent(req.params.table, location, req.body, (succ, msg) => res.json(req.body.data)))
})

app.delete(`/api/:table/deleteOne/:id`, (req, res) => {
	requestHandler(
		db.deleteRow(req.params.table, location, (where = { id: Number(req.params.id) }), (succ, msg) => res.end())
	)
})
app.get("/api/filereader/:filename", function (req, res) {
	var filename = path.join(__dirname, `server/db/${req.params.filename}`)
	fs.readFile(
		(filename = path.join(__dirname, `server/db/${req.params.filename}`)),
		{ encoding: "utf-8" },
		function (err, data) {
			if (!err) {
				if (req.params.filename.split(".")[1] === "rtf") {
					rtfToHTML.fromString(data, (err, html) => {
						if (err) res.send(err)
						else return res.send(html)
					})
				} else {
					res.send(data)
				}
			}
		}
	)
})

app.listen(3000, () => console.log(`Express server listening on port 3000`))

module.exports = app
