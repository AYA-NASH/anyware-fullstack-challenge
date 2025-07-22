import { render, screen, waitFor } from "@testing-library/react";
import MainContent from "./MainContent";
import { baseUrl } from "../../config"; 

jest.mock("../../config", () => ({ baseUrl: "http://mockapi.test" })); 

const mockPendingFetch = () =>
  new Promise<Response>(() => {}) as Promise<Response>;

describe("MainContent API logic", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("shows loading spinner initially", () => {
    window.fetch = jest.fn(mockPendingFetch);
    render(<MainContent />);
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
  });

  it("shows error if announcements fetch fails", async () => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ ok: false, status: 500 })) 
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: [] }) }))
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: [] }) })); 

    render(<MainContent />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load announcements/i)).toBeInTheDocument();
    });
  });

  it("shows error if tasks fetch fails", async () => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: [] }) }))
      .mockImplementationOnce(() => Promise.resolve({ ok: false, status: 500 })) 
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: [] }) })); 

    render(<MainContent />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load what's due/i)).toBeInTheDocument();
    });
  });

  it("shows empty state if no data returned", async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ result: [] }) }));

    render(<MainContent />);
    await waitFor(() => {
      expect(screen.getByText(/No announcements available/i)).toBeInTheDocument();
      expect(screen.getByText(/No tasks due/i)).toBeInTheDocument();
    });
  });

  it("renders AnnouncementCard and TaskCards for fetched data", async () => {
    const announcements = { result: [{ _id: "a1", senderName: "Mr. X", senderRole: "Teacher", content: "Test Announce" }] };
    const quizzes = { result: [{ _id: "q1", title: "Quiz 1", course: "Math", topic: "Algebra", dueDate: "2024-07-25T10:00:00Z" }] };
    const assignments = { result: [{ _id: "as1", title: "Assign 1", course: "Science", topic: "Bio", dueDate: "2024-07-26T11:00:00Z" }] };

    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(announcements) })) // Announcements
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(quizzes) })) // Quizzes
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(assignments) })); // Assignments

    render(<MainContent />);
    await waitFor(() => {
      // Check announcements
      expect(screen.getByText("Test Announce")).toBeInTheDocument();
      expect(screen.getByText("Mr. X")).toBeInTheDocument();

      // Check tasks
      expect(screen.getByText("Quiz 1")).toBeInTheDocument();
      expect(screen.getByText("Assign 1")).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: /solve assignment|start quiz/i }).length).toBe(2);
    });
  });
});