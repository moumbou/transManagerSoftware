import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/pages/pageSlice'
import driversReducer from '../features/pages/DriverPageSlice'
import OpptionsReducer from '../features/pages/OpptionsSlice';
import MessageReducer from '../features/pages/MessageModel';
import TrucksReducer from '../features/pages/TruckPageSlice';
import SituationsReducer from '../features/pages/SituationPageSlice'


export const store = configureStore({
  reducer: {
    page: pageReducer,
    drivers: driversReducer,
    opperations: OpptionsReducer,
    messages: MessageReducer,
    trucks: TrucksReducer,
    situations: SituationsReducer
  },
});
