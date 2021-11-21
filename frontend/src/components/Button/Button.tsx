import * as React from 'react';
import cn from 'classnames';
import './button.css';

type ButtonState = 'primary' | 'primaryOutline';

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: React.ReactNode | string;
  disabled?: boolean;
  state?: ButtonState;
}

const Button: React.FunctionComponent<IButton> = ({
  children = '',
  disabled = false,
  state = 'primary',
  ...props
}: IButton): React.ReactElement<IButton> => {
  const { className, ...otherButtonProps } = props;
  return (
    <button
      {...otherButtonProps}
      type="button"
      className={cn(
        'button',
        state && `button__${state}`,
        className && className
      )}
      disabled={disabled}
    >
      {children ?? children}
    </button>
  );
};

export default Button;
