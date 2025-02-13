import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryList from "./StoryList";
import useFetchStories from "../../hooks/useFetchStories";

// Mock the useFetchStories hook
jest.mock("../../hooks/useFetchStories");

const mockStories = [
  {
    id: "0",
    download_url: "story1.jpg",
  },
  {
    id: "1",
    download_url: "story2.jpg",
  },
  {
    id: "2",
    download_url: "story3.jpg",
  },
];

// Configure the mocked useFetchStories hook to return mockStories
(useFetchStories as jest.Mock).mockReturnValue({
  stories: mockStories,
  loading: false,
});

// Test to ensure the story thumbnails are rendered
test("renders the story thumbnails", () => {
  render(<StoryList />);
  const thumbnails = screen.getAllByRole("img");
  expect(thumbnails).toHaveLength(mockStories.length);
});

// Test to ensure a story opens when a thumbnail is clicked
test("opens a story when a thumbnail is clicked", () => {
  render(<StoryList />);
  const thumbnail = screen.getAllByRole("img")[0];
  fireEvent.click(thumbnail);
  const imageElement = screen.getByAltText("Story");
  expect(imageElement).toBeInTheDocument();
});

// Test to ensure the story viewer closes when the close button is clicked
test("closes the story viewer when the close button is clicked", async () => {
  render(<StoryList />);
  const thumbnail = screen.getAllByRole("img")[0];
  fireEvent.click(thumbnail);
  const closeButton = screen.getByText("X");
  fireEvent.click(closeButton);
  await waitFor(() => {
    expect(screen.queryByAltText("Story")).not.toBeInTheDocument();
  });
});

// Test to ensure the story automatically advances to the next story after a duration
test("automatically advances to the next story after duration", async () => {
  jest.useFakeTimers();
  render(<StoryList />);
  const thumbnail = screen.getAllByRole("img")[0];
  fireEvent.click(thumbnail);

  await waitFor(() => {
    expect(screen.getByAltText("Story")).toHaveAttribute("src", "story1.jpg");
  });

  jest.advanceTimersByTime(5000);

  await waitFor(() => {
    expect(screen.getByAltText("Story")).toHaveAttribute("src", "story2.jpg");
  });

  jest.useRealTimers();
});

// Test to ensure manual navigation to the previous and next stories works
test("navigates to the previous and next stories manually", () => {
  render(<StoryList />);
  const thumbnail = screen.getAllByRole("img")[1];
  fireEvent.click(thumbnail);

  const leftNav = screen.getByText("X").parentElement!.children[2];
  const rightNav = screen.getByText("X").parentElement!.children[3];

  // Click to navigate to the next story
  fireEvent.click(rightNav);
  expect(screen.getByAltText("Story")).toHaveAttribute("src", "story3.jpg");

  // Click to navigate to the previous story
  fireEvent.click(leftNav);
  expect(screen.getByAltText("Story")).toHaveAttribute("src", "story2.jpg");
});
