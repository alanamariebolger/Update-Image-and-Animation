[build]
command = "npm run build"
publish = "dist"

[build.environment]
NODE_VERSION = "20.17.0"

# Allow your site to be embedded inside Webflow and your domains
[[headers]]
  for = "/*"
  [headers.values]
  Content-Security-Policy = "frame-ancestors 'self' https://*.webflow.io https://ntro.org.au https://www.ntro.org.au"
