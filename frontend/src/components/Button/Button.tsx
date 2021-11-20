import * as React from 'react';
import cn from 'classnames';
import './button.css';

export interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: React.ReactNode | string;
  disabled?: boolean;
}

const Button: React.FunctionComponent<IButton> = ({
  children = '',
  disabled = false,
  ...props
}: IButton): React.ReactElement<IButton> => {
  const { className, ...otherButtonProps } = props;
  return (
    <button
      {...otherButtonProps}
      type="button"
      className={cn('button', className && className)}
      disabled={disabled}
    >
      {children ?? children}
    </button>
  );
};

export default Button;
