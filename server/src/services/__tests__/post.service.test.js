// server/src/services/__tests__/post.service.test.js
import { jest } from "@jest/globals";
const mockPostRepository = { createWithTags: jest.fn() };
const mockEventBus = { emit: jest.fn() };
jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
    PostRepository: mockPostRepository,
}));
jest.unstable_mockModule("../../events/event-bus.js", () => ({
    EventBus: mockEventBus,
}));
const { PostService } = await import("../post.service.js");
test("publish() creates a PUBLISHED post and emits post.published", async () => {
    mockPostRepository.createWithTags.mockResolvedValue({ id: "p1", title: "Hello", status: "PUBLISHED" });
    const post = await PostService.publish({ authorId: "u1", title: "Hello", body: "World" });
    expect(post.status).toBe("PUBLISHED");
    expect(mockEventBus.emit).toHaveBeenCalledWith(
        "post.published",
        expect.objectContaining({ postId: "p1" })
    );
});
test("publish() rejects an empty title", async () => {
    await expect(
        PostService.publish({ authorId: "u1", title: "", body: "World" })
    ).rejects.toThrow();
});
// New test 3: Valid search
test("search() returns matching posts", async () => {
    const matchingPost = {
        id: "p1",
        title: "On Modularity",
        body: "Some thoughts on cohesion.",
        status: "PUBLISHED",
    };

    mockPostRepository.searchPublished.mockResolvedValue({
        posts: [matchingPost],
        hasMore: false,
    });

    const result = await PostService.search({
        query: "modularity",
        page: 1,
    });

    expect(result.posts).toEqual([matchingPost]);
    expect(result.hasMore).toBe(false);
});

// New test 4: No matches
test("search() returns an empty list when no posts match", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({
        posts: [],
        hasMore: false,
    });

    const result = await PostService.search({
        query: "nothingmatches",
        page: 1,
    });

    expect(result.posts).toEqual([]);
    expect(result.hasMore).toBe(false);
});

// New test 5: Pagination
test("search() passes the requested page to the repository", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({
        posts: [],
        hasMore: true,
    });

    await PostService.search({
        query: "design",
        page: 2,
        pageSize: 5,
    });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
        query: "design",
        page: 2,
        pageSize: 5,
    });
});

// New test 6: Repository failure
test("search() propagates a repository error", async () => {
    const error = new Error("Database search failed");

    mockPostRepository.searchPublished.mockRejectedValue(error);

    await expect(
        PostService.search({
            query: "design",
            page: 1,
        })
    ).rejects.toThrow("Database search failed");
});