function initQers() {
  var moveQers = ["sjoerd", "frank", "remco", "jeroen", "katja", "rahul", "martijn", "benjamin",
                  "lukas", "janwillem", "herman", "paul", "jaap", "wilbert", "timd", "bob",
                  "johan", "suzanne", "bas", "cynthia", "michiel", "timl", "kamil", "jasper",
                  "ivo", "thijs", "tims", "sander", "kars", "stef", "arian", "mark",
                  "richard", "christiaan", "elaine", "roelfjan", "martijnl", "tom", "korjan",
                  "chris", "leonard"];

  $.each(moveQers, function (index, value) { makeQerMove(value) });
  setDifferentRotationsForQers();

  $('#colleagues .polaroid').mouseenter(resetCinemagraph);
}

function makeQerMove(qer) {
  var qerPhoto = $('img[src="' + '/images/' + qer + 'zw.jpg' + '"]');
  if (qerPhoto.length != 0)
    qerPhoto.closest('li').find('.color').attr('src', '/images/' + qer + 'gif.gif');
}

function setDifferentRotationsForQers() {
  $('#colleagues').find('.polaroid').each(function () {
    var randomRotation = Math.floor(Math.random() * 21) - 10;
    var polaroid = $(this);
    polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
    polaroid.css('-webkit-transform', 'scale(1.0) rotate(' + randomRotation + 'deg)');
  });
}

function resetCinemagraph() {
  var $img = $(this).find('.insetshadow img');
  var src = $img.attr('src');
  $img.attr('src', '');
  setTimeout(function () {
    $img.attr('src', src);
  }, 0);
}
