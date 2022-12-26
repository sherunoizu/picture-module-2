export const pictureSize = (pictureSelector: string): void => {
  const pictureBlocks = document.querySelectorAll(
    pictureSelector
  ) as NodeListOf<HTMLDivElement>;

  const showImg = (block: HTMLDivElement): void => {
    const image = block.querySelector('img') as HTMLImageElement;
    const [name, ext]: string[] = image.getAttribute('src').split('.');
    const pContent = block.querySelectorAll(
      'p:not(.sizes-hit'
    ) as NodeListOf<HTMLParagraphElement>;

    block.addEventListener('mouseover', () => {
      image.setAttribute('src', `${name}-1.${ext}`);
      pContent.forEach(p => (p.style.display = 'none'));
    });
  };

  const hideImg = (block: HTMLDivElement): void => {
    const image = block.querySelector('img') as HTMLImageElement;
    const src: string = image.getAttribute('src');
    const pContent = block.querySelectorAll(
      'p:not(.sizes-hit'
    ) as NodeListOf<HTMLParagraphElement>;

    block.addEventListener('mouseout', () => {
      image.setAttribute('src', src);
      pContent.forEach(p => (p.style.display = 'block'));
    });
  };

  pictureBlocks.forEach(block => {
    showImg(block);
    hideImg(block);
  });
};
