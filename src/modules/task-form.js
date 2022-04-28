export default class TaskForm {
  index = null;

  description = '';

  constructor(form, isUpdating = false) {
    this.form = document.forms[form];
    this.isUpdating = isUpdating;
  }
}