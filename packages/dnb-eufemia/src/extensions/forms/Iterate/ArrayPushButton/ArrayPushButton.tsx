import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateElementContext from '../IterateElementContext'
import { useFieldProps } from '../../hooks'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'
import { add } from '../../../../icons'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]> & {
    pushValue: unknown
  }

function ArrayPushButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handlePush } = iterateElementContext ?? {}

  const { pushValue, className, ...restProps } = props
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { value, handleChange, children } = useFieldProps(restProps)

  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('ArrayPushButton received a non-array value.')
  }

  const handleClick = useCallback(() => {
    if (handlePush) {
      // Inside an Iterate element - make the change through the Iterate component
      handlePush(pushValue)
      return // stop here
    }

    // If not inside an iterate, it could still manipulate a source data set through useFieldProps
    handleChange([...(value ?? []), pushValue])
  }, [value, pushValue, handlePush, handleChange])

  return (
    <Button
      className={classnames('dnb-form-iterate-push-button', className)}
      variant="secondary"
      icon={add}
      icon_position="left"
      on_click={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

ArrayPushButton._supportsSpacingProps = true
export default ArrayPushButton
