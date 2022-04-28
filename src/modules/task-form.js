import list from './list.js';

export default class TaskForm {
  constructor(form, isUpdating = false) {
    this.form = document.forms[form];
    this.isUpdating = isUpdating;
    this.form.onsubmit = this.submit.bind(this);
  }

  triggerSubmit() {
    this.submit();
  }

  submit(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.isUpdating) {
      const description = this.form.description.value;
      const index = this.form.index.value;
      list.updateTask(description, index);
    } else {
      const description = this.form.description.value;
      list.addTask(description);
      this.form.description.focus();
      this.form.reset();
    }
  }
}