const FILES_TO_CACHE =    
[
    "/", 
    "/index.html",
    "styles.css",
    "/index.js",
    "/manifest.webmanifest",
    "/db.js"
]
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME= "data-cache-v1";

self.addEventListener("install", function (evt))