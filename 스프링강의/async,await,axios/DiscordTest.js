import { DiscordRestApi } from "./DiscordRestApi";

export function DiscordTest() {
  async function asyncTest() {
    const data = await timeDelay(3000);
    console.log(data);
  }

  function timeDelay(t) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Complete");
      }, t);
    });
  }

  return (
    <>
      <h1>Discord Test</h1>
      <p>
        <button onClick={() => asyncTest()}>click</button>
      </p>
      <DiscordRestApi />
    </>
  );
}
