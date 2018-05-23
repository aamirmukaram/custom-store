export class Store {
  private subscribers: { [key: string]: Function };
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers, initialState = {}) {
    this.reducers = reducers;
    this.state = initialState;
    this.subscribers = {};
    this.dispatch({ type: '' });
  }

  dispatch(data: { type: string, payload?: any }) {
    for (let key in this.reducers) {
      this.state[key] = this.reducers[key](this.state[key], data);
      this.subscribers[key] && this.subscribers[key](this.state[key]);
    }
  }

  subscribe(key, fun) {
    this.subscribers[key] = fun;
    this.subscribers[key](this.state[key]);
  }
}