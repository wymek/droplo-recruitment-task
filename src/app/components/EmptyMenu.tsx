'use client';
import {ReactElement, useState} from 'react';

import FormAdd from './FormAdd';
import FormButton from '../controls/FormButton';

const EmptyMenu = (): ReactElement => {
  const [addMenu, setAddMenu] = useState<boolean>(false);

  return (
    <>
      <div className="bg-bg-secondary border border-border-secondary rounded-lg  mx-6 flex flex-col items-center py-6 ">
        <h1 className="font-semibold text-text-primary text-base mb-1">
          {'Menu jest puste'}
        </h1>
        <span className="text-text-tertiary text-sm font-normal">
          {'W tym menu nie ma jeszcze żadnych linków.'}
        </span>
        <FormButton
          onClick={() => setAddMenu(true)}
          className="mt-6"
          type="button">
          {'Dodaj pozycje menu'}
        </FormButton>
      </div>
      {addMenu && <FormAdd isNewMenu closeAddMenu={() => setAddMenu(false)} />}
    </>
  );
};

export default EmptyMenu;
