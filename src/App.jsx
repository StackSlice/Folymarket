// Folymarket – Upgraded Scenario Engine UI with dynamic variables, sliders, and improved styling
// Theme: Orange + Teal, bold typography, scalable layout for strategic modeling

import React, { useState } from "react";

export default function Folymarket() {
  const [scenarios, setScenarios] = useState([{
    title: "",
    variables: []
  }]);
  const [results, setResults] = useState([]);

  const handleScenarioChange = (index, value) => {
    const updated = [...scenarios];
    updated[index].title = value;
    setScenarios(updated);
  };

  const addScenario = () => {
    setScenarios([
      ...scenarios,
      {
        title: "",
        variables: []
      }
    ]);
  };

  const addVariable = (sIndex) => {
    const updated = [...scenarios];
    updated[sIndex].variables.push({ label: "New Variable", value: 50 });
    setScenarios(updated);
  };

  const updateVariable = (sIndex, vIndex, key, val) => {
    const updated = [...scenarios];
    updated[sIndex].variables[vIndex][key] = val;
    setScenarios(updated);
  };

  const generateOdds = () => {
    const generated = scenarios.map((s) => {
      const pressure = s.variables.reduce((sum, v) => sum + parseInt(v.value || 0), 0);
      const avg = Math.min(99, Math.max(1, Math.floor(pressure / (s.variables.length || 1))));
      return {
        title: s.title,
        yes: avg,
        no: 100 - avg,
        pressure
      };
    });
    setResults(generated);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900 p-6 font-sans">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b-4 border-teal-400 pb-2">Folymarket™ Scenario Simulator</h1>
      <p className="text-md text-orange-800 mb-6 max-w-xl">
        Simulate complex outcomes using dynamic variables. Each scenario calculates odds based on weighted pressure inputs.
      </p>

      {scenarios.map((scenario, sIndex) => (
        <div key={sIndex} className="bg-white shadow-lg rounded-xl p-4 mb-6 border-2 border-teal-400">
          <input
            type="text"
            placeholder={`Enter scenario #${sIndex + 1}`}
            value={scenario.title}
            onChange={(e) => handleScenarioChange(sIndex, e.target.value)}
            className="w-full p-3 mb-4 rounded border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div className="space-y-4">
            {scenario.variables.map((v, vIndex) => (
              <div key={vIndex} className="bg-orange-100 p-3 rounded border border-orange-300">
                <input
                  type="text"
                  value={v.label}
                  onChange={(e) => updateVariable(sIndex, vIndex, "label", e.target.value)}
                  className="w-full mb-2 p-2 rounded border border-gray-400"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={v.value}
                  onChange={(e) => updateVariable(sIndex, vIndex, "value", e.target.value)}
                  className="w-full accent-teal-500"
                />
                <div className="text-sm text-orange-700 mt-1">Pressure: {v.value}%</div>
              </div>
            ))}
            <button
              onClick={() => addVariable(sIndex)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              + Add Variable
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-4 mb-10">
        <button onClick={addScenario} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl text-lg">+ Add Scenario</button>
        <button onClick={generateOdds} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-lg">Generate Outcomes</button>
      </div>

      <div className="space-y-6">
        {results.map((r, idx) => (
          <div key={idx} className="bg-white border-t-4 border-orange-500 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700">{r.title}</h2>
            <p className="mt-2 text-teal-600 font-semibold">Yes: {r.yes}¢ / No: {r.no}¢</p>
            <p className="text-sm text-gray-500">Total Pressure: {r.pressure}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
