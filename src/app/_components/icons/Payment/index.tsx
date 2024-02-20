import React from 'react'

export const PaymentIcon: React.FC = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="33"
        y="4.5"
        width="27"
        height="30"
        rx="6"
        transform="rotate(90 33 4.5)"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <circle cx="9" cy="25.5" r="1.5" fill="currentColor" />
      <path
        d="M3 10.5L33 10.5L33 16.5L3 16.5L3 10.5Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
