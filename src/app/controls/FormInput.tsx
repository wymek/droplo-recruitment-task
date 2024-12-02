'use client';
import {ReactElement, useId} from 'react';

import {FieldValues, useController, UseControllerProps} from 'react-hook-form';

export type InputProps = {
  isIcon?: boolean;
  label: string;
} & React.HTMLProps<HTMLInputElement>;

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps;

const FormInput = <T extends FieldValues>({
  label,
  isIcon = false,

  ...props
}: FormInputProps<T>): ReactElement => {
  const {
    field: {onChange, onBlur, value},
    fieldState: {error},
  } = useController(props);

  const id = useId();

  return (
    <div className="flex flex-col gap-y-1.5 mb-1.5 w-11/12">
      <span className="font-normal text-text-secondary text-sm">{label}</span>
      <input
        autoComplete="off"
        className={`${
          isIcon &&
          'bg-search-icon bg-left-16 bg-no-repeat autofill:!bg-white autofill:!bg-search-icon autofill:!bg-left-16 autofill:!bg-no-repeat  pl-12'
        } px-3 py-2 border border-border-primary rounded-lg`}
        id={id}
        onChange={value => {
          onChange(value);
        }}
        onBlur={onBlur}
        value={value ?? ''}
        {...props}
      />
      {error && (
        <span className="font-normal text-red-600 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormInput;
