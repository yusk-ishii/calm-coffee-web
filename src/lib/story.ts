import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easeOutSine } from './utils/easing';

gsap.registerPlugin(ScrollTrigger);

// Storyセクションのアニメーション
const story = document.getElementById('story') as HTMLElement;
const storyTitle = story.querySelector('.story-title') as HTMLElement;
const storyBody = story.querySelector('.story-body') as HTMLElement;
const paragraphs = storyBody.querySelectorAll('.story-text span');
const animationText = [storyTitle, ...paragraphs];

const textTl = gsap.timeline({
  defaults: { ease: easeOutSine },
  scrollTrigger: {
    trigger: story,
    start: '15% 75%',
    end: '10% 20%',
    // markers: true,
    scrub: 5,
    once: true,
  },
});

textTl.from(animationText, {
  opacity: 0,
  xPercent: -1,
  yPercent: -20,
  filter: 'blur(15px)',
  stagger: 0.15,
});
