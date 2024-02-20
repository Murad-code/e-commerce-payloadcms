'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()

  return (
    <div className={classes.profile}>
      <div className={classes.profileInfo}>
        <div className={classes.profileHeader}>
          <Image src="/assets/icons/profile.svg" alt="profile" width={50} height={50} />
          <p className={classes.name}>{user?.name}</p>
        </div>
        <p className={classes.email}>{user?.email}</p>
      </div>
    </div>
  )
}
