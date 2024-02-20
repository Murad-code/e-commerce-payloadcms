'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../../payload/payload-types'
import { noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { Gutter } from '../../Gutter'
import { Logo } from '../../icons'
import { inclusions } from './inclusions'

import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : classes.footer}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map((inclusion, index) => (
            <li key={inclusion.title}>
              <inclusion.icon />
              <h5 className={classes.title}>{inclusion.title}</h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>

        <div className={classes.wrap}>
          <Link className={classes.logoContainer} href="/">
            <Logo classNames="footerLogo" />
          </Link>
          <p className={classes.copyright}>{footer?.copyright}</p>
          {/* <div className={classes.socialLinks}>
            {navItems.map(item => {
              const icon = item?.link?.icon as Media

              return (
                <Button
                  key={item.link.label}
                  el="link"
                  href={item.link.url}
                  newTab={true}
                  className={classes.socialLinkItem}
                >
                  <Image
                    src={icon?.url}
                    alt={item.link.label}
                    width={24}
                    height={24}
                    className={classes.socialIcon}
                  />
                </Button>
              )
            })}
          </div> */}
        </div>
      </Gutter>
    </footer>
  )
}

export default FooterComponent
