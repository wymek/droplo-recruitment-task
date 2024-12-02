import {ReactElement} from 'react';

import {twMerge} from 'tailwind-merge';

export type FormButtonProps = {
  labels: string[];
  actions: (() => void)[];
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>;

const FormButtonsCombo = ({
  children,
  className,
  labels,
  actions,
  ...props
}: FormButtonProps): ReactElement => (
  <div className={twMerge('flex', className)}>
    {labels.map((item, index) => (
      <button
        onClick={() => actions[index]()}
        className={twMerge(
          `px-3 py-2.5 relative cursor-pointer flex items-center justify-center gap-x-1 ${
            index === 0 ? 'border rounded-tl-lg rounded-bl-lg' : ''
          } ${
            index === labels.length - 1
              ? 'border-r border-t border-b rounded-tr-lg rounded-br-lg'
              : ''
          }
        ${
          index !== 0 && index !== labels.length - 1
            ? 'border-t border-b border-r'
            : ''
        } text-sm font-semibold text-text-secondary border-border-primary`,
        )}
        key={item}
        type="button"
        {...props}>
        {item}
      </button>
    ))}
  </div>
);

export default FormButtonsCombo;
