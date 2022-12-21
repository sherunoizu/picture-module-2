import {modals} from './modules';
import {sliders, ISliders} from './modules';
import {forms} from './modules';
import {mask} from './modules';
import {checkTextInputs} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  modals();

  const feedbackSliderSelectors = {
    slidesSelector: '.feedback-slider-item',
    prevButtonSelector: '.main-prev-btn',
    nextButtonSelector: '.main-next-btn'
  } as ISliders;

  const mainSliderSelectors = {
    slidesSelector: '.main-slider-item',
    direction: 'vertical'
  } as ISliders;

  sliders(feedbackSliderSelectors);
  sliders(mainSliderSelectors);
  forms();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
});
