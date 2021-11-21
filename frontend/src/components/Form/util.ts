export const irisTypes = [
  {
    label: 'Setosa',
    value: 'Iris-setosa',
  },
  {
    label: 'Versicolor',
    value: 'Iris-versicolor',
  },
  {
    label: 'Virginica',
    value: 'Iris-virginica',
  },
];

export const isValid = (formData: any, errorData: any) => {
  let errorMessages = { ...errorData };
  let thereAreErrors = false;
  if (formData.sepal_length.length === 0) {
    errorMessages.sepal_length = 'Ingrese un valor en el campo';
    thereAreErrors = true;
  }
  if (formData.petal_length.length === 0) {
    errorMessages.petal_length = 'Ingrese un valor en el campo';
    thereAreErrors = true;
  }
  if (formData.sepal_width.length === 0) {
    errorMessages.sepal_width = 'Ingrese un valor en el campo';
    thereAreErrors = true;
  }
  if (formData.petal_width.length === 0) {
    errorMessages.petal_width = 'Ingrese un valor en el campo';
    thereAreErrors = true;
  }

  return {
    isFormValid: !thereAreErrors,
    errorMessages: errorMessages,
  };
};

export const postRequest = async (url: string, payload: any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      //mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    });
    console.log('response', response);
    const data = response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('error');
    return error;
  }
};
