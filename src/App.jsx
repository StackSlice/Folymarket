// Folymarket - React App with Variable-Weighted Odds
// Simulates Polymarket-style predictions with user-controlled variables

import React, { useState } from "react";

export default function Folymarket() {
  const [questions, setQuestions] = useState([{
    text: "",
    variables: [
      { label: "Public pressure", weight: 10, active: false },
      { label: "Legal deadline passed", weight: 15, active: false },
      { label: "Media coverage", weight: 5, active: false }
    ]
  }]);

  const [results, setResults] = useState([]);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const toggleVariable = (qIndex, vIndex) => {
    const updated = [...questions];
    updated[qIndex].variables[vIndex].active = !updated[qIndex].variables[vIndex].active;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        variables: [
          { label: "Public pressure", weight: 10, active: false },
          { label: "Legal deadline passed", weight: 15, active: false },
          { label: "Media coverage", weight: 5, active: false }
        ]
      }
    ]);
  };

  const generateOdds = () => {
    const generated = questions.map((q) => {
      const totalWeight = q.variables
        .filter((v) => v.active)
        .reduce((sum, v) => sum + v.weight, 0);
      let yes = Math.min(99, Math.max(1, 50 + totalWeight));
      let no = 100 - yes;
      const rationale = generateRationale();
      return { q: q.text, yes, no, rationale };
    });
    setResults(generated);
  };

  const generateRationale = () => {
    const rationales = [
      "Scenario inputs increase likelihood.",
      "Weight of variables adjusted odds upward.",
      "Neutral factors yield average outcome.",
      "Key factors absent, odds remain low.",
      "Real-world precedent supports result."
    ];
    return rationales[Math.floor(Math.random() * rationales.length)];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Folymarket™ Prediction Simulator</h1>
      <p className="mb-4 text-sm text-gray-400">
        All predictions are simulated for strategic modeling. No financial value or wagering. Not affiliated with Polymarket.
      </p>

      {questions.map((question, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
          <input
            value={question.text}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={`Enter market question #${index + 1}`}
            className="w-full mb-2 p-2 bg-gray-700 rounded border border-gray-600"
          />

          <div className="space-y-1 text-sm">
            {question.variables.map((v, vIndex) => (
              <div key={vIndex}>
                <label>
                  <input
                    type="checkbox"
                    checked={v.active}
                    onChange={() => toggleVariable(index, vIndex)}
                    className="mr-2"
                  />
                  {v.label} (+{v.weight}%)
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-2 mb-6">
        <button onClick={addQuestion} className="bg-gray-700 px-4 py-2 rounded">+ Add Question</button>
        <button onClick={generateOdds} className="bg-blue-600 px-4 py-2 rounded">Generate Odds</button>
      </div>

      <div className="space-y-6">
        {results.map((r, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{r.q}</h2>
            <p className="mt-2 text-green-400">Yes: {r.yes}¢ / No: {r.no}¢</p>
            <p className="text-sm text-gray-400 mt-1">{r.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
