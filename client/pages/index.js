import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`
      );
      console.log("Query being sent to backend:", query);

      setResults(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(`Error: ${err.response.data.error}`);
      } else {
        setError("An error occurred while fetching the data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10 px-4">
      <div>
        <img
          src="/CFlogo.png"
          alt="Chase Fraud Agency Directory Logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6">
        ChaseFraud Agency Directory
      </h1>
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter name of person or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {loading ? (
        <p className="text-gray-500 mt-6">Loading...</p>
      ) : (
        <div className="w-full max-w-3xl mt-6 space-y-4">
          {results.length === 0 && query && !loading && (
            <p className="text-gray-500">No records found.</p>
          )}
          {results.map((record, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {record.name}{" "}
                <span className="text-sm text-gray-500">({record.type})</span>
              </h3>
              <p className="text-gray-600">
                Crimes: {record.crimes.join(", ")}
              </p>
              <p className="text-gray-600 ">
                Under Investigation:{" "}
                <span
                  className={
                    record.underInvestigation
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {record.underInvestigation ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-600">
                Government Involvement:{" "}
                <span
                  className={
                    record.governmentInvolvement
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {record.governmentInvolvement ? "EFCC" : "No"}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                Last Updated: {new Date(record.lastUpdated).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Details:{" "}
                <span
                  className={
                    record.details
                      ? "text-gray-900 font-mono"
                      : "text-green-500"
                  }
                >
                  {record.details}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
