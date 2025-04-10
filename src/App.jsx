// Folymarket – v3.0 UI Overhaul: Full styling pass with visual hierarchy, color-coded controls, and polished layout
import React, { useState } from "react";

export default function Folymarket() {
  const [scenarios, setScenarios] = useState([{
    title: "",
    variables: []
  }]);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const handleScenarioChange = (index, value) => {
    const updated = [...scenarios];
    updated[index].title = value;
    setScenarios(updated);
  };

  const addScenario = () => {
    saveHistory();
    setScenarios([
      ...scenarios,
      {
        title: "",
        variables: []
      }
    ]);
  };

  const clearAll = () => {
    saveHistory();
    setScenarios([{ title: "", variables: [] }]);
    setResults([]);
  };

  const addVariable = (sIndex) => {
    const updated = [...scenarios];
    updated[sIndex].variables.push({ label: "New Variable", value: 70, hasPressure: true, impactful: true });
    setScenarios(updated);
  };

  const updateVariable = (sIndex, vIndex, key, val) => {
    const updated = [...scenarios];
    updated[sIndex].variables[vIndex][key] = val;
    setScenarios(updated);
  };

  const togglePressure = (sIndex, vIndex) => {
    const updated = [...scenarios];
    updated[sIndex].variables[vIndex].hasPressure = !updated[sIndex].variables[vIndex].hasPressure;
    setScenarios(updated);
  };

  const toggleImpactful = (sIndex, vIndex) => {
    const updated = [...scenarios];
    updated[sIndex].variables[vIndex].impactful = !updated[sIndex].variables[vIndex].impactful;
    setScenarios(updated);
  };

  const saveHistory = () => {
    setHistory([...history, JSON.stringify(scenarios)]);
  };

  const undoLast = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setScenarios(JSON.parse(prev));
    setHistory(history.slice(0, -1));
  };

  const generateOdds = () => {
    const generated = scenarios.map((s) => {
      const pressureVars = s.variables.filter(v => v.hasPressure && v.impactful);
      const pressure = pressureVars.reduce((sum, v) => sum + parseInt(v.value || 0), 0);
      const avg = pressureVars.length > 0 ? Math.min(99, Math.max(1, Math.floor(pressure / pressureVars.length))) : 50;
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-teal-50 text-gray-900 p-8 font-sans">
      <h1 className="text-5xl font-black mb-6 text-orange-600 drop-shadow">Folymarket™ Scenario Simulator</h1>
      <p className="text-lg text-orange-900 mb-10 max-w-3xl">
        Model complex outcomes using dynamic scenario variables. Pressure sliders indicate real-world influence. Only impactful variables contribute to probabilistic outcome.
      </p>

      <div className="space-y-10">
        {scenarios.map((scenario, sIndex) => (
          <div key={sIndex} className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-teal-400">
            <input
              type="text"
              placeholder={`Enter scenario #${sIndex + 1}`}
              value={scenario.title}
              onChange={(e) => handleScenarioChange(sIndex, e.target.value)}
              className="w-full text-xl font-semibold p-3 mb-4 rounded border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <div className="space-y-6">
              {scenario.variables.map((v, vIndex) => (
                <div key={vIndex} className="bg-orange-50 p-4 rounded border border-orange-300">
                  <input
                    type="text"
                    value={v.label}
                    onChange={(e) => updateVariable(sIndex, vIndex, "label", e.target.value)}
                    className="w-full text-sm mb-2 p-2 rounded border border-gray-400"
                  />
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <input
                      type="checkbox"
                      checked={v.impactful}
                      onChange={() => toggleImpactful(sIndex, vIndex)}
                    />
                    Variable affects outcome
                  </label>
                  {v.impactful ? (
                    <>
                      <label className="flex items-center gap-2 text-sm mb-1">
                        <input
                          type="checkbox"
                          checked={v.hasPressure}
                          onChange={() => togglePressure(sIndex, vIndex)}
                        />
                        Show pressure slider
                      </label>
                      {v.hasPressure && (
                        <>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={v.value}
                            onChange={(e) => updateVariable(sIndex, vIndex, "value", e.target.value)}
                            className={`w-full accent-teal-600 h-2 rounded-full appearance-none ${v.value >= 66 ? 'bg-orange-300' : v.value <= 33 ? 'bg-teal-300' : 'bg-yellow-200'}`}
                          />
                          <div className="text-sm text-orange-700 mt-1 font-medium">Pressure: {v.value}%</div>
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-sm italic text-gray-400">This variable is informational only.</p>
                  )}
                </div>
              ))}
              <button
                onClick={() => addVariable(sIndex)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 mt-2 rounded-lg shadow"
              >
                + Add Variable
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        <button onClick={addScenario} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl text-lg font-semibold shadow">+ Add Scenario</button>
        <button onClick={generateOdds} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-lg font-semibold shadow">Generate Outcomes</button>
        <button onClick={undoLast} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-lg font-semibold shadow">Undo</button>
      </div>

      <div className="my-6">
        <button onClick={clearAll} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg">Clear All</button>
      </div>

      <div className="space-y-6 mt-12">
        {results.map((r, idx) => (
          <div key={idx} className="bg-white border-t-8 border-orange-500 p-6 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-orange-700 mb-2">{r.title}</h2>
            <p className="text-xl text-teal-700 font-semibold">Yes: {r.yes}¢ / No: {r.no}¢</p>
            <p className="text-sm text-gray-600">Total Pressure: {r.pressure}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
