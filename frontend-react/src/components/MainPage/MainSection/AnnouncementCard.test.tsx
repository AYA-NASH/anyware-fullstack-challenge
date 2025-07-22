import { render, screen } from "@testing-library/react";
import AnnouncementCard from "./AnnouncementCard";

describe("AnnouncementCard", () => {
  it("renders name, role, and message", () => {
    render(
      <AnnouncementCard
        name="John Doe"
        role="Teacher"
        message="This is an announcement."
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Teacher")).toBeInTheDocument();
    expect(screen.getByText("This is an announcement.")).toBeInTheDocument();
  });
}); 