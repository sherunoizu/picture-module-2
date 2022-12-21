export const checkTextInputs = (selector: string): void => {
  const textInputs = document.querySelectorAll(
    selector
  ) as NodeListOf<HTMLInputElement>;

  textInputs.forEach(input => {
    input.addEventListener('keypress', e => {
      if (e.key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });
  });
};
