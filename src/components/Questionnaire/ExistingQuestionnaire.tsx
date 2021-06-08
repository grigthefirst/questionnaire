import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/features/store";
import { makeGetClient, makeGetQuestionVersionsWithAnswers } from "../../redux/features/questionnaires/questionnairiesSelectors";
import { QuestionnaireView } from "./QuestionnaireView";

type QuestionnaireParams = {
    id: string;
};
export const ExistingQuestionnaire = () => {
    const params = useParams<QuestionnaireParams>();
    const questionVersionsWithAnswers = useAppSelector(makeGetQuestionVersionsWithAnswers(params.id));
    const client = useAppSelector(makeGetClient(params.id));

    return (<>
        <QuestionnaireView questionVersions={questionVersionsWithAnswers.map(q => q.version)}
                           answers={questionVersionsWithAnswers.map(q => q.answer)} client={client} readonly={true}/>
        <ul>
            <li>
                <Link to={`/`}>
                    Back to start
                </Link>
            </li>
        </ul>
    </>);
}