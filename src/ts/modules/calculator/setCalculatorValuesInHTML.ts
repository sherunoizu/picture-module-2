import {getData, ICalculatorValues} from '../../services';

export const setCalculatorValuesInHTML = (
  sizeBlock: HTMLInputElement,
  materialBlock: HTMLInputElement,
  optionsBlock: HTMLInputElement
): void => {
  const sizeBlockOptions = sizeBlock.querySelectorAll(
    'option'
  ) as NodeListOf<HTMLOptionElement>;
  const materialBlockOptions = materialBlock.querySelectorAll(
    'option'
  ) as NodeListOf<HTMLOptionElement>;
  const optionsBlockOptions = optionsBlock.querySelectorAll(
    'option'
  ) as NodeListOf<HTMLOptionElement>;

  getData('http://localhost:3000/values')
    .then(result => setValues(result as ICalculatorValues))
    .catch(error => {
      errorMessage(error);
    });

  const setValues = (response: ICalculatorValues): void => {
    sizeBlockOptions.forEach((option, i) => {
      option.setAttribute('value', `${response.size[i]}`);
    });
    materialBlockOptions.forEach((option, i) => {
      option.setAttribute('value', `${response.material[i]}`);
    });
    optionsBlockOptions.forEach((option, i) => {
      option.setAttribute('value', `${response.options[i]}`);
    });
  };

  const errorMessage = (error: string): void => {
    const message: string = `К сожалению, данная функция недоступна`;

    sizeBlockOptions[0].textContent = message;
    materialBlockOptions[0].textContent = message;
    optionsBlockOptions[0].textContent = message;

    console.error(error);
  };
};
