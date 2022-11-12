import React from 'react'
import { Box, Text } from 'ink'
import { Button } from '@components'
import {
  combine,
  isNumber,
  length,
  link,
  numberInRange,
  useForm,
  useSelection,
} from '@hooks'
import { InputBox } from '@components/InputBox'
import { COLUMNS, useBlockchainStore } from '@store'
import { useSelectionZone } from '@src/components/SelectionZone'

type Inputs = {
  name: string
  rpc: string
  chainId: string
  explorer: string
  currency: string
}

export const AddChain: React.FC = () => {
  const parentZone = useSelectionZone()!
  const addChain = useBlockchainStore((state) => state.addChain)

  const { errors, register, validate, data } = useForm<Inputs>({
    rules: {
      name: length(3),
      rpc: link(),
      chainId: combine(isNumber(), numberInRange(1, Infinity)),
      explorer: link(),
      currency: length(2),
    },
  })

  const [selection, setSelection, preventInput] = useSelection({
    amount: 6,
    prevKey: 'upArrow',
    nextKey: ['downArrow', 'return'],
    isActive: parentZone.selection === COLUMNS.MAIN,
  })

  const onSubmit = () => {
    const [isValid] = validate()

    if (isValid) {
      addChain({
        name: data.name,
        rpc: data.rpc,
        chainId: Number(data.chainId),
        currency: data.currency,
        explorer: data.explorer,
      })
    } else {
      preventInput()
      // TODO: focus on first error
      setSelection(0)
    }
  }

  return (
    <Box flexDirection="column">
      <Box marginTop={-1}>
        <Text> Add new chain </Text>
      </Box>
      <InputBox
        label="Name"
        error={errors.name}
        focus={selection === 0}
        {...register('name')}
      />
      <InputBox
        label="Rpc"
        error={errors.rpc}
        focus={selection === 1}
        {...register('rpc')}
      />
      <InputBox
        label="Chain Id"
        error={errors.chainId}
        focus={selection === 2}
        {...register('chainId')}
      />
      <InputBox
        label="Explorer"
        error={errors.explorer}
        focus={selection === 3}
        {...register('explorer')}
      />
      <InputBox
        label="Currency"
        error={errors.currency}
        focus={selection === 4}
        {...register('currency')}
      />

      <Button isFocused={selection === 5} onPress={onSubmit}>
        Add chain
      </Button>
    </Box>
  )
}
