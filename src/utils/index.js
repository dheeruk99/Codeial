export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store in Local Storage');
  }

  const valuetoStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valuetoStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can get the value from LS');
  }

  return localStorage.getItem(key);
};
export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can get the value from Local Storage');
  }
  return localStorage.removeItem(key);
};

export const getfromBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodeKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodeValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodeKey + '=' + encodeValue);
  }
  return formBody.join('&'); // 'username=aakash&password=123213'
};
