// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
// import projectMaterialReducer from './slices/projectMaterialSlice'
import taskReducer from './slices/taskSlice'

export const store = configureStore({
  reducer: {
    // worker: workerReducer,
    task: taskReducer,
    // projectMaterial: projectMaterialReducer,
  },
})

// Infer types for TypeScript support
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
