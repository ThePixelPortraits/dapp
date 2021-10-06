import Button from 'components/ui/forms/button'

import { ButtonGroup } from 'components/styled/page.styled'

const CreateButton = ({ setOpen, style, align }) => (
  <ButtonGroup align={align}>
    <Button
      onClick={setOpen}
      extrastyles={{
        ...style,
      }}
    >
      <img
        src="images/thom_icon.png"
        width="40px"
        height="33px"
        alt="create commission"
      />
      create commission
    </Button>
  </ButtonGroup>
)

export default CreateButton
