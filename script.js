/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//DOM ELEMENTS
const header = document.querySelector('.header');
const images = Array.from(document.querySelectorAll('.gallery__image'));
const thumbnailImagesContainer = document.querySelector('.gallery__th-images');
const thumbnailImages = Array.from(
  document.querySelectorAll('.gallery__img-btn')
);
const popup = document.querySelector('.popup');
const cart = document.querySelector('.cart');
const addQuantity = document.querySelector('.cart__quantity');
const addToCart = document.querySelector('.cart__add-to-cart');
const myCart = document.querySelector('.user__cart-content');
const itemsInMyCart = document.querySelector('.user__cart-items');
const cartIcon = document.querySelector('.user__cart');
const cartNotification = document.querySelector('.user__cart-quantity');
const popupContent = document.querySelector('.popup__content');
const popupImages = document.querySelectorAll('.popup__pimg');
const nextButton = document.querySelector('.btn--next');
const prevButton = document.querySelector('.btn--prev');
const popupThumbnailButtons = Array.from(
  document.querySelectorAll('.popup__thimg__btn')
);
const popupthImagesContainer = document.querySelector('.popup__thimgs');

//MOBILE VIEW BUTTONS
const mobileBtnNext = document.querySelector('.btn-next');
const mobileBtnPrevious = document.querySelector('.btn-prev');

let curMobileImage = 1;

const menuIcon = document.querySelector('.header__menu');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIconClose = document.querySelector('.menu-icon-close');

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//GLOBAL VARIABLES
//POPUP
let currentSlide = 0;
let currentPopupImage = 1;

//CART
let itemsEl = 0;
let itemsInCart = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
const toggleButton = function (el) {
  thumbnailImages.forEach((i) => i.classList.remove('gallery__th-active'));
  el.classList.add('gallery__th-active');
};

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//SLIDER
const slider = function (slide, imgs, buttons) {
  imgs.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;

    if (s.style.transform === 'translateX(0%)') {
      const dataAttribute = s.dataset.popimg || s.dataset.imageNumber;
      togglePopup(s, dataAttribute, buttons);
    }
  });
};

// TOGGLING POPUP'S ACTIVE THUMBNAIL IMAGE
const togglePopup = function (el, dataAttribute, buttons) {
  const activeBtn = buttons.find((b) => b.dataset.btn === dataAttribute);

  if (buttons === popupThumbnailButtons) {
    buttons.forEach((b) => b.classList.remove('popup__thimg-active'));
    activeBtn.classList.add('popup__thimg-active');
  } else {
    buttons.forEach((b) => b.classList.remove('gallery__th-active'));
    activeBtn.classList.add('gallery__th-active');
  }
};
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//EVENT HANDLING
// Gallery
slider(0, images, thumbnailImages);

thumbnailImagesContainer.addEventListener('click', function (e) {
  const newActiveButton = e.target.closest('.gallery__img-btn');

  //Guard clause
  if (!newActiveButton) return;

  //If the button has no active class
  if (!newActiveButton.classList.contains('gallery__th-active')) {
    toggleButton(newActiveButton);
    const { btn } = newActiveButton.dataset;
    curMobileImage = Number(btn);
    //SWITCHING THE IMAGE
    slider(curMobileImage - 1, images, thumbnailImages);
  }
  // If the button has active class
  else {
    popup.classList.remove('hidden');
  }
});

mobileBtnNext.addEventListener('click', function () {
  if (curMobileImage === images.length) {
    curMobileImage = 1;
  } else {
    curMobileImage++;
  }
  slider(curMobileImage - 1, images, thumbnailImages);
});

mobileBtnPrevious.addEventListener('click', function () {
  if (curMobileImage === 1) {
    curMobileImage = images.length;
  } else {
    curMobileImage--;
  }
  slider(curMobileImage - 1, images, thumbnailImages);
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Add to cart
cart.addEventListener('click', function (e) {
  const button =
    e.target.closest('.cart__btn') || e.target.closest('.cart__add-to-cart');

  if (!button) return;

  //Increase the quantity
  if (button.classList.contains('btn__plus')) {
    itemsEl++;
    addQuantity.textContent = itemsEl;
  }

  if (button.classList.contains('btn__minus') && itemsEl > 0) {
    itemsEl--;
    addQuantity.textContent = itemsEl;
  }

  //Add to cart
  if (button.classList.contains('cart__add-to-cart') && itemsEl > 0) {
    const markup = `<div class="cartne">
  <img
    src="images/image-product-1-thumbnail.jpg"
    alt="image-product-1-thumbnail"
  />
  <div class="cartne__d">
    <p class="cartne__p-name">Fall limited Edition Sneakers</p>
    <p class="cartne__p-price">
      $125.00 x ${itemsEl} <span class="cartne__total-price">$${(
      125 * itemsEl
    ).toFixed(2)}</span>
    </p>
  </div>

  <button class="cartne__btn-close">
    <img
      src="images/icon-delete.svg"
      alt="icon-delete"                    
    />
  </button>
</div>
<button class="cartne__btn-checkout">Checkout</button>`;

    itemsInMyCart.innerHTML = '';
    itemsInMyCart.insertAdjacentHTML('afterbegin', markup);

    itemsInCart = itemsEl;
    itemsEl = 0;
    addQuantity.textContent = itemsEl;

    //Displaying number of items in cart on cart icon
    cartNotification.textContent = itemsInCart;
    cartNotification.classList.remove('hidden');
  }
});

cartIcon.addEventListener('click', function () {
  myCart.classList.toggle('hidden');
});

//Removing content from cart

itemsInMyCart.addEventListener('click', function (e) {
  const button = e.target.closest('.cartne__btn-close');
  if (!button) return;

  const markup = `<p class="user__cart-empty">Your cart is empty.</p>`;

  this.innerHTML = '';
  this.insertAdjacentHTML('afterbegin', markup);
  cartNotification.textContent = '';
  cartNotification.classList.add('hidden');
});

//Popup CLOSE BUTTON
popup.addEventListener('click', function (e) {
  const button = e.target.closest('.btn--close');

  if (!button) return;
  popup.classList.add('hidden');
  slider(0, popupImages, popupThumbnailButtons);
  currentSlide = 0;
});

//POPUP sliding images
slider(0, popupImages, popupThumbnailButtons);

////////////////////////////////////
//NEXT IMAGE
nextButton.addEventListener('click', function () {
  currentSlide++;
  if (currentSlide > popupImages.length - 1) {
    currentSlide = 0;
  }
  slider(currentSlide, popupImages, popupThumbnailButtons);
});

//PREVIOUS IMAGE
prevButton.addEventListener('click', function () {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = popupImages.length - 1;
  }
  slider(currentSlide, popupImages, popupThumbnailButtons);
});

//SLIDING IMAGES USING THUMBNAIL IMAGE BUTTONS
popupthImagesContainer.addEventListener('click', function (e) {
  const button = e.target.closest('.popup__thimg__btn');
  if (!button) return;
  const nextImageNumber = button.dataset.btn;
  currentSlide = nextImageNumber - 1;
  slider(currentSlide, popupImages, popupThumbnailButtons);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//Menu

header.addEventListener('click', function (e) {
  if (e.target.closest('.header__menu')) {
    mobileMenu.style.transform = 'translateX(0%)';
    mobileMenu.style.backdropFilter = 'brightness(20%)';
  }
});

menuIconClose.addEventListener('click', function (e) {
  if (e.target.closest('.menu-icon-close')) {
    mobileMenu.style.transform = 'translateX(-150%)';
  }
});
