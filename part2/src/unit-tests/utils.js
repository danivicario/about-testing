import { act } from "react-dom/test-utils";

export async function actImmediate(wrapper, whatToRun) {
  await act(
    () =>
      new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          if (whatToRun === undefined) resolve();
          else resolve(whatToRun());
        });
      })
  );
}
