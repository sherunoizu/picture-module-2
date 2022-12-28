interface IAccordion {
  triggersSelector: string;
  onlyOneVisible?: boolean;
}

export {IAccordion};

export const accordion = ({
  triggersSelector,
  onlyOneVisible
}: IAccordion): void => {
  const buttons = document.querySelectorAll(
    triggersSelector
  ) as NodeListOf<HTMLButtonElement>;

  const showOnlyActive = (): void => {
    buttons.forEach(button => {
      const thisContent = button.nextElementSibling as HTMLDivElement;

      button.classList.remove('active-style');
      thisContent.classList.remove('active-content');
      thisContent.style.maxHeight = `0`;
    });
  };

  buttons.forEach(button => {
    button.addEventListener('click', function (event) {
      const thisContent = this.nextElementSibling as HTMLDivElement;
      const contentPadding = 80;
      const target = event.target as HTMLButtonElement;
      const targetParent = target.parentNode as HTMLButtonElement;
      const isTargetActive: boolean =
        target.classList.contains('active-style') ||
        targetParent.classList.contains('active-style');

      if (onlyOneVisible && !isTargetActive) {
        showOnlyActive();
      }

      this.classList.toggle('active-style');
      thisContent.classList.toggle('active-content');

      if (this.classList.contains('active-style')) {
        thisContent.style.maxHeight = `${
          thisContent.scrollHeight + contentPadding
        }px`;
      } else {
        thisContent.style.maxHeight = `0`;
      }
    });
  });
};
