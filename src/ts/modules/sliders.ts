interface ISliders {
  slidesSelector: string;
  direction?: 'vertical' | 'horizontal';
  prevButtonSelector?: string;
  nextButtonSelector?: string;
  slideIndex?: number;
  autoplayInterval?: number;
}
export {ISliders};

export const sliders = ({
  slidesSelector,
  direction = 'horizontal',
  prevButtonSelector,
  nextButtonSelector,
  slideIndex = 1,
  autoplayInterval = 3000
}: ISliders): void => {
  const slides = document.querySelectorAll(
    slidesSelector
  ) as NodeListOf<Element>;
  const directionAnimations: string[] = getDirectionAnimations();
  let isAutoplayPaused: NodeJS.Timer;

  function showSlides(n: number): void {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(slide => {
      slide.classList.add('animated');
      slide.classList.remove('show');
      slide.classList.add('hide');
    });

    slides[slideIndex - 1].classList.add('show');
  }

  function changeSlide(n: number): void {
    showSlides((slideIndex += n));
  }

  function showPrevSlide(directionAnimations: string[]): void {
    slides[slideIndex - 1].classList.remove(directionAnimations[0]);
    slides[slideIndex - 1].classList.add(directionAnimations[1]);
  }

  function showNextSlide(directionAnimations: string[]): void {
    slides[slideIndex - 1].classList.remove(directionAnimations[1]);
    slides[slideIndex - 1].classList.add(directionAnimations[0]);
  }

  function getDirectionAnimations(): string[] {
    switch (direction) {
      case 'vertical': {
        return ['slideInDown', 'slideInUp'];
      }
      case 'horizontal': {
        return ['slideInLeft', 'slideInRight'];
      }
    }
  }

  function stopAutoplayOnMouseHover(): void {
    slides[0].addEventListener('mouseenter', () => {
      clearInterval(isAutoplayPaused);
    });
    slides[0].addEventListener('mouseleave', () => {
      setAutoplay();
    });
  }

  function setAutoplay(): void {
    isAutoplayPaused = setInterval(() => {
      changeSlide(1);
      showNextSlide(directionAnimations);
    }, autoplayInterval);
  }

  showSlides(slideIndex);
  setAutoplay();
  stopAutoplayOnMouseHover();

  try {
    const prevButton = document.querySelector(
      prevButtonSelector
    ) as HTMLButtonElement | null;
    const nextButton = document.querySelector(
      nextButtonSelector
    ) as HTMLButtonElement | null;

    prevButton.addEventListener('click', () => {
      changeSlide(-1);
      showPrevSlide(directionAnimations);
      clearInterval(isAutoplayPaused);
    });

    nextButton.addEventListener('click', () => {
      changeSlide(1);
      showNextSlide(directionAnimations);
      clearInterval(isAutoplayPaused);
    });
  } catch (error) {}
};
