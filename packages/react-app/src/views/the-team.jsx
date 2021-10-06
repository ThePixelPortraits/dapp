import { PageTitle } from 'components/styled/App.styled'
import { Team, TeamMember, Image, Description } from 'views/styled/team.styled'

const TheTeam = () => {
  return (
    <>
      <PageTitle>the team</PageTitle>
      <Team>
        <TeamMember>
          <a
            href="https://twitter.com/DrTchockII"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="images/thom.jpg" width="250px" alt="thom" />
          </a>
          <Description>
            <p>thom is the guy</p>
          </Description>
        </TeamMember>
        <TeamMember>
          <a
            href="https://twitter.com/MarkBeylin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="images/mark.jpg" width="250px" alt="mark" />
          </a>
          <Description>
            <p>mark is another guy</p>
          </Description>
        </TeamMember>
        <TeamMember>
          <a
            href="https://twitter.com/Japhex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="images/jamie.jpg" width="250px" alt="jamie" />
          </a>
          <Description>
            <p>jamie is yet another guy</p>
          </Description>
        </TeamMember>
        <TeamMember>
          <a
            href="https://twitter.com/gorillapxl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="images/gorilla.png" width="250px" alt="giselle" />
          </a>
          <Description>
            <p>giselle is the girl</p>
          </Description>
        </TeamMember>
      </Team>
    </>
  )
}

export default TheTeam
