import React, {useState} from 'react';
import { HeroContainer, HeroButton, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroMenu, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';
import {Button} from '../ButtonElements';
import Video from '../../videos/video.mp4';

const HeroSection = () => {
  const [hover, setHover] = useState(true)
  const onHover = () => {
    setHover(!hover)
  }
  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4'></VideoBg>
      </HeroBg>
      <HeroContent>
        <HeroH1>Choose a dificulty</HeroH1>
        <HeroP>Matchmaking requires to be connected</HeroP>
        <HeroMenu>
          {/* <HeroBtnWrapper> */}
            <HeroButton to="pong1" onMouseEnter={onHover} onMouseLeave={onHover}>
              Easy {hover ? <ArrowForward /> : <ArrowRight />}
            </HeroButton>
            <HeroButton to="pong2" onMouseEnter={onHover} onMouseLeave={onHover}>
              Medium {hover ? <ArrowForward /> : <ArrowRight />}
            </HeroButton>
            <HeroButton to="pong3" onMouseEnter={onHover} onMouseLeave={onHover}>
              Hard {hover ? <ArrowForward /> : <ArrowRight />}
            </HeroButton>
          {/* </HeroBtnWrapper> */}
        </HeroMenu>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection;