import { FormEvent, useState } from "react";
import { Answer } from "../../redux/features/questionnaires/questionnairesSlice";
import { QuestionVersion } from "../../redux/features/questions/questionsSlice";
import { v4 as uuidv4 } from 'uuid';
import styles from './Questionnaire.module.css';
//TODO make it more abstract, like formView or smth

export type QuestionnaireViewProps = {
    client?: string,
    answers?: Answer[],
    questionVersions: QuestionVersion[],
    submitQuestionnaire?: (client: string, answers: Answer[]) => void,
    readonly: boolean,
}

export const QuestionnaireView = (props: QuestionnaireViewProps) => {
    const [answers, setAnswers] = useState(new Map(props.answers?.map(q => [q.questionVersionId, q])));
    const [client, setClient] = useState(props.client ?? '');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //TODO add form validation
        if (props.submitQuestionnaire && !Array.from(answers.values()).some(a => !a)) {
            props.submitQuestionnaire(client, Array.from(answers.values()) as Answer[]);
        }
        event.preventDefault();
    }

    const setAnswer = (value: string, versionId: string) => {
        if (!value) {
            return;
        }
        const newAnswers = new Map(answers);
        const answerId = answers.get(versionId)?.id ?? uuidv4();
        newAnswers.set(versionId, {
            id: answerId,
            text: value,
            questionVersionId: versionId,
        });
        setAnswers(newAnswers);
    }

    return (<form onSubmit={handleSubmit} className={styles.questionnaire}>
        <p>
            <label>
                Client name:
            </label>
            <input readOnly={props.readonly} value={client}
                   onChange={(event) => setClient(event.currentTarget.value)}/>
        </p>
        {props.questionVersions.map(questionVersion =>
            (<p>
                <label key={questionVersion.id}>
                    {questionVersion.text}
                </label>
                <input readOnly={props.readonly} value={answers.get(questionVersion.id)?.text ?? ''}
                       onChange={(event) => setAnswer(event.currentTarget.value, questionVersion.id)}/>
            </p>)
        )}
        {!props.readonly && <p><input type="submit" value="Submit"/></p>}
    </form>);
}