import React, { useContext, useCallback } from 'react'
import {
  Checkbox,
  ToggleButton,
  Button,
  Space,
} from '../../../../components'
import classnames from 'classnames'
import ButtonRow from '../../Form/ButtonRow'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'

export type Props = FieldProps<unknown> & {
  valueOn: unknown
  valueOff: unknown
  variant?: 'checkbox' | 'checkbox-button' | 'button' | 'buttons'
  textOn?: string
  textOff?: string
}

function Toggle(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    id,
    className,
    valueOn,
    valueOff,
    layout,
    variant,
    disabled,
    label,
    labelDescription,
    labelSecondary,
    textOn,
    textOff,
    value,
    info,
    warning,
    error,
    handleChange,
  } = useDataValue(props)

  const handleCheckboxChange = useCallback(
    ({ checked }) => {
      handleChange?.(checked ? valueOn : valueOff)
    },
    [handleChange, valueOn, valueOff]
  )

  const setOn = useCallback(() => {
    if (value !== valueOn) {
      handleChange?.(valueOn)
    }
  }, [handleChange, value, valueOn])

  const setOff = useCallback(() => {
    if (value !== valueOff) {
      handleChange?.(valueOff)
    }
  }, [handleChange, value, valueOff])

  const cn = classnames('dnb-forms-field-toggle', className)

  const fieldBlockPropsWithoutLabel = {
    forId: id,
    className: cn,
    ...pickSpacingProps(props),
    info,
    warning,
    error,
  }

  const fieldBlockProps = {
    ...fieldBlockPropsWithoutLabel,
    layout,
    label,
    labelDescription,
    labelSecondary,
  }

  const isOn = value === valueOn
  const isOff = value === valueOff

  switch (variant) {
    default:
    case 'checkbox':
      return (
        <FieldBlock {...fieldBlockPropsWithoutLabel}>
          <Checkbox
            id={id}
            className={cn}
            label={label}
            checked={isOn}
            disabled={disabled}
            status={error ? 'error' : undefined}
            on_change={handleCheckboxChange}
            {...pickSpacingProps(props)}
          />
        </FieldBlock>
      )
    case 'button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            text={
              isOn
                ? textOn ?? sharedContext?.translation.Forms.booleanYes
                : textOff ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={isOn}
            disabled={disabled}
            status={error ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
          />
        </FieldBlock>
      )
    case 'buttons':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ButtonRow>
            <Button
              id={id}
              text={textOn ?? sharedContext?.translation.Forms.booleanYes}
              on_click={setOn}
              variant={isOn ? undefined : 'secondary'}
              status={error ? 'error' : undefined}
              disabled={disabled}
            />
            <Button
              id={id}
              text={textOff ?? sharedContext?.translation.Forms.booleanNo}
              on_click={setOff}
              variant={isOff ? undefined : 'secondary'}
              disabled={disabled}
              status={error ? 'error' : undefined}
            />
          </ButtonRow>
          <Space bottom="x-small" />
        </FieldBlock>
      )
    case 'checkbox-button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ToggleButton
            id={id}
            variant="checkbox"
            text={
              isOn
                ? textOn ?? sharedContext?.translation.Forms.booleanYes
                : textOff ?? sharedContext?.translation.Forms.booleanNo
            }
            checked={isOn}
            disabled={disabled}
            status={error ? 'error' : undefined}
            value={value ? 'true' : 'false'}
            on_change={handleCheckboxChange}
          />
        </FieldBlock>
      )
  }
}

Toggle._supportsSpacingProps = true
export default Toggle
