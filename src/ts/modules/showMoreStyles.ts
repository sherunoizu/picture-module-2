import {getData, IGetData} from '../services';

interface IShowMoreStyles {
  trigger: string;
  wrapper: string;
}

export {IShowMoreStyles};

export const showMoreStyles = ({trigger, wrapper}: IShowMoreStyles): void => {
  const button = document.querySelector(trigger);

  button.addEventListener('click', () => {
    getData('http://localhost:3000/styles')
      .then(result => createCards(result))
      .catch(error => {
        addErrorMessage(error);
      });

    setTimeout(() => {
      button.remove();
    }, 400);
  });

  function createCards(response: [IGetData]): void {
    response.forEach(element => {
      const card = document.createElement('div') as HTMLDivElement;
      const {src, title, link} = element;

      card.classList.add(
        'animated',
        'fadeInUp',
        'col-sm-3',
        'col-sm-offset-0',
        'col-xs-10',
        'col-xs-offset-1'
      );

      card.innerHTML = `
        <div class="styles-block">
          <img src=${src} alt=${title}>
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
        </div>
      `;

      document.querySelector(wrapper).appendChild(card);
    });
  }

  function addErrorMessage(error: string): void {
    const errorMessage = document.createElement('p2') as HTMLDivElement;
    errorMessage.classList.add(
      'error',
      'col-sm-12',
      'col-sm-offset-0',
      'col-xs-12',
      'col-xs-offset-1'
    );
    errorMessage.textContent = `
          Что-то пошло не так. В данный момент дополнительные стили недоступны...
        `;
    document.querySelector(wrapper).appendChild(errorMessage);

    console.error(error);
  }
};
