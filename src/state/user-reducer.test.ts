import { expect, test } from 'vitest';
import { userReducer } from './user-reducer';

test('user-reducer should increment only age', () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: 'Bob',
  };
  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.age).toEqual(21);
  expect(endState.childrenCount).toEqual(2);
});

test('user-reducer should increment only childrenCount', () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: 'Bob',
  };
  const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' });
  expect(endState.age).toEqual(20);
  expect(endState.childrenCount).toEqual(3);
});

test('user-reducer should change the name of user', () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: 'Bob',
  };
  const newName = 'James';

  const endState = userReducer(startState, { type: 'CHANGE-USER-NAME', newName: newName });
  expect(endState.name).toEqual(newName);
});
