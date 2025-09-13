import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight");
      return;
    }

    let heightInMeters, weightInKg;

    if (unit === "metric") {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = (parseFloat(height) * 2.54) / 100;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const getBMIColor = () => {
    if (!bmi) return "text-gray-600";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "text-blue-600";
    if (bmiValue < 25) return "text-green-600";
    if (bmiValue < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBgColor = () => {
    if (!bmi) return "bg-gray-50";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "bg-blue-50";
    if (bmiValue < 25) return "bg-green-50";
    if (bmiValue < 30) return "bg-yellow-50";
    return "bg-red-50";
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white-300 mb-2">
          BMI Calculator
        </h2>
        <p className="text-gray-300">
          Calculate your Body Mass Index and get health recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Calculate Your BMI
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center text-gray-800">
                  <input
                    type="radio"
                    value="metric"
                    checked={unit === "metric"}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mr-2"
                  />
                  Metric (cm/kg)
                </label>
                <label className="flex items-center text-gray-800">
                  <input
                    type="radio"
                    value="imperial"
                    checked={unit === "imperial"}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mr-2"
                  />
                  Imperial (in/lbs)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "170" : "68"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={calculateBMI}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex-1"
              >
                Calculate BMI
              </button>
              <button
                onClick={resetCalculator}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${getBMIBgColor()}`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>

          {bmi ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getBMIColor()}`}>
                  {bmi}
                </div>
                <div className="text-lg font-medium text-gray-700 mt-2">
                  {category}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  BMI Categories
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Underweight:</span>
                    <span className="text-blue-600">Below 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Normal weight:</span>
                    <span className="text-green-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Overweight:</span>
                    <span className="text-yellow-600">25 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Obese:</span>
                    <span className="text-red-600">30 and above</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500">
                Enter your measurements to calculate BMI
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
