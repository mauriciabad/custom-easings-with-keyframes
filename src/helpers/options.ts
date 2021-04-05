export enum Property {
  opacity = 'opacity',

  translateX = 'translateX',
  translateY = 'translateY',
  translateZ = 'translateZ',

  scale = 'scale',
  scaleX = 'scaleX',
  scaleY = 'scaleY',

  rotate = 'rotate',
  rotateX = 'rotateX',
  rotateY = 'rotateY',

  skewX = 'skewX',
  skewY = 'skewY'
}

export enum ValueUnits {
  none = '',
  '%' = '%',
  px = 'px',
  rem = 'rem',
  em = 'em',
  vh = 'vh',
  vw = 'vw',
  deg = 'deg',
  turn = 'turn',
  rad = 'rad'
}

export type Options = {
  property: Property
  fromValue: number
  toValue: number
  valueUnits: ValueUnits
  duration: number
  easingName: string
  beginingDelay: number
  endDelay: number
}

const units = {
  number: [ValueUnits.none],
  length: [
    ValueUnits.px,
    ValueUnits.rem,
    ValueUnits.em,
    ValueUnits.vw,
    ValueUnits.vh
  ],
  lengthPercentage: [
    ValueUnits['%'],
    ValueUnits.px,
    ValueUnits.rem,
    ValueUnits.em,
    ValueUnits.vw,
    ValueUnits.vh
  ],
  angle: [ValueUnits.deg, ValueUnits.turn, ValueUnits.rad]
}

export const allowedValueUnits: Record<keyof typeof Property, ValueUnits[]> = {
  opacity: [...units.number],

  translateX: [...units.lengthPercentage],
  translateY: [...units.lengthPercentage],
  translateZ: [...units.length],

  scale: [...units.number],
  scaleX: [...units.number],
  scaleY: [...units.number],

  rotate: [...units.angle],
  rotateX: [...units.angle],
  rotateY: [...units.angle],

  skewX: [...units.angle],
  skewY: [...units.angle]
}

export const valueUnitsDefaultToValue: Record<
  keyof typeof ValueUnits,
  number
> = {
  none: 1,
  '%': 100,
  px: 100,
  rem: 10,
  em: 10,
  vh: 10,
  vw: 10,
  deg: 360,
  turn: 1,
  rad: 6.28319
}

export interface LocalOptions {
  property: Options['property'] | ''
  fromValue: Options['fromValue'] | ''
  toValue: Options['toValue'] | ''
  valueUnits: Options['valueUnits'] | ''
  duration: Options['duration'] | ''
  easingName: Options['easingName'] | ''
  beginingDelay: Options['beginingDelay'] | ''
  endDelay: Options['endDelay'] | ''
}

export interface ValidOptions {
  property: boolean
  fromValue: boolean
  toValue: boolean
  duration: boolean
  easingName: boolean
  valueUnits: boolean
  beginingDelay: boolean
  endDelay: boolean
}

export const validateOptions = (options: LocalOptions): ValidOptions => {
  const validOptions = {
    property: options.property !== '',
    fromValue:
      options.fromValue !== '' &&
      !isNaN(options.fromValue) &&
      options.fromValue >= 0,
    toValue:
      options.toValue !== '' && !isNaN(options.toValue) && options.toValue >= 0,
    duration:
      options.duration !== '' &&
      !isNaN(options.duration) &&
      options.duration > 0,
    easingName: options.easingName !== '',
    valueUnits: true,
    beginingDelay:
      options.beginingDelay !== '' &&
      !isNaN(options.beginingDelay) &&
      options.beginingDelay >= 0,
    endDelay:
      options.endDelay !== '' &&
      !isNaN(options.endDelay) &&
      options.endDelay >= 0
  }

  if (
    options.property !== '' &&
    !allowedValueUnits[options.property].includes(
      options.valueUnits as ValueUnits
    )
  ) {
    validOptions.valueUnits = false
  }

  return validOptions
}

export function getUpdatedOptions(
  newOptions: Partial<Options>,
  oldOptions: Options
): Partial<Options> {
  const updatedOptions: Partial<Options> = {}

  for (const keyAsString in newOptions) {
    const key = keyAsString as keyof Options

    if (newOptions[key] !== '' && newOptions[key] !== oldOptions[key]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updatedOptions as any)[key] = newOptions[key]
    }
  }

  return updatedOptions
}

export function removeInvalidOptions(options: LocalOptions): Partial<Options> {
  const filteredOptions: Partial<Options> = {}

  const validatedOptions = validateOptions(options)

  for (const keyAsString in validatedOptions) {
    const key = keyAsString as keyof Options

    if (validatedOptions[key]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(filteredOptions as any)[key] = options[key]
    }
  }

  return filteredOptions
}

export function fillWithDefaultOptions(options: LocalOptions): LocalOptions {
  const filledWithDefaultOptions: LocalOptions = { ...options }

  if (options.fromValue === '') filledWithDefaultOptions.fromValue = 0
  if (options.toValue === '') filledWithDefaultOptions.toValue = 0
  if (options.beginingDelay === '') filledWithDefaultOptions.beginingDelay = 0
  if (options.endDelay === '') filledWithDefaultOptions.endDelay = 0

  return filledWithDefaultOptions
}

export function removeDefaults(
  lastUpdatedOptions: Partial<Options>,
  localOptions: LocalOptions
) {
  const lastUpdatedOptionsWithoutDefaults = { ...lastUpdatedOptions }

  if (localOptions.fromValue === '' && lastUpdatedOptions.fromValue === 0) {
    delete lastUpdatedOptionsWithoutDefaults.fromValue
  }
  if (localOptions.toValue === '' && lastUpdatedOptions.toValue === 0) {
    delete lastUpdatedOptionsWithoutDefaults.toValue
  }
  if (
    localOptions.beginingDelay === '' &&
    lastUpdatedOptions.beginingDelay === 0
  ) {
    delete lastUpdatedOptionsWithoutDefaults.beginingDelay
  }
  if (localOptions.endDelay === '' && lastUpdatedOptions.endDelay === 0) {
    delete lastUpdatedOptionsWithoutDefaults.endDelay
  }

  return lastUpdatedOptionsWithoutDefaults
}
