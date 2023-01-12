import { getSdkError } from '@walletconnect/utils'
import { WalletConnectAction } from '@src/store'
import { signClient } from '@src/wallet-connect'

export const disconnect: WalletConnectAction<'disconnect'> = () => (topic) => {
  return signClient.disconnect({
    reason: getSdkError('USER_DISCONNECTED'),
    topic,
  })
}
