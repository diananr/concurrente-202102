import React from 'react';
import Form from '../components/Form/Form';
import './App.css';

const App: React.FC<any> = () => {
  return (
    <main className="appView">
      <section className="appView_content">
        <h1 className="title">PlantDex</h1>
        <Form />
      </section>
      <figure className="appView_figure"></figure>
    </main>
  );
};

export default App;
