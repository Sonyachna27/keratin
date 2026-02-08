document.addEventListener("DOMContentLoaded", function () {
  toggleMenu();
	openSearch();
	initMobileAccordion();
	initPensionSliders();
	handleShowMore();
	// addAnimationInit();
	
	// filtersFunction();
	accordionFunction();
	// toggleFilters();
	// openTabs();
	
});

const openSearch = () => {
  const searchBtns = document.querySelectorAll('.search-btn');
  const searchWrap = document.querySelector('.search-block');
  const overlay = document.querySelector('.overlay');
  const searchInput = document.querySelector('.input__search-input');
  const searchForm = document.querySelector('.search-block form');
const htmlElement = document.documentElement;
  if (!searchWrap) return;

  searchBtns.forEach((searchBtn) => {
    searchBtn.addEventListener('click', () => {

      htmlElement.classList.add('search-active');
      searchWrap.classList.add('search-active');
      searchInput.focus();
    });
  });

  searchWrap.addEventListener('click', () => {
    searchWrap.classList.remove('search-active');
    htmlElement.classList.remove('search-active');
  });

  if (searchForm) {
    searchForm.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
};
const toggleMenu = () => {
  const htmlElement = document.documentElement;
  const toggles = document.querySelectorAll("[data-menu-toggle]");
  // const closeBurger = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll("nav a");

  if (!toggles.length) return;

  const toggleHandler = (event) => {
    event.stopPropagation();
    htmlElement.classList.toggle("open");
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleHandler);
  });

  // if (closeBurger) {
  //   closeBurger.addEventListener("click", () => {
  //     htmlElement.classList.remove("open");
  //   });
  // }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
};
const initMobileAccordion = () => {
  const BREAKPOINT = 1024;
  const menu = document.querySelector('.header__menu');
  if (!menu) return;

  menu.addEventListener('click', (e) => {
    if (window.innerWidth >= BREAKPOINT) return;

    if (e.target.tagName === 'A') {
      e.stopPropagation(); 
      return; 
    }

    const item = e.target.closest('li:has(.sub-menu)');
    if (!item) return;

    e.preventDefault();
    e.stopPropagation();

    const isActive = item.classList.contains('active');

    const parentUl = item.parentElement;
    parentUl.querySelectorAll(':scope > li.active').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });

    item.classList.toggle('active');
  });


  window.addEventListener('resize', () => {
    if (window.innerWidth >= BREAKPOINT) {
      menu.querySelectorAll('li.active').forEach(el => el.classList.remove('active'));
    }
  });
};

const initPensionSliders = () => {
  const pensionItems = document.querySelectorAll('.pension__item');

  pensionItems.forEach((item, index) => {
    const thumbsContainer = item.querySelector('.pension__item-SLider');
    const mainContainer = item.querySelector('.pension__item-Slider2');
    
    const nextBtn = item.querySelector('.pension__item-slide-button-next');
    const prevBtn = item.querySelector('.pension__item-slide-button-prev');

    const swiperThumbs = new Swiper(thumbsContainer, {
      spaceBetween: 0,
      slidesPerView: 6,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const swiperMain = new Swiper(mainContainer, {
      spaceBetween: 10,
      nested: true, 
      observer: true, 
      observeParents: true,
			autoHeight: true,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  });

const mainPensionSliders = document.querySelectorAll('.pension .pensionSlider');

mainPensionSliders.forEach((slider) => {
 
  const parentContainer = slider.closest('.pension'); 
  
  if (!parentContainer) return;

  const nextBtn = parentContainer.querySelector('.pension-button-next');
  const prevBtn = parentContainer.querySelector('.pension-button-prev');
  const pagination = parentContainer.querySelector('.pension-pagination');

  new Swiper(slider, {
    slidesPerView: 1.25,
    spaceBetween: 12,
    observer: true,
    observeParents: true,
    preventClicks: false, 
		autoHeight:true,
    preventClicksPropagation: false,
    touchStartPreventDefault: false, 
    
    pagination: {
      el: pagination, // використовуємо знайдену змінну
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn, // використовуємо знайдену змінну
      prevEl: prevBtn, // використовуємо знайдену змінну
    },
    breakpoints: {
			0:{ slidesPerView: 1.25, spaceBetween: 12, centeredSlides:true, loop:true },
      640: { slidesPerView: 2, spaceBetween: 20, centeredSlides:false, loop:true },
      1024: { slidesPerView: 3, spaceBetween: 20, centeredSlides:false, loop:true },
      1240: { slidesPerView: 4, spaceBetween: 20, centeredSlides:false, loop:true }
    }
  });
});
};
// const openTabs = () => {
//   const tabGroups = document.querySelectorAll(".target__wrap");
//   const FIRST_VISIBLE_COUNT = 5;

//   tabGroups.forEach((group) => {
//     const tabsLinks = group.querySelectorAll(".target__list-item");
//     const allContentBlocks = group.querySelectorAll(".target__content");

//     allContentBlocks.forEach(block => {
//       block.style.display = "none";
//       block.style.opacity = 0;
//     });

//     const hasActive = Array.from(tabsLinks).some(btn =>
//       btn.classList.contains("active")
//     );

//     if (!hasActive) {
//       Array.from(tabsLinks)
//         .slice(0, FIRST_VISIBLE_COUNT)
//         .forEach(button => {
//           button.classList.add("active");
//         });
//     }

//     tabsLinks.forEach(button => {
//       if (button.classList.contains("active")) {
//         const target = group.querySelector(`#${button.dataset.name}`);
//         if (target) {
//           target.style.display = "flex";
//           target.style.opacity = 1;
//         }
//       }
//     });

//     tabsLinks.forEach(button => {
//       button.addEventListener("click", () => {
//         const target = group.querySelector(`#${button.dataset.name}`);
//         if (!target) return;

//         const isActive = button.classList.contains("active");

//         button.classList.toggle("active");

//         if (isActive) {
//           target.style.opacity = 0;
//           target.style.display = "none";
//         } else {
//           target.style.display = "flex";
//           requestAnimationFrame(() => {
//             target.style.opacity = 1;
//           });
//         }
//       });
//     });
//   });
// };

const handleShowMore = () => {
  const COLLAPSED_HEIGHT = 95;
  const containers = document.querySelectorAll('.pension__item__content');

  containers.forEach(container => {
    const list = container.querySelector('.pension__item__content-list');
    const inner = container.querySelector('.pension__item-inner');

    if (!list || !inner) return;
    if (inner.scrollHeight <= COLLAPSED_HEIGHT) return;

    list.style.height = `${COLLAPSED_HEIGHT}px`;
    list.style.overflow = 'hidden';

    if (container.querySelector('.show-more-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'show-more-btn';
    btn.textContent = 'Показати все';
    container.appendChild(btn);

    btn.addEventListener('click', () => {
  const isOpen = list.classList.toggle('is-open');
  
  list.style.height = isOpen ? `${inner.scrollHeight}px` : `${COLLAPSED_HEIGHT}px`;
  btn.textContent = isOpen ? 'Приховати' : 'Показати все';

  const swiperContainer = container.closest('.pensionSlider');
  const swiperInstance = swiperContainer?.swiper;

  if (swiperInstance) {
    const slide = container.closest('.swiper-slide');
    
    const ro = new ResizeObserver(() => {
      swiperInstance.updateAutoHeight();
    });

    ro.observe(slide);

    setTimeout(() => {
      ro.disconnect();
      swiperInstance.update();
    }, 600);
  }
});
  });
};







const addAnimationInit = () => {
  const scrollers = document.querySelectorAll('.marquee');
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const checkState = () => {
    const isReducedMotion = mediaQuery.matches;
    const isMobile = window.innerWidth < 768;

    if (!isReducedMotion && isMobile) {
      addAnimation();
    } else {
      removeAnimation();
    }
  };

  function addAnimation() {
    scrollers.forEach((scroller) => {
      if (scroller.dataset.animate === 'true') return;

      scroller.dataset.animate = 'true';

      const scrollerInner = scroller.querySelector('.marquee__wrap');
      if (!scrollerInner) return;

      const items = Array.from(scrollerInner.children);

      items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('marquee__clone');
        scrollerInner.appendChild(clone);
      });
    });
  }

  function removeAnimation() {
    scrollers.forEach((scroller) => {
      if (scroller.dataset.animate !== 'true') return;
      delete scroller.dataset.animate;
      const scrollerInner = scroller.querySelector('.marquee__wrap');
      if (!scrollerInner) return;

      scrollerInner.querySelectorAll('.marquee__clone').forEach((clone) => {
        clone.remove();
      });
    });
  }
  checkState();
  window.addEventListener('resize', checkState);

  mediaQuery.addEventListener('change', checkState);
};





const toggleFilters = () => {
  const htmlElement = document.querySelector("html");
  const openFiltersBtn = document.querySelector(".catalog__filters__btn");
	const closeFiltersBtn = document.querySelector(".burger-filters");
	const closeBurger = document.querySelector(".overlay");  
	if(!openFiltersBtn) return;
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




// const openMenu = () => {
//   const windowWidth = window.innerWidth;
//   const menuLinks = document.querySelectorAll('header li:has(.sub-menu)');

//   if (windowWidth <= 1239.9) {
//     menuLinks.forEach((link) => {
//       const subMenu = link.querySelector('.sub-menu');
//       if (!link.dataset.listener) {
//         link.addEventListener("click", (event) => {
//           event.stopPropagation();
//           link.classList.toggle("active");
//         });
//         link.dataset.listener = "true"; 
//       }
//     });
//   } else {
//     menuLinks.forEach((link) => link.classList.remove("active"));
//   }
// };

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



