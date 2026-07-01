import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface OperatorInfo {
  id: number;
  fullName: string;
  startStatusTimestamp: number;
  status: string;
}

interface OperatorsState {
  operators: OperatorInfo[];
  queueCallsCount: number;
  countActiveCalls: number;
}

const initialState: OperatorsState = {
  operators: [],
  queueCallsCount: 0,
  countActiveCalls: 0,
};

const operatorsSlice = createSlice({
  name: 'operatorsSlice',
  initialState,
  reducers: {
    setQueueCallsCount: (state, action: PayloadAction<number>) => {
      state.queueCallsCount = action.payload;
    },
    setCountActiveCalls: (state, action: PayloadAction<number>) => {
      state.countActiveCalls = action.payload;
    },
    setOperators: (state, action: PayloadAction<OperatorInfo[]>) => {
      state.operators = action.payload;
    },
    updateOperator: (state, action: PayloadAction<OperatorInfo>) => {
      const operatorIndex = state.operators.findIndex((el) => el.id === action.payload.id);
      if (operatorIndex === -1) {
        state.operators.push(action.payload);
      } else {
        state.operators[operatorIndex] = action.payload;
      }
    },
    deleteOperator: (state, action: PayloadAction<number>) => {
      state.operators = state.operators.filter((el) => el.id !== action.payload);
    },
  },
});

export const {
  setQueueCallsCount,
  setCountActiveCalls,
  setOperators,
  updateOperator,
  deleteOperator,
} = operatorsSlice.actions;
export const operatorsReducer = operatorsSlice.reducer;
