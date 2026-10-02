export type DocSection = {
  id: string
  title: string
  group: 'Get started' | 'Understand the rules' | 'Get help'
  intro: string
  note?: { title: string; body: string }
  steps?: { title: string; body: string }[]
  points?: string[]
}

export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'create-a-launchpad',
    title: 'Create a launchpad',
    group: 'Get started',
    intro:
      'A Cumble is a pump.fun coin with permanent rules for the coins launched under it. You choose the fee split and who can launch. Each new coin inherits those terms.',
    note: {
      title: 'Before you start',
      body: 'Have your artwork and a Solana wallet ready. On mobile, open Cumble inside your wallet app. Keep SOL for the 1 SOL creation fee plus about 0.0115 SOL of network fees and rent for the new accounts.',
    },
    steps: [
      {
        title: 'Choose a kind.',
        body: 'Pick direct payout to send creator fees straight to holders, or burn to buy back and burn the Cumble token.',
      },
      {
        title: 'Set your terms.',
        body: 'Decide the fee split between the launcher, the Cumble and its holders, and whether anyone can launch or only allowlisted wallets.',
      },
      {
        title: 'Add your artwork.',
        body: 'Upload an image, name and ticker. These become the Cumble token on pump.fun.',
      },
      {
        title: 'Sign and launch.',
        body: 'Review the summary and sign once. Your Cumble and its rules are written on chain in the same transaction.',
      },
    ],
  },
  {
    id: 'launch-a-coin',
    title: 'Launch a coin',
    group: 'Get started',
    intro:
      'Start with an existing Cumble. Every coin launched on it follows the rules its creator set, and those rules cannot change after launch.',
    steps: [
      { title: 'Pick a Cumble.', body: 'Browse Explore and open the Cumble you want to launch on.' },
      { title: 'Fill in your coin.', body: 'Add a name, ticker, image and optional links.' },
      {
        title: 'Sign.',
        body: 'Your coin goes live on pump.fun with the fee rule of its Cumble attached.',
      },
    ],
  },
  {
    id: 'costs',
    title: 'Costs at a glance',
    group: 'Understand the rules',
    intro: 'Cumble keeps costs simple and visible before you sign.',
    points: [
      'Creating a Cumble costs 1 SOL plus about 0.0115 SOL of network fees and rent.',
      'Launching a coin on an existing Cumble costs only the standard pump.fun and network fees.',
      'Trading fees follow pump.fun. The creator share is routed by the Cumble rule.',
    ],
  },
  {
    id: 'kinds',
    title: 'Choose a launchpad kind',
    group: 'Understand the rules',
    intro: 'Every Cumble has one kind, chosen at creation.',
    points: [
      'Direct payout: creator fees are distributed to holders of the Cumble token each round.',
      'Burn: creator fees buy back the Cumble token and burn it each round.',
    ],
  },
  {
    id: 'creator-fees',
    title: 'Understand creator fees',
    group: 'Understand the rules',
    intro:
      'pump.fun pays a creator fee on every trade. On Cumble, that fee is sent to a program vault instead of a personal wallet, and is split by the rule you chose.',
  },
  {
    id: 'permanent',
    title: 'Know what is permanent',
    group: 'Understand the rules',
    intro: 'Rules are frozen on chain so launchers and holders can trust them.',
    points: [
      'The kind and fee split can never change.',
      'Launch access can only be loosened, never tightened.',
      'Artwork and metadata follow pump.fun rules.',
    ],
  },
  {
    id: 'rounds',
    title: 'Follow rewards and rounds',
    group: 'Understand the rules',
    intro:
      'Fees accumulate in the vault and settle in rounds. Each settled round shows on the Rounds page with its payout or burn amount and a link to the transaction.',
  },
  {
    id: 'launch-access',
    title: 'Check launch access',
    group: 'Understand the rules',
    intro:
      'A Cumble can be open to everyone or limited to allowlisted wallets. The Cumble page shows which one applies before you try to launch.',
  },
  {
    id: 'common-issues',
    title: 'Resolve common issues',
    group: 'Get help',
    intro: 'Most failed transactions come from a few causes.',
    points: [
      'Not enough SOL for fees and rent. Top up and try again.',
      'Wallet not on the allowlist for a restricted Cumble.',
      'Network congestion. Wait a moment and retry with the same details.',
    ],
  },
  {
    id: 'availability',
    title: 'Availability and Solana basics',
    group: 'Get help',
    intro:
      'Cumble runs on Solana mainnet through pump.fun. You need a Solana wallet such as Phantom or Solflare. Follow @Cumblefun on X for status updates.',
  },
]
