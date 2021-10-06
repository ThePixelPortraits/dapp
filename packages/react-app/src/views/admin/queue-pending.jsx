import { useWeb3React } from '@web3-react/core'

import PendingCommissionQueue from 'components/admin/queues/pending-commission-queue'
import PageSection from 'components/ui/page-section'
import Loader from 'components/ui/widgets/loader'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

const AdminPending = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)

  if (!account) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  return (
    <PageSection
      pageTitle="pending commissions"
      style={{ border: '1px solid #f5f5f5', background: '#fafafa' }}
    >
      <PendingCommissionQueue />
    </PageSection>
  )
}

export default AdminPending
