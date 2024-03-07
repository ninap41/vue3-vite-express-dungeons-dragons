var express = require("express")
var app = express()
var fs = require("fs")
const rtfToHTML = require("@iarna/rtf-to-html")

const path = require("path")
const location = path.join(__dirname, "server/db/")
const db = require("electron-db")

var cors = require("cors")
var bodyParser = require("body-parser")

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get("/api/", function (req, res) {
	res.send("hello, world")
})

async function sort(order, data) {
	// basic sort
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
app.get("/api/character", function (req, res) {
	if (db.valid("dnd", location)) {
		console.log("location", location)
		db.getAll("dnd", location, async (req, data) => {
			console.log("data?" + req)
			if (req) {
				console.log("DATA!", data)
				res.json({ data })
			} else {
				res.send({ err: "Could not get character." })
				console.log("An error has occured. " + data)
			}
		})
	}
})

app.post("/api/character/save", function (req, res) {
	if (db.valid("dnd", location)) {
		try {
			fs.writeFileSync(location + "dnd.json", JSON.stringify({ dnd: { character: req.body.data } }), {
				encoding: "utf8",
				flag: "w",
			})

			res.send(res)
		} catch (err) {
			console.log("ERR!", err)
			res.send(err)
		}
	}
	res.send("data base invalid ")
})

app.put("/api/entries/add", function (req, res) {
	console.log(req.body)
	if (db.valid("entries", location)) {
		db.insertTableContent("entries", location, req.body, (succ, msg) => {
			// succ - boolean, tells if the call is successful
			console.log("Success: " + succ)
			console.log("Message: " + msg)
		})
	}
})

app.get("/api/entries/all", function (req, res) {
	if (db.valid("entries", location)) {
		db.getAll("entries", location, async (succ, data) => {
			if (succ) {
				console.log(data, "FUCK@")
				return res.send(data)
			} else {
				console.log("An error has occured. " + data)
			}
		})
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

app.delete("/api/entries/delete/:id", async function (req, res) {
	let id_ = Number(req.params.id)
	const where = { id: id_ }

	return await db.deleteRow("entries", location, where, async (succ, msg) => {
		try {
			console.log(JSON.stringify(succ))
		} catch (err) {
			console.log(JSON.stringify(msg))
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

// window.addEventListener('load', function() {
//     document.getElementById("myBtn").addEventListener("click", function() {

//       var reader = new FileReader();
//       reader.addEventListener('load', function() {
//         document.getElementById('file').innerText = this.result;
//       });
//       reader.readAsText(document.querySelector('input').files[0]);
//     });
// }, true);
