import { RootState } from "../store";
import { Question } from "./questionsSlice";

const getCurrentVersion = (state: RootState, question: Question) => state.questions.versions.find(q => q.id === question.currentVersion);
//TODO add reselect
export const getCurrentVersions = (state: RootState) => {
    return state.questions.questions!
        .filter(question => !question.deleted)
        .map(question => {
            return {
                questionId: question.id,
                version: getCurrentVersion(state, question)!
            }
        });
}