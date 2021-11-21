import React from 'react';
import cn from 'classnames';
import './modal.css';

interface IModalProps {
  active: boolean;
  children?: React.ReactNode;
  onClose: any;
}

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const { active, children, onClose } = props;

  const handlerModal = (event: any) => {
    const elementModal = event.target.closest('.modal');
    const elementContent = event.target.closest('.modal_content');
    if (elementModal && !elementContent && active) onClose();
  };

  if (!active) {
    window.removeEventListener('click', handlerModal);
    return null;
  }

  return (
    <article className={cn('modal', active && 'modal__show')}>
      <section className="modalContent">
        <header className="modalContent_header">
          <button className="close" onClick={onClose}>
            Cerrar
          </button>
        </header>
        <div className="modalContent_body">{children}</div>
      </section>
    </article>
  );
};

export default Modal;
