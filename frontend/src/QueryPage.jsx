import React, { useState } from 'react';

// CSS styling within the same file
const styles = `
.Query {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    font-family: 'Comic Sans MS', sans-serif;
    background-color: #f5f3c1;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
}

h1 {
    font-size: 2rem;
    color: #4a752c;
    margin-bottom: 20px;
}

.question-section {
    margin-bottom: 25px;
    background-color: #eaf4d3;
    padding: 20px;
    border-radius: 10px;
}

.question {
    font-size: 1.4rem;
    font-weight: bold;
    color: #346b30;
}

.description {
    font-size: 1rem;
    color: #5c7d42;
    margin-top: 10px;
}

.answer-form {
    margin-top: 20px;
}

.answer-form label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #4a752c;
}

.answer-option {
    display: block;
    margin-bottom: 10px;
    color: #333;
}

.answer-form button {
    padding: 12px 25px;
    font-size: 1rem;
    color: #fff;
    background-color: #6a994e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.answer-form button:hover {
    background-color: #527a3c;
}

.feedback {
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #527a3c;
}

.feedback:empty {
    display: none;
}
`;

// Inject CSS styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function Query() {
    // Question data with multiple-choice options
    const questionData = {
        question: "Where would you go to find a treasure trove of knowledge and tales?",
        options: ["Park", "Museum", "Library", "Amusement Park"],
        correctAnswer: "Library",
        description: "Hint: It’s a place filled with books and offers a quiet atmosphere for exploration of ideas.",
    };

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    // Handle answer submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer === questionData.correctAnswer) {
            setFeedback("Great job! You found the correct answer.");
        } else {
            setFeedback("Not quite right. Try exploring other options!");
        }
    };

    return (
        <div className="Query">
            <h1>Scavenger Hunt Adventure</h1>

            <div className="question-section">
                <p className="question">{questionData.question}</p>
                <p className="description">{questionData.description}</p>
            </div>

            <form className="answer-form" onSubmit={handleSubmit}>
                <label>Choose Your Answer:</label>
                {questionData.options.map((option, index) => (
                    <label key={index} className="answer-option">
                        <input
                            type="radio"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                        {option}
                    </label>
                ))}
                <button type="submit" disabled={!selectedAnswer}>Submit Answer</button>
            </form>

            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
}

export default Query;
