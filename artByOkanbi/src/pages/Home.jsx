import { useState } from 'react';
import FullscreenSlider from '../common/components/FullscreenSlider';

const images = [
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018342/20230322_141840_wsa7ja.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018339/20230322_141825_nfjmws.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018338/20230322_142214_udl3qf.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018336/20230322_142313_gvmnqo.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018333/20230322_142039_sbzz2d.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018332/20230322_142115_wwekwi.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018331/20230322_142237_gjagfj.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018331/20230322_142007_e7qaad.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018328/20230322_142255_t5cj21.jpg',
  'https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1680018328/39283232_ifjmiw.jpg',
];

const titles = [
  'SCROLL',
  'EXPLORE',
  'DISCOVER',
  'IMMERSE',
  'REFLECT',
  'ADMIRE',
  'OBSERVE',
  'CONTEMPLATE',
  'EXPERIENCE',
  'APPRECIATE'
];

function Home() {
  return (
    <div>
      <FullscreenSlider images={images} titles={titles} />
      <footer className="fixed bottom-0 z-[999] flex items-center justify-between px-8 w-full h-28 text-white text-sm md:text-base">
        <a href="https://greensock.com/docs/v3/Plugins/Observer" className="text-white no-underline hover:underline">
          GSAP Observer
        </a>
        <p className="m-0">All art by Okanbi Ifatola</p>
      </footer>
    </div>
  );
}

export default Home;
