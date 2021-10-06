import { CommissionActions } from 'components/commissions/styled/pending.styled'

const Message = ({ flagged }) => (
  <CommissionActions style={{ flex: '0 0 25%' }}>
    {flagged ? (
      <p>please email us from a different address or dm us on twitter!</p>
    ) : (
      <p>please wait for the artist to contact you!</p>
    )}
  </CommissionActions>
)

export default Message
