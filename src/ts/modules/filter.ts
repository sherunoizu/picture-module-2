export const filter = () => {
  const selectors: string[] = [
    '.all',
    '.lovers',
    '.chef',
    '.girl',
    '.guy',
    '.grandmother',
    '.granddad'
  ];

  const menu = document.querySelector('.portfolio-menu') as HTMLUListElement;
  const items = menu.querySelectorAll('li') as NodeListOf<HTMLLIElement>;
  const wrapper = document.querySelector(
    '.portfolio-wrapper'
  ) as HTMLDivElement;
  const markAll = wrapper.querySelectorAll(
    '.all'
  ) as NodeListOf<HTMLDivElement>;
  const no = document.querySelector('.portfolio-no') as HTMLParagraphElement;

  const filterByType = (markType: NodeListOf<HTMLDivElement> | null): void => {
    markAll.forEach(mark => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');

      no.style.display = 'none';
      no.classList.remove('animated', 'fadeIn');

      if (markType.length > 1) {
        markType.forEach(mark => {
          mark.style.display = 'block';
          mark.classList.add('animated', 'fadeIn');
        });
      } else {
        no.style.display = 'block';
        no.classList.add('animated', 'fadeIn');
      }
    });
  };

  const bindButtonBySelector = (selectors: string[]): void => {
    selectors.forEach(selector => {
      const button = document.querySelector(selector) as HTMLButtonElement;
      const mark = document.querySelectorAll(
        selector
      ) as NodeListOf<HTMLDivElement> | null;

      button.addEventListener('click', () => {
        items.forEach(item => {
          item.classList.remove('active');
        });
        filterByType(mark);
        button.classList.add('active');
      });
    });
  };

  bindButtonBySelector(selectors);
};
