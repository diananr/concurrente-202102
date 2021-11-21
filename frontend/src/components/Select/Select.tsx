import * as React from 'react';
import cn from 'classnames';
import './select.css';

interface IOption {
  label: string;
  value: string;
}

interface ISelect
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  disabled?: boolean;
  error?: string | boolean;
  label?: string;
  options: IOption[];
}

const Select: React.FunctionComponent<ISelect> = ({
  disabled = false,
  error = '',
  label = '',
  ...props
}: ISelect) => {
  const { className, options, ...otherSelectProps } = props;
  const isErrorString = typeof error === 'string';
  return (
    <div
      className={cn('select', className && className, error && 'select__error')}
    >
      {label && <label className="select_label">{label}</label>}
      <select
        {...otherSelectProps}
        className="select_field"
        disabled={disabled}
      >
        <option value="">Selecciona...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && isErrorString && <p className="select_message">{error}</p>}
    </div>
  );
};

export default Select;
