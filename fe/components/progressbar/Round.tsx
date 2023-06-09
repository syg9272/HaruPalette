import Image from 'next/image';
import { ColorTypes, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import useTheme from '../../hooks/useTheme';
import { selectProfile } from '../../store/modules/profile';

export interface DiaryProps {
  currCnt: number;
  allCnt: number;
  desc: string;
  color: string;
}

const stroke = 690;

const animation = (percent: number) => keyframes`
    0% {
        stroke-dashoffset: ${stroke};
    }
    100% {
        stroke-dashoffset: calc(${stroke} - (${stroke} * ${percent})) / 100;
    }
`;

const Container = styled.div`
  position: relative;
  width: 240px;
  height: 240px;

  @media all and (max-width: 560px) {
    margin: 30px 0;
  }
`;

const ProgressWrap = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  transform: rotate(-90deg);
  transition: transform 0.2s;
  filter: drop-shadow(-4px 4px 2px rgba(0, 0, 0, 0.25));
`;
const ProgressBar1 = styled.circle`
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 20;
  transform: translate(10px, 10px);
  stroke-dasharray: ${stroke};
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: white;
`;
const ProgressBar2 = styled.circle<{
  theme: ColorTypes;
  percent: number;
  primary: string;
}>`
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 20;
  transform: translate(10px, 10px);
  stroke-dasharray: ${stroke};
  stroke-dashoffset: calc(
    ${stroke} - (${stroke} * ${props => props.percent}) / 100
  );
  stroke-linecap: round;
  stroke: ${props => {
    if (props.primary === 'primary40') return props.theme.primary40;
    if (props.primary === 'primary60') return props.theme.primary60;
    if (props.primary === 'primary80') return props.theme.primary80;
    return props.theme.primary20;
  }};
  animation: ${props => animation(props.percent)} 1s linear;
`;

const ProgressBar3 = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 240px;
  background: rgba(122, 122, 122, 0.8);
  position: relative;
  top: -247px;
  left: 0;
  z-index: 9;
  opacity: 0;
  transition: all 0.4s;
`;

const Stamp = styled(Image)`
  position: relative;
  top: -400px;
  left: 130px;
  z-index: 99;
  opacity: 0;
  transition: all 1s;
`;

const Diary = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0.5);
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Challenge = styled.div`
  position: absolute;
  width: 150px;
  height: 125px;
  top: 90px;
  left: 45px;
  transform: scale(0.75);
  text-align: center;
  color: black;
`;

const Percent = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: black;
`;
function Round(props: { data: DiaryProps }) {
  const { data } = props;
  // props : 과제 완료 현황(percent), 색상 값(20, 40, 60, 80), 과제 내용
  // 과제 완료 현황
  const percent = Math.floor((data.currCnt / data.allCnt) * 100);
  // 색상 값
  const primary: string = data.color;
  // 현재 테마 가져오기
  const theme = useTheme();
  // 현재 선택된 캐릭터 가져오기
  const chr = useAppSelector(selectProfile);
  // 일기장 이미지 가져오기
  const diary = `/assets/img/${chr.chrName}/${primary}_diary.svg`;
  // 과제 내용 및 현황
  const content = data.desc;
  const stampRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (stampRef.current) {
        stampRef.current.style.opacity = '1';
      }
      if (divRef.current) {
        divRef.current.style.opacity = '1';
      }
    }, 1000);
  }, []);

  return (
    <Container>
      <ProgressWrap>
        <ProgressBar1 cx="110" cy="110" r="110" />
        <ProgressBar2
          cx="110"
          cy="110"
          r="110"
          theme={theme}
          percent={percent > 100 ? 100 : percent}
          primary={primary}
        />
      </ProgressWrap>
      <Diary src={diary} width={120} height={126} alt="diary" />
      <Challenge>
        <div>{content}</div>

        <Percent>
          {data.currCnt > data.allCnt ? data.allCnt : data.currCnt}/
          {data.allCnt}
        </Percent>
      </Challenge>
      {percent >= 100 && <ProgressBar3 ref={divRef} />}
      {percent >= 100 && (
        <Stamp
          src={`/assets/img/${chr.chrName}/stamp.svg`}
          width={150}
          height={150}
          alt="stamp"
          ref={stampRef}
        />
      )}
    </Container>
  );
}

export default Round;
