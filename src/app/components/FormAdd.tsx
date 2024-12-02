'use client';
import {ReactElement} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';

import {addNewMenu, addNewNestedMenu, editMenuElement} from '../api/MenuApi';
import FormButton from '../controls/FormButton';
import FormInput from '../controls/FormInput';
import TrashIcon from '../icons/TrashIcon';
import {FormMenuElement} from '../interfaces/IMenu';
import {AddSchema} from '../Schemas';

const FormAdd = ({
  closeAddMenu,
  isNewMenu = false,
  parentId,
  name = '',
  link = '',
  edit = false,
}: {
  closeAddMenu: () => void;
  isNewMenu?: boolean;
  parentId?: string;
  name?: string;
  link?: string;
  edit?: boolean;
}): ReactElement => {
  const {handleSubmit, control} = useForm<FormMenuElement>({
    defaultValues: {
      name,
      link,
    },
    mode: 'onChange',
    resolver: yupResolver(AddSchema),
  });

  const sumbitForm: SubmitHandler<FormMenuElement> = data => {
    if (isNewMenu) {
      void addNewMenu(data);
    }
    if (parentId && !edit) {
      void addNewNestedMenu(data, parentId);
    }
    if (edit && parentId) {
      void editMenuElement(data, parentId);
    }
    closeAddMenu();
  };

  return (
    <form
      action={() => {
        void handleSubmit(sumbitForm)();
      }}
      className="bg-bg-primary border border-border-primary rounded-lg px-8 py-6 mt-8 mx-6 flex flex-col">
      <TrashIcon />
      <FormInput
        placeholder="np. Promocje"
        name="name"
        control={control}
        label={'Nazwa'}
      />
      <FormInput
        isIcon
        placeholder="Wklej lub wyszukaj"
        name="link"
        control={control}
        label={'Link'}
      />
      <div className="flex gap-x-2">
        <FormButton
          onClick={() => closeAddMenu()}
          state="outlined-primary"
          className="mt-6"
          type="button">
          {'Anuluj'}
        </FormButton>
        <FormButton state="outlined-secondary" className="mt-6" type="submit">
          {edit ? 'Edytuj' : 'Dodaj'}
        </FormButton>
      </div>
    </form>
  );
};

export default FormAdd;
