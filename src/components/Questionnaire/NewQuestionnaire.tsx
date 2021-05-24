import { useAppDispatch, useAppSelector } from "../../redux/features/store";
import { getCurrentVersions } from "../../redux/features/questions/questionsSelectors";
import { QuestionnaireView } from "./QuestionnaireView";
import { Answer, submitQuestionnaire } from "../../redux/features/questionnaires/questionnairesSlice";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const NewQuestionnaire = () => {
    const currentVersions = useAppSelector(getCurrentVersions);
    const dispatch = useAppDispatch();
    const [submitted, setSubmitted] = useState(false);
    const questionsWithEmptyAnswers = currentVersions.map(v => {
        return {
            version: v.version,
        };
    });
    const submitAnswers = (client: string, answers: Answer[]) => {
        dispatch(submitQuestionnaire({
            id: uuidv4(),
            created: Date.now(),
            answers: answers,
            client: client
        }));
        setSubmitted(true);
    }
    return (<>
        {!submitted &&
        <QuestionnaireView questions={questionsWithEmptyAnswers} submitQuestionnaire={submitAnswers} readonly={false}/>}
        {submitted &&  <p>Submitted successfully</p>}
        <ul>
            <li>
                <Link to={`/`}>
                    Back to start
                </Link>
            </li>
        </ul>

    </>);
}