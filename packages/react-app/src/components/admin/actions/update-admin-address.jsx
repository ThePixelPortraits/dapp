// import React, { useState, useContext } from 'react'
//
// import { AppContext } from '../../context/AppContext'
// import { theme } from '../../themes/default.styled'
// import { ButtonGroup } from '../styled/page.styled'
// import Button from '../ui/forms/button'
// import FormInput from '../ui/forms/input'

const UpdateAdminAddress = () => {
  return 'not here for safety right now'
  // const [isModalVisible, setIsModalVisible] = useState(false)
  // const [newAddress, setNewAddress] = useState('')
  // const handleHide = () => setIsModalVisible(false)
  // const { pixelsContract } = useContext(AppContext)
  //
  // return (
  //   <>
  //     <FormInput
  //       property="address"
  //       required
  //       onBlur={e => {
  //         setNewAddress(e.target.value)
  //       }}
  //     />
  //     <Button
  //       extrastyles={{ background: theme.colors.red }}
  //       onClick={() => setIsModalVisible(true)}
  //     >
  //       Submit
  //     </Button>
  //     <Modal
  //       title="WOAAAAAAAAHHHHHHH NOW..!!!!!"
  //       visible={isModalVisible}
  //       onOk={handleHide}
  //       onCancel={handleHide}
  //       footer={null}
  //     >
  //       DUDE! Are you FUCKING sure?!
  //       <ButtonGroup asFooter>
  //         <Button>FUCK NO!</Button>
  //         <Button
  //           onClick={async () => {
  //             await pixelsContract.updateAdmin(newAddress)
  //             setIsModalVisible(false)
  //           }}
  //         >
  //           Yep.
  //         </Button>
  //       </ButtonGroup>
  //     </Modal>
  //   </>
  // )
}

export default UpdateAdminAddress
