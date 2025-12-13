'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ApiTester() {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Test API ElysiaJS
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          API URL: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{API_URL}</code>
        </p>
      </div>

      <button
        onClick={testApi}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? 'Chargement...' : 'Tester l&apos;API'}
      </button>

      {error && (
        <div className="mt-6 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="text-sm mt-2">
            Assurez-vous que l&apos;API est démarrée sur <code>{API_URL}</code>
          </p>
        </div>
      )}

      {response !== null && !loading && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Réponse de l&apos;API
          </h2>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

