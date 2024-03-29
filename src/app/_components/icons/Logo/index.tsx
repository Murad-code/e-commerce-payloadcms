import React from 'react'
import Image from 'next/image'

import classes from './index.module.scss'

interface ILogo {
  classNames?: string
}

export const Logo: React.FC<ILogo> = ({ classNames = 'logo' }: ILogo) => {
  return (
    <Image
      className={classes[classNames]}
      alt="Payload Logo"
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`}
      width={250}
      height={40}
    />
  )
}
