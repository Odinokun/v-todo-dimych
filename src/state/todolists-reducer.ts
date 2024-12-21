import { FilterType, TodolistType } from '../App';

export type RemoveTodoACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export type EditTodolistNameACType = ReturnType<typeof editTodolistNameAC>;
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;

type ActionsType = RemoveTodoACType | AddTodolistACType | EditTodolistNameACType | ChangeTodolistFilterACType;

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      const { id } = action.payload;
      return state.filter(tl => tl.id !== id);
    }
    case 'ADD-TODOLIST': {
      const { id, title } = action.payload;
      const newTodolist: TodolistType = { id, title: title, filter: 'all' };
      return [newTodolist, ...state];
    }
    case 'EDIT-TODOLIST-NAME': {
      const { id, title } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, title } : tl));
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const { id, filter } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, filter } : tl));
    }
    default:
      throw new Error('I don`t understand this type');
  }
};

export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { id },
  } as const;
};
export const addTodolistAC = (id: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: { id, title },
  } as const;
};
export const editTodolistNameAC = (id: string, title: string) => {
  return {
    type: 'EDIT-TODOLIST-NAME',
    payload: { id, title },
  } as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: { id, filter },
  } as const;
};
