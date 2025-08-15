import {
  Activity,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { Card } from '@/components/ui'
import type { SystemHealth } from '../types'

export interface SystemHealthCardProps {
  health: SystemHealth
  isLoading?: boolean
  className?: string
}

export const SystemHealthCard = ({
  health,
  isLoading = false,
  className,
}: SystemHealthCardProps) => {
  if (isLoading) {
    return (
      <Card className={`p-6 ${className || ''}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    )
  }

  const getStatusConfig = (status: SystemHealth['status']) => {
    switch (status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'System Healthy',
          description: 'All systems operating normally',
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          label: 'Minor Issues',
          description: 'Some components need attention',
        }
      case 'critical':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Critical Issues',
          description: 'Immediate attention required',
        }
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Unknown',
          description: 'Status unknown',
        }
    }
  }

  const statusConfig = getStatusConfig(health.status)
  const StatusIcon = statusConfig.icon

  const formatLastCheck = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const metrics = [
    {
      label: 'Uptime',
      value: `${health.uptime.toFixed(1)}%`,
      icon: Activity,
      color:
        health.uptime >= 99
          ? 'text-green-600'
          : health.uptime >= 95
            ? 'text-yellow-600'
            : 'text-red-600',
    },
    {
      label: 'Response Time',
      value: `${health.responseTime}ms`,
      icon: Zap,
      color:
        health.responseTime <= 100
          ? 'text-green-600'
          : health.responseTime <= 200
            ? 'text-yellow-600'
            : 'text-red-600',
    },
    {
      label: 'Error Rate',
      value: `${health.errorRate}%`,
      icon: AlertCircle,
      color:
        health.errorRate <= 1
          ? 'text-green-600'
          : health.errorRate <= 3
            ? 'text-yellow-600'
            : 'text-red-600',
    },
  ]

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Health
        </h3>
        <div className={`p-2 rounded-full ${statusConfig.bgColor}`}>
          <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {statusConfig.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {metrics.map((metric) => {
          const MetricIcon = metric.icon
          return (
            <div
              key={metric.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <MetricIcon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.label}
                </span>
              </div>
              <span className={`text-sm font-medium ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          )
        })}
      </div>

      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Last check</span>
          </div>
          <span>{formatLastCheck(health.lastCheck)}</span>
        </div>
      </div>
    </Card>
  )
}
