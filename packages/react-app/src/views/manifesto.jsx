import {
  PageTitle,
  ColsContainer,
  HalfCol,
  Emphasis,
  TextLink,
} from 'components/styled/App.styled'

const Manifesto = () => {
  return (
    <>
      <PageTitle>manifesto</PageTitle>
      <ColsContainer>
        <HalfCol>
          <Emphasis colour="lightPurple40">
            pixel portraits are for the people! the
          </Emphasis>
          <Emphasis colour="lightPurple40">
            cryptoletariat & the bourgeoide-fi!
          </Emphasis>
          <br />
          <br />
          we want to bring the joy of commissioning and owning a pixel portrait
          to <Emphasis colour="lightPurple40">everyone!</Emphasis>
          <br />
          <br />
          <Emphasis colour="lightPurple40">feel like a medici</Emphasis> as we
          bring your ideas to life!
          <br />
          <br />
          - no bonding curve!
          <br />
          - no algorithmic generation of traits!
          <br />
          - no AI!
          <br />
          <br />
          just unique pixel portraits created in the likeness of your choosing,
          with <Emphasis colour="red40">love!</Emphasis> memorialised in the
          annals of crypto!
          <br />
          <br />
          you can commission your personal pixel portrait and join the pixelfam
          community by getting in the queue and{' '}
          <Emphasis colour="lightBlue40">waiting patiently!</Emphasis>
          if you’re impatient then there’s the option to{' '}
          <Emphasis colour="lightBlue40">get your portrait faster!</Emphasis>
          <br />
          <br />
          human, ape, alien & other humanoid subjects are{' '}
          <Emphasis colour="aqua40">strongly encouraged!</Emphasis>
          <Emphasis colour="aqua40" style={{ marginLeft: '5px' }}>
            no pets
          </Emphasis>{' '}
          except mooncats!
          <br />
          feel free to make us an offer we can’t refuse though!
          <br />
          <br />
          they make great gifts for non-crypto friends to get them on metamask!
          commission different portraits for different online personae!
        </HalfCol>
        <HalfCol>
          <Emphasis colour="orange40">pay what you want!</Emphasis>
          the entry price for the queue is 0.1 ETH and we don’t plan to change
          this without fair warning!
          <br />
          you can choose to pay more to{' '}
          <Emphasis colour="orange40">skip ahead</Emphasis> of those with lower
          bids!
          <br />
          <br />
          every name will be unique and duplicate subjects are{' '}
          <Emphasis colour="green40">strongly discouraged!</Emphasis>
          <br />
          if multiple people want the same portrait the{' '}
          <Emphasis colour="green40">highest bid will be accepted</Emphasis> and
          the other bidders will have the option to choose a new subject for
          their portrait or cancel their bid!
          <br />
          <br />
          we will occasionally order the queue by ‘length of time waiting’ to
          ensure <Emphasis colour="lilac40">no one waits forever</Emphasis> and
          reserve the right to cherry pick commissions from wherever we please
          in the queue as appropriate!
          <br />
          <br />
          when it is your turn thom will accept the commission and get in touch
          for your consultation before beginning production!
          <br />
          <br />
          portraits will be listed privately to be claimed on opensea when
          complete!
        </HalfCol>
      </ColsContainer>
      <ColsContainer>
        <HalfCol>
          <div style={{ marginBottom: '32px', marginTop: '72px' }}>
            get in touch via twitter as{' '}
            <TextLink href="https://y.at/🎨💻🖼️😍">
              https://y.at/🎨💻🖼️😍
            </TextLink>
          </div>
          <div style={{ marginBottom: '32px' }}>
            join the discord at{' '}
            <TextLink href="https://y.at/🖼️🐵🤝👽🖼️">
              https://y.at/🖼️🐵🤝👽🖼️
            </TextLink>
          </div>
          <div>
            or email{' '}
            <TextLink href="MAILTO:thepixelportraits@protonmail.com">
              thepixelportraits@protonmail.com
            </TextLink>{' '}
            with any questions!
          </div>
        </HalfCol>
      </ColsContainer>
    </>
  )
}

export default Manifesto
