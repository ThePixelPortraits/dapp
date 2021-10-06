import { SubSection, SubTitle } from 'components/styled/page.styled'

const PageSubSection = ({ pageTitle, children }) => (
  <SubSection>
    <SubTitle>{pageTitle}</SubTitle>
    {children}
  </SubSection>
)

export default PageSubSection
