import { useReducer } from 'react';
import { v1 } from 'uuid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { TaskType, Todolist } from './Todolist';
import { Header } from './components/Header/Header';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	editTodolistNameAC,
	removeTodolistAC,
	todolistsReducer,
} from './state/todolists-reducer';
import { addTaskAC, changeStatusAC, editTaskAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterType;
};
export type AllTasksType = {
	[key: string]: TaskType[];
};

export type FilterType = 'all' | 'active' | 'completed';

function App() {
	const todolistsId1 = v1();
	const todolistsId2 = v1();

	const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{ id: todolistsId1, title: 'To learn', filter: 'all' },
		{ id: todolistsId2, title: 'Films', filter: 'active' },
	]);
	const [allTasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistsId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
			{ id: v1(), title: 'Storybook', isDone: false },
		],
		[todolistsId2]: [
			{ id: v1(), title: 'Friends', isDone: true },
			{ id: v1(), title: 'Game of Thrones', isDone: true },
			{ id: v1(), title: 'Peaky Blinders', isDone: false },
			{ id: v1(), title: 'Breaking Bad', isDone: false },
			{ id: v1(), title: 'The Witcher', isDone: false },
		],
	});

	// FIX deleteTodolist isn't working
	const deleteTodolist = (todolistId: string) => {
		dispatchTodolists(removeTodolistAC(todolistId));
		// delete allTasks[todolistId];
	};

	// FIX addTodolist isn't working
	const addTodolist = (todolistTitle: string) => {
		dispatchTodolists(addTodolistAC(todolistTitle));
		// dispatchTasks(addTodolistAC(todolistTitle));
	};

	const editTodolistName = (todolistId: string, title: string) =>
		dispatchTodolists(editTodolistNameAC(todolistId, title));
	const changeFilter = (todolistId: string, filterVal: FilterType) =>
		dispatchTodolists(changeTodolistFilterAC(todolistId, filterVal));

	const addTask = (todolistId: string, title: string) => {
		dispatchTasks(addTaskAC(todolistId, title));
	};
	const editTask = (todolistId: string, id: string, title: string) => dispatchTasks(editTaskAC(todolistId, id, title));

	const removeTask = (todolistId: string, id: string) => dispatchTasks(removeTaskAC(todolistId, id));

	const changeStatus = (todolistId: string, id: string, isDone: boolean) =>
		dispatchTasks(changeStatusAC(todolistId, id, isDone));

	return (
		<>
			<Header />

			<Container maxWidth='lg'>
				<Grid container spacing={3} sx={{ padding: '20px 0', alignItems: 'stretch' }}>
					<Grid item xs={12}>
						<Card variant='elevation' elevation={4} component='article' sx={{ height: '100%' }}>
							<CardContent>
								<Typography variant='h6' component='h2'>
									Create new ToDo
								</Typography>
								<AddItemForm callback={addTodolist} errorText="Yo-yo!!! Where is the todolist's name!" />
							</CardContent>
						</Card>
					</Grid>

					{todolists.map(tl => {
						const getFilteredTasks = () => {
							switch (tl.filter) {
								case 'active':
									return allTasks[tl.id].filter((t: TaskType) => !t.isDone);
								case 'completed':
									return allTasks[tl.id].filter((t: TaskType) => t.isDone);
								default:
									return allTasks[tl.id];
							}
						};
						const filteredTasks = getFilteredTasks();

						return (
							<Todolist
								key={tl.id}
								todolistId={tl.id}
								editTodolistName={editTodolistName}
								title={tl.title}
								tasks={filteredTasks}
								removeTask={removeTask}
								addTask={addTask}
								editTask={editTask}
								changeFilter={changeFilter}
								changeTaskStatus={changeStatus}
								filter={tl.filter}
								deleteTodolist={deleteTodolist}
							/>
						);
					})}
				</Grid>
			</Container>
		</>
	);
}

export default App;
