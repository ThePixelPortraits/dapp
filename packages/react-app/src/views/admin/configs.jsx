import { useWeb3React } from '@web3-react/core'

import RegisterNames from 'components/admin/actions/register-names'
import UpdateAdminAddress from 'components/admin/actions/update-admin-address'
import UpdateMinBid from 'components/admin/actions/update-min-bid'
import PageSection from 'components/ui/page-section'
import PageSubSection from 'components/ui/sub-section'
import Loader from 'components/ui/widgets/loader'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

import { PageTitle } from 'components/styled/App.styled'
import { Dashboard, Main, Sidebar } from 'components/styled/dashboard.styled'

const AdminConfigs = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)

  if (!account) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <PageTitle>configs</PageTitle>
      <Dashboard>
        <Main>
          <PageSection pageTitle="update admin address" danger>
            <UpdateAdminAddress />
          </PageSection>
        </Main>
        <Sidebar>
          <PageSection>
            <PageSubSection pageTitle="register names">
              <p style={{ fontSize: '12px' }}>
                comma separated (ie thom,jamie,mark)
              </p>
              <RegisterNames />
            </PageSubSection>
            <PageSubSection pageTitle="update min bid">
              <UpdateMinBid />
            </PageSubSection>
          </PageSection>
        </Sidebar>
      </Dashboard>
    </>
  )
}

export default AdminConfigs
