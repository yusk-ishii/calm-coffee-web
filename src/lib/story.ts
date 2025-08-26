import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Storyセクションのアニメーション
const story = document.getElementById('story') as HTMLElement;
const storyTitle = story.querySelector('.story-title') as HTMLElement;
const storyBody = story.querySelector('.story-body') as HTMLElement;
const paragraphs = storyBody.querySelectorAll('.story-text span');
const animationText = [storyTitle, ...paragraphs];

const textTl = gsap.timeline({
  scrollTrigger: {
    trigger: story,
    start: '0% 75%',
    end: '10% 20%',
    // markers: true,
    scrub: 3,
    once: true,
  },
});

textTl.from(animationText, {
  opacity: 0,
  y: 10,
  filter: 'blur(10px)',
  stagger: 0.3,
});
