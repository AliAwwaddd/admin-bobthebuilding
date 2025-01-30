// import { CompanyEmployeesResponse } from '@/types/CompanyEmployeesResponse';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface WorkerState {
//   workers: CompanyEmployeesResponse[];
//   selectedWorkers: Record<string, CompanyEmployeesResponse>;
//   filteredWorkers: CompanyEmployeesResponse[];
// }

// const initialState: WorkerState = {
//   workers: [],
//   selectedWorkers: {},
//   filteredWorkers: [],
// };

// const workerSlice = createSlice({
//   name: 'worker',
//   initialState,
//   reducers: {
//     setWorkers(state, action: PayloadAction<CompanyEmployeesResponse[]>) {
//       state.workers = action.payload;
//       state.filteredWorkers = action.payload; // Initialize filteredWorkers with all workers
//     },
//     toggleWorkerSelection(state, action: PayloadAction<CompanyEmployeesResponse>) {
//       const worker = action.payload;
//       if (worker.id in state.selectedWorkers) {
//         // Remove worker
//         delete state.selectedWorkers[worker.id];
//         state.filteredWorkers.push(worker);
//       } else {
//         // Add worker
//         state.selectedWorkers[worker.id] = worker;
//         state.filteredWorkers = state.filteredWorkers.filter((w) => w.id !== worker.id);
//       }
//     },
//     searchWorkers(state, action: PayloadAction<string>) {
//       const searchTerm = action.payload.toLowerCase();
//       const notSelectedWorkers = state.workers.filter(
//         (worker) => !(worker.id in state.selectedWorkers)
//       );
//       state.filteredWorkers = notSelectedWorkers.filter(
//         (worker) =>
//           worker.name.toLowerCase().includes(searchTerm) ||
//           worker.role.toLowerCase().includes(searchTerm)
//       );
//     },
//   },
// });

// export const { setWorkers, toggleWorkerSelection, searchWorkers } = workerSlice.actions;
// export default workerSlice.reducer;
