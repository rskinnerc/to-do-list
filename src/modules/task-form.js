import list from "./list";
import { Task } from "./task";

export class TaskForm {
  constructor(form, isUpdating = false) {
    this.form = document.forms[form];
    this.isUpdating = isUpdating;
    this.form.onsubmit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    if (this.isUpdating) {

    } else {
      const description = this.form.description.value;
      const newTask = new Task(description);
      list.addTask(newTask);
    }

    this.form.description.focus();
    this.form.reset();
  }
}