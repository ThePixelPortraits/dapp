import { useState } from 'react'

import { Portrait, Presale } from './styled/members.styled'

const MemberCommission = ({ commission, handleClick, stopSelection }) => {
  const { presale, image_url, name, commissionId, zombie } = commission
  const [selected, setSelected] = useState(false)

  return (
    <Portrait
      selected={selected}
      zombie={zombie}
      onClick={() => {
        if (!zombie) {
          if (!stopSelection || selected) {
            setSelected(!selected)
            handleClick(commissionId, zombie)
          }
        }
      }}
    >
      <img
        alt={name}
        src={image_url}
        style={{
          filter: (selected || zombie) && 'grayscale(1)',
          height: '100%',
          width: '100%',
        }}
      />
      <span>{name}</span>
      {presale && (
        <span>
          <Presale selected={selected} zombie={zombie}>
            presale portrait
          </Presale>
        </span>
      )}
    </Portrait>
  )
}

export default MemberCommission
