interface IGetData {
  src: string;
  title: string;
  link: string;
}

export {IGetData};

export const postData = async (
  url: string,
  data: FormData
): Promise<string> => {
  const result = await fetch(url, {
    method: 'POST',
    body: data
  });

  return await result.text();
};

export const getData = async (url: string): Promise<[IGetData]> => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};
