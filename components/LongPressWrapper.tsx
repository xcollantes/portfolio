/** Wrapper component for long press detection. */

import React, { ReactNode, useRef, useState } from "react"
import { useToastNotification } from "../hooks/useToastNotification"

interface LongPressWrapperProps {
  children: ReactNode
  elementName: string
  onLongPress?: () => void
  longPressDuration?: number
  disabled?: boolean
}

export default function LongPressWrapper({
  children,
  elementName,
  onLongPress,
  longPressDuration = 800,
  disabled = false,
}: LongPressWrapperProps) {
  const toast = useToastNotification()

  // Long press handling state and refs.
  const [isLongPress, setIsLongPress] = useState(false)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Handles long press start.
   */
  const handleLongPressStart = () => {
    if (disabled) return

    setIsLongPress(false)
    longPressTimerRef.current = setTimeout(() => {
      setIsLongPress(true)
      if (onLongPress) {
        onLongPress()
      } else {
        console.log(`Long pressed on ${elementName}!`)
      }
    }, longPressDuration)
  }

  /**
   * Handles long press end, cleans up timer.
   */
  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  /**
   * Handles click events, prevents default behavior if it was a long press.
   */
  const handleClick = (event: React.MouseEvent) => {
    if (isLongPress) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  // Clone children and add long press event handlers
  const childrenWithProps = React.cloneElement(children as React.ReactElement, {
    onMouseDown: (event: React.MouseEvent) => {
      handleLongPressStart()
      // Call original onMouseDown if it exists
      const originalOnMouseDown = (children as React.ReactElement).props.onMouseDown
      if (originalOnMouseDown) originalOnMouseDown(event)
    },
    onMouseUp: (event: React.MouseEvent) => {
      handleLongPressEnd()
      // Call original onMouseUp if it exists
      const originalOnMouseUp = (children as React.ReactElement).props.onMouseUp
      if (originalOnMouseUp) originalOnMouseUp(event)
    },
    onMouseLeave: (event: React.MouseEvent) => {
      handleLongPressEnd()
      // Call original onMouseLeave if it exists
      const originalOnMouseLeave = (children as React.ReactElement).props.onMouseLeave
      if (originalOnMouseLeave) originalOnMouseLeave(event)
    },
    onTouchStart: (event: React.TouchEvent) => {
      handleLongPressStart()
      // Call original onTouchStart if it exists
      const originalOnTouchStart = (children as React.ReactElement).props.onTouchStart
      if (originalOnTouchStart) originalOnTouchStart(event)
    },
    onTouchEnd: (event: React.TouchEvent) => {
      handleLongPressEnd()
      // Call original onTouchEnd if it exists
      const originalOnTouchEnd = (children as React.ReactElement).props.onTouchEnd
      if (originalOnTouchEnd) originalOnTouchEnd(event)
    },
    onClick: (event: React.MouseEvent) => {
      handleClick(event)
      // Call original onClick if it exists and it wasn't a long press
      const originalOnClick = (children as React.ReactElement).props.onClick
      if (originalOnClick && !isLongPress) originalOnClick(event)
    },
  })

  return childrenWithProps
}