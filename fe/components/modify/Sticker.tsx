import { Dispatch, SetStateAction } from 'react';
import { ColorTypes } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import STICKER from '../../constants/sticker';
import useTheme from '../../hooks/useTheme';

const Container = styled.div<{ theme: ColorTypes }>`
  width: 30rem;
  height: 40rem;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3px);
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.main};

  position: relative;
  border-radius: 1.5rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transform: scale(1);

  @media all and (max-width: 500px) {
    transform: scale(0.65);
    margin-top: -150px;
  }
`;

const StickerImage = styled(Image)`
  margin: 2rem;
  opacity: 0.5;
`;

const NowStickerImage = styled(Image)`
  margin: 2rem;
`;

function Sticker(props: {
  setNowSticker: Dispatch<SetStateAction<string>>;
  nowSticker: string;
}) {
  const { setNowSticker, nowSticker } = props;
  const theme = useTheme();

  const handleSticker = (item: SetStateAction<string>) => {
    setNowSticker(item);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container theme={theme}>
      {STICKER.map(item => {
        return (
          <button type="button" key={item}>
            {item === nowSticker ? (
              <NowStickerImage
                src={`/assets/img/sticker/${item}.svg`}
                width={48}
                height={48}
                alt={item}
                onClick={() => handleSticker(item)}
              />
            ) : (
              <StickerImage
                src={`/assets/img/sticker/${item}.svg`}
                width={48}
                height={48}
                alt={item}
                onClick={() => handleSticker(item)}
              />
            )}
          </button>
        );
      })}
    </Container>
  );
}

export default Sticker;
