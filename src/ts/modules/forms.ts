import {postData} from '../services';

export const forms = (): void => {
  const forms = document.querySelectorAll(
    'form'
  ) as NodeListOf<HTMLFormElement>;
  const inputs = document.querySelectorAll(
    'input'
  ) as NodeListOf<HTMLInputElement>;
  const uploads = document.querySelectorAll(
    '[name="upload"]'
  ) as NodeListOf<HTMLInputElement>;

  interface IMessage {
    loading: string;
    success: string;
    failure: string;
    spinner: string;
    ok: string;
    fail: string;
  }

  interface IPaths {
    designer: string;
    question: string;
  }

  const message: IMessage = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const paths: IPaths = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const clearInputs = (): void => {
    inputs.forEach(input => (input.value = ''));
    uploads.forEach(
      upload => (upload.previousElementSibling.textContent = 'Файл не выбран')
    );
  };

  uploads.forEach(upload => {
    upload.addEventListener('input', () => {
      const splitFileName: string[] = upload.files[0].name.split('.');
      const fileName: string = splitFileName[0];
      const fileType: string = splitFileName[1];
      const dots: string = fileName.length > 5 ? '...' : '.';
      const visibleFileName = fileName.slice(0, 5) + dots + fileType;

      upload.previousElementSibling.textContent = visibleFileName;
    });
  });

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.parentNode.appendChild(statusMessage);

      form.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        form.classList.add('hide');
        form.classList.remove('show');
      }, 400);

      const statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.setAttribute('alt', 'spinner');
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(form);
      const isFormWithImg =
        Boolean(form.closest('.popup-design')) ||
        form.classList.contains('calc_form');
      const api: string = isFormWithImg ? paths.designer : paths.question;

      postData(api, formData)
        .then(postDataResult => {
          console.log({postDataResult});
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp', 'hide');
            form.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};
