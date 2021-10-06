import { useQuery } from '@apollo/react-hooks'

import { getPositionForPrice, getTopCommission } from 'api/queries/commissions'

import {
  Highlight,
  Messaging,
  AlertText,
  SidebarList,
  SidebarListItem,
} from 'components/styled/create.styled'

const SidebarDetails = ({ price }) => {
  const { data } = useQuery(getTopCommission)
  const { loading, data: position } = useQuery(getPositionForPrice, {
    variables: { price: price?.toString() },
    skip: !price,
  })

  return (
    <Messaging>
      <AlertText>top commission value</AlertText>
      <Highlight>{data?.topCommissionPrice} ETH</Highlight>
      <AlertText>your expected position in the queue</AlertText>
      <Highlight>{loading ? '...' : position?.position}</Highlight>
      <br />
      <AlertText>
        <SidebarList>
          <SidebarListItem>
            human, ape, alien & other humanoid subjects are strongly encouraged!
          </SidebarListItem>
          <SidebarListItem>no pets except mooncats!</SidebarListItem>
          <li>feel free to make us an offer we can’t refuse though!</li>
        </SidebarList>
      </AlertText>
    </Messaging>
  )
}

export default SidebarDetails
