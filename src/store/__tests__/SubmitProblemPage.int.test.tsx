// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../../store/store';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// // Adjust the import according to the actual export in page.tsx
// // If page.tsx uses `export default`, use:
// // import SubmitProblemPage from '../../app/submit/page';
// // If it uses `export const SubmitProblemPage = ...`, use:
// import SubmitProblemPage from '../../app/submit/page';

// describe('SubmitProblemPage integration', () => {
//   it('updates title and description in Redux store on input', () => {
//     render(
//       <Provider store={store}>
//         <SubmitProblemPage />
//       </Provider>
//     );

//     // Find title and description inputs
//     const titleInput = screen.getByPlaceholderText('Title');
//     const descInput = screen.getByPlaceholderText('Description');

//     // Simulate user typing
//     fireEvent.change(titleInput, { target: { value: 'My Title' } });
//     fireEvent.change(descInput, { target: { value: 'My Description' } });

//     // Assert input values (Redux state is reflected in UI)
//     expect(titleInput).toHaveValue('My Title');
//     expect(descInput).toHaveValue('My Description');
//   });
// });
