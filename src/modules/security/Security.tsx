import React from 'react'
import { Box, Text } from 'ink'

import { Button, ButtonProps } from '@src/components'
import {
  Selection,
  SelectionZone,
  useSelectionZone,
} from '@src/components/SelectionZone'
import { ROUTE, useNavigate } from '@src/routes'
import { COLUMNS } from '@src/store'

export const Security: React.FC = () => {
  const parentZone = useSelectionZone()!
  const navigate = useNavigate()

  return (
    <SelectionZone
      prevKey="upArrow"
      nextKey="downArrow"
      isActive={parentZone.selection === COLUMNS.MAIN}
    >
      <Box flexDirection="column">
        <Box marginTop={-1}>
          <Text bold> Security </Text>
        </Box>
        <Text>The security settings of your wallet</Text>

        <Box marginTop={1} flexDirection="column">
          <Text bold>Password</Text>
          <Text>Change your wallet login password</Text>
          <Selection<ButtonProps> activeProps={{ isFocused: true }}>
            <Button
              alignSelf="center"
              width="50%"
              onPress={() =>
                navigate(ROUTE.PASSWORD_GUARD, ROUTE.SECURITY_CHANGE_PASSWORD)
              }
            >
              Update password
            </Button>
          </Selection>
        </Box>

        <Box marginTop={1} flexDirection="column">
          <Text bold>Seed Phrase</Text>
          <Text>
            A seed phrase grants full access to all accounts generated by it.
            You can manage and export your seed phrase.
          </Text>
          <Selection<ButtonProps> activeProps={{ isFocused: true }}>
            <Button
              alignSelf="center"
              width="50%"
              onPress={() =>
                navigate(ROUTE.PASSWORD_GUARD, ROUTE.SECURITY_SHOW_MNEMONIC)
              }
            >
              Show the Phrases
            </Button>
          </Selection>
        </Box>

        <Box marginTop={1} flexDirection="column">
          <Text bold>Private Key</Text>
          <Text>
            The private key grants full access to the current account. You can
            export the account by exporting its private key.
          </Text>
          <Selection<ButtonProps> activeProps={{ isFocused: true }}>
            <Button
              alignSelf="center"
              width="50%"
              onPress={() =>
                navigate(ROUTE.PASSWORD_GUARD, ROUTE.SECURITY_SHOW_PRIVATE_KEY)
              }
            >
              Show the Private key
            </Button>
          </Selection>
        </Box>
      </Box>
    </SelectionZone>
  )
}
