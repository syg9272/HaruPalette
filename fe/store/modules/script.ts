import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface ScriptSlice {
  isRecoding: boolean;
  isPausing: boolean;
  curScriptIndex: number;
  totalScriptCount: number;
  nowScript: string[];
}

// 초기 상태 정의
const initialState: ScriptSlice = {
  isRecoding: false,
  isPausing: false,
  curScriptIndex: 0,
  totalScriptCount: 0,
  nowScript: [],
};

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    /** 일기 작성 페이지에 처음 진입 시 script index 초기화 */
    resetScriptIndexSuccess(state) {
      const temp = state;
      temp.isRecoding = false;
      temp.isPausing = false;
      temp.curScriptIndex = 0;
      temp.totalScriptCount = 0;
      temp.nowScript = [];
    },
    /** 시작하기 버튼 */
    startDiarySuccess(state) {
      const temp = state;
      temp.curScriptIndex = state.curScriptIndex + 1;
    },
    /** 대화하기 버튼을 통해 녹음 시작 */
    startRecodingSuccess(state) {
      const temp = state;
      temp.isRecoding = true;
    },
    /** 일시정지 버튼을 통해 녹음을 일시 정지 */
    pauseRecodeingSuccess(state) {
      const temp = state;
      temp.isPausing = true;
    },
    /** 재생 버튼을 통해 녹음을 다시 재생 */
    restartRecodingSuccess(state) {
      const temp = state;
      temp.isPausing = false;
    },
    /** 대화 파일 저장 */
    recodingSuccess(state) {
      const temp = state;
      temp.isRecoding = false;
      temp.isPausing = false;
      temp.curScriptIndex = Math.min(state.curScriptIndex + 1, 2);
      temp.totalScriptCount = state.totalScriptCount + 1;
    },
    /** 대화 종료 버튼 */
    endDiarySuceess(state) {
      const temp = state;
      temp.curScriptIndex = state.curScriptIndex + 1;
    },
    /** 받아온 데이터 넣기 */
    setScript(state, action) {
      const temp = state;
      temp.nowScript[action.payload.index] = action.payload.contents;
    },
    /** 메인 페이지 입장 시 효과 시작 */
    setPulseStart(state) {
      const temp = state;
      temp.isRecoding = true;
    },
  },
});

// 액션 생성함수
export const {
  resetScriptIndexSuccess,
  startDiarySuccess,
  startRecodingSuccess,
  pauseRecodeingSuccess,
  restartRecodingSuccess,
  recodingSuccess,
  endDiarySuceess,
  setScript,
  setPulseStart,
} = scriptSlice.actions;
export const selectScript = (state: RootState) => state.script;
// 리듀서
export default scriptSlice.reducer;
