import React from 'react'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Button, Props as ButtonProps } from '../Button'

type CMSLinkType = Partial<{
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: string | Page
  } | null
  url?: string | null
  label: string
  appearance?: ('default' | 'primary' | 'secondary') | null
  children: React.ReactNode
  className: string
  invert: ButtonProps['invert']
}>

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
  invert,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  if (!appearance) {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    if (href || url) {
      return (
        <Link {...newTabProps} href={href || url!} className={className}>
          {label && label}
          {children && children}
        </Link>
      )
    }
  }

  return (
    <Button
      className={className}
      newTab={newTab || false}
      href={href}
      appearance={appearance || 'default'}
      label={label}
      invert={invert || false}
    />
  )
}
