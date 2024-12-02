'use client';
import {ReactElement, useState} from 'react';

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import FormAdd from './FormAdd';
import {deleteElement} from '../api/MenuApi';
import FormButtonsCombo from '../controls/FormButtonsCombo';
import ArrowsOutIcon from '../icons/ArrowsOutIcon';

const MenuItem = ({
  name,
  link,
  id,
}: {
  name: string;
  link: string;
  id: string;
}): ReactElement => {
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [startEdit, setStartEdit] = useState<boolean>(false);

  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {startEdit ? (
        <div className="bg-bg-secondary mb-8">
          <FormAdd
            edit
            name={name}
            link={link}
            parentId={id}
            closeAddMenu={() => setStartEdit(false)}
          />
        </div>
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          className={` border bg-bg-primary rounded-md border-border-primary px-8 py-6 flex items-center`}>
          <div {...attributes} {...listeners}>
            <ArrowsOutIcon />
          </div>

          <div className="flex flex-col ml-4">
            <span className="font-semibold text-text-primary text-sm">
              {name}
            </span>
            <span className="text-text-tertiary text-sm font-normal">
              {link}
            </span>
          </div>
          <FormButtonsCombo
            actions={[
              () => void deleteElement(id),
              () => setStartEdit(true),
              () => setAddMenu(true),
            ]}
            className="ml-auto"
            labels={['Usuń', 'Edytuj', 'Dodaj pozycję menu']}
          />
        </div>
      )}

      {addMenu && (
        <div className={`bg-bg-secondary mb-8 ml-16`}>
          <FormAdd parentId={id} closeAddMenu={() => setAddMenu(false)} />
        </div>
      )}
    </>
  );
};

export default MenuItem;
