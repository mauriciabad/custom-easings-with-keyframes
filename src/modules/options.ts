import {
  allowedValueUnits,
  assign,
  fillWithDefaultOptions,
  getUpdatedOptions,
  LocalOptions,
  Options,
  Property,
  removeInvalidOptions,
  ValueUnits,
  valueUnitsDefaultToValue
} from '@/helpers'
import { reactive } from 'vue'

const options = reactive<Options>({
  property: Property.rotate,
  fromValue: 0,
  toValue: 360,
  valueUnits: ValueUnits.deg,
  duration: 3000,
  easingName: 'ease-custom',
  beginingDelay: 0,
  endDelay: 0
})

const lastUpdatedOptions = reactive<Partial<Options>>({})

type UseOptions = {
  options: Readonly<Options>
  lastUpdatedOptions: Readonly<Partial<Options>>
  updateSomeOptions: (newOptions: Readonly<LocalOptions>) => void
}

export default function useOptions(): UseOptions {
  const updateSomeOptions: UseOptions['updateSomeOptions'] = (newOptions) => {
    const updatedOptions: Partial<Options> = getUpdatedOptions(
      removeInvalidOptions(fillWithDefaultOptions(newOptions)),
      options
    )

    if (
      updatedOptions.property !== undefined &&
      !allowedValueUnits[updatedOptions.property].includes(
        updatedOptions.valueUnits ?? options.valueUnits
      )
    ) {
      updatedOptions.valueUnits = allowedValueUnits[updatedOptions.property][0]
    }

    if (updatedOptions.valueUnits !== undefined) {
      updatedOptions.toValue =
        valueUnitsDefaultToValue[
          (updatedOptions.valueUnits ?? options.valueUnits) || 'none'
        ]
      updatedOptions.fromValue = 0
    }

    assign(lastUpdatedOptions, updatedOptions)
    assign(options, { ...options, ...updatedOptions })
  }

  return { options, lastUpdatedOptions, updateSomeOptions }
}
