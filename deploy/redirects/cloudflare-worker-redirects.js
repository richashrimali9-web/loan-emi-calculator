addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const redirects = {
  '/blog/post-1.html': '/guides/ultimate-loan-emi-guide.html',
  '/blog/post-2.html': '/guides/ultimate-loan-emi-guide.html',
  '/blog/post-8.html': '/guides/ultimate-loan-emi-guide.html'
}

async function handleRequest(request) {
  const url = new URL(request.url)
  const dest = redirects[url.pathname]
  if (dest) {
    return Response.redirect(url.origin + dest, 301)
  }
  return fetch(request)
}
