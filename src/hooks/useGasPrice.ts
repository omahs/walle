import { BigNumber } from '@ethersproject/bignumber'
import { useBlockchainStore } from '@src/store'
import { useEffect, useState } from 'react'

export const useGasPrice = () => {
  const provider = useBlockchainStore((store) => store.provider)
  const [isLoading, setLoading] = useState(true)
  const [price, setPrice] = useState('')

  useEffect(() => {
    const getPrice = async () => {
      setLoading(true)
      const currentPrice = await provider
        .getGasPrice()
        .catch(() => BigNumber.from(0))
      setLoading(false)

      setPrice(currentPrice.toString())
    }

    getPrice()
  }, [])

  return [price, isLoading] as const
}
