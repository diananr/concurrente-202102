import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Select from '../Select/Select';
import './form.css';

const urlBase = 'http://localhost:9000';
const irisTypes = [
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

const Form: React.FC<any> = () => {
  const [formData, setFormData] = useState({
    sepal_length: '',
    petal_length: '',
    sepal_width: '',
    petal_width: '',
    iris_type: '',
  });
  const [errorData, setErrorData] = useState({
    sepal_length: '',
    petal_length: '',
    sepal_width: '',
    petal_width: '',
  });
  const [loadingTraining, setLoadingTraining] = useState<boolean>(false);
  const [loadingSending, setLoadingSending] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);

  const isValid = () => {
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
    setErrorData(errorMessages);
    return !thereAreErrors;
  };

  const sendData = async () => {
    try {
      if (isValid()) {
        setLoadingSending(true);
        const url = `${urlBase}/agregarpredict`;
        const { iris_type, ...otherFormData } = formData;
        const payload = { ...otherFormData, typeRequest: 'predict' };
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log('response', response);
        setLoadingSending(false);
        const data = response.json();
        console.log('data', data);
      }
    } catch (error) {
      setLoadingSending(false);
      console.log('error', error);
    }
  };

  const toTrainData = async () => {
    try {
      if (isValid()) {
        setLoadingTraining(true);
        const url = `${urlBase}/agregartrain`;
        const { iris_type, ...otherFormData } = formData;
        const payload = {
          ...otherFormData,
          class: iris_type,
          typeRequest: 'train',
        };
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log('response', response);
        setLoadingTraining(false);
        const data = response.json();
        console.log('data', data);
      }
    } catch (error) {
      setLoadingTraining(false);
      console.log('error', error);
    }
  };

  const closeModal = () => {
    setShowMessage(false);
  };

  return (
    <>
      {showMessage && (
        <Modal active={showMessage} onClose={closeModal}>
          <p>Message!</p>
        </Modal>
      )}
      <section className="formA">
        <div className="formA_detail">
          <h2 className="subtitle">Súbtitulo</h2>
          <p className="message">Descripción...</p>
        </div>
        <form className="formA_form">
          <Input
            className="formInput"
            label="Alto del pétalo"
            value={formData.petal_length}
            error={errorData.petal_length}
            onChange={(e) => {
              const newValue = e.target.value;
              const { petal_length, ...otherValues } = formData;
              setFormData({ petal_length: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del pétalo"
            value={formData.petal_width}
            error={errorData.petal_width}
            onChange={(e) => {
              const newValue = e.target.value;
              const { petal_width, ...otherValues } = formData;
              setFormData({ petal_width: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Alto del cépalo"
            value={formData.sepal_length}
            error={errorData.sepal_length}
            onChange={(e) => {
              const newValue = e.target.value;
              const { sepal_length, ...otherValues } = formData;
              setFormData({ sepal_length: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del cépalo"
            value={formData.sepal_width}
            error={errorData.sepal_width}
            onChange={(e) => {
              const newValue = e.target.value;
              const { sepal_width, ...otherValues } = formData;
              setFormData({ sepal_width: newValue, ...otherValues });
            }}
          />
          <Select
            className="formInput"
            label="Tipo de iris"
            options={irisTypes}
            value={formData.iris_type}
            onChange={(e) => {
              const newValue = e.target.value;
              const { iris_type, ...otherValues } = formData;
              setFormData({ iris_type: newValue, ...otherValues });
            }}
          />
          <div className="formButtons">
            <Button
              className="formButtons_item"
              onClick={sendData}
              state="primary"
            >
              {loadingSending ? 'Consultando...' : 'Consultar'}
            </Button>
            <Button
              className="formButtons_item"
              onClick={toTrainData}
              state="primaryOutline"
            >
              {loadingTraining ? 'Entrenando...' : 'Entrenar'}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
