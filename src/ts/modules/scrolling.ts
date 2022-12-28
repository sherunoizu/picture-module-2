export const scrolling = (upSelector: string) => {
  const upElem = document.querySelector(upSelector) as HTMLAnchorElement;
  const pageUpShowDistance: number = 1650;

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > pageUpShowDistance) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  // RAF scrolling

  const links = document.querySelectorAll(
    '[href^="#"]'
  ) as NodeListOf<HTMLAnchorElement>;
  const speed: number = 0.3;

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const element = document.documentElement as HTMLElement;
      const body = document.body as HTMLElement;
      const scrollTop: number = Math.round(body.scrollTop || element.scrollTop);
      const hash: string = this.hash;
      const toBlock: number = document
        .querySelector(hash)
        .getBoundingClientRect().top;

      let start: number = null;

      requestAnimationFrame(step);

      function step(time: number): void {
        if (start === null) {
          start = time;
        }

        const animationProgress: number = time - start;
        const yCoordinate: number =
          toBlock < 0
            ? Math.max(
                scrollTop - animationProgress / speed,
                scrollTop + toBlock
              )
            : Math.min(
                scrollTop + animationProgress / speed,
                scrollTop + toBlock
              );

        document.documentElement.scrollTo(0, yCoordinate);

        if (yCoordinate != scrollTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });

  // Pure JS scrolling

  // interface ISmoothScroll {
  //   from: number;
  //   to: number;
  //   hash: string;
  // }

  // const element = document.documentElement;
  // const body = document.body;

  // const calcScroll = () => {
  //   upElem.addEventListener('click', function (event) {
  //     const scrollTop = Math.round(body.scrollTop || element.scrollTop);

  //     if (this.hash !== '') {
  //       event.preventDefault();

  //       let hashElementTop: number = 0;
  //       let hashElement = document.querySelector(this.hash) as HTMLElement;

  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop;
  //         hashElement = hashElement.offsetParent as HTMLElement;
  //       }

  //       hashElementTop = Math.round(hashElementTop);

  //       const smoothScrollParametrs = {
  //         from: scrollTop,
  //         to: hashElementTop,
  //         hash: this.hash
  //       } as ISmoothScroll;
  //       smoothScroll(smoothScrollParametrs);
  //     }
  //   });
  // };

  // const smoothScroll = ({from, to, hash}: ISmoothScroll) => {
  //   let timeInterval: number = 1;
  //   let prevScrollTop: number;
  //   let speed: number;

  //   if (to > from) {
  //     speed = 30;
  //   } else {
  //     speed = -30;
  //   }

  //   const move = setInterval(function () {
  //     const scrollTop: number = Math.round(body.scrollTop || element.scrollTop);
  //     const isEndpoint: boolean =
  //       prevScrollTop === scrollTop ||
  //       (to > from && scrollTop >= to) ||
  //       (to < from && scrollTop <= to);

  //     if (isEndpoint) {
  //       clearInterval(move);

  //       history.replaceState(
  //         history.state,
  //         document.title,
  //         location.href.replace(/#.*$/g, '') + hash
  //       );
  //     } else {
  //       body.scrollTop += speed;
  //       element.scrollTop += speed;
  //       prevScrollTop = scrollTop;
  //     }
  //   }, timeInterval);
  // };

  // calcScroll();
};
