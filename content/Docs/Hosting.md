Thicket compiles to a static website, so you can pretty much drop it anywhere
which can serve static files and it can do the job.

# Suggestions for hosting

- You can setup redirects for `/index.html` to the index node in your garden.
  Thicket does not do this on its own, it will redirect to your main node
  using [`meta` tags](https://css-tricks.com/redirect-web-page/#aa-html-redirects)
  and the correct settings, but its better to set those filters on the server
  to improve SEO (if you are into that kind of thing).
