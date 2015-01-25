mousePressed = false
lastX = undefined
lastY = undefined
ctx = undefined

Draw = (x, y, isDown) ->
  if isDown
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.lineJoin = "round"
    ctx.moveTo lastX, lastY
    ctx.lineTo x, y
    ctx.closePath()
    ctx.stroke()
  lastX = x
  lastY = y
  return

clearArea = ->
  
  # Use the identity matrix while clearing the canvas
  ctx.setTransform 1, 0, 0, 1, 0, 0
  ctx.clearRect 0, 0, ctx.canvas.width, ctx.canvas.height
  return

initSketch = ->
  calculateSketchPadSize()  
  ctx = document.getElementById("sketchpad").getContext("2d")
  $("#sketchpad").mousedown (e) ->
    mousePressed = true
    Draw e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false
    return

  $("#sketchpad").mousemove (e) ->
    Draw e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true  if mousePressed
    return

  $("#sketchpad").mouseup (e) ->
    mousePressed = false
    return

  $("#sketchpad").mouseleave (e) ->
    mousePressed = false
    return

  return

# with all this dynamic shizzle going on, you never know if the document size might have changed
# therefore we recalculate the size of the canvas upon activation
calculateSketchPadSize = ->
  canvasHeight = $('body').height() - $('#header').height()
  canvasWidth = $('body').width()
  canvasOffsetY = $('#header').height()
  $('#sketchpad').attr({ height: canvasHeight, width: canvasWidth }).css({ top: canvasOffsetY })


toggleSketchPad = ->
  calculateSketchPadSize()
  $('#sketchpad').toggle()
  $('#sketch-button').toggleClass('active')

Template.sketchCanvas.rendered = initSketch

#set events on the sketch button
Template.sketchButton.events
  click: toggleSketchPad