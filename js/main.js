
function aosInit() {
	console.log("init AOS")
	AOS.init({
		duration: 200, // duration change for initial load
		easing: 'slide',
		once: true,
		// startEvent: 'DOMContentLoaded', // Ensure it starts on page load
		// debug: true // Enable debug mode
	});
}
aosInit();

jQuery(document).ready(function($) {

	"use strict";


	var lozadFunc = function() {
		const el = document.querySelector('img');
		const observer = lozad(el);
		observer.observe();	
	}
	lozadFunc();

	var setupFancybox = function() {
		console.log("fancy!!")
		$(document).ready(function() {
			$('[data-fancybox="gallery"]').fancybox({
				// margin: [50, 50],
				// clickOutside: 'close',
				// touch: {
				// 	vertical: true,
				// 	momentum: true
				// },
				width: 'auto',
				// height: 'auto',
				fitToView: false, // Allow the content to exceed the viewport dimensions
				autoSize: false,   // Automatically size Fancybox based on content
				aspectRatio: true, // Maintain aspect ratio of content (especially for images)
				afterLoad: function(instance, current) {
					// $(current.$content).find('.fancybox-image').css({
					// 	'width': '96%',        // Image takes full width of content
					// 	'height': 'auto',      // Maintain aspect ratio
					// 'margin-left': '2%',
					// });
				},
				beforeShow: function(instance, current) {
					// Fix for mobile browsers to ensure touch events are handled correctly
					$('.fancybox-container').on('click touchend', function(e) {
						console.log("touched");
						if (!$(e.target).closest('.fancybox-content').length && 
							!$(e.target).closest('.fancybox-image').length && 
							!$(e.target).closest('.fancybox-navigation').length) {
							e.preventDefault(); // Prevent default touch behavior
							$.fancybox.close(); // Close Fancybox manually
						}
					});
				}
			});
		});
	}
	setupFancybox();

	$(document).ready(function () {
		var $grid = $('.grid');

		// Initialize Masonry after images are loaded
		$grid.imagesLoaded(function () {
			$grid.masonry({
				itemSelector: '.grid-item',      // Target each grid item
				columnWidth: '.grid-sizer',      // Set the column width based on the grid-sizer
				// percentPosition: true,           // Use percentage-based positioning
				// fitWidth: true,                  // Ensure the grid fits within the container width
				gutter: 5                        // Set the gutter to match the spacing between images
			});
			// After Masonry layout is complete, refresh AOS
			// AOS.refresh();
		});
	});

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle' : 'collapse',
					'data-target' : '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class' : 'collapse',
					'id' : 'collapseItem' + counter,
				});

				counter++;

			});

			}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  

		});

		$(window).resize(function() {
			var $this = $(this),
			w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})
		$('body').on('click', '.js-menu-close', function(e) {
			var $this = $(this);
			e.preventDefault();

			$('body').removeClass('offcanvas-menu');
			// $this.removeClass('active');
		})
		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
			console.log(e);
			var container = $(".site-mobile-menu");
			console.log(container);

			// Check if the clicked element is outside the container
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				// If the body has the 'offcanvas-menu' class (menu is open), close it
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300 // don't foget to change the duration also in CSS
			}
		});

		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};
	siteMagnificPopup();


	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 0,
				autoplay: true,
				nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
				responsive:{
					600:{
						margin: 0,
						nav: true,
						items: 2
					},
					1000:{
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 3
					},
					1200:{
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 4
					}
				}
			});
		}

		$('.slide-one-item').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			dots: true,
			autoplay: true,
			pauseOnHover: false,
			nav: true,
			navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		});
	};
	siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	};
	siteStellar();

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
				+ '<span class="countdown-block"><span class="label">%d</span> days </span>'
				+ '<span class="countdown-block"><span class="label">%H</span> hr </span>'
				+ '<span class="countdown-block"><span class="label">%M</span> min </span>'
				+ '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});

	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	// navigation
	var OnePageNavigation = function() {
		var navToggler = $('.site-menu-toggle');
		$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
			e.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				'scrollTop': $(hash).offset().top
				}, 0, 'swing', function(){ // this is how we change time to scroll to other pages
					window.location.hash = hash;
			});

		});

		// $("#menu li a[href^='#']").on('click', function(e){
		//   e.preventDefault();
		//   navToggler.trigger('click');
		// });

		$('body').on('activate.bs.scrollspy', function () {
			// console.log('nice');
			// alert('yay');
		})
	};
	OnePageNavigation();

});
