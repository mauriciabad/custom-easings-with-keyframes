import { assign } from '@/helpers'
import {
  allowedValueUnits,
  fillWithDefaultOptions,
  getUpdatedOptions,
  LocalOptions,
  Options,
  Property,
  removeInvalidOptions,
  ValueUnits,
  valueUnitsDefaultToValue
} from '@/helpers/options'
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

export default function useOptions() {
  const updateSomeOptions = (newOptions: LocalOptions) => {
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
