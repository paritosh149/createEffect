import { log } from "./utils";
import { createSignal, createEffect } from "./reactive";

log("1. Create Signal");
const [count, setCount] = createSignal(0);

log("2. Create Reaction");
createEffect(() => {
  log("The count is", count());
  createEffect(() => {
    log("Inner :" + count());
  });
});

log("3. Set count to 5");
setCount(5);

log("4. Set count to 10");
setCount(10);
