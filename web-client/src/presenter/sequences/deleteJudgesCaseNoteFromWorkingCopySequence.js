import { clearModalAction } from '../actions/clearModalAction';
import { clearModalStateAction } from '../actions/clearModalStateAction';
import { deleteJudgesCaseNoteAction } from '../actions/TrialSession/deleteJudgesCaseNoteAction';
import { getTrialSessionWorkingCopyAction } from '../actions/TrialSession/getTrialSessionWorkingCopyAction';
import { setTrialSessionWorkingCopyAction } from '../actions/TrialSession/setTrialSessionWorkingCopyAction';
import { setWaitingForResponseAction } from '../actions/setWaitingForResponseAction';
import { unsetWaitingForResponseAction } from '../actions/unsetWaitingForResponseAction';
import { updateCalendaredCaseJudgesNoteAction } from '../actions/TrialSessionWorkingCopy/updateCalendaredCaseJudgesNoteAction';
import { updateDeleteJudgesCaseNotePropsFromModalStateAction } from '../actions/TrialSessionWorkingCopy/updateDeleteJudgesCaseNotePropsFromModalStateAction';

export const deleteJudgesCaseNoteFromWorkingCopySequence = [
  setWaitingForResponseAction,
  updateDeleteJudgesCaseNotePropsFromModalStateAction,
  deleteJudgesCaseNoteAction,
  getTrialSessionWorkingCopyAction,
  setTrialSessionWorkingCopyAction,
  updateCalendaredCaseJudgesNoteAction,
  clearModalAction,
  clearModalStateAction,
  unsetWaitingForResponseAction,
];