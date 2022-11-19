import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import showPicture from './modules/showPicture';
import accorden from './modules/accordeon';

window.addEventListener('DOMContentLoaded', () => {
   'use strict';

   let calcState = {};

   modals();
   sliders('.main-slider-item', 'vertical');
   sliders('.feedback-slider-item', 'gorizontal', '.main-prev-btn', '.main-next-btn');
   forms();
   mask('[name="phone"]');
   showMoreStyles('.button-styles', '#styles .row');
   calc('#size', '#material', '#options', '.promocode', '.calc-price', calcState);
   filter();
   showPicture('.sizes-block');
   accorden('.accordion-heading');
});