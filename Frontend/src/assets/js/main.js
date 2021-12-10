;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
			
	    var container = $("#gtco-espontaneo, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0 || e.target.className == "option") {
	    	$('.js-gtco-nav-toggle').addClass('gtco-nav-white');

	    	if ( $('body').hasClass('espontaneo') ) {

    			$('body').removeClass('espontaneo');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});
	

	};

	var formTab = function() {

		$('.tab-menu a').on('click', function(event){
			var $this = $(this),
				data = $this.data('tab');

			$('.tab-menu li').removeClass('active');
			$this.closest('li').addClass('active')

			$('.tab .tab-content-inner').removeClass('active');
			$this.closest('.tab').find('.tab-content-inner[data-content="'+data+'"]').addClass('active');

			event.preventDefault();

		});

	};

	var espontaneoMenu = function() {

	
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow espontaneo') ) {
				$('body').removeClass('overflow espontaneo');
			} else {
				$('body').addClass('overflow espontaneo');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});


		

	};

	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	// var dateForm = function() {
	// 	$('#date-start').datepicker();
	// };

	var parallax = function() {
		$(window).stellar({
			horizontalScrolling: false,
			hideDistantElements: false, 
			responsive: true

		});
	};


	
	$(function(){
		mobileMenuOutsideClick();
		formTab();
		espontaneoMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		// dateForm();
		parallax();
	});


}());

function ejecutarAnimacion(){

	var 	i = 0;

	// $('.gtco-section').waypoint( function( direction ) {

		$('.animate-box').waypoint( function( direction ) {
			

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;
				
				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				if (i == 11) { // depende del orden de cuando el objeto js-counter se ejecute
					counterActivate();
				}
			}
			
		} , { offset: '85%' } );
	// }, { offset: '90%'} );


	
   
}

function counterActivate(){
	$('.js-counter').countTo({
		formatter: function (value, options) {
			
	 return value.toFixed(options.decimals);
	
   },
   });
}

function navMovil(){
	// $('#page').prepend('<div id="gtco-espontaneo" />');
	// 	$('#page').prepend('<a  class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>');
		


	// 	$('#gtco-espontaneo').append("<ul><li><a  routerLink='/inicio' ng-reflect-router-link='/inicio' href='/inicio'>Flights</a></li><li><a routerLink='/admin' ng-reflect-router-link='/admin' href='/admin'>Countries</a></li><li><a routerLink='/acerca-de'>About us</a></li><li><a routerLink='/contacto' ng-reflect-router-link='/contacto' href='/contacto'>Contact</a></li></ul>")
















		$('#gtco-espontaneo .has-dropdown').addClass('espontaneo-has-dropdown');
		$('#gtco-espontaneo')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.espontaneo-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('espontaneo') ) {

    			$('body').removeClass('espontaneo');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});


}



function enviar() {
    //validación name
    var name = document.getElementById('name');

    if (name.value.trim() == "") {
        name.focus();
        alert('Type your name');
        return;
    }
    //validación email
    var email = document.getElementById('email');

    if (email.value.trim() == "") {
        email.focus();
        alert('Type your email');
        return;
    }
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(email.value)) {
        email.focus();
        alert("The email address is invalid");
        return;
    }
    

	var subject = document.getElementById('subject');

    if (subject.value.trim() == "") {
        subject.focus();
        alert('Type your subject');
        return;
    }

    var message = document.getElementById('message');

    if (message.value.trim() == "") {
        message.focus();
        alert('Type your message');
        return;
    }
    

    
    var miHtml = "<div style = 'background-color: #fff; text-align: center;'>"+
    
    "<h1 style= 'color: #09C5AB;'>The User " + name.value + "</h1> "+
	"<h1 style= 'color: #09C5AB;'>With email: " + email.value + "</h1> "+
    "<h3 style= 'color: #212529;'>Send a message:</h3> "+
    " <p style= 'color: #000; margin-bottom: 20px;'>"+ message.value + "</p>"+
    " </div> ";


    Email.send({
        SecureToken: "e55464c7-f373-4102-8108-1267b9e34c45",


        To: "sunriseairlinescontact@gmail.com",
        From: "soundevutn@gmail.com",
        Subject: subject.value,
        Body: miHtml,

    })

        .then(message => alert("Su mensaje se ha enviado"));
 
    name.value="";
    email.value="";
    subject.value="";
	message.value="";
   
 





    //6E53889308B0C7B201FE2DB64332F8FFDBCE







}



