import React, { useState } from "react";

function Query() {
  // Question data with multiple-choice options
  const questionData = {
    question:
      "Where would you go to find a treasure trove of knowledge and tales?",
    options: ["Park", "Museum", "Library", "Amusement Park"],
    correctAnswer: "Library",
    description:
      "Hint: It’s a place filled with books and offers a quiet atmosphere for exploration of ideas.",
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
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">
        Scavenger Hunt Adventure
      </h1>

      <div className="mb-6 bg-gray-700 p-4 rounded-lg">
        <p className="text-xl font-semibold text-yellow-400">
          {questionData.question}
        </p>
        <p className="text-sm text-gray-400 mt-2">{questionData.description}</p>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <label className="block text-yellow-400 font-semibold mb-2">
          Choose Your Answer:
        </label>
        {questionData.options.map((option, index) => (
          <label key={index} className="block text-white mb-3">
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="mr-2"
            />
            {option}
          </label>
        ))}

        <button
          type="submit"
          disabled={!selectedAnswer}
          className={`w-full py-2 mt-4 font-semibold rounded-md text-white 
                        ${
                          selectedAnswer
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-600 cursor-not-allowed"
                        }`}
        >
          Submit Answer
        </button>
      </form>

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback.includes("correct") ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}

export default Query;
