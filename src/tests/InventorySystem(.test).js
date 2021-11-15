import { render } from '@testing-library/react';
import InventorySystem from '../screens/InventorySystem';
import { FirebaseProvider } from '../components/FirestoreContext';



test('Renders Inventory System table body', () => {
  const result = render(
    <FirebaseProvider>
      <InventorySystem />
    </FirebaseProvider>);
  const invTableBody = result.container.querySelector('#invTableBody');
  expect(invTableBody).toBeInTheDocument();
});

test('Renders Inventory System table rows', () => {
  const result = render(
    <FirebaseProvider>
      <InventorySystem />
    </FirebaseProvider>);
  const invTableBody = result.container.querySelector('#invTableBody');
  const tableRows = invTableBody.querySelectorAll("tr")
  expect(tableRows.length).toBe(5);
});