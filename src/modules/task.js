import list from "./list";

export class Task {
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
      <form>
        <input type="text" class="task-item"  name="description" value="${this.description}" />
      </form>
    </div>
    <i class="bi bi-trash3 hidden" data-task-index="${this.index}"></i><i class="bi bi-three-dots-vertical" data-task-index="${this.index}"></i>
    `;

    const descriptionNode = taskNode.querySelector('input.task-item');
    descriptionNode.onfocus = (e) => this.editing(e, taskNode);
    descriptionNode.onblur = (e) => this.edited(e, taskNode);

    return taskNode;
  }

  editing(e, taskNode) {
    taskNode.classList.add('editing-task');
    const trash = taskNode.querySelector('i.bi-trash3');
    trash.classList.toggle('hidden');
    trash.onclick = (e) => {
      e.cancelBubble = true;
      list.removeTask(this.index);
    }
    taskNode.querySelector('i.bi-three-dots-vertical').classList.toggle('hidden');
  }

  edited(e, taskNode) {
    setTimeout(() => {
      taskNode.classList.remove('editing-task');
      taskNode.querySelector('i.bi-trash3').classList.toggle('hidden');
      taskNode.querySelector('i.bi-three-dots-vertical').classList.toggle('hidden');
    }, 100)

  }
}