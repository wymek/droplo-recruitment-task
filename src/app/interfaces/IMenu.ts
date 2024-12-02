export type MenuElement = {
  name: string;
  link: string;
  id: string;
  elements: MenuElement[];
};

export type MenusElement = {
  elements: MenuElement[];
  id: string;
};

export interface FormMenuElement {
  name: string;
  link?: string;
}
