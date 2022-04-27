import { Task } from "./task";

export class List {
  tasks = []

  constructor() {
    this.container = document.getElementById('form-item');
    if (localStorage.getItem('localTasks')) {
      this.tasks = JSON.parse(localStorage.getItem('localTasks')).map((task) => {
        return new Task(task.description, task.completed, task.index);
      })
    }
  }

  addTask(task) {
    task.setIndex(this.tasks.length + 1);
    this.tasks.push(task);
    this.render();
    this.saveToLocal();
  }

  updateTask(description, index) {
    this.tasks[index - 1].description = description;
    this.saveToLocal();
  }

  removeTask(index) {
    this.tasks.splice(index - 1, 1);
    this.render();
    this.tasks.forEach((task) => {
      task.setIndex(this.tasks.indexOf(task) + 1);
    })
    this.saveToLocal();
  }

  render() {
    this.container.parentNode.querySelectorAll('[data-task]').forEach(task => task.remove());

    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const taskItem = task.createNode();
      this.container.after(taskItem);
    });

    this.tasks.sort((a, b) => a.index - b.index)
  }

  saveToLocal() {
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
  }
}

export default new List();