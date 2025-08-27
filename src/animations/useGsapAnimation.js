import gsap from 'gsap';

export function initAnimation() {
  return import('gsap/ScrollTrigger').then((module) => {
    gsap.registerPlugin(module.ScrollTrigger);

    const useGsap = (elementRef, animation, delay = 0,start = 'top 85%') => {
      if (elementRef.current) {
        gsap.fromTo(elementRef.current, animation.from, {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            toggleActions: 'play none none reverse',
          },
        });
      }
    };
    return useGsap
  });
}
