import React, {Fragment} from 'React'
import styled from 'styled-components'

// -------------------------------------------------------------
// Icons.
// -------------------------------------------------------------

export function getIcon(name, props) {
  name = name.toLowerCase().replace(' ', '')

  switch (name) {
    case 'site':
      return <SiteIcon {...props} />
    case 'twitter':
      return <TwitterIcon {...props} />
    case 'github':
      return <GitHubIcon {...props} />
    case 'dribbble':
      return <DribbbleIcon {...props} />
    case 'unsplash':
      return <UnsplashIcon {...props} />
    case 'instagram':
      return <InstagramIcon {...props} />
    case 'speakerdeck':
      return <SpeakerDeckIcon {...props} />
    case 'rss':
      return <RSSIcon {...props} />
    case 'site-line':
      return <SiteLineIcon {...props} />
    case 'twitter-line':
      return <TwitterLineIcon {...props} />
    case 'github-line':
      return <GitHubLineIcon {...props} />
    case 'dribbble-line':
      return <DribbbleLineIcon {...props} />
    case 'unsplash-line':
      return <UnsplashLineIcon {...props} />
    case 'instagram-line':
      return <InstagramLineIcon {...props} />
    case 'speakerdeck-line':
      return <SpeakerDeckLineIcon {...props} />
  }
}

const IconWrapper = styled.span`
  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
  margin-right: ${props => (props.marginRight ? props.marginRight : 0)};

  svg {
    width: ${props => props.width};
    height: ${props => props.height};
  }

  path {
    stroke: currentColor;
  }

  circle {
    fill: currentColor;
  }
`

export const getWrappedIcon = (name, props) => (
  <IconWrapper {...props}>{getIcon(name)}</IconWrapper>
)

// -------------------------------------------------------------
// Solar Sailer.
// -------------------------------------------------------------

export const SiteIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 25C5.596 25 0 19.404 0 12.5S5.596 0 12.5 0 25 5.596 25 12.5 19.404 25 12.5 25zm.322-19.86a.456.456 0 0 0-.644 0L5.14 12.179a.456.456 0 0 0 0 .644l7.037 7.037a.456.456 0 0 0 .644 0l7.037-7.037a.456.456 0 0 0 0-.644L12.822 5.14zm-5.506 7.93a.294.294 0 0 1-.303-.302v-.523c0-.096.029-.173.086-.23a.294.294 0 0 1 .217-.086h2.906a.29.29 0 0 1 .224.086.326.326 0 0 1 .079.23v.523a.294.294 0 0 1-.303.303H7.316zm7.462 0a.294.294 0 0 1-.303-.302v-.523c0-.096.029-.173.086-.23a.294.294 0 0 1 .217-.086h2.906a.29.29 0 0 1 .224.086.326.326 0 0 1 .079.23v.523a.294.294 0 0 1-.303.303h-2.906zm-1.707-2.848a.294.294 0 0 1-.303.303h-.523a.311.311 0 0 1-.23-.086.294.294 0 0 1-.086-.217V7.316a.29.29 0 0 1 .086-.224.326.326 0 0 1 .23-.079h.523a.294.294 0 0 1 .303.303v2.906zm0 7.462a.294.294 0 0 1-.303.303h-.523a.311.311 0 0 1-.23-.086.294.294 0 0 1-.086-.217v-2.906a.29.29 0 0 1 .086-.224.326.326 0 0 1 .23-.079h.523a.294.294 0 0 1 .303.303v2.906z"
        fill={color}
        fill-rule="nonzero"
      />
    </svg>
  )
}

export const SiteLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill-rule="nonzero" fill="none">
        <circle
          stroke={color}
          stroke-width="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M12.822 5.14l7.037 7.038a.456.456 0 0 1 0 .644l-7.037 7.037a.456.456 0 0 1-.644 0L5.14 12.822a.456.456 0 0 1 0-.644l7.037-7.037a.456.456 0 0 1 .644 0zm-5.506 7.93h2.906a.294.294 0 0 0 .303-.302v-.523a.326.326 0 0 0-.08-.23.29.29 0 0 0-.223-.086H7.316a.294.294 0 0 0-.217.086.311.311 0 0 0-.086.23v.523a.294.294 0 0 0 .303.303zm7.462 0h2.906a.294.294 0 0 0 .303-.302v-.523a.326.326 0 0 0-.079-.23.29.29 0 0 0-.224-.086h-2.906a.294.294 0 0 0-.217.086.311.311 0 0 0-.086.23v.523a.294.294 0 0 0 .303.303zm-1.707-2.848V7.316a.294.294 0 0 0-.303-.303h-.523a.326.326 0 0 0-.23.079.29.29 0 0 0-.086.224v2.906c0 .088.029.16.086.217a.311.311 0 0 0 .23.086h.523a.294.294 0 0 0 .303-.303zm0 7.462v-2.906a.294.294 0 0 0-.303-.303h-.523a.326.326 0 0 0-.23.08.29.29 0 0 0-.086.223v2.906c0 .088.029.16.086.217a.311.311 0 0 0 .23.086h.523a.294.294 0 0 0 .303-.303z"
          fill={color}
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// RSS.
// -------------------------------------------------------------

export const RSSIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="9"
      height="9"
      viewBox="0 0 9 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M.665.672c5.716.53 7.655 5.644 7.655 7.668"
          stroke={color}
          strokeWidth="1.3"
          opacity=".6"
          strokeLinecap="round"
        />
        <path
          d="M.66 3.69c3.233.482 4.537 3.177 4.66 4.65"
          stroke={color}
          strokeWidth="1.3"
          opacity=".8"
          strokeLinecap="round"
        />
        <circle fill={color} cx="1.28" cy="7.72" r="1.28" />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Twitter.
// -------------------------------------------------------------

export const TwitterIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm5.085 10.24c.005.106.006.213.006.317 0 3.255-2.475 7.007-7.004 7.007a6.947 6.947 0 0 1-3.773-1.107c.191.023.388.033.587.033a4.93 4.93 0 0 0 3.057-1.054 2.467 2.467 0 0 1-2.3-1.708 2.474 2.474 0 0 0 1.11-.043 2.464 2.464 0 0 1-1.974-2.414v-.03c.332.183.713.295 1.116.308A2.461 2.461 0 0 1 7.315 9.5c0-.45.121-.875.333-1.239a7 7 0 0 0 5.075 2.575 2.463 2.463 0 0 1 4.195-2.246 4.945 4.945 0 0 0 1.562-.598 2.473 2.473 0 0 1-1.082 1.363 4.946 4.946 0 0 0 1.415-.39 5 5 0 0 1-1.228 1.276z"
        fill={color}
      />
    </svg>
  )
}

export const TwitterLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M17.585 10.24c.005.106.006.213.006.317 0 3.255-2.475 7.007-7.004 7.007a6.947 6.947 0 0 1-3.773-1.107c.191.023.388.033.587.033a4.93 4.93 0 0 0 3.057-1.054 2.467 2.467 0 0 1-2.3-1.708 2.474 2.474 0 0 0 1.11-.043 2.464 2.464 0 0 1-1.974-2.414v-.03c.332.183.713.295 1.116.308A2.461 2.461 0 0 1 7.315 9.5c0-.45.121-.875.333-1.239a7 7 0 0 0 5.075 2.575 2.463 2.463 0 0 1 4.195-2.246 4.945 4.945 0 0 0 1.562-.598 2.473 2.473 0 0 1-1.082 1.363 4.946 4.946 0 0 0 1.415-.39 5 5 0 0 1-1.228 1.276z"
          fill={color}
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// GitHub.
// -------------------------------------------------------------

export const GitHubIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.52 12.434h-.04c-1.55 0-2.916-.395-3.725.349a2.043 2.043 0 0 0-.686 1.558c0 2.412 1.931 2.708 4.413 2.708h.038c2.48 0 4.412-.298 4.412-2.708a2.04 2.04 0 0 0-.686-1.558c-.81-.744-2.176-.35-3.726-.35zm-2.112 3.295c-.473 0-.855-.531-.855-1.185 0-.653.382-1.182.855-1.182.472 0 .855.529.855 1.182.001.654-.381 1.185-.855 1.185zm4.183 0c-.473 0-.855-.531-.855-1.185 0-.653.382-1.182.855-1.182.472 0 .854.529.854 1.182.002.654-.381 1.185-.854 1.185zM12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm1.14 17.629c-.223 0-.669 0-1.14.003-.471-.003-.917-.003-1.14-.003-.99 0-4.912-.077-4.912-4.803 0-1.086.372-1.882.983-2.546-.096-.24-.102-1.604.417-2.912 0 0 1.192.13 2.996 1.369.376-.105 1.017-.159 1.656-.159.64 0 1.279.054 1.658.158 1.803-1.239 2.996-1.369 2.996-1.369.518 1.307.514 2.673.416 2.912.611.664.983 1.46.983 2.545 0 4.73-3.923 4.805-4.912 4.805z"
        fill={color}
      />
    </svg>
  )
}

export const GitHubLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M12.52 12.434h-.04c-1.55 0-2.916-.395-3.725.349a2.043 2.043 0 0 0-.686 1.558c0 2.412 1.931 2.708 4.413 2.708h.038c2.48 0 4.412-.298 4.412-2.708a2.04 2.04 0 0 0-.686-1.558c-.81-.744-2.176-.35-3.726-.35zm-2.112 3.295c-.473 0-.855-.531-.855-1.185 0-.653.382-1.182.855-1.182.472 0 .855.529.855 1.182.001.654-.381 1.185-.855 1.185zm4.183 0c-.473 0-.855-.531-.855-1.185 0-.653.382-1.182.855-1.182.472 0 .854.529.854 1.182.002.654-.381 1.185-.854 1.185zm-.95 1.9c-.224 0-.67 0-1.141.003-.471-.003-.917-.003-1.14-.003-.99 0-4.912-.077-4.912-4.803 0-1.086.372-1.882.983-2.546-.096-.24-.102-1.604.417-2.912 0 0 1.192.13 2.996 1.369.376-.105 1.017-.159 1.656-.159.64 0 1.279.054 1.658.158 1.803-1.239 2.996-1.369 2.996-1.369.518 1.307.514 2.673.416 2.912.611.664.983 1.46.983 2.545 0 4.73-3.923 4.805-4.912 4.805z"
          fill={color}
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Dribbble.
// -------------------------------------------------------------

export const DribbbleIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.839 12.477a1.39 1.39 0 0 1 .134-.04 19.19 19.19 0 0 0-.364-.761c-2.448.725-4.791.732-5.21.725-.003.033-.003.066-.003.099 0 1.23.443 2.413 1.247 3.341.268-.432 1.69-2.553 4.196-3.364zm-3.434 4.076a5.05 5.05 0 0 0 3.095 1.051 5.09 5.09 0 0 0 1.945-.384 21.5 21.5 0 0 0-1.07-3.805c-2.762.977-3.805 2.815-3.97 3.138zm6.422-7.924a5.103 5.103 0 0 0-4.434-1.11 26.146 26.146 0 0 1 1.85 2.894c1.671-.642 2.426-1.568 2.584-1.784zm-3.711 2.131a30.799 30.799 0 0 0-1.843-2.852 5.128 5.128 0 0 0-2.75 3.46h.021c.529 0 2.408-.042 4.572-.608zm2.355 2.386c.606 1.683.884 3.082.964 3.53a5.122 5.122 0 0 0 2.095-3.311 7.565 7.565 0 0 0-2.073-.288c-.336 0-.668.023-.986.069zM12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 18.616A6.123 6.123 0 0 1 6.382 12.5 6.124 6.124 0 0 1 12.5 6.382a6.124 6.124 0 0 1 6.117 6.118 6.123 6.123 0 0 1-6.117 6.116zm1.2-7.322c.114.235.22.465.316.692l.092.221c.36-.043.746-.064 1.149-.064 1.111 0 2.035.163 2.345.224a5.116 5.116 0 0 0-1.11-3.047c-.208.269-1.065 1.254-2.791 1.974z"
        fill={color}
      />
    </svg>
  )
}

export const DribbbleLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M12.839 12.477a1.39 1.39 0 0 1 .134-.04 19.19 19.19 0 0 0-.364-.761c-2.448.725-4.791.732-5.21.725-.003.033-.003.066-.003.099 0 1.23.443 2.413 1.247 3.341.268-.432 1.69-2.553 4.196-3.364zm-3.434 4.076a5.05 5.05 0 0 0 3.095 1.051 5.09 5.09 0 0 0 1.945-.384 21.5 21.5 0 0 0-1.07-3.805c-2.762.977-3.805 2.815-3.97 3.138zm6.422-7.924a5.103 5.103 0 0 0-4.434-1.11 26.146 26.146 0 0 1 1.85 2.894c1.671-.642 2.426-1.568 2.584-1.784zm-3.711 2.131a30.799 30.799 0 0 0-1.843-2.852 5.128 5.128 0 0 0-2.75 3.46h.021c.529 0 2.408-.042 4.572-.608zm2.355 2.386c.606 1.683.884 3.082.964 3.53a5.122 5.122 0 0 0 2.095-3.311 7.565 7.565 0 0 0-2.073-.288c-.336 0-.668.023-.986.069zm-1.971 5.47A6.123 6.123 0 0 1 6.382 12.5 6.124 6.124 0 0 1 12.5 6.382a6.124 6.124 0 0 1 6.117 6.118 6.123 6.123 0 0 1-6.117 6.116zm1.2-7.322c.114.235.22.465.316.692l.092.221c.36-.043.746-.064 1.149-.064 1.111 0 2.035.163 2.345.224a5.116 5.116 0 0 0-1.11-3.047c-.208.269-1.065 1.254-2.791 1.974z"
          fill={color}
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Unsplash.
// -------------------------------------------------------------

export const UnsplashIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 25C5.596 25 0 19.404 0 12.5S5.596 0 12.5 0 25 5.596 25 12.5 19.404 25 12.5 25zm6.06-14.886c0-.91-.72-1.63-1.628-1.63H15.53l-.303-.908c-.151-.417-.644-.758-1.098-.758H10.87c-.454 0-.947.341-1.098.758l-.303.871H8.068a1.64 1.64 0 0 0-1.629 1.629v5.682c0 .909.72 1.628 1.63 1.628h8.863a1.64 1.64 0 0 0 1.629-1.628v-5.644zm-3.257 2.84c0 1.554-1.25 2.804-2.84 2.841a2.837 2.837 0 0 1-2.842-2.84 2.862 2.862 0 0 1 2.841-2.841 2.837 2.837 0 0 1 2.841 2.84zm-.985-.037c0-.985-.795-1.78-1.818-1.819a1.819 1.819 0 1 0 1.818 1.819z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  )
}

export const UnsplashLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M18.56 10.114v5.644a1.64 1.64 0 0 1-1.628 1.628H8.068c-.909 0-1.629-.72-1.629-1.628v-5.682c0-.871.72-1.629 1.63-1.629h1.4l.304-.871c.151-.417.644-.758 1.098-.758h3.258c.454 0 .947.341 1.098.758l.303.909h1.402c.909 0 1.629.72 1.629 1.629zm-3.257 2.84c0-1.552-1.25-2.84-2.84-2.84a2.862 2.862 0 0 0-2.842 2.84 2.837 2.837 0 0 0 2.841 2.841c1.591-.037 2.841-1.287 2.841-2.84zm-.985-.037a1.819 1.819 0 1 1-1.818-1.819c1.023.038 1.818.834 1.818 1.819z"
          fill={color}
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Instagram.
// -------------------------------------------------------------

export const InstagramIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5A12.5 12.5 0 0 0 12.5 0zm6.471 15.184a4.78 4.78 0 0 1-.302 1.58 3.328 3.328 0 0 1-1.904 1.905 4.78 4.78 0 0 1-1.58.302c-.695.032-.917.04-2.685.04s-1.99-.008-2.684-.04a4.78 4.78 0 0 1-1.58-.302 3.328 3.328 0 0 1-1.905-1.904 4.78 4.78 0 0 1-.302-1.58c-.032-.695-.04-.917-.04-2.685s.008-1.99.04-2.684a4.78 4.78 0 0 1 .302-1.58A3.328 3.328 0 0 1 8.235 6.33a4.78 4.78 0 0 1 1.58-.302c.695-.032.917-.04 2.685-.04s1.99.008 2.684.04a4.78 4.78 0 0 1 1.58.302 3.328 3.328 0 0 1 1.905 1.904c.19.506.291 1.04.302 1.58.032.695.04.917.04 2.685s-.008 1.99-.04 2.684zM17.575 8.66a2.156 2.156 0 0 0-1.235-1.235 3.601 3.601 0 0 0-1.21-.224c-.686-.032-.892-.038-2.63-.038s-1.944.006-2.63.038c-.414.004-.823.08-1.21.224A2.156 2.156 0 0 0 7.425 8.66c-.144.387-.22.796-.224 1.21-.032.686-.038.892-.038 2.63s.006 1.944.038 2.63c.004.414.08.823.224 1.21a2.156 2.156 0 0 0 1.235 1.235c.387.144.796.22 1.21.224.686.032.892.038 2.63.038s1.944-.006 2.63-.038c.414-.004.823-.08 1.21-.224a2.156 2.156 0 0 0 1.235-1.235c.144-.387.22-.796.224-1.21.032-.686.038-.892.038-2.63s-.006-1.944-.038-2.63a3.601 3.601 0 0 0-.224-1.21zM12.5 15.843a3.343 3.343 0 1 1 0-6.686 3.343 3.343 0 0 1 0 6.686zm3.475-6.037a.781.781 0 1 1 0-1.563.781.781 0 0 1 0 1.563zM12.5 14.67a2.17 2.17 0 1 0 0-4.34 2.17 2.17 0 0 0 0 4.34z"
        fill={color}
      />
    </svg>
  )
}

export const InstagramLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M18.971 15.184a4.78 4.78 0 0 1-.302 1.58 3.328 3.328 0 0 1-1.904 1.905 4.78 4.78 0 0 1-1.58.302c-.695.032-.917.04-2.685.04s-1.99-.008-2.684-.04a4.78 4.78 0 0 1-1.58-.302 3.328 3.328 0 0 1-1.905-1.904 4.78 4.78 0 0 1-.302-1.58c-.032-.695-.04-.917-.04-2.685s.008-1.99.04-2.684a4.78 4.78 0 0 1 .302-1.58A3.328 3.328 0 0 1 8.235 6.33a4.78 4.78 0 0 1 1.58-.302c.695-.032.917-.04 2.685-.04s1.99.008 2.684.04a4.78 4.78 0 0 1 1.58.302 3.328 3.328 0 0 1 1.905 1.904c.19.506.291 1.04.302 1.58.032.695.04.917.04 2.685s-.008 1.99-.04 2.684zM17.575 8.66a2.156 2.156 0 0 0-1.235-1.235 3.601 3.601 0 0 0-1.21-.224c-.686-.032-.892-.038-2.63-.038s-1.944.006-2.63.038c-.414.004-.823.08-1.21.224A2.156 2.156 0 0 0 7.425 8.66c-.144.387-.22.796-.224 1.21-.032.686-.038.892-.038 2.63s.006 1.944.038 2.63c.004.414.08.823.224 1.21a2.156 2.156 0 0 0 1.235 1.235c.387.144.796.22 1.21.224.686.032.892.038 2.63.038s1.944-.006 2.63-.038c.414-.004.823-.08 1.21-.224a2.156 2.156 0 0 0 1.235-1.235c.144-.387.22-.796.224-1.21.032-.686.038-.892.038-2.63s-.006-1.944-.038-2.63a3.601 3.601 0 0 0-.224-1.21zM12.5 15.843a3.343 3.343 0 1 1 0-6.686 3.343 3.343 0 0 1 0 6.686zm3.475-6.037a.781.781 0 1 1 0-1.563.781.781 0 0 1 0 1.563zM12.5 14.67a2.17 2.17 0 1 0 0-4.34 2.17 2.17 0 0 0 0 4.34z"
          fill={color}
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Speaker Deck.
// -------------------------------------------------------------

export const SpeakerDeckIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 25C5.596 25 0 19.404 0 12.5S5.596 0 12.5 0 25 5.596 25 12.5 19.404 25 12.5 25zM8 7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H8zm0 1h9a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm3.5 7v-5l-3 2.5 3 2.5zm2 0l3-2.5-3-2.5v5z"
        fill={color}
      />
    </svg>
  )
}

export const SpeakerDeckLineIcon = ({color}) => {
  return (
    <svg
      className="icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          stroke={color}
          strokeWidth="1.3"
          cx="12.5"
          cy="12.5"
          r="11.85"
        />
        <path
          d="M8 7h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H8zm3.5 7l-3-2.5 3-2.5v5zm2 0v-5l3 2.5-3 2.5z"
          fill={color}
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}
