interface IBurger {
  menuSelector: string;
  burgerSelector: string;
}
export {IBurger};

export const burger = ({menuSelector, burgerSelector}: IBurger) => {
  const menuElement = document.querySelector(menuSelector) as HTMLUListElement;
  const burgerElement = document.querySelector(
    burgerSelector
  ) as HTMLButtonElement;

  menuElement.style.display = 'none';

  burgerElement.addEventListener('click', () => {
    const isMenuHidden: boolean = menuElement.style.display == 'none';
    const isMobileDevice: boolean = window.screen.availWidth < 993;

    if (isMenuHidden && isMobileDevice) {
      menuElement.style.display = 'block';
    } else {
      menuElement.style.display = 'none';
    }
  });

  window.addEventListener('resize', () => {
    const isDesktopDevice: boolean = window.screen.availWidth > 992;
    
    if (isDesktopDevice) {
      menuElement.style.display = 'none';
    }
  });
};
