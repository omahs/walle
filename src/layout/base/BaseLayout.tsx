import React from 'react'
import { Box } from 'ink'
import { Header } from './Header'
import { MainMenu } from './MainMenu'
import { Tokens } from './Tokens'
import { Selection, SelectionZone } from '@src/components/SelectionZone'

interface Props {
  children: React.ReactNode
}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box flexDirection="column">
      <Header />
      <Box flexDirection="row" alignSelf="center">
        <SelectionZone nextKey="tab" isActive looped>
          <Selection activeProps={{ borderStyle: 'doubleSingle' }}>
            <Box
              width="20%"
              flexDirection="column"
              paddingX={1}
              borderStyle="single"
            >
              <MainMenu />
            </Box>
          </Selection>

          <Selection activeProps={{ borderStyle: 'doubleSingle' }}>
            <Box
              width="60%"
              flexDirection="column"
              paddingX={1}
              borderStyle="single"
            >
              {children}
            </Box>
          </Selection>

          <Selection activeProps={{ borderStyle: 'doubleSingle' }}>
            <Box
              width="20%"
              flexDirection="column"
              paddingX={1}
              borderStyle="single"
            >
              <Tokens />
            </Box>
          </Selection>
        </SelectionZone>
      </Box>
    </Box>
  )
}
