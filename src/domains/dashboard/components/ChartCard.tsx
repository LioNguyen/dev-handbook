import { Card } from '@/components/ui'
import type { ChartData } from '../types'

export interface ChartCardProps {
  title: string
  description?: string
  data: ChartData
  type?: 'line' | 'bar' | 'doughnut' | 'area'
  height?: number
  isLoading?: boolean
  className?: string
}

export const ChartCard = ({
  title,
  description,
  data,
  type = 'line',
  height = 300,
  isLoading = false,
  className,
}: ChartCardProps) => {
  if (isLoading) {
    return (
      <Card className={`p-6 ${className || ''}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          {description && (
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          )}
          <div
            className={`bg-gray-200 rounded`}
            style={{ height: `${height}px` }}
          ></div>
        </div>
      </Card>
    )
  }

  // Simple visualization since we don't have a chart library
  // In a real app, you'd use Chart.js, Recharts, or similar
  const renderSimpleChart = () => {
    if (type === 'doughnut' && data.datasets[0]) {
      const dataset = data.datasets[0]
      const total = dataset.data.reduce((sum, value) => sum + value, 0)

      return (
        <div
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="mb-4">
              <div className="w-32 h-32 mx-auto relative">
                {data.labels.map((label, index) => {
                  const value = dataset.data[index]
                  const percentage = (value / total) * 100
                  const color = Array.isArray(dataset.backgroundColor)
                    ? dataset.backgroundColor[index]
                    : dataset.backgroundColor || '#3B82F6'

                  return (
                    <div key={label} className="mb-2">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm text-gray-500">
                          {value} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Line/Area/Bar chart simulation
    const maxValue = Math.max(
      ...data.datasets.flatMap((dataset) => dataset.data)
    )

    return (
      <div className="space-y-4" style={{ height: `${height}px` }}>
        {/* Legend */}
        <div className="flex gap-4 flex-wrap">
          {data.datasets.map((dataset, index) => {
            const color =
              dataset.borderColor ||
              (Array.isArray(dataset.backgroundColor)
                ? dataset.backgroundColor[0]
                : dataset.backgroundColor) ||
              '#3B82F6'

            return (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm font-medium">{dataset.label}</span>
              </div>
            )
          })}
        </div>

        {/* Simple chart representation */}
        <div className="flex-1 flex items-end gap-2 px-4">
          {data.labels.map((label, labelIndex) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex flex-col gap-1">
                {data.datasets.map((dataset, datasetIndex) => {
                  const value = dataset.data[labelIndex]
                  const heightPercentage = (value / maxValue) * 100
                  const color =
                    dataset.borderColor ||
                    (Array.isArray(dataset.backgroundColor)
                      ? dataset.backgroundColor[0]
                      : dataset.backgroundColor) ||
                    '#3B82F6'

                  return (
                    <div
                      key={datasetIndex}
                      className="rounded-t"
                      style={{
                        height: `${Math.max(heightPercentage * 2, 4)}px`,
                        backgroundColor: color,
                        opacity: type === 'area' ? 0.7 : 1,
                      }}
                      title={`${dataset.label}: ${value}`}
                    ></div>
                  )
                })}
              </div>
              <span className="text-xs text-gray-500 text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {description}
          </p>
        )}
      </div>

      {renderSimpleChart()}
    </Card>
  )
}
