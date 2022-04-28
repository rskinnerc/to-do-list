import TaskForm from './task-form.js';
import Task from './task.js';

export class List {
  tasks = []

  editingForm = null;

  constructor() {
    this.container = document.getElementById('form-item');
    if (localStorage.getItem('localTasks')) {
      this.tasks = JSON.parse(localStorage.getItem('localTasks')).map((task) => new Task(task.description, task.completed, task.index));
    }

    this.setCurrentForm();
  }

  setCurrentForm(name = 'addTaskForm', isUpdating = false) {
    this.editingForm = new TaskForm(name, isUpdating);
    this.editingForm.form.onsubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.editingForm.isUpdating) {
      this.updateTask(this.editingForm.form.description.value, this.editingForm.form.index.value);
    } else {
      this.addTask(this.editingForm.form.description.value);
      this.editingForm.form.description.focus();
      this.editingForm.form.reset();
    }
  }

  addTask(description) {
    const task = new Task(description, false, this.tasks.length + 1);
    this.tasks.push(task);
    this.render().saveToLocal();

  }

  updateTask(description, index) {
    this.tasks[index - 1].description = description;
    this.saveToLocal();
  }

  removeTask(index) {
    this.tasks.splice(index - 1, 1);
    this.tasks.forEach((task) => {
      task.setIndex(this.tasks.indexOf(task) + 1);
    });

    this.render().saveToLocal();
  }

  toggleTaskStatus(task) {
    task.toggleStatus();
    this.render().saveToLocal();
  }

  render() {
    this.container.parentNode.querySelectorAll('[data-task]').forEach((task) => task.remove());

    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const { taskNode, descriptionNode, taskIndex } = task.createNode();
      this.container.after(taskNode);
      descriptionNode.onfocus = (e) => this.editing(e, taskNode, taskIndex);
      descriptionNode.onblur = (e) => this.edited(e, taskNode, taskIndex);
      const completeBtn = taskNode.querySelector('input[type="checkbox"]');
      completeBtn.onchange = (e) => this.toggleTaskStatus(task);
    });

    this.tasks.sort((a, b) => a.index - b.index);

    return this;
  }

  saveToLocal() {
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
  }

  editing(e, taskNode, taskIndex) {
    taskNode.classList.add('editing-task');
    const trash = taskNode.querySelector('i.bi-trash3');
    trash.classList.toggle('hidden');

    this.setCurrentForm(`task-${taskIndex}`, true);

    trash.onclick = (e) => {
      e.cancelBubble = true;
      this.removeTask(taskIndex);
    };
    taskNode.querySelector('i.bi-three-dots-vertical').classList.toggle('hidden');
  }

  edited(e, taskNode) {
    this.editingForm.form.requestSubmit();
    this.setCurrentForm();
    setTimeout(() => {
      taskNode.classList.remove('editing-task');
      taskNode.querySelector('i.bi-trash3').classList.toggle('hidden');
      taskNode.querySelector('i.bi-three-dots-vertical').classList.toggle('hidden');
    }, 100);
  }
}

export default new List();