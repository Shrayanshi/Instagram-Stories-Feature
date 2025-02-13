import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Story from "./Story";

// Mock props to be passed to the Story component
const mockProps = {
  image: "story1.jpg",
  onNext: jest.fn(),
  onPrevious: jest.fn(),
  onClose: jest.fn(),
};

// Test to ensure the story image is rendered correctly
test("renders the story image", () => {
  render(<Story {...mockProps} />);
  const imageElement = screen.getByAltText("Story");
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", "story1.jpg");
});

// Test to ensure onNext is called when the right side is clicked
test("calls onNext when the right side is clicked", () => {
  render(<Story {...mockProps} />);
  const rightNav = screen.getByText("X").parentElement!.children[3];
  fireEvent.click(rightNav);
  expect(mockProps.onNext).toHaveBeenCalled();
});

// Test to ensure onPrevious is called when the left side is clicked
test("calls onPrevious when the left side is clicked", () => {
  render(<Story {...mockProps} />);
  const leftNav = screen.getByText("X").parentElement!.children[2];
  fireEvent.click(leftNav);
  expect(mockProps.onPrevious).toHaveBeenCalled();
});

// Test to ensure onClose is called when the close button is clicked
test("calls onClose when the close button is clicked", () => {
  render(<Story {...mockProps} />);
  const closeButton = screen.getByText("X");
  fireEvent.click(closeButton);
  expect(mockProps.onClose).toHaveBeenCalled();
});
