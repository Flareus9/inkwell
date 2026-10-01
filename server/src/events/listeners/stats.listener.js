// server/src/events/listeners/stats.listener.js
import { EventBus } from "../event-bus.js";

// Simple in-memory counter
let totalPostsPublished = 0;

// Listen for the publish event and increment the counter
EventBus.on("post.published", () => {
  totalPostsPublished++;
});

// Export a getter method so the route can read the current value
export const PostStats = {
  get() {
    return { totalPostsPublished };
  }
};