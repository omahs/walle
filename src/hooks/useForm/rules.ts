import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { isNumeric } from '@src/utils/isNumeric'

import { Rule } from './useForm'

type AnyNumber = BigNumber | string | number

export const length =
  <T>(min: number, max = Infinity): Rule<T> =>
  (value) => {
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }

    if (value.length > max) {
      return `Must be at most ${max} characters`
    }
  }

export const isIntegerNumber =
  <T>(): Rule<T> =>
  (value) => {
    return Number.isInteger(parseFloat(value))
      ? undefined
      : 'Must be an integer'
  }

export const isNumber =
  <T>(): Rule<T> =>
  (value) => {
    return isNumeric(value) ? undefined : 'Must be a number'
  }

export const balanceIsZero =
  <T>(balance: AnyNumber): Rule<T> =>
  () => {
    const bn = BigNumber.from(balance)

    if (bn.eq(0)) {
      return 'Balance is empty'
    }
  }

export const numberInRange =
  <T>(min: number, max: number): Rule<T> =>
  (value) => {
    const number = Number(value)

    if (number < min) {
      return `Must be bigger than ${min}`
    }

    if (number > max) {
      return `Must be less than ${max}`
    }
  }

export const bigNumberInRange =
  <T>(min: AnyNumber, max: AnyNumber, decimals: number): Rule<T> =>
  (value) => {
    const number = parseUnits(value, decimals)

    if (number.lt(min)) {
      return `Must be bigger than ${formatUnits(min, decimals)}`
    }

    if (number.gt(max)) {
      return `Must be less than ${formatUnits(max, decimals)}`
    }
  }

export const isAddress =
  <T>(): Rule<T> =>
  (value) => {
    try {
      getAddress(value)
    } catch {
      return `Address is invalid`
    }

    return undefined
  }

export const isEqualToString =
  <T>(required: string): Rule<T> =>
  (value) => {
    if (value !== required) {
      return `Please enter ${required} to continue`
    }
  }

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
) // fragment locator

export const link =
  <T>(): Rule<T> =>
  (value) => {
    if (!urlPattern.test(value)) {
      return `Must be a url`
    }
  }

export const walletConnectLink =
  <T>(): Rule<T> =>
  (value) => {
    if (!value.startsWith('wc:')) {
      return `Must be a WalletConnect URI`
    }
  }
