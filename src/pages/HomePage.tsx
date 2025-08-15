import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Users, Code } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useAuth } from '@/shared/hooks'

import { type LucideIcon } from 'lucide-react'

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) => (
  <Card className="p-6 text-center">
    <div className="mb-4 flex justify-center">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </Card>
)

export const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                React Boilerplate
              </span>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/login">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Production-Ready
            <span className="text-blue-600 dark:text-blue-400">
              {' '}
              React Boilerplate
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            A comprehensive React starter template with TypeScript, Tailwind
            CSS, and modern development tools. Built with atomic design
            principles and best practices.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Documentation
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Built with modern tools and best practices for enterprise
              applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Shield}
              title="Type Safe"
              description="Full TypeScript support with strict type checking and inference"
            />
            <FeatureCard
              icon={Zap}
              title="Fast Development"
              description="Hot reload, dev tools, and optimized build process with Vite"
            />
            <FeatureCard
              icon={Users}
              title="Authentication"
              description="Complete auth system with login, register, and protected routes"
            />
            <FeatureCard
              icon={Code}
              title="Modern Stack"
              description="React 19, TanStack Query, Zustand, and Tailwind CSS"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start with a solid foundation and focus on building your features.
            </p>

            {!isAuthenticated && (
              <Link to="/login">
                <Button size="lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
