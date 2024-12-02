'use server';

import {revalidatePath} from 'next/cache';

import {FormMenuElement, MenusElement} from '../interfaces/IMenu';

const CONTENT_TYPE = 'application/json';
const URL_MENUS = 'http://localhost:3000/menus';

export const addNewMenu = async (data: FormMenuElement) => {
  const {name, link} = data;
  const newMenu = {name, link, elements: []};

  await fetch(URL_MENUS, {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(newMenu),
  });

  revalidatePath('/');
};

export const addNewNestedMenu = async (
  data: FormMenuElement,
  parentId: string,
) => {
  const {name, link} = data;
  const newNestedMenu = [{name, link, elements: []}, parentId];

  await fetch(URL_MENUS, {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(newNestedMenu),
  });

  revalidatePath('/');
};

export const editMenuElement = async (
  data: FormMenuElement,
  parentId: string,
) => {
  const {name, link} = data;
  const toEdit = [{name, link}, parentId];

  await fetch(URL_MENUS, {
    method: 'PATCH',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(toEdit),
  });

  revalidatePath('/');
};

export const swapMenus = async (menus: MenusElement) => {
  await fetch(URL_MENUS, {
    method: 'PATCH',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(menus),
  });
  revalidatePath('/');
};

export const deleteElement = async (parentId: string) => {
  await fetch(URL_MENUS, {
    method: 'DELETE',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(parentId),
  });

  revalidatePath('/');
};
