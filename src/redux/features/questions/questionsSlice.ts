import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//TODO can add generic like QuestionVersion<Payload> and add some logic
// to resolve serializers (to draw version and submit answers)
export type QuestionVersion = {
    id: string;
    text: string;
    created: number;
}

export type Question = {
    id: string;
    versionsIds: string[];
    currentVersion: string;
    deleted: boolean;
}

type QuestionsState = {
    questions: Question[];
    versions: QuestionVersion[];
}

type QuestionPayload = {
    id: string;
    version: QuestionVersion;
}

const initialState: QuestionsState = {
    questions: [],
    versions: [],
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        upsertQuestion: (state, action: PayloadAction<QuestionPayload>) => {
            const question = state.questions.find(q => q.id === action.payload.id);
            state.versions.push(action.payload.version);
            if(question) {
                question.versionsIds.push(action.payload.version.id);
                question.currentVersion = action.payload.version.id;
            }
            else {
                state.questions.push(
                    {
                        id: action.payload.id,
                        versionsIds: [action.payload.version.id],
                        currentVersion: action.payload.version.id,
                        deleted: false,
                    }
                );
            }
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            const question = state.questions.find(q => q.id === action.payload);
            if(question) {
                question.deleted = true;
            }
        },
    }
});

export const {upsertQuestion, removeQuestion} = questionsSlice.actions;