document.addEventListener("DOMContentLoaded", function () {
  toggleMenu();
	openSearch();
	recommendSliderInit();
	addAnimationInit();
	heroSliderInit();
	techSliderInit();
	reviewsSliderInit();
	filtersFunction();
	accordionFunction();
	toggleFilters();
});

const openSearch = () => {
	const searchBtns = document.querySelectorAll('.search-btn');
	const searchWrap = document.querySelector('.search');
	const basket = document.querySelector('.basket');
	const searchInput = document.querySelector('.input__search-input');

	searchBtns.forEach((searchBtn) =>{
		searchBtn.addEventListener('click', () => {
		searchWrap.classList.toggle('search-active');
		basket.classList.toggle('search-active');
		searchInput.focus();
	});
	}) 
	
	
	
};

const addAnimationInit = () => {
	const scrollers = document.querySelectorAll('.marquee');

	const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const isMobile = window.innerWidth < 768;

	if (!isReducedMotion && isMobile) {
		addAnimation();
	}

	function addAnimation() {
		scrollers.forEach((scroller) => {
			if (scroller.dataset.animate) return;

			scroller.setAttribute('data-animate', 'true');

			const scrollerInner = scroller.querySelector('.marquee__wrap');
			if (!scrollerInner) return;

			const scrollerContent = Array.from(scrollerInner.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', 'true');
				scrollerInner.appendChild(duplicatedItem);
			});
		});
	}
};


const toggleMenu = () => {
  const htmlElement = document.querySelector("html");
  const burgerMenus = document.querySelectorAll(".burger");
	const closeBurger = document.querySelector(".overlay");
  if (!burgerMenus.length) return;

  const navLinks = document.querySelectorAll("nav a");

  burgerMenus.forEach((burgerMenu) => {
    burgerMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      htmlElement.classList.toggle("open");
    });
  });
	closeBurger.addEventListener("click", (event) =>{
		htmlElement.classList.remove("open");
	});
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
};
const toggleFilters = () => {
  const htmlElement = document.querySelector("html");
  const openFiltersBtn = document.querySelector(".catalog__filters__btn");
	const closeFiltersBtn = document.querySelector(".burger-filters");
	const closeBurger = document.querySelector(".overlay");  
    openFiltersBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      htmlElement.classList.toggle("open-filter");
    });
	closeBurger.addEventListener("click", (event) =>{
		htmlElement.classList.remove("open-filter");
	});
	closeFiltersBtn.addEventListener("click", (event) =>{
		htmlElement.classList.toggle("open-filter");
	});
};

const openMenu = () => {
  const windowWidth = window.innerWidth;
  const menuLinks = document.querySelectorAll('header li:has(.sub-menu)');

  if (windowWidth <= 1239.9) {
    menuLinks.forEach((link) => {
      const subMenu = link.querySelector('.sub-menu');
      if (!link.dataset.listener) {
        link.addEventListener("click", (event) => {
          event.stopPropagation();
          link.classList.toggle("active");
        });
        link.dataset.listener = "true"; 
      }
    });
  } else {
    menuLinks.forEach((link) => link.classList.remove("active"));
  }
};

const handlePopup = () => {
  const openPopup = () => {
    document.querySelectorAll('[data-open]').forEach(element => {
      element.addEventListener('click', () => {
				document.documentElement.classList.add('open-popup');
        const popupName = element.getAttribute('data-open'); 
        const popupTarget = document.querySelector(`[data-popup="${popupName}"]`); 

        if (popupTarget) {
          document.documentElement.classList.add('open-popup');
          popupTarget.classList.add('open-popup'); 
        }
      });
    });
  };

  const closePopup = () => {
    document.querySelectorAll('[data-close]').forEach(element => {
      element.addEventListener('click', () => {
        const popup = element.closest('.popup'); 

        if (popup) {
          popup.classList.remove('open-popup'); 
        }

        if (!document.querySelector('.popup.open-popup')) {
          document.documentElement.classList.remove('open-popup');
        }
      });
    });
  };

  openPopup();
  closePopup();
};
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  accordionItems.forEach((item) => {
		const top = item.querySelector(".accord-item-top");
		if(top){
			top.addEventListener("click", function () {
				item.classList.toggle("active");
			});
		}
  });
};

const recommendSliderInit = () =>{
	const recommendSliderWrap = document.querySelector('.recommendSlider');
	if(!recommendSliderWrap) return;
		
	const recommendSlider = new Swiper('.recommendSlider', {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: ".recommend-button-next",
    prevEl: ".recommend-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
   1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    }
	},
});

}
const techSliderInit = () =>{
	const techSliderWrap = document.querySelector('.techSlider');
	if(!techSliderWrap) return;
		
	const techSlider = new Swiper('.techSlider', {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".tech-button-next",
    prevEl: ".tech-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.55,
      spaceBetween: 24,
    },
    550: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
   1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    }
	},
});

}
const reviewsSliderInit = () =>{
	const reviewsSliderWrap = document.querySelector('.reviewsSlider');
	if(!reviewsSliderWrap) return;
		
	const reviewsSlider = new Swiper('.reviewsSlider', {
  slidesPerView: 1,
  spaceBetween: 32,
  navigation: {
    nextEl: ".reviews-button-next",
    prevEl: ".reviews-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
   1240: {
      slidesPerView: 3,
      spaceBetween: 32,
    }
	},
});

}
const heroSliderInit = () =>{
	const heroSliderWrap = document.querySelector('.heroSlider');
	if(!heroSliderWrap) return;
		
	const heroSlider = new Swiper('.heroSlider', {
  slidesPerView: 1,
  spaceBetween: 10,
	pagination: {
        el: ".hero__pagination",
      },
});

}

const filtersFunction = () => {
  const filters = document.querySelectorAll(".filter");

  filters.forEach(filter => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const type = filter.getAttribute("data-filter");

    if (!type) return;
    const minRange = filter.querySelector(`#rangeMin${capitalize(type)}`);
    const maxRange = filter.querySelector(`#rangeMax${capitalize(type)}`);
    const rangeContainer = filter.querySelector(".filter-range__container");
		const minLabel = filter.querySelector(`#min${capitalize(type)}Label`);
		const maxLabel = filter.querySelector(`#max${capitalize(type)}Label`);
		if (!minLabel || !maxLabel) {
			console.warn(`Labels не знайдені для ${type}`);
			return;
		}
    if ( !minRange || !maxRange || !rangeContainer) {
      console.warn(`Не знайдені елементи для ${type}`);
      return;
    }

    const updateRangeStyles = () => {
      const min = ((minRange.value - minRange.min) / (minRange.max - minRange.min)) * 100;
      const max = ((maxRange.value - maxRange.min) / (maxRange.max - maxRange.min)) * 100;
      
      rangeContainer.style.setProperty('--min', `${min}%`);
      rangeContainer.style.setProperty('--max', `${max}%`);
    };

   const updateValues = () => {
	let min = parseInt(minRange.value);
	let max = parseInt(maxRange.value);

	if (min > max) min = max;
	if (max < min) max = min;

	minRange.value = min;
	maxRange.value = max;

	minLabel.textContent = min;
	maxLabel.textContent = max;

	updateRangeStyles();
};


    minRange.addEventListener('input', () => {
      if (parseInt(minRange.value) >= parseInt(maxRange.value)) {
        minRange.value = maxRange.value;
      }
      updateValues();
    });

    maxRange.addEventListener('input', () => {
      if (parseInt(maxRange.value) <= parseInt(minRange.value)) {
        maxRange.value = minRange.value;
      }
      updateValues();
    });

    // minNumber.addEventListener('change', () => {
    //   let val = parseInt(minNumber.value);
    //   if (val < parseInt(minRange.min)) val = minRange.min;
    //   if (val >= parseInt(maxRange.value)) val = maxRange.value;
    //   minRange.value = val;
    //   updateValues();
    // });

    // maxNumber.addEventListener('change', () => {
    //   let val = parseInt(maxNumber.value);
    //   if (val > parseInt(maxRange.max)) val = maxRange.max;
    //   if (val <= parseInt(minRange.value)) val = minRange.value;
    //   maxRange.value = val;
    //   updateValues();
    // });

    updateValues();
  });
};
let resizeTimeout;

window.addEventListener('resize', () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		openMenu();
		addAnimationInit();
	}, 150);
});
