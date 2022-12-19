import { atom, selector } from "recoil";

export enum Categories {
  TODO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedToDos = localStorage.getItem(key);
    if (savedToDos !== null) {
      setSelf(JSON.parse(savedToDos));
    }
    onSet((toDos: any, _: any, isReSet: boolean) => {
      isReSet
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(toDos));
    });
  };

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDos")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
