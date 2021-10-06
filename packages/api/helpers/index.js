import chalk from 'chalk'

export const emailMessage = async (type, commission, extra = {}) => {
  const { desired, price } = commission
  const EMAIL_CONFIG = {
    to: 'TO_EMAIL',
    from: 'FROM_EMAIL',
  }

  switch (type) {
    case 'NewCommission':
      return {
        ...EMAIL_CONFIG,
        subject: `New Commission posted with name ${desired}`,
        text: `New Commission posted with name ${desired}`,
        html: `<p>New Commission posted with name ${desired} for ${price}
        </p>`,
      }
    case 'CommissionNameUpdated':
      return {
        ...EMAIL_CONFIG,
        subject: `Commission name updated: ${desired}`,
        text: `Commission name updated: ${desired}`,
        html: `<p>Commission name updated from ${desired} to ${extra.newName}</p>`,
      }
    case 'CommissionBidUpdated':
      return {
        ...EMAIL_CONFIG,
        subject: `Commission bid updated`,
        text: `Commission bid updated`,
        html: `<p>Commission bid updated to ${extra.newBid}
         for commission ${desired}</p>`,
      }
    case 'CommissionRescinded':
      return {
        ...EMAIL_CONFIG,
        subject: `Commission rescinded`,
        text: `Commission rescinded`,
        html: `<p>Commission rescinded for commission ${desired}</p>`,
      }
    default:
      return {}
  }
}

export const logger = (description, detail) => {
  return console.log(`${chalk.blue(description)} ${chalk.green(detail)}`)
}

export const logError = (error, description = 'error') => {
  return console.log(`${chalk.bgRed(`${description} ${error}`)}`)
}
