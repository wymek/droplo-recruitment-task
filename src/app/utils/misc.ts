import {Active} from '@dnd-kit/core';

import {MenuElement} from '../interfaces/IMenu';

export const findElementById = (
  elements: MenuElement[],
  id: string,
): MenuElement | null => {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }
    if (element.elements) {
      const foundElement = findElementById(element.elements, id);
      if (foundElement) {
        return foundElement;
      }
    }
  }
  return null;
};

export const isInSameGroup = (
  activeId: string,
  overId: string,
  elements: MenuElement[],
): boolean => {
  let activeParent = null;
  let overParent = null;

  const findParent = (
    elements: MenuElement[],
    id: string,
  ): MenuElement | null => {
    for (const element of elements) {
      if (element.elements) {
        if (element.elements.some(child => child.id === id)) {
          return element;
        }
        const foundParent = findParent(element.elements, id);
        if (foundParent) {
          return foundParent;
        }
      }
    }
    return null;
  };

  activeParent = findParent(elements, activeId);
  overParent = findParent(elements, overId);

  return activeParent === overParent;
};

export const swapElements = (
  elements: MenuElement[],
  activeId: string,
  overId: string,
): MenuElement[] =>
  elements.map(element => {
    if (element.id === activeId) {
      const overElement = findElementById(elements, overId);
      if (overElement) {
        return {
          ...overElement,
          id: activeId,
        };
      }
      return element;
    }
    if (element.id === overId) {
      const activeElement = findElementById(elements, activeId);
      if (activeElement) {
        return {
          ...activeElement,
          id: overId,
        };
      }
      return element;
    }

    if (element.elements) {
      return {
        ...element,
        elements: swapElements(element.elements, activeId, overId),
      };
    }

    return element;
  });

export const hideElements = (active: Active, shouldHide: boolean) => {
  const parent = document.querySelector(
    `[data-key="${active.id}"]`,
  )?.parentElement;
  if (!parent) return;

  const elements = Array.from(parent.children);
  elements.forEach(child => {
    const ml16Element = child.querySelector('.ml-16');
    if (ml16Element) {
      if (shouldHide) {
        ml16Element.setAttribute('hidden', 'true');
      } else {
        ml16Element.removeAttribute('hidden');
      }
    }
  });
};
