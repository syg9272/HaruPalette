import styled from '@emotion/styled';
import Round from '../../progressbar/Round';
import useScreenY from '../../../hooks/useScreenY';
import JellyList from '../../common/JellyList';
import { useSectionThreeBall } from '../../../hooks/useBall';
import Mouse from '../Mouse';

const Section = styled.section<{ windowHeight: number }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;
  position: relative;
  opacity: ${props =>
    props.windowHeight > 6300 && props.windowHeight < 7100 ? 1 : 0};
  @media screen and (min-height: 800px) {
    opacity: ${props =>
      props.windowHeight >= 7250 && props.windowHeight < 7850 ? 1 : 0};
  }

  @media screen and (max-width: 960px) {
    padding: 0 1rem;
    justify-content: space-around;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 0 1rem;
  }
`;

const Background = styled.div<{ windowHeight: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  display: ${props =>
    props.windowHeight >= 6300 && props.windowHeight < 7250 ? 'flex' : 'none'};
  opacity: ${props =>
    props.windowHeight >= 6450 && props.windowHeight <= 7000 ? 1 : 0};
  @media screen and (min-height: 800px) {
    display: ${props =>
      props.windowHeight >= 7250 && props.windowHeight < 8050
        ? 'flex'
        : 'none'};
    opacity: ${props =>
      props.windowHeight >= 7450 && props.windowHeight < 7800 ? 1 : 0};
  }
`;

const RightContainer = styled.div<{ windowHeight: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & p {
    font-size: 1.3vw;
    color: white;
  }
  z-index: 1;
  display: ${props =>
    props.windowHeight > 6200 && props.windowHeight < 7100 ? 'flex' : 'none'};
  opacity: ${props =>
    props.windowHeight >= 6450 && props.windowHeight <= 7000 ? 1 : 0};

  @media screen and (min-height: 800px) {
    display: ${props =>
      props.windowHeight > 7400 && props.windowHeight < 8200 ? 'flex' : 'none'};
    opacity: ${props =>
      props.windowHeight >= 7450 && props.windowHeight < 7900 ? 1 : 0};
  }
  @media screen and (max-width: 500px) {
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const SectionText = styled.h1`
  font-size: 5vw;
  margin-bottom: 0.5rem;
  color: white;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    font-size: 3rem;
  }
`;

const ChallengeContainer = styled.article<{ windowHeight: number }>`
  display: ${props =>
    props.windowHeight > 6200 && props.windowHeight < 7100 ? 'flex' : 'none'};
  opacity: ${props =>
    props.windowHeight >= 6450 && props.windowHeight <= 7000 ? 1 : 0};
  width: 40vw;
  height: 100%;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media screen and (min-height: 800px) {
    display: ${props =>
      props.windowHeight > 7400 && props.windowHeight < 8200 ? 'flex' : 'none'};
    opacity: ${props =>
      props.windowHeight >= 7450 && props.windowHeight < 7900 ? 1 : 0};
  }

  @media screen and (max-width: 960px) {
    scale: 0.8;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    scale: 0.8;
    padding: 0 1rem;
    display: ${props =>
      props.windowHeight > 6500 && props.windowHeight < 8000 ? 'flex' : 'none'};
    opacity: ${props =>
      props.windowHeight > 6700 && props.windowHeight < 7800 ? 1 : 0};
  }
`;

const ChallengeItem = styled.div`
  margin: 0 1rem;
  @media screen and (max-width: 500px) {
    scale: 0.8;
  }
`;

function Section5() {
  const windowHeight = useScreenY();
  const windowHScale = window.innerHeight > 800 ? 1050 : 0;
  const ball = useSectionThreeBall();

  const ROUND_DATA = [
    {
      currCnt: 3,
      allCnt: 3,
      desc: '주 3회 작성하기',
      color: 'primary20',
    },
    {
      currCnt: 3,
      allCnt: 7,
      desc: '주 7회 작성하기',
      color: 'primary40',
    },
  ];
  return (
    <Section windowHeight={windowHeight}>
      <Background windowHeight={windowHeight}>
        <JellyList ball={ball} />
      </Background>
      <RightContainer windowHeight={windowHeight}>
        <SectionText>챌린지 달성</SectionText>
        <p>
          꾸준한 일기 작성 통해 의지를 올려보고!
          <br />
          대량의 포인트도 쌓아보고!
        </p>
      </RightContainer>
      <ChallengeContainer windowHeight={windowHeight}>
        {ROUND_DATA.map(data =>
          windowHeight >= 5900 && windowHeight < 8400 ? (
            <ChallengeItem key={data.allCnt}>
              <Round data={data} />
            </ChallengeItem>
          ) : (
            ''
          ),
        )}
      </ChallengeContainer>
      {windowHeight >= 6400 + windowHScale &&
      windowHeight <= 6900 + windowHScale ? (
        <Mouse top={7800 + windowHScale} />
      ) : (
        ''
      )}
    </Section>
  );
}

export default Section5;
