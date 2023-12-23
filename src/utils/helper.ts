export async function setItemToLocalStorage<T>(key: string, initialValue: T) {
  try {
    if (localStorage.getItem(key) !== null) return false;
    //
    localStorage.setItem(key, JSON.stringify(initialValue));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteItemToLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return false;
  }
}

export async function updateToLocalStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}
export async function getItemInLocalStorage(key: string) {
  try {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : result;
  } catch (error) {
    console.log(error);
  }
}

export async function addItemLocalStorage<T>(key: string, value: T) {
  try {
    const item = await getItemInLocalStorage(key);
    console.log(item);
    if (item === null) {
      const initialValue = [];
      initialValue.push(value);
      return setItemToLocalStorage(key, initialValue);
    }

    if (Array.isArray(item)) {
      item.push(value);
      return updateToLocalStorage(key, item);
    }
  } catch (error) {
    return error;
  }
}
