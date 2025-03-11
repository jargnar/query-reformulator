# Query Reformulator

A Next.js application that uses Groq's AI to transform complex questions and requests into effective search engine queries.

## Features

- Transform complex questions into concise search queries
- Fast response times (optimized for low latency)
- Simple and intuitive user interface
- Dark mode support
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Groq API key (get one at [console.groq.com](https://console.groq.com))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/query-reformulator.git
cd query-reformulator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter your complex question or request in the input field
2. Click the "Reformulate Query" button
3. View the reformulated search queries that can be used to find the information you need

## Examples

### Example 1:
**Input:** In what year was the winner of the 44th edition of the Miss World competition born?

**Output:** 44th Miss World competition winner birth year

### Example 2:
**Input:** Who lived longer, Nikola Tesla or Milutin Milankovic?

**Outputs:**
- Nikola Tesla lifespan
- Milutin Milankovic lifespan

### Example 3:
**Input:** Create a table for top noise cancelling headphones that are not expensive

**Outputs:**
- top noise cancelling headphones under $100
- top noise cancelling headphones $100 - $200
- best budget noise cancelling headphones
- noise cancelling headphones reviews

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Groq API](https://console.groq.com/) - AI language model
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
