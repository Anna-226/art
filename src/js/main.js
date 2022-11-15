import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import showMoreStyles from './modules/showMoreStyles';

window.addEventListener('DOMContentLoaded', () => {
   'use strict';

   modals();
   sliders('.main-slider-item', 'vertical');
   sliders('.feedback-slider-item', 'gorizontal', '.main-prev-btn', '.main-next-btn');
   forms();
   mask('[name="phone"]');
   showMoreStyles('.button-styles', '#styles .row');
});