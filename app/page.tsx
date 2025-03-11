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

  const handleExampleClick = (exampleText: string) => {
    setQuery(exampleText);
    document.getElementById("query")?.focus();
  };

  const exampleQueries = [
    "In what year was the winner of the 44th edition of the Miss World competition born?",
    "Create a table for top noise cancelling headphones that are not expensive",
    "What are the main differences between React and Angular frameworks?",
    "How to make homemade pasta without eggs?"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center">
            <Image 
              src="/images/brand-icon.png" 
              alt="Query Reformulator Logo" 
              width={24} 
              height={24} 
              className="mr-2"
            />
            <span className="font-bold text-2xl">Query Reformulator</span>
          </div>
          <p className="text-gray-600 mt-1">Transform your questions to effective search engine queries</p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="query" className="block mb-2 font-medium">
                Your Question / Interests
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your question or request..."
                className="w-full p-3 border border-gray-300 rounded min-h-[150px] text-base"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Reformulating..." : "Reformulate Query"}
              </button>
              <button
                type="button"
                onClick={() => handleExampleClick(exampleQueries[0])}
                className="text-blue-600 hover:underline text-sm"
              >
                Use sample query
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-100 text-red-800 rounded border border-red-200">
            {error}
          </div>
        )}

        {reformulatedQueries.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reformulated Queries:</h2>
            <ul className="space-y-3">
              {reformulatedQueries.map((reformulatedQuery, index) => (
                <li 
                  key={index}
                  className="py-2"
                >
                  <div className="flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <p>{reformulatedQuery}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
