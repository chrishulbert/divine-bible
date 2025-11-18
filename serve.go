// This is used instead of the customary python 1-line-server to get the mime types correct on Windows.
// Also disables caching.
package main

import (
	"log"
	"mime"
	"net/http"
)

func main() {
	mime.AddExtensionType(".html", "text/html")
	mime.AddExtensionType(".css", "text/css")
	mime.AddExtensionType(".png", "image/png")
	mime.AddExtensionType(".svg", "image/svg+xml")
	mime.AddExtensionType(".js", "text/javascript")
	mime.AddExtensionType(".mjs", "text/javascript")

	fs := http.FileServer(http.Dir("."))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Set no-cache headers
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		fs.ServeHTTP(w, r)
	})
	log.Println("Listening on :8000...")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatalln(err)
	}
}
