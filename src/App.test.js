
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders initial counter value', () => {
  render(<Counter />);
  const counterElement = screen.getByText(/Counter: 0/i); // Verify the initial counter value is "0"
  expect(counterElement).toBeInTheDocument();
});


test('increments counter on button click', () => {
  render(<Counter />);
  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton); // Simulate one click
  const counterElement = screen.getByText(/Counter: 1/i); // Verify the value is now "1"
  expect(counterElement).toBeInTheDocument();
});

test('decrements counter but does not go below zero', () => {
  render(<Counter />);
  const decrementButton = screen.getByText(/Decrement/i);
  
  // Try decrementing at initial state (0)
  fireEvent.click(decrementButton);
  const counterElement = screen.getByText(/Counter: 0/i); // Verify the value stays at "0"
  expect(counterElement).toBeInTheDocument();
  
  // Increment and then decrement
  const incrementButton = screen.getByText(/Increment/i);
  fireEvent.click(incrementButton); // Increment to 1
  fireEvent.click(decrementButton); // Decrement back to 0
  expect(counterElement).toHaveTextContent('Counter: 0'); // Verify it returned to 0
});

test('resets counter to initial value', () => {
  render(<Counter />);
  const incrementButton = screen.getByText(/Increment/i);
  const resetButton = screen.getByText(/Reset/i);

  fireEvent.click(incrementButton); // Increment to 1
  const counterElement = screen.getByText(/Counter: 1/i); // Verify increment
  expect(counterElement).toBeInTheDocument();

  fireEvent.click(resetButton); // Reset the counter
  expect(counterElement).toHaveTextContent('Counter: 0'); // Verify reset
});

test('increments and decrements multiple times correctly', () => {
  render(<Counter />);
  const incrementButton = screen.getByText(/Increment/i);
  const decrementButton = screen.getByText(/Decrement/i);

  fireEvent.click(incrementButton); // 0 -> 1
  fireEvent.click(incrementButton); // 1 -> 2
  fireEvent.click(incrementButton); // 2 -> 3
  const counterElement = screen.getByText(/Counter: 3/i);
  expect(counterElement).toBeInTheDocument(); // Verify value is 3

  fireEvent.click(decrementButton); // 3 -> 2
  fireEvent.click(decrementButton); // 2 -> 1
  expect(counterElement).toHaveTextContent('Counter: 1'); // Verify value is 1

  fireEvent.click(decrementButton); // 1 -> 0
  fireEvent.click(decrementButton); // Try to decrement below 0
  expect(counterElement).toHaveTextContent('Counter: 0'); // Verify it stays at 0
});

test('counter never becomes negative', () => {
  render(<Counter />);
  const decrementButton = screen.getByText(/Decrement/i);

  fireEvent.click(decrementButton); // Try to decrement below 0
  const counterElement = screen.getByText(/Counter: 0/i);
  expect(counterElement).toBeInTheDocument(); // Verify it stays at 0
});
