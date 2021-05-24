import { RootState } from "../store";
import { Question } from "./questionsSlice";

const getCurrentVersion = (state: RootState, question: Question) => state.questions.versions.find(q => q.id === question.currentVersion);

export const getCurrentVersions = (state: RootState) => {
    return Array.from(state.questions.questions.values())!
        .filter(question => !question.deleted)
        .map(question => {
            return {
                questionId: question.id,
                version: getCurrentVersion(state, question)!
            }
        });
}