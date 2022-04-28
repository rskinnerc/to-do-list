export default class Task {
  constructor(description, completed = false, index = null) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.isEditing = false;
  }

  setIndex(value) {
    this.index = value;
  }

  createNode() {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('data-task', true);
    taskNode.innerHTML = `
    <div class="task-item-container">
      ${!this.completed ? `<i class="bi bi-square" data-task-id="${this.index}"></i>` : `<i class="bi bi-check-square" data-task-id="${this.index}"></i>`} 
      <form name="task-${this.index}">
        <input type="text" class="task-item" required name="description" data-task-id="${this.index}" value="${this.description}" />
        <input type="hidden" value="${this.index}" name="index" />
      </form>
    </div>
    <i class="bi bi-trash3 hidden" data-task-index="${this.index}"></i><i class="bi bi-three-dots-vertical" data-task-index="${this.index}"></i>
    `;

    const descriptionNode = taskNode.querySelector('input.task-item');

    return { taskNode, descriptionNode, taskIndex: this.index };
  }
}