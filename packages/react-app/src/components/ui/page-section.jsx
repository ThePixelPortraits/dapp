import { Section, Title } from 'components/styled/page.styled'

const PageSection = ({
  pageTitle,
  children,
  headerContent,
  danger,
  style,
  noPadding,
  smallTitle,
}) => (
  <Section noPadding={noPadding} danger={danger} style={style}>
    {pageTitle && (
      <Title smallTitle={smallTitle}>
        {pageTitle}
        {headerContent && headerContent}
      </Title>
    )}
    {children}
  </Section>
)

export default PageSection
