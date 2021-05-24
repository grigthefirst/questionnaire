import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Answer = {
    id: string,
    text: string,
    questionVersionId: string,
};

type Questionnaire = {
    id: string,
    client: string,
    answersIds: string[],
    created: number,
}

type QuestionnairesState = {
    questionnaires: Questionnaire[],
    answers: Answer[],
}

const initialState: QuestionnairesState = {
    questionnaires: [],
    answers: [],
};

type QuestionnairePayload = {
    id: string,
    client: string,
    created: number,
    answers: Answer[],
}

export const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
        submitQuestionnaire: (state, action: PayloadAction<QuestionnairePayload>) => {
            state.questionnaires.push({
                id: action.payload.id,
                client: action.payload.client,
                answersIds: action.payload.answers.map(a => a.id),
                created: action.payload.created,
            });
            state.answers = [...state.answers, ...action.payload.answers];
        }
    }
});

export const { submitQuestionnaire } = questionnairesSlice.actions;