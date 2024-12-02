import {MenuElement, MenusElement} from '../interfaces/IMenu';

const CONTENT_TYPE = 'application/json';

const menus: MenusElement[] = [];

export const GET = () => Response.json(menus);

export const POST = async (request: Request) => {
  const menu = (await request.json()) as
    | Omit<MenuElement, 'id'>
    | [Omit<MenuElement, 'id'>, string];
  if (!Array.isArray(menu)) {
    const newMenu = {
      id: (menus.length + 1).toString(),
      elements: [
        {
          id: `${(menus.length + 1).toString()}-1`,
          ...menu,
        },
      ],
    };
    menus.push(newMenu);
  } else {
    addNewElement(menu[0], menu[1]);
  }
  return new Response(JSON.stringify(menus), {
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    status: 201,
  });
};

export const PATCH = async (request: Request) => {
  const menu = (await request.json()) as
    | [Omit<MenuElement, 'id' | 'elements'>, string]
    | MenusElement;
  if (Array.isArray(menu)) {
    updateMenu(menu[0], menu[1]);
  } else {
    const newMenus = updateMenuById(menu.id, menu);
    menus.length = 0;
    menus.push(...newMenus);
  }
  return new Response(JSON.stringify(menus), {
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    status: 201,
  });
};

export const DELETE = async (request: Request) => {
  const id = (await request.json()) as string;

  removeMenuAndFixIds(id);
  higherLevelIdFix();

  return new Response(JSON.stringify(menus), {
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    status: 201,
  });
};

const addNewElement = (
  newElement: Omit<MenuElement, 'id'>,
  parentId: string,
): MenusElement[] | undefined => {
  let mainMenuId;
  if (parentId.length === 1) {
    mainMenuId = Number(parentId);
    menus[mainMenuId - 1].elements.push({
      id: `${parentId}-${menus[mainMenuId - 1].elements.length + 1}`,
      name: newElement.name,
      link: newElement.link,
      elements: [],
    });
    return menus;
  } else {
    mainMenuId = Number(parentId.split('-')[0]);
  }

  const mainMenu = menus[mainMenuId - 1];

  const findParentAndAdd = (
    elements: MenuElement[],
    parentId: string,
  ): boolean => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].id === parentId) {
        elements[i].elements = elements[i].elements || [];
        elements[i].elements.push({
          id: `${parentId}-${elements[i].elements.length + 1}`,
          name: newElement.name,
          link: newElement.link,
          elements: newElement.elements,
        });
        return true;
      } else if (
        elements[i].elements &&
        elements[i].elements.length > 0 &&
        findParentAndAdd(elements[i].elements, parentId)
      ) {
        return true;
      }
    }
    return false;
  };
  findParentAndAdd(mainMenu.elements, parentId);
};

const updateMenu = (
  updateData: Omit<MenuElement, 'id' | 'elements'>,
  targetId: string,
) => {
  const targetMenuId = Number(targetId.split('-')[0]);

  const menu = menus[targetMenuId - 1];

  const updateElement = (elements: MenuElement[]) => {
    elements.forEach(element => {
      if (element.id === targetId) {
        element.name = updateData.name;
        element.link = updateData.link;
      } else if (element.elements.length > 0) {
        updateElement(element.elements);
      }
    });
  };

  updateElement(menu.elements);
};

const removeMenuAndFixIds = (targetId: string) => {
  const targetMenuId = Number(targetId.split('-')[0]);

  const menu = menus[targetMenuId - 1];

  const removeElement = (elements: MenuElement[]): boolean => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].id === targetId) {
        elements.splice(i, 1);
        return true;
      }
      if (
        elements[i].elements.length > 0 &&
        removeElement(elements[i].elements)
      ) {
        return true;
      }
    }
    return false;
  };

  const fixIds = (elements: MenuElement[], prefix: string) => {
    elements.forEach((element, index) => {
      const newId = `${prefix}-${index + 1}`;
      element.id = newId;

      if (element.elements.length > 0) {
        fixIds(element.elements, newId);
      }
    });
  };

  removeElement(menu.elements);

  fixIds(menu.elements, targetMenuId.toString());
};

const higherLevelIdFix = () => {
  for (let i = 0; i < menus.length; i++) {
    if (!menus[i].elements.length) {
      menus.splice(i, 1);
    }
  }

  if (menus) {
    for (let i = 0; i < menus.length; i++) {
      menus[i].id = (i + 1).toString();
    }
  }
};

const updateMenuById = (
  menuId: string,
  newMenu: MenusElement,
): MenusElement[] =>
  menus.map(menu => {
    if (menu.id === menuId) {
      return {...menu, ...newMenu};
    }
    return menu;
  });
