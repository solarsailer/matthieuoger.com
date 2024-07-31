import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import postStyles from '../styles/components/post'

import Layout from '../components/layouts/PageLayout'
import PageTitle from '../components/PageTitle'
import Post from '../components/Post'

// -------------------------------------------------------------
// Page.
// -------------------------------------------------------------

const md = `
  <p>J'organise une <strong>exposition petit format de mes photographies</strong>. Le thème est centré autour de Paris, ses gens, et ses rues.</p>

  <p>
    Le vernissage aura lieu le <strong>8 Juin 2023 à 19h00 au Tago Mago</strong>, dans le 10ème arrondissement de Paris.
  </p>

  <p>N'hésitez pas à passer prendre un verre et regarder les quelques photos.</p>

  <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.289839194645!2d2.354427148698112!3d48.86498104315739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0e82207263%3A0x39676a858a43f71!2sTago%20Mago!5e0!3m2!1sen!2sfr!4v1682629573227!5m2!1sen!2sfr" width="1000" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>

  <p><strong>L'exposition se prolongera jusqu'au 14 Juin.</strong> Les "œuvres" seront à vendre, n'hésitez pas à voir avec le gérant du bar si l'une d'entre elles vous intéresse.</p>

  <p>A bientôt au vernissage !</p>

  <hr />

  <img src="/images/temp/expo-flyer.jpg" style="width: 100%; max-width: 850px;" />
`

const metaTitle = 'Exposition Photos, Tago Mago, Paris 10 — Matthieu Oger'
const metaUrl = '/expo/'
const metaDescription =
  "Organisation d'une exposition petit format de mes photographies au Tago Mago avec un vernissage le 8 Juin 2023."

export default () => {
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />

        <title>{metaTitle}</title>

        <meta name="twitter:title" content={metaTitle} />
        <meta property="og:title" content={metaTitle} />
        <meta name="twitter:url" content={metaUrl} />
        <meta property="og:url" content={metaUrl} />
        <meta name="twitter:description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:image" content="/images/temp/expo-social.jpg" />
        <meta property="og:image" content="/images/temp/expo-social.jpg" />
      </Helmet>
      <PageTitle>Expo Photos</PageTitle>
      <Post
        url="/expo/"
        date="08 Juin 2023"
        title="Vernissage au Tago Mago"
        content={md}
      />
    </Layout>
  )
}
