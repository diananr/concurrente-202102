import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import './formA.css';

const FormA: React.FC<any> = () => {
  const [formData, setFormData] = useState({
    altoCepalo: '',
    altoPetalo: '',
    anchoCepalo: '',
    anchoPetalo: '',
    tipoIris: '',
  });
  const [errorData, setErrorData] = useState({
    altoCepalo: '',
    altoPetalo: '',
    anchoCepalo: '',
    anchoPetalo: '',
  });
  const [loadingTraining, setLoadingTraining] = useState<boolean>(false);
  const [loadingSending, setLoadingSending] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);

  const isValid = () => {
    let errorMessages = { ...errorData };
    let thereAreErrors = false;
    if (formData.altoCepalo.length === 0) {
      errorMessages.altoCepalo = 'Ingrese un valor en el campo';
      thereAreErrors = true;
    }
    if (formData.altoPetalo.length === 0) {
      errorMessages.altoPetalo = 'Ingrese un valor en el campo';
      thereAreErrors = true;
    }
    if (formData.anchoCepalo.length === 0) {
      errorMessages.anchoCepalo = 'Ingrese un valor en el campo';
      thereAreErrors = true;
    }
    if (formData.anchoPetalo.length === 0) {
      errorMessages.anchoPetalo = 'Ingrese un valor en el campo';
      thereAreErrors = true;
    }
    setErrorData(errorMessages);
    return !thereAreErrors;
  };

  const sendData = async () => {
    try {
      if (isValid()) {
        setLoadingSending(true);
        const url = 'https://rickandmortyapi.com/api/character/2';
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
        const url = 'https://rickandmortyapi.com/api/character/2';
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
            value={formData.altoPetalo}
            error={errorData.altoPetalo}
            onChange={(e) => {
              const newValue = e.target.value;
              const { altoPetalo, ...otherValues } = formData;
              setFormData({ altoPetalo: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del pétalo"
            value={formData.anchoPetalo}
            error={errorData.anchoPetalo}
            onChange={(e) => {
              const newValue = e.target.value;
              const { anchoPetalo, ...otherValues } = formData;
              setFormData({ anchoPetalo: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Alto del cépalo"
            value={formData.altoCepalo}
            error={errorData.altoCepalo}
            onChange={(e) => {
              const newValue = e.target.value;
              const { altoCepalo, ...otherValues } = formData;
              setFormData({ altoCepalo: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Ancho del cépalo"
            value={formData.anchoCepalo}
            error={errorData.anchoCepalo}
            onChange={(e) => {
              const newValue = e.target.value;
              const { anchoCepalo, ...otherValues } = formData;
              setFormData({ anchoCepalo: newValue, ...otherValues });
            }}
          />
          <Input
            className="formInput"
            label="Tipo de iris"
            value={formData.tipoIris}
            onChange={(e) => {
              const newValue = e.target.value;
              const { tipoIris, ...otherValues } = formData;
              setFormData({ tipoIris: newValue, ...otherValues });
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

export default FormA;
