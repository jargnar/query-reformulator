"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [reformulatedQueries, setReformulatedQueries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/reformulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to reformulate query");
      }
      
      const data = await response.json();
      setReformulatedQueries(data.reformulatedQueries);
    } catch (err) {
      console.error(err);
      setError("An error occurred while reformulating your query. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-3xl flex flex-col items-center mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">Query Reformulator</h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Transform your complex questions into effective search queries
        </p>
      </header>

      <main className="w-full max-w-3xl flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="query" className="font-medium">
              Enter your question or request:
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., In what year was the winner of the 44th edition of the Miss World competition born?"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] bg-white dark:bg-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Reformulating...
              </span>
            ) : (
              "Reformulate Query"
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {reformulatedQueries.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Reformulated Queries:</h2>
            <ul className="space-y-3">
              {reformulatedQueries.map((reformulatedQuery, index) => (
                <li 
                  key={index}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                      {index + 1}
                    </span>
                    <p>{reformulatedQuery}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg mt-4">
          <h2 className="text-xl font-semibold mb-4">Examples:</h2>
          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-medium mb-2">Input:</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">In what year was the winner of the 44th edition of the Miss World competition born?</p>
              <p className="font-medium mb-2">Output:</p>
              <p className="text-gray-700 dark:text-gray-300">44th Miss World competition winner birth year</p>
            </div>
            
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-medium mb-2">Input:</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">Create a table for top noise cancelling headphones that are not expensive</p>
              <p className="font-medium mb-2">Output:</p>
              <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                <li>top noise cancelling headphones under $100</li>
                <li>top noise cancelling headphones $100 - $200</li>
                <li>best budget noise cancelling headphones</li>
                <li>noise cancelling headphones reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
