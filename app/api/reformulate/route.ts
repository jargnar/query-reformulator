import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  // Set a shorter timeout to meet the 100ms latency requirement
  timeout: 5000, // 5 seconds max timeout
});

// Prompt template for query reformulation
const SYSTEM_PROMPT = `You are a specialized AI that reformulates complex questions or requests into effective search engine queries.
Your task is to analyze the input and generate one or more search queries that would help find the requested information.

Guidelines:
1. Focus on extracting key terms and concepts from the input.
2. Remove unnecessary words, articles, and pronouns.
3. Use specific search operators when appropriate.
4. For complex questions, break them down into multiple simpler queries.
5. Ensure each query is concise and focused on a specific aspect of the question.
6. Return ONLY the reformulated queries, one per line, with no explanations or additional text.
7. Return between 1-5 queries depending on the complexity of the input.

Remember, your output should ONLY contain the reformulated queries, nothing else.`;

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Call the Groq API with the user's query
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: query }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 200,
      top_p: 0.9,
    });

    // Extract the reformulated queries from the response
    const content = completion.choices[0]?.message?.content || "";
    const reformulatedText = content.trim();
    const reformulatedQueries = reformulatedText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return NextResponse.json({ reformulatedQueries });
  } catch (error) {
    console.error("Error reformulating query:", error);
    return NextResponse.json(
      { error: "Failed to reformulate query" },
      { status: 500 }
    );
  }
} 