export class List {
  tasks = []

  constructor() {
    this.container = document.getElementById('form-item');
  }

  addTask(task) {
    task.setIndex(this.tasks.length + 1);
    this.tasks.push(task);
    this.render();
  }

  removeTask(index) {
    this.tasks.splice(index - 1, 1);
    this.render();
    this.tasks.forEach((task) => {
      task.setIndex(this.tasks.indexOf(task) + 1);
    })
  }

  render() {
    this.container.parentNode.querySelectorAll('[data-task]').forEach(task => task.remove());

    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const taskItem = task.createNode();
      this.container.after(taskItem);
    });

    this.tasks.sort((a, b) => a.index - b.index)
    console.log(this.tasks);
  }
}

export default new List();