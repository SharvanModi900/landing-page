import React from "react";

const ApiReference = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-[70px]">
      <h1 className="text-4xl font-bold mb-8 text-center">PoPP API Reference</h1>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <p>
          Welcome to the PoPP API! This API allows you to interact with the
          Proof-of-Problem Protocol for verifying, validating, and escalating
          real-world problems.
        </p>
      </section>

      {/* Authentication */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Authentication</h2>
        <p>All API requests must include an API key in the header:</p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded my-4 overflow-x-auto">
          <code>Authorization: Bearer &lt;your_api_key&gt;</code>
        </pre>
      </section>

      {/* Endpoints */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5">Endpoints</h2>

        {/* Problems */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Problems</h3>

          <div className="mb-4">
            <h4 className="font-semibold">GET /api/problems</h4>
            <p>Retrieve a list of all problems.</p>
            <p className="italic mb-1">Optional query parameter:</p>
            <ul className="list-disc list-inside mb-2">
              <li><code>status</code>: Filter by problem status (open, closed, etc.)</li>
            </ul>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
              <code>
{`[
  {
    "id": "123",
    "title": "Problem title",
    "status": "open",
    "created_at": "2025-08-01T12:00:00Z"
  }
]`}
              </code>
            </pre>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">POST /api/problems</h4>
            <p>Create a new problem.</p>
            <p className="italic mb-1">Body parameters:</p>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto mb-2">
              <code>
{`{
  "title": "Problem title",
  "description": "Detailed problem description"
}`}
              </code>
            </pre>
            <p className="italic mb-1">Response:</p>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
              <code>
{`{
  "id": "124",
  "title": "Problem title",
  "status": "open"
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Users */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <div>
            <h4 className="font-semibold">GET /api/users/{`{userId}`}</h4>
            <p>Get details of a specific user.</p>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
              <code>
{`{
  "id": "user123",
  "username": "popplover",
  "joined_at": "2025-01-01T10:00:00Z"
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Votes */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Votes</h3>
          <div>
            <h4 className="font-semibold">POST /api/problems/{`{problemId}`}/votes</h4>
            <p>Cast a vote on a problem.</p>
            <p className="italic mb-1">Body:</p>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto mb-2">
              <code>
{`{
  "vote": "up"  // or "down"
}`}
              </code>
            </pre>
            <p className="italic mb-1">Response:</p>
            <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
              <code>
{`{
  "problemId": "123",
  "votes": {
    "up": 10,
    "down": 2
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Error Codes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Error Codes</h2>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-2">Code</th>
              <th className="border border-gray-300 px-3 py-2">Message</th>
              <th className="border border-gray-300 px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: 400, msg: "Bad Request", desc: "Invalid request parameters" },
              { code: 401, msg: "Unauthorized", desc: "Missing or invalid API key" },
              { code: 404, msg: "Not Found", desc: "Resource not found" },
              { code: 500, msg: "Internal Server Error", desc: "Server encountered an error" },
            ].map(({ code, msg, desc }) => (
              <tr key={code} className="odd:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 font-mono">{code}</td>
                <td className="border border-gray-300 px-3 py-2">{msg}</td>
                <td className="border border-gray-300 px-3 py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Examples</h2>
        <p>Get all open problems:</p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
          <code>
            {`curl -H "Authorization: Bearer <your_api_key>" https://api.popp.io/api/problems?status=open`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default ApiReference;
