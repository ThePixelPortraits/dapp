import { useQuery } from '@apollo/react-hooks'

import { getAdmin } from 'api/queries/config'

const useCheckAdmin = address => {
  const { data } = useQuery(getAdmin, {
    variables: { address },
    skip: !address,
  })
  return data?.admin
}

export default useCheckAdmin
