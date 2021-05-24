import { RootState } from "../store";
import { QuestionVersion } from "../questions/questionsSlice";
import { Answer } from "./questionnairesSlice";
type Question = {
    version: QuestionVersion,
    answer?: Answer,
}
export const makeGetQuestions =
    (id: string) => (state: RootState): Question[] => {
    const questionnaire = state.questionnaires.questionnaires.find(q => q.id === id);
    return questionnaire?.answersIds.map(answerId => {
        const answer = state.questionnaires.answers.find(a => a.id === answerId);
        return {
            version: state.questions.versions.find(v => v.id === answer!.questionVersionId)!,
            answer: answer
        };
    }) || [];
};

export const makeGetClient =
    (id: string) => (state: RootState) => state.questionnaires.questionnaires.find(q => q.id === id)?.client;

export const getQuestionnaires = (state: RootState) => state.questionnaires.questionnaires.map(q => { return {
    client: q.client,
    id: q.id,
    created: q.created
}})