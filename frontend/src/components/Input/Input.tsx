import * as React from 'react';
import cn from 'classnames';
import './input.css';

export interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  disabled?: boolean;
  error?: string | boolean;
  label?: string;
}

const Input: React.FunctionComponent<IInput> = ({
  disabled = false,
  error = '',
  label = '',
  ...props
}: IInput) => {
  const { className, ...otherInputProps } = props;
  const isErrorString = typeof error === 'string';
  return (
    <div
      className={cn('input', className && className, error && 'input__error')}
    >
      {label && <label className="input_label">{label}</label>}
      <input {...otherInputProps} className="input_field" disabled={disabled} />
      {error && isErrorString && <p className="input_message">{error}</p>}
    </div>
  );
};

export default Input;
