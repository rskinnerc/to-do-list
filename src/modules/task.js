export class Task {
  constructor(description, completed = false, index = null) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  setIndex(value) {
    this.index = value;
  }

  createNode() {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('data-task', true);

    taskNode.innerHTML = `
        <span>
          ${!this.completed ? `<i class="bi bi-square" data-task-id="${this.index}"></i>` : `<i class="bi bi-check-square" data-task-id="${this.index}"></i>`} ${this.description}
        </span>
        <i class="bi bi-three-dots-vertical" data-task-index="${this.index}"></i>
      `;

    return taskNode;
  }
}