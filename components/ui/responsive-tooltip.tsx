"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  isOpen: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  contentClassName?: string
  position?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
}

export function ResponsiveTooltip({
  children,
  content,
  isOpen,
  onOpenChange,
  className,
  contentClassName,
  position = "top",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
}: ResponsiveTooltipProps) {
  const [tooltipPosition, setTooltipPosition] = React.useState({
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    transform: "",
  })

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) return

    const updatePosition = () => {
      const trigger = triggerRef.current
      const tooltip = tooltipRef.current
      if (!trigger || !tooltip) return

      const triggerRect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newPosition = {
        top: "auto",
        left: "auto",
        right: "auto",
        bottom: "auto",
        transform: "",
      }

      // Calculate available space
      const spaceAbove = triggerRect.top
      const spaceBelow = viewportHeight - triggerRect.bottom
      const spaceLeft = triggerRect.left
      const spaceRight = viewportWidth - triggerRect.right

      // Determine optimal position
      let finalPosition = position
      let finalAlign = align

      // Auto-adjust position based on available space
      if (position === "top" && spaceAbove < tooltipRect.height + sideOffset) {
        finalPosition = "bottom"
      } else if (position === "bottom" && spaceBelow < tooltipRect.height + sideOffset) {
        finalPosition = "top"
      } else if (position === "left" && spaceLeft < tooltipRect.width + sideOffset) {
        finalPosition = "right"
      } else if (position === "right" && spaceRight < tooltipRect.width + sideOffset) {
        finalPosition = "left"
      }

      // Calculate positioning
      switch (finalPosition) {
        case "top":
          newPosition.bottom = `${viewportHeight - triggerRect.top + sideOffset}px`
          break
        case "bottom":
          newPosition.top = `${triggerRect.bottom + sideOffset}px`
          break
        case "left":
          newPosition.right = `${viewportWidth - triggerRect.left + sideOffset}px`
          break
        case "right":
          newPosition.left = `${triggerRect.right + sideOffset}px`
          break
      }

      // Calculate alignment
      const tooltipWidth = tooltipRect.width
      const triggerCenter = triggerRect.left + triggerRect.width / 2

      switch (finalAlign) {
        case "start":
          if (finalPosition === "top" || finalPosition === "bottom") {
            newPosition.left = `${triggerRect.left + alignOffset}px`
          } else {
            newPosition.top = `${triggerRect.top + alignOffset}px`
          }
          break
        case "center":
          if (finalPosition === "top" || finalPosition === "bottom") {
            newPosition.left = `${triggerCenter - tooltipWidth / 2}px`
            newPosition.transform = "translateX(-50%)"
          } else {
            newPosition.top = `${triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2}px`
            newPosition.transform = "translateY(-50%)"
          }
          break
        case "end":
          if (finalPosition === "top" || finalPosition === "bottom") {
            newPosition.left = `${triggerRect.right - tooltipWidth + alignOffset}px`
          } else {
            newPosition.top = `${triggerRect.bottom - tooltipRect.height + alignOffset}px`
          }
          break
      }

      // Ensure tooltip stays within viewport bounds
      if (newPosition.left !== "auto") {
        const left = parseFloat(newPosition.left as string)
        if (left < 0) {
          newPosition.left = "0px"
          newPosition.transform = ""
        } else if (left + tooltipWidth > viewportWidth) {
          newPosition.left = `${viewportWidth - tooltipWidth}px`
          newPosition.transform = ""
        }
      }

      if (newPosition.top !== "auto") {
        const top = parseFloat(newPosition.top as string)
        if (top < 0) {
          newPosition.top = "0px"
          newPosition.transform = ""
        } else if (top + tooltipRect.height > viewportHeight) {
          newPosition.top = `${viewportHeight - tooltipRect.height}px`
          newPosition.transform = ""
        }
      }

      setTooltipPosition(newPosition)
    }

    // Initial position calculation
    updatePosition()

    // Update position on window resize
    const handleResize = () => updatePosition()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, position, align, sideOffset, alignOffset])

  return (
    <div className={cn("relative", className)}>
      <div ref={triggerRef} onMouseEnter={() => onOpenChange?.(true)} onMouseLeave={() => onOpenChange?.(false)}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-auto",
            contentClassName
          )}
          style={tooltipPosition}
          onMouseEnter={() => onOpenChange?.(true)}
          onMouseLeave={() => onOpenChange?.(false)}
        >
          {content}
        </div>
      )}
    </div>
  )
} 