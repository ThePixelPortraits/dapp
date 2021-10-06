import Modal from 'components/ui/modal'

import {
  AuthContainer,
  Metamask,
  WalletConnect,
} from 'components/styled/account.styled'

const AccountModal = ({ isModalVisible, handleClose, handleLoginClick }) => {
  return (
    <Modal
      title="login"
      visible={isModalVisible}
      close={handleClose}
      width="500px"
      noHeader
    >
      <AuthContainer>
        <Metamask onClick={() => handleLoginClick(true)}>
          <img
            src="images/metamask.svg"
            height="130px"
            alt="login with MetaMask!"
          />
        </Metamask>
        <WalletConnect onClick={() => handleLoginClick(false)}>
          <img
            src="images/walletconnect.svg"
            height="60px"
            alt="login with WalletConnect!"
          />
        </WalletConnect>
      </AuthContainer>
    </Modal>
  )
}

export default AccountModal
