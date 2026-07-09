const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const root = "./web";

const mime = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg"
};

http.createServer(async (req, res) => {
    const filename = req.url === "/" ? "index.html" : req.url;
    const file = path.join(root, filename);

    try {
        const data = await fs.readFile(file);

        res.writeHead(200, {
            "Content-Type": mime[path.extname(file)] ?? "application/octet-stream"
        });

        res.end(data);
    } catch (err) {
        res.writeHead(404);
        res.end("Not found");
    }
}).listen(8000);

console.log("Serving http://localhost:8000");