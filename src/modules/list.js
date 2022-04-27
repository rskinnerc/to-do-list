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

  render() {
    console.log(this.tasks)
    this.container.parentNode.querySelectorAll('[data-task]').forEach(task => task.remove());

    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const taskItem = task.createNode();
      this.container.after(taskItem);
    });
  }
}

export default new List();