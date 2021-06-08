import { Link } from "react-router-dom";
import { getCurrentVersions } from "../../redux/features/questions/questionsSelectors";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import { useAppDispatch, useAppSelector } from "../../redux/features/store";
import { upsertQuestion } from "../../redux/features/questions/questionsSlice";
import { v4 as uuidv4 } from 'uuid';


export const QuestionList = () => {
    const currentVersions = useAppSelector(getCurrentVersions);
    const dispatch = useAppDispatch();
    const [editOpen, setEditOpen] = useState(false);
    //TODO refactor to separate component
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const closeModal = () => {
        setEditOpen(false);
        setEditText('');
        setEditingQuestionId(null);
    }

    const handleEditQuestion = (questionId: string, text: string) => {
        setEditOpen(true);
        setEditText(text);
        setEditingQuestionId(questionId);
    }
    const handleAddQuestion = () => {
        setEditOpen(true);
    }

    const handleQuestionSubmit = (event: FormEvent<HTMLFormElement>) => {
        //TODO add form validation
        const questionId = editingQuestionId ?? uuidv4();
        dispatch(upsertQuestion({
            id: questionId, version: {
                text: editText,
                created: Date.now(),
                id: uuidv4(),
            }
        }));
        closeModal();
        event.preventDefault();
    }

    const handleEditText = (event: ChangeEvent<HTMLInputElement>) => {
        setEditText(event.currentTarget.value);
    };
    return (
        <>
            <div className="question-list">
                {currentVersions.map(currentVersion => (
                    <div className="question-list__version" key={currentVersion.version.id}>
                        <p><b>Text:</b> {currentVersion.version.text}</p>
                        <p><b>Last edited:</b> {new Date(currentVersion.version.created).toLocaleTimeString()}</p>
                        <p>
                            <button
                                onClick={() => handleEditQuestion(currentVersion.questionId, currentVersion.version.text)}>Edit
                                Question
                            </button>
                        </p>
                    </div>
                ))}
            </div>

            <ul>
                <li>
                    <button onClick={handleAddQuestion}>Add question</button>
                </li>
                <li>
                    <Link to={`/`}>
                        Back to start
                    </Link>
                </li>
            </ul>

            <Popup open={editOpen} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <button className="close" onClick={closeModal}>
                        &times;
                    </button>
                    <form onSubmit={handleQuestionSubmit} className="question-list__form">
                        <label>
                            Text:
                            <input type="text" value={editText} onChange={handleEditText}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </Popup>
        </>);
}