
window.onload = function() { // запуск слайдера после загрузки документа	
	
	const intervalId = setInterval(() => { // ставим пятисекундный интервал для перелистывания картинок
		slider.right();
		slider.setMarker();
	},5000);

	//slider
	const slider = {
		slides: ['./img/main_slider/slide1.jpg','./img/main_slider/slide2.jpg', './img/main_slider/slide3.jpg'],
		
		frame: 0, // текущий кадр для отбражения - индекс картинки из массива		
		set: function(image) { // установка нужного фона слайдеру
			document.getElementById("main-wrapp").style.backgroundImage = "url(" + image + ")";
			
		},
		setMarker: function () {
			document.querySelectorAll(".header-marker").forEach(marker => marker.classList.remove("active"));
			document.querySelectorAll(".header-marker")[this.frame].classList.add("active");
					
		},
		init: function() { // запуск слайдера с картинкой с нулевым индексом			
			this.set(this.slides[this.frame]);
			this.setMarker();
			
		},
		left: function() { // крутим на один кадр влево
			this.frame--;
			if(this.frame < 0) this.frame = this.slides.length-1;
			this.set(this.slides[this.frame]);	
			this.setMarker();
		},
		right: function() { // крутим на один кадр вправо
			this.frame++;
			if(this.frame == this.slides.length) this.frame = 0;
			this.set(this.slides[this.frame]);	
			this.setMarker();			
		}
	};
	// двигаем слайдер при клике
	document.querySelectorAll(".swichSlide").forEach(arrow => {
		
		arrow.addEventListener("click", (e) => {
			
			if(e.target.parentElement.classList.contains("left-arrow")) {
				slider.left();
				clearInterval(intervalId);
			};
			if(e.target.parentElement.classList.contains("right-arrow")) {
				slider.right();
				clearInterval(intervalId);
			};
		});
	});

	slider.init();	
	//bestseller move
	const bestsellerMove = {
		slidePosition: 0,
		slideWidth: parseInt(getComputedStyle(document.querySelector(".good-link")).width),		
		move: function(classses) {			
			if(classses.contains("b-goods___left")){	
				this.slidePosition--;
				if(this.slidePosition >= 0) {
					let moveTo = parseInt(getComputedStyle(document.querySelector(".b-good__wrapper")).right) - (this.slideWidth + 40);
					document.querySelector(".b-good__wrapper").style.right = moveTo + "px";
				} else {
					this.slidePosition = document.querySelectorAll(".good-link").length - 1;					
					document.querySelector(".b-good__wrapper").style.right = ((this.slideWidth + 40) * this.slidePosition) + "px";
				};				
			};
			
			if(classses.contains("b-goods___right")) {
				this.slidePosition++;
				if(this.slidePosition <= 5) {
					let moveTo = parseInt(getComputedStyle(document.querySelector(".b-good__wrapper")).right) + this.slideWidth + 40;
					document.querySelector(".b-good__wrapper").style.right = moveTo + "px";
				} else {
					this.slidePosition = 0;					
					document.querySelector(".b-good__wrapper").style.right = this.slidePosition + "px";
				};
			};
		},
		initBtn: function(){
			document.querySelectorAll(".b-good-btn").forEach(item => {
				item.addEventListener("click", (e) => {
					this.move(e.target.classList);
				})
			})
		}
	}

	bestsellerMove.initBtn();

	//accsesory move
	const accssesoryMove = {
		currentWidth: 0,
		markerCount: 0,
		itemWidth: parseInt(getComputedStyle(document.querySelector(".a-disc")).width),
		numberOfItems: document.querySelectorAll(".a-disc").length,
		markers: document.querySelectorAll(".accessories__marker"),
		howMuchToMove: function() {
			const accessoriesWidth = parseInt(getComputedStyle(document.querySelector(".accessories")).width);
			return Math.round(accessoriesWidth / this.itemWidth);
		},
		move: function(symb) {	
			
			if(symb === "+") {						
				this.markerCount += 1;	
						
				if(this.markerCount === Math.round(this.numberOfItems / this.howMuchToMove())) {
					this.markerCount = 0;
					this.currentWidth = 0;
					document.querySelector(".accessories-wrap").style.right = this.currentWidth + "px";	
					this.setMarkerActive(this.markerCount);		
				} else {
					this.currentWidth += (this.itemWidth * this.howMuchToMove());
					document.querySelector(".accessories-wrap").style.right = this.currentWidth + "px";
				};				
			};
			if(symb === "-") {	
				
				this.markerCount -= 1;
				
				if(this.markerCount < 0) {
					this.markerCount = Math.round(this.numberOfItems / this.howMuchToMove()) - 1;
					this.setMarkerActive(this.markerCount);
					this.currentWidth = (this.itemWidth * this.howMuchToMove()) * (Math.round(this.numberOfItems / this.howMuchToMove()) - 1);
					document.querySelector(".accessories-wrap").style.right = this.currentWidth + "px";					
				} else {
					this.setMarkerActive(this.markerCount);
					this.currentWidth -= (this.itemWidth * this.howMuchToMove());
					document.querySelector(".accessories-wrap").style.right = this.currentWidth + "px";
				};				
			};			
		},
		addListenr: function () {
			document.querySelectorAll(".swicher-arrow").forEach(errow => {
				errow.addEventListener("click", (e) => {
					if(e.target.classList.contains("swicher-arrow___right")) {						
						accssesoryMove.move("+");						
					};
					if(e.target.classList.contains("swicher-arrow___left")) {									
						accssesoryMove.move("-");						
					};

				});
			});
		},
		
		setMarkerActive: function (count) {
			if(count > 2) {
				return;
			}else {
				this.markers.forEach(marker => {
					marker.classList.remove("active");
				});

				this.markers[count].classList.add("active");
			}
			
		}
	};
	
	accssesoryMove.addListenr();

	//menu

	const showMenu = () => {
		document.body.querySelector(".menu").classList.toggle("show");
	};

	document.querySelectorAll(".header__menu").
	forEach(item => item.addEventListener("click", (e) => {

			if(e.target.parentElement.classList.contains("mobile-footer__menu___white")) {
				showMenu();
				document.querySelector(".menu__container").style.justifyContent = "flex-end";
			}else{
				showMenu();
				document.querySelector(".menu__container").style.justifyContent = "flex-start";
			};	
		})
	);

	// servives move arrowes
	const servicesMove = {
		servCount: 0,
		servicesList() {
			let services = document.querySelectorAll(".service");
			return services;
		},
		setDisNone() {
			for (let i = 0; i < this.servicesList().length; i++){
				this.servicesList()[i].style.display = "none";
			};
		},
		servrigth () {
			this.setDisNone();
			this.servCount++
			if (this.servCount > this.servicesList().length - 1) this.servCount = 0;
			this.servicesList()[this.servCount].style.display = "flex";
		},
		servLeft () {
			this.setDisNone();
			this.servCount--
			if (this.servCount < 0) this.servCount = this.servicesList().length - 1;
			this.servicesList()[this.servCount].style.display = "flex";
		}
	};
	//fixing the menu when scroll
	window.addEventListener("scroll", () =>{
		if(window.pageYOffset > 50) {
			document.querySelector(".header").style.background = "rgb(90, 90, 90, 0.8)";
			document.querySelector(".menu__container").style.marginTop = window.pageYOffset + "px";
		}else {
			document.querySelector(".header").style.background = "transparent";
		}


	})

};

