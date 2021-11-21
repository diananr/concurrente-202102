import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Select from '../Select/Select';
import { irisTypes, isValid, postRequest } from './util';
import './form.css';

const urlBase = 'http://localhost:9000';

const Form: React.FC<any> = () => {
  const [formData, setFormData] = useState({
    iris_type: '',
    petal_length: 0,
    petal_width: 0,
    sepal_length: 0,
    sepal_width: 0,
  });
  const [errorData, setErrorData] = useState({
    petal_length: '',
    petal_width: '',
    sepal_length: '',
    sepal_width: '',
  });
  const [loadingTraining, setLoadingTraining] = useState<boolean>(false);
  const [loadingSending, setLoadingSending] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const closeModal = () => {
    setShowMessage(false);
  };

  const sendData = async () => {
    try {
      const { isFormValid, errorMessages } = isValid(formData, errorData);
      if (isFormValid) {
        setLoadingSending(true);
        const url = `${urlBase}/agregarpredict`;
        const { iris_type, ...otherFormData } = formData;
        const payload = { ...otherFormData, typeRequest: 'predict' };
        const response = postRequest(url, payload);
        setLoadingSending(false);
      } else {
        setErrorData(errorMessages);
      }
    } catch (error) {
      setLoadingSending(false);
    }
  };

  const toTrainData = async () => {
    try {
      const { isFormValid, errorMessages } = isValid(formData, errorData);
      if (isFormValid) {
        setLoadingTraining(true);
        const url = `${urlBase}/agregartrain`;
        const { iris_type, ...otherFormData } = formData;
        const payload = {
          ...otherFormData,
          class: iris_type,
          typeRequest: 'train',
        };
        const response = postRequest(url, payload);
        setLoadingTraining(false);
      } else {
        setErrorData(errorMessages);
      }
    } catch (error) {
      setLoadingTraining(false);
    }
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
            type="number"
            onChange={(e) => {
              const newValue = Number(e.target.value);
              const { petal_length, ...otherValues } = formData;
              setFormData({ petal_length: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del pétalo"
            value={formData.petal_width}
            error={errorData.petal_width}
            type="number"
            onChange={(e) => {
              const newValue = Number(e.target.value);
              const { petal_width, ...otherValues } = formData;
              setFormData({ petal_width: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Alto del cépalo"
            value={formData.sepal_length}
            error={errorData.sepal_length}
            type="number"
            onChange={(e) => {
              const newValue = Number(e.target.value);
              const { sepal_length, ...otherValues } = formData;
              setFormData({ sepal_length: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del cépalo"
            value={formData.sepal_width}
            error={errorData.sepal_width}
            type="number"
            onChange={(e) => {
              const newValue = Number(e.target.value);
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
