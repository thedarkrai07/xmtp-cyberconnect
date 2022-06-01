import { Client, Message } from '@xmtp/xmtp-js'
import { Conversation } from '@xmtp/xmtp-js/dist/types/src/conversations'
import { Signer } from 'ethers'
import { createContext, Dispatch } from 'react'

export type MessageStoreEvent = {
  peerAddress: string
  messages: Message[]
}

export type XmtpContextType = {
  wallet: Signer | undefined
  walletAddress: string | undefined
  client: Client | undefined
  conversations: Conversation[]
  loadingConversations: boolean
  getMessages: (peerAddress: string) => Message[]
  dispatchMessages?: Dispatch<MessageStoreEvent>
  connect: (wallet: Signer) => void
  disconnect: () => void
  checkIfOnNetwork: (x: string) => Promise<boolean>
}

export const XmtpContext = createContext<XmtpContextType>({
  wallet: undefined,
  walletAddress: undefined,
  client: undefined,
  conversations: [],
  loadingConversations: false,
  getMessages: () => [],
  connect: () => undefined,
  disconnect: () => undefined,
  checkIfOnNetwork: () => Promise.resolve(false),
})

export default XmtpContext
