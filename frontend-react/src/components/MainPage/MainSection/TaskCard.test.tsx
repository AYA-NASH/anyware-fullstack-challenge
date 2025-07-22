import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";

describe("TaskCard", () => {
  it("renders assignment with correct props and button", () => {
    render(
      <TaskCard
        type="assignment"
        title="Assignment 1"
        course="Math"
        topic="Algebra"
        dueDate="2024-06-10 - 10:00 AM"
      />
    );
    expect(screen.getByText("Assignment 1")).toBeInTheDocument();
    expect(screen.getByText(/Course: Math/)).toBeInTheDocument();
    expect(screen.getByText(/Topic: Algebra/)).toBeInTheDocument();
    expect(screen.getByText(/Due to: 2024-06-10 - 10:00 AM/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Solve Assignment/i })).toBeInTheDocument();
  });

  it("renders quiz with correct props and button", () => {
    render(
      <TaskCard
        type="quiz"
        title="Quiz 1"
        course="Science"
        topic="Biology"
        dueDate="2024-06-11 - 11:00 AM"
      />
    );
    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText(/Course: Science/)).toBeInTheDocument();
    expect(screen.getByText(/Topic: Biology/)).toBeInTheDocument();
    expect(screen.getByText(/Due to: 2024-06-11 - 11:00 AM/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start Quiz/i })).toBeInTheDocument();
  });
}); 