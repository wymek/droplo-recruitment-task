'use client';
import {ReactElement, useEffect, useState} from 'react';

import {DndContext, DragEndEvent, DragStartEvent} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext} from '@dnd-kit/sortable';

import FormAdd from './FormAdd';
import MenuItem from './MenuItem';
import {swapMenus} from '../api/MenuApi';
import FormButton from '../controls/FormButton';
import {MenusElement, MenuElement} from '../interfaces/IMenu';
import {hideElements, isInSameGroup, swapElements} from '../utils/misc';

const Menu = ({menu}: {menu: MenusElement}): ReactElement => {
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [menuElements, setMenuElements] = useState<MenuElement[]>(
    menu.elements,
  );

  useEffect(() => {
    setMenuElements(menu.elements);
  }, [menu]);

  const handleDragStart = (event: DragStartEvent) => {
    const {active} = event;

    hideElements(active, true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (
      over &&
      active.id !== over.id &&
      isInSameGroup(active.id as string, over.id as string, menuElements)
    ) {
      const newMenu = swapElements(
        menuElements,
        active.id as string,
        over.id as string,
      );
      void swapMenus({id: newMenu[0].id[0], elements: newMenu});
    }

    hideElements(active, false);
  };

  const renderMenuItems = (elements: MenuElement[]) =>
    elements.map(item => (
      <div className="rounded-t-lg" data-key={item.id} key={item.id}>
        <MenuItem name={item.name} link={item.link} id={item.id} />
        {item.elements && item.elements.length > 0 && (
          <SortableContext items={item.elements.map(i => i.id)}>
            <div className="ml-16">{renderMenuItems(item.elements)}</div>
          </SortableContext>
        )}
      </div>
    ));

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-lg mt-8 mx-6 flex flex-col">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <SortableContext items={menuElements}>
          {renderMenuItems(menuElements)}
        </SortableContext>
      </DndContext>

      {addMenu && (
        <div className="bg-bg-secondary mb-8">
          <FormAdd parentId={menu.id} closeAddMenu={() => setAddMenu(false)} />
        </div>
      )}

      <div className={'px-8 pb-6 bg-bg-tertiary rounded-b-lg'}>
        <FormButton
          onClick={() => setAddMenu(true)}
          state="outlined-primary"
          className="mt-6"
          type="button">
          {'Dodaj pozycje menu'}
        </FormButton>
      </div>
    </div>
  );
};

export default Menu;
