'use strict';
var header = document.querySelector('.header');
var nav = header.querySelector('.nav');
var body = document.querySelector('.page__body');

var headerMenuButton = document.querySelector('.header__burger-button');
var loginLink = document.querySelector('.header__menu-link--login');
var userMenu = document.querySelector('.user-menu');

if (window.innerWidth > 1024) {
  loginLink.style.right = userMenu.offsetWidth + 'px';
}

if (window.innerWidth > 767) {
  var blogTitles = document.querySelectorAll('.blog__title');

  if (blogTitles) {
    var blogItems = document.querySelectorAll('.blog__item');

    var resizeBlogItems = function () {
      blogItems.forEach(function (item) {
        if (item.offsetHeight > 300 || item.offsetHeight > 630) {
          item.querySelector('.blog__picture').style.height = item.offsetHeight + 'px';
          item.querySelector('.blog__picture picture').style.height = item.offsetHeight + 'px';
          item.querySelector('.blog__picture img').style.height = item.offsetHeight + 'px';
        }
      });
    };

    setInterval(function () {
      resizeBlogItems();
    }, 1000);
  }
}

nav.classList.remove('nav--nojs');

headerMenuButton.addEventListener('click', function () {
  header.classList.toggle('header--open-menu');
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
  body.classList.toggle('overflow-hidden');
});

if (document.querySelector('.header__logo--href')) {
  document.querySelector('.header__logo--href').tabIndex = 2;
}
document.querySelector('.header__cart-link').tabIndex = 4;
loginLink.tabIndex = 3;
document.querySelector('.nav__search input').tabIndex = 1;

if (window.innerWidth < 1024) {
  if (document.querySelector('.header__logo--href')) {
    document.querySelector('.header__logo--href').tabIndex = 0;
  }
  document.querySelector('.header__cart-link').tabIndex = 0;
  loginLink.tabIndex = 0;
  document.querySelector('.nav__search input').tabIndex = 0;
}

var accordionBlocks = document.querySelectorAll('.accordion-block');
var accordionTitleSections = document.querySelectorAll('.accordion__section');
var accordionTitleWrappers = document.querySelectorAll('.accordion__wrapper');

if (accordionBlocks) {
  // var accordionButtons = document.querySelectorAll('.accordion-block__button'); accordionButtons = accordionTitleWrappers
  var accordionContentBlocks = document.querySelectorAll('.accordion-block__content');

  var toggleAccordion = function (btn) {
    var currentIndex = Array.from(accordionTitleWrappers).indexOf(btn);
    // ?????????????? ?????? ???????????????? ???????????????? (?????? ?????????????????????? ?????????????? ????????????????????)
    for (var j = 0; j < accordionContentBlocks.length; j++) {
      if (j !== currentIndex && accordionContentBlocks[j].classList.contains('active')) {
        accordionContentBlocks[j].classList.remove('active');
        accordionTitleWrappers[j].classList.remove('accordion-block__button--hide');
        accordionTitleSections[j].classList.remove('accordion__section--opened');
      }
    }

    accordionContentBlocks[Array.from(accordionTitleWrappers).indexOf(btn)].classList.toggle('active');
    btn.classList.toggle('accordion-block__button--hide');
    accordionTitleSections[Array.from(accordionTitleWrappers).indexOf(btn)].classList.toggle('accordion__section--opened');
  };

  // ?????? ???????????????? js, ???????????????? ??????????????, ?????????????? ?????????????? ???? ?????????????????? ?????? js
  // ?? ???????????????????? ????????????
  for (var i = 0; i < accordionBlocks.length; i++) {
    accordionTitleWrappers[i].classList.remove('visually-hidden');
    accordionTitleWrappers[i].classList.add('accordion-block__button--show');
    accordionContentBlocks[i].classList.remove('active');
  }

  accordionTitleWrappers.forEach(function (wrapper) {
    // var button = wrapper.querySelector('.accordion-block__button');
    wrapper.addEventListener('click', function (evt) {
      evt.preventDefault();
      toggleAccordion(wrapper);
    });
  });
}

// ???????????? ?????? localStorage

var modalForm = document.querySelector('.login form');
var modalEmail = modalForm.querySelector('#email');

var isStorageSupport = true;
var storageModalEmail = '';

try {
  storageModalEmail = localStorage.getItem('modalEmail');
} catch (err) {
  isStorageSupport = false;
}

window.addEventListener('load', function () {
  if (storageModalEmail) {
    modalEmail.value = storageModalEmail;
  }
});

modalForm.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('modalEmail', modalEmail.value);
  }
});

// ???????????? ?????? ????????????????/???????????????? ???????????????? ???? ???????????????? ????????????????
var filtersSection = document.querySelector('.filters');

if (filtersSection) {
  var filtersLink = filtersSection.querySelector('.filters__link');
  var filtersModalWindow = filtersSection.querySelector('.filters__wrapper');
  var filtersModalClose = filtersSection.querySelector('.filters__button-close');
  var filtersModalCloseWindow = filtersSection.querySelector('.filters__button-close-window');
  var filtersApplyButton = filtersSection.querySelector('.filters__apply');

  var closeFiltersModal = function () {
    filtersModalWindow.classList.remove('filters__wrapper--open');
    body.classList.remove('overflow-hidden');
  };

  var openFiltersModal = function () {
    filtersModalWindow.classList.add('filters__wrapper--open');
    body.classList.add('overflow-hidden');
    filtersModalWindow.setAttribute('tabindex', '0');
  };

  var filters = filtersSection.querySelectorAll('.filter');

  filters.forEach(function (filter) {
    var filterButton = filter.querySelector('.filter__button');
    var filterContent = filter.querySelector('.filter__content');
    // ???????????????????? ?????????????? ?????? js ??????????????, ???????????????? ????
    filterContent.classList.add('visually-hidden');
    filterButton.classList.add('filter__button--hide');

    filterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filterContent.classList.toggle('visually-hidden');
      filterButton.classList.toggle('filter__button--hide');
    });
  });

  if (window.innerWidth < 1024) {
    // ???????????? ?????? ???????????????? ?? ???????????????? ???????????????????? ???????? ????????????????
    filtersModalClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeFiltersModal();
    });

    filtersModalCloseWindow.addEventListener('click', function () {
      closeFiltersModal();
    });

    filtersLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      openFiltersModal();
    });

    filtersApplyButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeFiltersModal();
    });
  }

  document.addEventListener('focus', function (evt) {
    if (filtersModalWindow.classList.contains('filters__wrapper--open') && !filtersModalWindow.contains(evt.target)) {
      evt.stopPropagation();
      filtersModalWindow.focus({preventScroll: true});
    }
  }, true);
}

// ???????????? ?????? ???????????????? ?? ???????????????? ???????????????????? ????????

var modalLink = document.querySelector('.header__menu-link--login');

var modalWindow = document.querySelector('.modal');
var modalClose = modalWindow.querySelector('.modal__button-close');
var modalCloseWindow = modalWindow.querySelector('.modal__button-close-window');

var closeModal = function () {
  modalWindow.classList.remove('modal--open');
  body.classList.remove('overflow-hidden');
};

document.addEventListener('focus', function (evt) {
  if (modalWindow.classList.contains('modal--open') && !modalWindow.contains(evt.target)) {
    evt.stopPropagation();
    modalWindow.focus({preventScroll: true});
  }
}, true);

var openModal = function () {
  modalWindow.classList.add('modal--open');
  body.classList.add('overflow-hidden');
  modalWindow.setAttribute('tabindex', '0');
  modalEmail.focus();
};

document.addEventListener('keyup', function (evt) {
  if (evt.defaultPrevented) {
    return;
  }

  var key = evt.key;

  if (key === 'Escape' || key === 'Esc') {
    closeModal();
    closeFiltersModal();
  }
});

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeModal();
});

modalCloseWindow.addEventListener('click', function () {
  closeModal();
});

modalLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  openModal();
});
