import {setCalculatorValuesInHTML} from './setCalculatorValuesInHTML';

interface ICalculator {
  sizeSelector: string;
  materialSelector: string;
  optionsSelector: string;
  promocodeSelector: string;
  resultSelector: string;
}

export {ICalculator};

export const calculator = ({
  sizeSelector,
  materialSelector,
  optionsSelector,
  promocodeSelector,
  resultSelector
}: ICalculator) => {
  const sizeBlock = document.querySelector(sizeSelector) as HTMLInputElement;
  const materialBlock = document.querySelector(
    materialSelector
  ) as HTMLInputElement;
  const optionsBlock = document.querySelector(
    optionsSelector
  ) as HTMLInputElement;
  const promocodeBlock = document.querySelector(
    promocodeSelector
  ) as HTMLInputElement;
  const resultBlock = document.querySelector(resultSelector) as HTMLDivElement;

  setCalculatorValuesInHTML(sizeBlock, materialBlock, optionsBlock);

  const calculatorFunction = (): void => {
    const sum: number = Math.round(
      +sizeBlock.value * +materialBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == '0' || materialBlock.value == '0') {
      resultBlock.textContent = `Пожалуйста, выберите размер и материал картины`;
    } else if (promocodeBlock.value === 'IWANTPOPART') {
      const sumWithPromocode = Math.round(sum * 0.7);
      resultBlock.setAttribute('summ', `${sumWithPromocode}`);
      resultBlock.textContent = `Итоговая сумма: ${sumWithPromocode} RUB \n Промокод успешно применен! Скидка 30%!`;
    } else {
      resultBlock.setAttribute('summ', `${sum}`);
      resultBlock.textContent = `Итоговая сумма: ${sum} RUB`;
    }
  };

  sizeBlock.addEventListener('change', calculatorFunction);
  materialBlock.addEventListener('change', calculatorFunction);
  optionsBlock.addEventListener('change', calculatorFunction);
  promocodeBlock.addEventListener('input', calculatorFunction);
};
