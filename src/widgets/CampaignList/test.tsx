import { render, screen } from '@testing-library/react';

function TestComponent() {
  return <h1>Привет, RTL!</h1>;
}

test('RTL работает', () => {
  render(<TestComponent />);

  expect(screen.getByText('Привет, RTL!')).toBeInTheDocument();
});
