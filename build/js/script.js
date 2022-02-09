'use strict';
var header = document.querySelector('.header');
var nav = header.querySelector('.nav');
var body = document.querySelector('.page__body');

var headerMenuButton = document.querySelector('.header__burger-button');

nav.classList.remove('nav--nojs');

headerMenuButton.addEventListener('click', function () {
  header.classList.toggle('header--open-menu');
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
  body.classList.toggle('overflow-hidden');
});

var accordionBlocks = document.querySelectorAll('.accordion-block');
var accordionTitleWrappers = document.querySelectorAll('.accordion__wrapper');

if (accordionBlocks) {
  // var accordionButtons = document.querySelectorAll('.accordion-block__button'); accordionButtons = accordionTitleWrappers
  var accordionContentBlocks = document.querySelectorAll('.accordion-block__content');

  var toggleAccordion = function (btn) {
    var currentIndex = Array.from(accordionTitleWrappers).indexOf(btn);
    // находим все активные элементы (уже развернутые вкладки аккордеона)
    for (var j = 0; j < accordionContentBlocks.length; j++) {
      if (j !== currentIndex && accordionContentBlocks[j].classList.contains('active')) {
        accordionContentBlocks[j].classList.remove('active');
        accordionTitleWrappers[j].classList.remove('accordion-block__button--hide');
      }
    }

    accordionContentBlocks[Array.from(accordionTitleWrappers).indexOf(btn)].classList.toggle('active');
    btn.classList.toggle('accordion-block__button--hide');
  };

  // При загрузке js, скрывает вкладки, которые открыты по умолчанию без js
  // и показываем кнопки
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

      wrapper.addEventListener('click', function () {
        evt.preventDefault();
        toggleAccordion(wrapper);
      });
    });
  });
}

// Скрипт для открытия/закрытия фильтров на странице каталога
var filters = document.querySelectorAll('.filter');

if (filters) {
  filters.forEach(function (filter) {
    var filterButton = filter.querySelector('.filter__button');
    var filterContent = filter.querySelector('.filter__content');
    // Изначально фильтры без js открыты, скрываем их
    filterContent.classList.add('visually-hidden');
    filterButton.classList.add('filter__button--hide');

    filterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filterContent.classList.toggle('visually-hidden');
      filterButton.classList.toggle('filter__button--hide');
    });
  });
}

// Скрипт для открытия и закрытия модального окна

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
};

document.addEventListener('keyup', function (evt) {
  if (evt.defaultPrevented) {
    return;
  }

  var key = evt.key;

  if (key === 'Escape' || key === 'Esc') {
    closeModal();
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
