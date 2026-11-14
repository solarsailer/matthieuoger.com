// Minimal static file server, GitHub Pages style.
// Usage: node tests/serve.mjs <directory> <port>

import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { extname, join, normalize, resolve } from "node:path"

const root = resolve(process.argv[2] ?? "public")
const port = Number(process.argv[3] ?? 8000)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg"
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}

async function send(res, status, path) {
  const body = await readFile(path)
  const type = TYPES[extname(path)] ?? "application/octet-stream"

  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" })
  res.end(body)
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost")
  let path = join(root, normalize(decodeURIComponent(pathname)))

  if (!path.startsWith(root)) {
    res.writeHead(403).end()
    return
  }

  if (await isDirectory(path)) {
    // Like GitHub Pages: /about → /about/.
    if (!pathname.endsWith("/")) {
      res.writeHead(301, { Location: pathname + "/" }).end()
      return
    }

    path = join(path, "index.html")
  }

  try {
    await send(res, 200, path)
  } catch {
    try {
      await send(res, 404, join(root, "404.html"))
    } catch {
      res.writeHead(404).end("Not Found")
    }
  }
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}/`)
})
