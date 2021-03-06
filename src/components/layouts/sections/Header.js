import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import {getWrappedIcon} from '../../Icon'
import {Button} from '../../Button'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const BREAKPOINT = 650

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Header = styled.header`
  margin-bottom: 5rem;
`

const Separator = styled.hr`
  height: 1px;
  margin-left: 50%;

  background: linear-gradient(
    to right,
    var(--color-page-background),
    hsl(0, 0%, 88%)
  );
  border-top: none;
  border-bottom: none;
`

// Button extension.
const MenuButton = styled(Button)`
  color: hsl(0, 0%, 53%);
  padding: 3px 1rem 1px;

  background: hsla(0, 0%, 100%, 0.5);
  border: 2px solid hsla(0, 0%, 53%, 0.25);
  border-radius: 3px;

  font-size: 0.85em;

  &.selected:not(:hover) {
    color: white;
    background: hsl(var(--hue-accent), 77%, 65%);
    border: 2px solid hsl(var(--hue-accent), 77%, 65%);
  }
`

// -------------------------------------------------------------
// Global Menu.
// -------------------------------------------------------------

const GlobalMenu = styled.nav`
  display: flex;
  align-items: flex-start;

  padding: 2rem;

  background: linear-gradient(
    to bottom,
    hsl(0, 0%, 88%),
    var(--color-page-background)
  );

  @media (max-width: ${BREAKPOINT}px) {
    flex-direction: column;
    align-items: center;
  }
`

const HeaderIcon = (color = 'var(--color-accent)') => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.822.14l7.037 7.038a.456.456 0 0 1 0 .644L7.822 14.86a.456.456 0 0 1-.644 0L.14 7.822a.456.456 0 0 1 0-.644L7.178.14a.456.456 0 0 1 .644 0zM2.316 8.07h2.906a.294.294 0 0 0 .303-.302v-.523a.326.326 0 0 0-.08-.23.29.29 0 0 0-.223-.086H2.316a.294.294 0 0 0-.217.086.311.311 0 0 0-.086.23v.523a.294.294 0 0 0 .303.303zm7.462 0h2.906a.294.294 0 0 0 .303-.302v-.523a.326.326 0 0 0-.079-.23.29.29 0 0 0-.224-.086H9.778a.294.294 0 0 0-.217.086.311.311 0 0 0-.086.23v.523a.294.294 0 0 0 .303.303zM8.071 5.223V2.316a.294.294 0 0 0-.303-.303h-.523a.326.326 0 0 0-.23.079.29.29 0 0 0-.086.224v2.906c0 .088.029.16.086.217a.311.311 0 0 0 .23.086h.523a.294.294 0 0 0 .303-.303zm0 7.462V9.778a.294.294 0 0 0-.303-.303h-.523a.326.326 0 0 0-.23.08.29.29 0 0 0-.086.223v2.906c0 .088.029.16.086.217a.311.311 0 0 0 .23.086h.523a.294.294 0 0 0 .303-.303z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  )
}

const GlobalTitle = styled.h1`
  margin-bottom: 0;

  font-size: 1.4em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  a {
    display: inline-block;

    color: hsl(0, 0%, 53%);
    text-decoration: none;

    transition: all 0.3s ease-out;
  }

  span {
    opacity: 0.75;
  }

  svg {
    width: 21px;
    height: 21px;

    transition: all 0.3s ease-out;

    vertical-align: -1px;
  }

  path {
    fill: hsl(0, 0%, 53%);

    transition: all 0.3s ease-out;
  }

  a:hover {
    color: var(--color-accent);
    transform: translateX(5px);
    text-shadow: 0 2px 10px hsla(var(--hue-accent), 78%, 53%, 0.25);

    svg {
      transform: translateX(-5px) rotate(1turn);
      transform-origin: center;
    }

    path {
      fill: var(--color-accent);
    }
  }

  @media (max-width: ${BREAKPOINT}px) {
    margin-bottom: 1rem;
  }
`

const GlobalList = styled.ul`
  flex: 1;
  display: flex;

  margin-bottom: 0;

  justify-content: flex-end;

  li + li {
    margin-left: 1rem;
  }
`

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default () => {
  return (
    <Header className="page-header" id="page_header">
      <GlobalMenu>
        <GlobalTitle>
          <Link to="/">
            <HeaderIcon />
            {'  '}
            <span>Matthieu</span>
            {' '}
            Oger
          </Link>
        </GlobalTitle>

        <GlobalList>
          <li>
            <MenuButton url="/about/" activeClassName="selected">
              About
            </MenuButton>
          </li>
          <li>
            <MenuButton url="/articles/" activeClassName="selected">
              Articles
            </MenuButton>
          </li>
          <li>
            <MenuButton url="/atom.xml" external newTab>
              {getWrappedIcon('rss', {
                width: '11px',
                height: '11px',
                marginRight: '6px'
              })}
              RSS
            </MenuButton>
          </li>
        </GlobalList>
      </GlobalMenu>

      <Separator />
    </Header>
  )
}
