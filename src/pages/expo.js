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
  <p>J'organise une (petite) <strong>exposition de mes photographies le 8 Juin 2023</strong>. Le thème est centré autour de Paris, ses gens, (ses vélos) et ses rues.</p>

  <p>
    Le vernissage aura lieu à <strong>19h30 au bar Tago Mago</strong>, dans le 10ème arrondissement de Paris.
  </p>

  <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.289839194645!2d2.354427148698112!3d48.86498104315739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0e82207263%3A0x39676a858a43f71!2sTago%20Mago!5e0!3m2!1sen!2sfr!4v1682629573227!5m2!1sen!2sfr" width="1000" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>

  <hr />

  <p><strong>L'exposition se prolongera jusqu'à 14 Juin.</strong> Les oeuvres sont à vendre, n'hésitez pas à voir avec le gérant du bar si l'une d'entre elles vous intéresse.</p>

  <p>A bientôt au vernissage !</p>
`

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Exposition Photos, Tago Mago, Paris 10 — Matthieu Oger</title>
      </Helmet>
      <PageTitle>Exposition Photos</PageTitle>
      <Post
        url="/expotagomago/"
        date="08 Juin 2023"
        title="Vernissage — Tago Mago"
        content={md}
      />
    </Layout>
  )
}
