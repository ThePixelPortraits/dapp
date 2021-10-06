import { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { A } from 'hookrouter'

import { getUserCommissions } from 'api/queries/commissions'
import Create from 'components/commissions/actions/create/create'
import CommissionsCount from 'components/commissions/commissions-counts'
import Completed from 'components/commissions/status/completed/completed'
import Pending from 'components/commissions/status/pending/pending'
import Queue from 'components/queue/display-queue'
import CountdownBlock from 'components/ui/countdown'
import Modal from 'components/ui/modal'
import PageSection from 'components/ui/page-section'
import useMediaQuery from 'hooks/ui/useMediaQuery'

import {
  LayoutContainer,
  PageContent,
  PageHero,
  Hr,
  HeroText,
  HeroQueue,
} from 'components/styled/App.styled'
import { ContentContainer, Wave } from 'components/styled/page.styled'
import { theme } from 'themes/default.styled'

// import AnnouncementBanner from '../components/ui/announcement-banner'
// import { CountdownContainer } from '../components/ui/styled/countdown.styled'

const Home = () => {
  const { account, active } = useWeb3React()
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { loading, error, data } = useQuery(getUserCommissions, {
    variables: { address: account?.toLowerCase() },
    pollInterval: 30000,
    skip: !account,
  })
  const handleClose = () => setIsModalVisible(false)
  const handleOpen = () => setIsModalVisible(true)

  return (
    <LayoutContainer>
      <CommissionsCount handleOpen={handleOpen} />
      {/* <CountdownContainer> */}
      {/*  <AnnouncementBanner /> */}
      {/* </CountdownContainer> */}
      <CountdownBlock />
      <ContentContainer>
        <PageContent style={{ fontSize: '18px' }}>
          <PageHero>
            <HeroQueue>
              <Queue />
            </HeroQueue>
            {active && data?.commissionsByUser.length > 0 && (
              <PageSection pageTitle="your commissions" noPadding smallTitle>
                <Pending loading={loading} error={error} data={data} />
              </PageSection>
            )}
            {data?.commissionsByUser.length < 1 && (
              <HeroText>
                <>
                  <h1>
                    hi!
                    <Wave role="img" aria-label="wave">
                      👋🏻
                    </Wave>
                  </h1>
                  <br />
                </>
                {active ? (
                  data?.commissionsByUser.length < 1 && (
                    <>
                      to commission a new portrait click ‘create commission’
                      <br />
                      each portrait starts at 0.1 ETH!
                      <br />
                      pay more to skip ahead in line!
                      <br />
                      <br />
                      new here?
                    </>
                  )
                ) : (
                  <>
                    please connect your web3 wallet to commission portraits!
                    <br />
                  </>
                )}
                <br />
                <div>
                  head over to the&nbsp;
                  <A style={{ display: 'inline' }} href="/manifesto">
                    manifesto
                  </A>{' '}
                  to learn more!
                </div>
              </HeroText>
            )}
          </PageHero>
        </PageContent>
      </ContentContainer>
      {isTablet && <Hr />}
      {active && (
        <PageSection pageTitle="your portraits">
          <Completed />
        </PageSection>
      )}
      <Modal
        title="create commission"
        visible={isModalVisible}
        close={handleClose}
        width="780px"
      >
        <Create handleClose={handleClose} />
      </Modal>
    </LayoutContainer>
  )
}

export default Home
