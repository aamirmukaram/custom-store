import * as fromStore from './store';

export default class Main {
  private incrementBtn: HTMLButtonElement;
  private decrementBtn: HTMLButtonElement;
  private counterEle: HTMLHeadingElement;
  private store: any;

  constructor() {
    this.incrementBtn = document.querySelector('#increment-btn');
    this.decrementBtn = document.querySelector('#decrement-btn');
    this.counterEle = document.querySelector('#counter');

    this.incrementBtn.addEventListener('click', this.onClickIncrementBtn.bind(this));
    this.decrementBtn.addEventListener('click', this.onClickDecrementBtn.bind(this));

    const counterReducer = (state = 0, action) => {
      switch (action.type) {
        case 'INCREMENT_COUNTER':
          return state + 1;
        case 'DECREMENT_COUNTER':
          return state - 1;
        default:
          return state;
      }
    };

    const reducers = {
      counterValue: counterReducer
    };

    this.store = new fromStore.Store(reducers);

    this.store.subscribe('counterValue', (data) => {
      this.updateCounter(data);
    });
  }

  private updateCounter(counter: number): void {
    this.counterEle.innerText = String(counter);
  }

  private onClickIncrementBtn(): void {
    const action = { type: 'INCREMENT_COUNTER', payload: {} };
    this.store.dispatch(action);
  }

  private onClickDecrementBtn(): void {
    const action = { type: 'DECREMENT_COUNTER', payload: {} };
    this.store.dispatch(action)
  }
}

new Main();