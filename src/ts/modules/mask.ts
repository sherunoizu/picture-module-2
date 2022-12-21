export const mask = (selector: string): void => {
  const setCursorPosition = (
    position: number,
    element: HTMLInputElement
  ): void => {
    element.focus();

    if (element.setSelectionRange) {
      element.setSelectionRange(position, position);
    } else if ((element as any).createTextRange) {
      const range = (element as any).createTextRange();

      range.collapse(true);
      range.moveEnd('character', position);
      range.moveStart('character', position);
      range.select();
    }
  };

  function createMask(event: Event) {
    const matrix: string = '+7 (___) ___ __ __';
    const def: string = matrix.replace(/\D/g, '');
    let i: number = 0;
    let value: string = this.value.replace(/\D/g, '');

    if (def.length >= value.length) {
      value = def;
    }

    this.value = matrix.replace(/./g, (symbol: string): string => {
      const test = /[_\d]/.test(symbol) && i < value.length;

      return test ? value.charAt(i++) : i >= value.length ? '' : symbol;
    });

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = ``;
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  const inputs = document.querySelectorAll(
    selector
  ) as NodeListOf<HTMLInputElement>;

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};
