import styled, { createGlobalStyle } from 'styled-components'

import { theme } from 'themes/default.styled'

export const GlobalStyle = createGlobalStyle`
  body {
	  margin: 0;
	  color: rgba(0, 0, 0, 0.85);
	  font-size: 14px;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
	  font-variant: tabular-nums;
	  line-height: 1.5715;
	  font-feature-settings: 'tnum', "tnum";
	  background: ${({ dark }) => (dark ? '#000' : theme.colors.white)};
	  color: ${({ dark }) => (dark ? '#fff' : '#000')};
  }
  
  * {
      box-sizing: border-box;
      line-height: inherit;
  }
  
  a {
      text-decoration: none;
      color:#1890ff;
  }
  
  h1,h2,h3,h4,h5,h6 {font-weight:500;}
`

export const AppContainer = styled.div`
  font-family: 'Cutive Mono';
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LayoutContainer = styled.main`
  position: relative;
  width: 80vw;
  padding: 25px;
  margin-bottom: 4rem;

  @media ${() => theme.breakpoints.desktopDown} {
    width: 100vw;
  }
`

export const PageTitle = styled.h1`
  display: flex;
  font-family: 'Cutive Mono';
`

export const PageContent = styled.div`
  font-family: 'Cutive Mono';
  font-size: 1.1rem;
  margin-bottom: 1em;
  width: 100%;

  h1 {
    font-size: 56px;
    line-height: 1rem;
    margin-bottom: 16px;
  }
`

export const PageHero = styled.div`
  display: flex;
  width: 100%;

  @media ${() => theme.breakpoints.desktopDown} {
    flex-direction: column-reverse;
  }
`

export const HeroQueue = styled.div`
  width: 500px;
  margin-right: 20px;

  @media ${() => theme.breakpoints.desktopDown} {
    width: 100%;
    margin-right: 0;
  }
`

export const HeroText = styled.div`
  margin-top: 20px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  width: 60%;

  @media ${() => theme.breakpoints.desktopDown} {
    padding-left: 0;
    border: 0;
    width: 100%;
    margin-bottom: 50px;
  }
`

export const PageContentBox = styled.div`
  min-height: 800px;
`

export const ColsContainer = styled.div`
  display: flex;

  @media ${() => theme.breakpoints.tabletDown} {
    flex-direction: column;
  }
`

export const HalfCol = styled.div`
  width: 50%;
  padding: 0 15px;
  font-family: 'Cutive Mono';
  font-size: 1.1rem;
  word-break: break-word;

  @media ${() => theme.breakpoints.tabletDown} {
    width: 100%;
    padding: 0;
  }

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`

export const Hr = styled.hr`
  margin-top: 25px;
  border: 0;
  border-top: 1px solid #eee;
`

export const Emphasis = styled.strong`
  font-weight: normal;
  display: inline-block;
  background: rgba(${({ colour }) => theme.colors[colour]});
  padding: 0 4px;
`

export const TextLink = styled.a`
  border-bottom: 1px solid;
`
