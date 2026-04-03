import React from 'react'
import { bodyText, pageWrapper } from '../styles/common'

function Home() {
  return (
    <div className={pageWrapper}>
      <p className={bodyText}>
        Welcome to Blog App — a platform for authors to share their thoughts and for readers to explore new ideas.
      </p>
    </div>
  )
}

export default Home
