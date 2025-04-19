// import './Question.css'

import { useState } from "react";

export interface QuestionAPIStructure {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];    
} 

export interface QuestionProps {
    questionAPIStructure: QuestionAPIStructure;
    onAnswer: (correct: boolean) => void;
} 

function Question(questionProps: QuestionProps) {
    const [answers, setAnswers] = useState<string[]>([]);

    function checkCorrect(answer: string) {
        if (answer === questionProps.questionAPIStructure.correct_answer) {
            questionProps.onAnswer(true);
            return;
        }

        questionProps.onAnswer(false);
    }

    // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
    function shuffle(array: string[]) {        
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    function randomizeAnswers() {
        const allAnswers = [
            questionProps.questionAPIStructure.correct_answer,
            ...questionProps.questionAPIStructure.incorrect_answers
        ];

        if (allAnswers.length > 2) {
            shuffle(allAnswers);
        }        

        setAnswers(allAnswers);
    }

    return (
        <div>
            <h1>{questionProps.questionAPIStructure.question}</h1>
            {answers.map((answer, i) => (
                <button key={i} onClick={() => checkCorrect(answer)}>{answer}</button>
            ))}
        </div>
    );
}

export default Question;