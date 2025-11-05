/**
 * State Management Demos Page
 * Main page to access all state management demonstrations
 */

import { Link } from 'react-router-dom'

export function StateManagementDemos() {
  const demos = [
    {
      title: 'Context API',
      path: '/demos/context',
      description:
        'Built-in React Context with useReducer for simple state management',
      color: 'blue',
      installed: true,
    },
    {
      title: 'Redux Toolkit',
      path: '/demos/redux',
      description: 'Predictable state container with powerful DevTools',
      color: 'purple',
      installed: true,
    },
    {
      title: 'Redux Saga',
      path: '/demos/redux-saga',
      description: 'Complex async workflows with generator functions',
      color: 'green',
      installed: true,
    },
    {
      title: 'Zustand',
      path: '/demos/zustand',
      description: 'Minimal and fast state management without boilerplate',
      color: 'orange',
      installed: true,
    },
  ] as const

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    green: 'bg-green-50 border-green-200 hover:border-green-400',
    orange: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">State Management Demos</h1>
      <p className="text-gray-600 mb-8">
        Explore different state management solutions for React applications.
        Each demo includes working examples and documentation.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {demos.map((demo) => (
          <div
            key={demo.path}
            className={`p-6 border-2 rounded-lg transition ${
              colorClasses[demo.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl font-bold">{demo.title}</h2>
              {!demo.installed && (
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Not Installed
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{demo.description}</p>
            <Link
              to={demo.path}
              className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              View Demo →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Solution</th>
                <th className="text-left p-2">Best For</th>
                <th className="text-left p-2">Bundle Size</th>
                <th className="text-left p-2">Learning Curve</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">Context API</td>
                <td className="p-2">Small apps, simple state</td>
                <td className="p-2">0 KB (built-in)</td>
                <td className="p-2">Low</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Redux Toolkit</td>
                <td className="p-2">Large apps, debugging</td>
                <td className="p-2">~10 KB</td>
                <td className="p-2">Medium</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Redux Saga</td>
                <td className="p-2">Complex async flows</td>
                <td className="p-2">~15 KB</td>
                <td className="p-2">High</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Zustand</td>
                <td className="p-2">Flexible, modern apps</td>
                <td className="p-2">~1 KB</td>
                <td className="p-2">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
