// src/BMICalculator.js
import React, { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height from cm to meters

    if (isNaN(weightInKg) || isNaN(heightInM) || heightInM === 0) {
      alert('Please enter valid values for weight and height.');
      return;
    }

    const calculatedBMI = weightInKg / (heightInM * heightInM);
    setBMI(calculatedBMI.toFixed(2));
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">BMI Calculator</h1>
      <div className="flex items-center mb-4 bg-cyan-500 shadow-lg shadow-cyan-500/50">
        <label className="mr-2">Weight (kg):</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="flex items-center mb-4 bg-cyan-500 shadow-lg shadow-cyan-500/50">
        <label className="mr-2 ">Height (cm):</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="flex">
        <button onClick={calculateBMI} className="bg-blue-500 text-white px-4 py-2 mr-2">
          Calculate BMI
        </button>
        <button onClick={resetCalculator} className="bg-gray-500 text-white px-4 py-2">
          Reset
        </button>
      </div>
      {bmi !== null && (
        <div className="mt-4">
          <p>Your BMI is: {bmi}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
