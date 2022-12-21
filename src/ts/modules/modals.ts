export const modals = () => {
  let isBtnPressed: boolean = false;

  const modalTimeout: NodeJS.Timeout = showModalByTime(
    '.popup-consultation',
    60000
  );

  interface IModalSelectors {
    triggerSelector: string;
    modalSelector: string;
    closeSelector: string;
    destroyTrigger: boolean;
    animationClass?: string | null;
  }

  function bindModal(selectors: IModalSelectors): void {
    const triggers = document.querySelectorAll(selectors.triggerSelector);
    const modal = document.querySelector(
      selectors.modalSelector
    ) as HTMLDivElement;
    const close = document.querySelector(
      selectors.closeSelector
    ) as HTMLElement;
    const windows = document.querySelectorAll(
      '[data-modal]'
    ) as NodeListOf<HTMLElement>;
    const animationClass: string | null = selectors.animationClass
      ? selectors.animationClass
      : null;

    modal.classList.add('hide');

    const hideAllModals = (): void => {
      windows.forEach(window => {
        hideModal(window);
      });
    };

    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        hideAllModals();
        isBtnPressed = true;

        if (selectors.destroyTrigger) trigger.remove();

        if (e.target) {
          e.preventDefault();
          showModal(modal, animationClass);

          modal.focus();
        }
      });
    });

    close.addEventListener('click', () => {
      hideModal(modal);

      hideAllModals();
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        hideAllModals();
        hideModal(modal);
      }
    });
  }

  function showModal(
    modal: HTMLDivElement,
    animationClass: string | null
  ): void {
    clearTimeout(modalTimeout);

    const scrollSize: number = calcScroll();
    const giftItem = document.querySelector(
      '.fixed-gift'
    ) as HTMLImageElement | null;

    modal.classList.remove('hide');
    modal.classList.add('show', 'animated', animationClass); // jackInTheBox
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollSize}px`;

    if (giftItem) {
      giftItem.style.marginRight = `${scrollSize}px`;
    }

    document.addEventListener(
      'keydown',
      e => {
        if (e.key === 'Escape') {
          hideModal(modal);
        }
      },
      {once: true}
    );
  }

  function hideModal(modal: Element): void {
    const giftItem = document.querySelector(
      '.fixed-gift'
    ) as HTMLImageElement | null;

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
    if (giftItem) {
      giftItem.style.marginRight = `0px`;
    }
  }

  function showModalByTime(selector: string, time: number): NodeJS.Timeout {
    const cuurentModal: Element = document.querySelector(
      selector
    ) as HTMLElement;

    return setTimeout(() => {
      const scrollSize: number = calcScroll();
      const giftItem = document.querySelector(
        '.fixed-gift'
      ) as HTMLImageElement | null;

      cuurentModal.classList.remove('hide');
      cuurentModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scrollSize}px`;
      if (giftItem) {
        giftItem.style.marginRight = `${scrollSize}px`;
      }
    }, time);
  }

  function calcScroll(): number {
    const div = document.createElement('div');
    const scrollWidth = div.offsetWidth - div.clientWidth;

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    div.remove();

    return scrollWidth;
  }

  function openByScroll(): void {
    const giftSelector = '.fixed-gift';

    window.addEventListener('scroll', () => {
      const doc: HTMLElement = document.documentElement;
      const isDown: boolean =
        window.scrollY + doc.clientHeight >= doc.scrollHeight;

      if (!isBtnPressed && isDown) {
        (document.querySelector(giftSelector) as HTMLDivElement).click();
      }
    });
  }

  const popupDesignSelectors: IModalSelectors = {
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close',
    destroyTrigger: false
  };

  const popupConsultationSelectors: IModalSelectors = {
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close',
    destroyTrigger: false
  };

  const popupGiftSelectors: IModalSelectors = {
    triggerSelector: '.fixed-gift',
    modalSelector: '.popup-gift',
    closeSelector: '.popup-gift .popup-close',
    destroyTrigger: true,
    animationClass: 'jackInTheBox'
  };

  openByScroll();

  bindModal(popupDesignSelectors);
  bindModal(popupConsultationSelectors);
  bindModal(popupGiftSelectors);
};
