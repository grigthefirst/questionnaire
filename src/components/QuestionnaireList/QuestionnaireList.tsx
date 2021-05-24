import { useAppSelector } from "../../redux/features/store";
import { getQuestionnaires } from "../../redux/features/questionnaires/questionnairiesSelectors";
import React from "react";
import { Link } from "react-router-dom";

export const QuestionnaireList = () => {
    const questionnaires = useAppSelector(getQuestionnaires);
    return (<div className="questionnaires">
        {questionnaires.map(q => (
            <div className="questionnaires_questionnaire" key={q.id}>
                <Link to={`/questionnaire/${q.id}`}>
                    <b>{q.client}</b> ({new Date(q.created).toLocaleTimeString()})
                </Link>
            </div>
        ))}
        <ul>
            <li>
                <Link to={`/questionnaire`}>Create new one</Link>
            </li>
            <li>
                <Link to={`/`}>Back to start</Link>
            </li>
        </ul>


    </div>);
}