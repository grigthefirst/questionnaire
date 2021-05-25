import { FormEvent, useState } from "react";
import { Answer } from "../../redux/features/questionnaires/questionnairesSlice";
import { QuestionVersion } from "../../redux/features/questions/questionsSlice";
import { v4 as uuidv4 } from 'uuid';
//TODO make it more abstract, like formView or smth
type Question = {
    version: QuestionVersion,
    answer?: Answer,
}

export type QuestionnaireViewProps = {
    client?: string,
    //TODO pass versions and answers as separate params
    questions: Question[],
    submitQuestionnaire?: (client: string, answers: Answer[]) => void,
    readonly: boolean,
}

export const QuestionnaireView = (props: QuestionnaireViewProps) => {
    const [answers, setAnswers] = useState(new Map(props.questions.map(q => [q.version.id, q.answer])));
    const [client, setClient] = useState(props.client ?? '');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    return (<form onSubmit={handleSubmit} className="questionnaire">
        <p>
            <label className="questionnaire__question">
                Client name:
            </label>
            <input readOnly={props.readonly} value={client}
                   onChange={(event) => setClient(event.currentTarget.value)}/>
        </p>
        {props.questions.map(question =>
            (<p>
                <label className="questionnaire__question" key={question.version.id}>
                    {question.version.text}
                </label>
                <input readOnly={props.readonly} value={answers.get(question.version.id)?.text ?? ''}
                       onChange={(event) => setAnswer(event.currentTarget.value, question.version.id)}/>
            </p>)
        )}
        {!props.readonly && <p><input type="submit" value="Submit"/></p>}
    </form>);
}