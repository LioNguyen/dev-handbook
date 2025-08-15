import { DashboardLayout } from '@/components/templates'
import { DashboardOverview } from '@/domains/dashboard/components'

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
