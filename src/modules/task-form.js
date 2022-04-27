import list from "./list";
import { Task } from "./task";

export class TaskForm {
  constructor(form, isUpdating = false) {
    this.form = document.forms[form];
    this.isUpdating = isUpdating;
    this.form.onsubmit = this.submit.bind(this);
  }

  triggerSubmit() {
    this.submit();
  }

  submit(e) {
    e ? e.preventDefault() : null;
    if (this.isUpdating) {
      const description = this.form.description.value;
      const index = this.form.index.value;
      list.updateTask(description, index);
    } else {
      const description = this.form.description.value;
      const newTask = new Task(description);
      list.addTask(newTask);
      this.form.description.focus();
      this.form.reset();
    }


  }
}