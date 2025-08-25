/**
 * timed FIFO queue
 *
 * This toast system covers JavaScript concepts like closures (for timers), asynchronous execution with setTimeout, arrays as FIFO queues, immutability when updating state, and unique IDs for tracking items.
 *
 * UI toast/notification system → auto-dismissing alerts.
 * Job/task queues → background work processed FIFO (e.g., emails, uploads).
 * Message queues → brokered messages/events (Kafka, RabbitMQ, SQS).
 * Rate limiting → queueing API requests to control throughput.
 * Logging/event buffers → collect events/logs, expire or flush after a time.
 */

class ToastManager {
  // if TypeScript
  // private duration: number;
  // private toasts: { id: number; message: string }[] = [];

  constructor(duration = 3000) {
    this.duration = duration; // how long each toast lives
    this.toasts = []; // store active toasts
  }

  addToast(message) {
    const id = Date.now() + Math.random(); // unique id
    const toast = { id, message };
    this.toasts.push(toast);
    console.log("Toast added:", message);

    // Schedule auto-remove
    setTimeout(() => {
      this.removeToast(id);
    }, this.duration);
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    console.log("Toast removed:", id);
  }

  listToasts() {
    return this.toasts;
  }
}

// --- Usage ---
const manager = new ToastManager(2000);

manager.addToast("Hello World!");

setTimeout(() => {
  manager.addToast("Second toast");
}, 1000);

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 500); // [{...}]

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 1500); // [{...}, {...}]

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 2000); // [{...}] (just removed the first toast)

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 2500); // [{...}]

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 3000); // [{...}] (toast removed immediately after)

setTimeout(() => {
  console.log("Active toasts:", manager.listToasts());
}, 3500); // []
