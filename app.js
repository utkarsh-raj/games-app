// Importing necessary dependencies

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    request    = require("request");

// Application Configration

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Routes

app.get("/", function(req, res) {
    res.redirect("/games/0");
});

// Index Route

app.get("/games/:pageCounter", function(req, res) {
    var page = Number(req.params.pageCounter);
    var url = "http://starlord.hackerearth.com/gamesext";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("index", {data: data, page: page});
        }
    });
});

// Sort by score

app.get("/games/sort/:order/:pageCounter", function(req, res) {
    var order = req.params.order;
    var page = req.params.pageCounter;
    var url = "http://starlord.hackerearth.com/gamesext";
    if (order === "ascending") {
        request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                var i = 0, j = 0;
                for (i = 0; i < 2499; i++) {
                    for (j = i + 1; j < 2499; j++) {
                        if (Number(data[i]["score"] > Number(data[j]["score"]))) {
                            var temp;
                            temp = data[i];
                            data[i] = data[j];
                            data[j] = temp;
                        }
                    }
                }
                res.render("sort", {data: data, page: page, order: order});
            }
        });
    }
    else if (order === "descending") {
        request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                var i = 0, j = 0;
                for (i = 0; i < 2499; i++) {
                    for (j = i + 1; j < 2499; j++) {
                        if (Number(data[i]["score"] < Number(data[j]["score"]))) {
                            var temp;
                            temp = data[i];
                            data[i] = data[j];
                            data[j] = temp;
                        }
                    }
                }
                res.render("sort", {data: data, page: page, order: order});
            }
        });
    }
});

// Sort by Platform

app.get("/games/sort/platform/:platforms/:page", function(req, res) {
    var platform = req.params.platforms;
    console.log(platform);
    var page = req.params.page;
    var newArr = [];
    var url = "http://starlord.hackerearth.com/gamesext";
    request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                console.log(data);
                var i = 0;
                for (i = 0; i < 2499; i++) {
                    if (data[i]["platform"] === platform) {
                        newArr.push(data[i]);
                    }
                }
                console.log(newArr);
                res.render("platform", {data: newArr, page: page, platform: platform});
            }
        });
});

// Search POST Route

app.post("/games/search", function(req, res) {
    var game = req.body.game;
    console.log(game);
    res.redirect("/games/search/" + game);
});

// Show Route

app.get("/games/search/:name", function(req, res) {
    var name = req.params.name;
    var url = "http://starlord.hackerearth.com/gamesext";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("show", {data: data, name: name});
        }
    });
});

// Listening on the Ports

app.listen((process.env.PORT || 8080), process.env.IP, function(req, res) {
    console.log("The Games App has started!!!!!!");
});