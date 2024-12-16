type UserState = {
  age: number;
  childrenCount: number;
  name: string;
};

type ActionType = {
  type: string;
  [key: string]: string;
};

export const userReducer = (state: UserState, action: ActionType): UserState => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      return { ...state, age: state.age + 1 };
    case 'INCREMENT-CHILDREN-COUNT':
      return { ...state, childrenCount: state.childrenCount + 1 };
    case 'CHANGE-USER-NAME':
      return { ...state, name: action.newName };
    default:
      throw new Error('I don`t understand this type');
  }
};
