/**
 * concurrency limited task queue
 *
 * This code demonstrates closures, async/await, promises, and concurrency control, applied through a promise pool (task queue) pattern.
 *
 * some practical applications:
 * API request batching with rate limits.
 * File processing without spiking CPU/memory.
 * Scraping / crawling websites responsibly.
 * Job schedulers in back-end services.
 */

async function processWithConcurrencyLimit(tasks, limit, worker) {
  const results = [];
  let index = 0;

  async function run() {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        results[currentIndex] = await worker(tasks[currentIndex]);
      } catch (err) {
        results[currentIndex] = { error: err };
      }
    }
  }

  // Start `limit` number of workers in parallel
  const workers = Array.from({ length: limit }, run);
  await Promise.all(workers);

  return results;
}

// Example usage:
const queries = Array.from({ length: 20 }, (_, i) => i + 1);

function fakeFetch(query) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("Done:", query);
      resolve(`Result ${query}`);
    }, Math.random() * 2000)
  );
}

processWithConcurrencyLimit(queries, 5, fakeFetch).then((res) =>
  console.log("All done!", res)
);
