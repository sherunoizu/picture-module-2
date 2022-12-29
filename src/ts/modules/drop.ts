export const drop = (): void => {
  const fileInputs = document.querySelectorAll(
    '[name="upload"]'
  ) as NodeListOf<HTMLInputElement>;
  const dragEvents: string[] = ['dragenter', 'dragleave', 'dragover', 'drop'];
  const dragHighlightEvents: string[] = ['dragenter', 'dragover'];
  const dragHideHighlightEvents: string[] = ['drop', 'dragleave'];

  dragEvents.forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  dragHighlightEvents.forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highlightItem(input), false);
    });
  });

  dragHideHighlightEvents.forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => hideHighlightItem(input), false);
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener('drop', event => fileDrop(event, input), false);
  });

  function preventDefaults(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  function fileDrop(event: DragEvent, input: HTMLInputElement): void {
    input.files = event.dataTransfer.files;

    const [fileName, fileType]: string[] = input.files[0].name.split('.');

    const dots: string = fileName.length > 5 ? '...' : '.';
    const visibleFileName = fileName.slice(0, 5) + dots + fileType;

    input.previousElementSibling.textContent = visibleFileName;
  }

  function highlightItem(item: HTMLElement): void {
    const closestUploadItem = item.closest('.file_upload') as HTMLElement;

    closestUploadItem.style.outline = '2px solid #00FF7F';
    closestUploadItem.style.backgroundColor = 'rgba(0,0,0, .3)';
  }

  function hideHighlightItem(item: HTMLElement): void {
    const closestUploadItem = item.closest('.file_upload') as HTMLElement;

    closestUploadItem.style.outline = 'none';

    if (item.closest('.calc_form')) {
      closestUploadItem.style.backgroundColor = '#fff';
    } else {
      closestUploadItem.style.backgroundColor = '#ededed';
    }
  }
};
