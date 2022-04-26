const TMP_TASKS = [
  {
    description: 'Morning Session',
    completed: false,
    index: 1,
  },
  {
    description: 'Pair Programming',
    completed: false,
    index: 2,
  },
  {
    description: 'Buy Coffee for Microverse\'s day',
    completed: true,
    index: 3,
  },
  {
    description: 'Pair Programming after Lunch',
    completed: false,
    index: 4,
  },
  {
    description: 'Check Linters',
    completed: false,
    index: 5,
  },
];

export class List {
  tasks = []

  constructor() {
    this.tasks = TMP_TASKS;
    this.container = document.getElementById('form-item');
  }

  render() {
    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span>
          ${!task.completed ? '<i class="bi bi-square"></i>' : '<i class="bi bi-check-square"></i>'} ${task.description}
        </span>
        <i class="bi bi-three-dots-vertical"></i>
      `;
      this.container.after(taskItem);
    });
  }
}

export default new List();