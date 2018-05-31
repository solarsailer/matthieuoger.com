import React from 'react'
import styled, {css} from 'styled-components'

import postStyles from '../../styles/components/post'

// -------------------------------------------------------------
// Sample page.
// -------------------------------------------------------------

const Container = styled.article`
  ${postStyles};
`

export default () => (
  <Container>
    <h1>H1 Title Level 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare nibh
      ipsum, non placerat urna tincidunt ac. Ut ac libero elit. In sapien velit,
      dignissim non mi vel, mollis euismod metus. Nullam mollis posuere velit
      eget pulvinar. Donec lacinia, tortor nec suscipit commodo, orci massa
      rutrum dui, a accumsan eros elit sit amet est. Aenean vehicula lorem ac
      faucibus scelerisque. Aliquam tempor nulla quis convallis porttitor.
      Aliquam non vestibulum tortor. Ut vitae consectetur ipsum.
    </p>
    <h2>H2 Title Level 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare nibh
      ipsum, non placerat urna tincidunt ac. Ut ac libero elit. In sapien velit,
      dignissim non mi vel, mollis euismod metus. Nullam mollis posuere velit
      eget pulvinar. Donec lacinia, tortor nec suscipit commodo, orci massa
      rutrum dui, a accumsan eros elit sit amet est. Aenean vehicula lorem ac
      faucibus scelerisque.
    </p>
    <h3>H3 Title Level 3</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare nibh
      ipsum, non placerat urna tincidunt ac. Ut ac libero elit. In sapien velit,
      dignissim non mi vel, mollis euismod metus. Nullam mollis posuere velit
      eget pulvinar. Donec lacinia, tortor nec suscipit commodo, orci massa
      rutrum dui, a accumsan eros elit sit amet est.
    </p>
    <h4>H4 Title Level 4</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare nibh
      ipsum, non placerat urna tincidunt ac. Ut ac libero elit. In sapien velit,
      dignissim non mi vel, mollis euismod metus. Nullam mollis posuere velit
      eget pulvinar.
    </p>
    <h5>H5 Title Level 5</h5>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare nibh
      ipsum, non placerat urna tincidunt ac. Ut ac libero elit.
    </p>
    <h6>h6 Title Level 6</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </Container>
)
