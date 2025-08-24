import React from 'react'
import Hero from '../../components/Hero/Hero'
import FeaturedPosts from '../../components/FeaturedPosts/FeaturedPosts'
import NewsletterSignUp from '../../components/NewsletterSignUp/NewsletterSignUp'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <NewsletterSignUp />
    </>
  )
}

export default Home