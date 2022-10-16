import { log } from './utils'

// This is our work in progress Reactive Library
const context = [];

function subscribe(running, subscriptions) {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

export function createSignal(value) {
  const subscriptions = new Set();

  const read = () => {
    const running = context[context.length - 1];
    if (running) subscribe(running, subscriptions);
    return value;
  };

  const write = (nextValue) => {
    value = nextValue;

    for (const sub of [...subscriptions]) {
      log("Subscriber execute called.")
      sub.execute();
    }
  };
  return [read, write];
}

function cleanup(running) {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
}

export function createEffect(fn) {
  log("Creating Effect...")
  const execute = () => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  const running = {
    execute,
    dependencies: new Set()
  };
  log("1 RRInitial Execute called.")
  execute();
}
