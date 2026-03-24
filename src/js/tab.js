export class Tab {
  constructor (listElem) {
    this.listElem = listElem;
    this.items = listElem.querySelectorAll('a');

    this.init = function () {
      listElem.classList.add('line-tab');
      for (const item of this.items) { item.classList.add('tab-item'); }
    }

    window.addEventListener('DOMContentLoaded', () => this.init())
  }

}