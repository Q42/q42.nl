Meteor.autosubscribe(function() {
	Meteor.subscribe("employees");
	
});
Template.employees.employee = function () {
	return Employees.find({});
}
Handlebars.registerHelper('avatar_static', function() {
	return this.imageStatic || this.handle + "zw.jpg";
});
Handlebars.registerHelper('avatar_animated', function() {
	return this.imageAnimated || this.handle + "gif.gif";
});

Handlebars.registerHelper('firstname', function() {
	if (!this.name)
		return "droid";
	return this.name.split(" ")[0];
});
Handlebars.registerHelper('email', function() {
	return this.email || this.handle;
});





var EmployeeGallery = (function () {
	var zIndex = 1000;
	var polaroids = {};
	var mobileMaxWidth = 620;
	var isTouchEnabled = false;
	$(window).one("touchstart",  function (e) { isTouchEnabled = true; });

	var Polaroid = function ($li) {

		var $polaroid = $li.find(".polaroid");
		var $picture = $li.find(".color");
		var $zw = $li.find(".zw");

		function swapGif() {
			var animatedGif = $picture.data("src");
			var colorSrc = $picture.attr("src");
			if (animatedGif != colorSrc)
				$picture.attr("src", animatedGif);
		}
		function swapGifMobile() {
			var animatedGif = $picture.data("src");
			var zwSrc = $zw.attr("src");
			if (animatedGif != zwSrc)
				$zw.attr("src", animatedGif);
		}
		function swapGifMobileBackToZw() {
			var animatedGif = $picture.data("src");
			var zwSrc = $zw.attr("src");
			var zwDataSrc = $zw.data("src");
			if (animatedGif == zwSrc)
				$zw.attr("src", zwDataSrc);
		}
		function rotatePolaroid() {
			var randomRotation = Math.floor(Math.random() * 21) - 10;
			var rotateValue = 'scale(1.0) rotate(' + randomRotation + 'deg)';

			$polaroid.css({
				'-webkit-transform': rotateValue,
				'-moz-transform': rotateValue,
				'-ms-transform': rotateValue,
				'-o-transform': rotateValue,
				'transform': rotateValue
			});
		}	
		function intitializeHover() {
			var $polaroidLists = $('#colleagues .polaroid').parent("li");
			$polaroidLists.removeClass('hover').removeClass('openedByHover');
			var windowWidth = $(window).width();
			if (windowWidth > mobileMaxWidth)
				$li.addClass('hover');
			else 
				swapGifMobile();

			$polaroid.css('z-index', ++zIndex);
			$polaroidLists.find('.closePolaroid').remove();
			if (isTouchEnabled) {
				var $closebutton = $('<div class="closePolaroid" />');
				$closebutton.click(hide);
				$polaroid.append($closebutton);
			}
		}
		function destroyHover() {
			$li.removeClass('hover').removeClass('openedByHover');
			$li.find('.closePolaroid').remove();
		}
		function show() {
			swapGif();
			rotatePolaroid();
			intitializeHover();
		}
		function hide() {
			destroyHover();
		}
		return {
			show: show,
			hide: hide,
			swapGifMobileBackToZw : swapGifMobileBackToZw
		}
	}

	function onWindowResize() {
		var windowWidth = $(window).width();

		//make sure we hide all open polaroid if the window size changed
		if (windowWidth <= mobileMaxWidth)
			hideAllPolaroids();
		else 
			swapAllMobileHoversBackToBlackAndWhite();
	}
	function swapAllMobileHoversBackToBlackAndWhite() {
		_.each(polaroids, function (p) { p.swapGifMobileBackToZw(); });	
	}
	function hideAllPolaroids(){
		_.each(polaroids, function (p) { p.hide(); });
	}
	
	function showPolaroid() {
		var windowWidth = $(window).width();
			
		var $li = $(this);
		var name = $li.find(".color").attr("alt");
		polaroids[name] = polaroids[name] || new Polaroid($li);
		polaroids[name].show();
	}
	function hidePolaroid() {
		var $li = $(this);
		var name = $li.find(".color").attr("alt");
		polaroids[name] = polaroids[name] || new Polaroid($li);
		polaroids[name].hide();
	}
	

	function init() {
		$(window).resize(_.debounce(onWindowResize, 100));
		$('#colleagues li').live('mouseenter click', showPolaroid);
		$('#colleagues li').live('mouseleave', _.debounce(hidePolaroid, 50));
	};

	$(init);
})();

