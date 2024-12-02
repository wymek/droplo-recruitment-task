import {ReactElement} from 'react';

import {IoMdAddCircleOutline} from 'react-icons/io';
import {twMerge} from 'tailwind-merge';

export type FormButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  state?: 'contained' | 'outlined-primary' | 'outlined-secondary';
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>;

const FormButton = ({
  children,
  className,
  state = 'contained',
  ...props
}: FormButtonProps): ReactElement => (
  <button
    className={twMerge(
      `px-3 py-2.5 relative cursor-pointer flex items-center justify-center gap-x-1 ${
        state == 'contained'
          ? 'bg-button-primary-bg border-button-primary-border text-button-primary-fg'
          : ''
      } ${
        state == 'outlined-primary'
          ? 'bg-button-secondary-bg border-button-secondary-border text-button-secondary-fg'
          : ''
      }
      ${
        state == 'outlined-secondary'
          ? 'bg-button-secondary-color-bg border-button-secondary-color-border text-button-secondary-color-fg'
          : ''
      } text-sm font-semibold border rounded-lg`,
      className,
    )}
    {...props}>
    {state === 'contained' && <IoMdAddCircleOutline className="w-5 h-5" />}
    {children}
  </button>
);

export default FormButton;
