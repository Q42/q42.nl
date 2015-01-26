HTTP_REDIRECT_TEMPORARY = 301
HTTP_REDIRECT_PERMANENT = 302
redirectNlToCom = (name, path) ->
  Router.route "redirect_#{name}",
    where: "server"
    path: path
    action: ->
      console.log "Route: #{path}", @request.headers.host
      if @request.headers.host is "q42.nl"
        @response.writeHead HTTP_REDIRECT_PERMANENT, Location: "http://q42.com#{path}"
        @response.end()
      else
        @next()

redirectNlToCom "meteor", "/meteor"
redirectNlToCom "swift", "/swift"

Router.route "redirectAdventures",
  where: "server"
  path: "/adventures"
  action: ->
    console.log "Route: redirectAdventures"
    @response.writeHead HTTP_REDIRECT_TEMPORARY, Location: "http://adventures.handcraft.com"
    @response.end()

# Redirect ancient color blindness simulator links to our more recent SEE extension
Router.route "colorBlindnessSimulator",
  where: "server"
  path: "/demos/colorblindnesssimulator"
  action: ->
    console.log "Route: colorBlindnessSimulator"
    @response.writeHead HTTP_REDIRECT_PERMANENT, Location: "https://chrome.google.com/webstore/detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
    @response.end()
Router.route "contrastCheck",
  where: "server"
  path: "/demos/contrastcheck"
  action: ->
    console.log "Route: contrastCheck"
    @response.writeHead HTTP_REDIRECT_PERMANENT, Location: "https://chrome.google.com/webstore/detail/see/dkihcccbkkakkbpikjmpnbamkgbjfdcn"
    @response.end()

Router.route "removeWWW",
  where: "server"
  path: "*"
  action: ->
    console.log "Route: removeWWW (#{@request.url})"
    host = @request.headers.host
    fullUrl = "http://#{host}#{@request.url}"

    if host.indexOf("www") is 0
      @response.writeHead HTTP_REDIRECT_PERMANENT, Location: fullUrl.replace("www.", "")
      @response.end()

Router.route "fontcors",
  where: "server"
  path: "/public/*"
  action: ->
    console.log "Route: font CORS"
    @response.writeHead 200, "Access-Control-Allow-Origin": "*"
    @response.end()