import './reset.css';
import './style.css';
import list from './modules/list.js';
import { TaskForm } from './modules/task-form';

list.render();

new TaskForm('addTaskForm');