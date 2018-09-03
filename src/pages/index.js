import React from 'react'
import styled from 'styled-components'
import {rgba, tint} from 'polished'
import {graphql} from 'gatsby'

import Layout from '../components/layouts/HomeLayout'
import {Button} from '../components/Button'
import SocialNavigation from '../components/SocialNavigation'
import {colors} from '../styles/config'
import {getWrappedIcon} from '../components/Icon'
import avatar from '../../content/images/avatar-black-white.jpg'
import backgroundImage from '../../content/images/background.jpg'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const HOME_BREAKPOINT = 800

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const HomeButton = styled(Button)`
  background: ${rgba(colors.brand.main, 0.2)};
`

const Container = styled.div`
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  padding: 4rem 2rem;

  /* Add transparent background. */
  background: url(${backgroundImage}) bottom center;
  background-size: cover;
`

// -------------------------------------------------------------
// Avatar.
// -------------------------------------------------------------

const Avatar = styled.div`
  margin-bottom: 10rem;
  text-align: center;

  img {
    width: 350px;
    height: 350px;
    border-radius: 100%;
    margin-bottom: 4.5rem;
  }

  @media (max-width: ${HOME_BREAKPOINT}px) {
    margin-bottom: 4rem;
  }

  @media (max-width: 400px) {
    img {
      max-width: 85%;
      height: auto;
    }
  }
`

const Header = styled.header`
  padding: 0 2rem;

  @media (max-width: 600px) {
    font-size: 0.85em;
  }

  @media (max-width: 450px) {
    font-size: 0.7em;
  }

  @media (max-width: 350px) {
    font-size: 0.55em;
  }
`

const MainTitle = styled.h1`
  color: ${colors.brand.main};

  margin-bottom: 0;

  font-size: 3.35em;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 0.75;
`

const SubTitle = styled.h2`
  margin-bottom: 2rem;

  font-size: 2.625em;
  font-weight: bold;
  text-transform: uppercase;
  line-height: normal;
`

const Bio = styled.p`
  color: #aaa;

  max-width: 650px;
  margin-bottom: 0;
  padding: 2rem;
  background: ${rgba('#666', 0.05)};
  border-radius: 5px;

  font-size: 0.8em;
  font-style: normal;

  strong {
    font-weight: 500;
  }

  a {
    color: ${tint(0.75, colors.brand.main)};
    text-decoration: underline;
    transition: color 0.3s ease-out;

    &:hover {
      color: ${colors.brand.main};
    }
  }

  @media (max-width: 750px) {
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
`

// -------------------------------------------------------------
// Navigation List.
// -------------------------------------------------------------

const Navigation = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-bottom: 3rem;

  line-height: normal;

  li {
    margin: 0 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: ${HOME_BREAKPOINT}px) {
    display: block;
    width: 400px;

    li {
      text-align: center;
    }
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`

// -------------------------------------------------------------
// Page.
// -------------------------------------------------------------

export default ({data}) => {
  const handles = data.site.siteMetadata.handles

  return (
    <Layout>
      <Container>
        <Avatar>
          <img src={avatar} title="Matthieu Oger" alt="Matthieu Oger" />
          <Header>
            <MainTitle>SOLARSAILER</MainTitle>
            <SubTitle>Matthieu Oger</SubTitle>
          </Header>
          <Bio>
            <strong>I'm a developer, designer and product manager.</strong> I
            co-founded <a href="https://pixelnest.io/">Pixelnest Studio</a> in
            February 2014, where we created{' '}
            <a href="http://steredenn.pixelnest.io/">Steredenn</a>. I'm also an
            amateur street·travel photographer.
          </Bio>
        </Avatar>

        <Navigation>
          <li>
            <HomeButton url="/about/">About</HomeButton>
          </li>
          <li>
            <HomeButton url="/articles/">Articles</HomeButton>
          </li>
          <li>
            <HomeButton url="/atom.xml">
              {getWrappedIcon('rss', {
                width: '13px',
                height: '13px',
                marginRight: '8px'
              })}
              RSS
            </HomeButton>
          </li>
        </Navigation>

        <SocialNavigation
          handles={handles}
          iconsOnlyBreakpoint={HOME_BREAKPOINT}
        />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        handles {
          twitter
          github
          dribbble
          unsplash
          instagram
          speakerDeck
          linkedIn
        }
      }
    }
  }
`
