import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppService {
  constructor(private titleService: Title) {}

  // Check if IE10
  get isIE10() {
    return (
      typeof document['documentMode'] === 'number' &&
      document['documentMode'] === 10
    );
  }

  // Animate scrollTop
  scrollTop(
    to: number,
    duration: number,
    element = document.scrollingElement || document.documentElement
  ) {
    if (element.scrollTop === to) {
      return;
    }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration),
        10
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }
}
