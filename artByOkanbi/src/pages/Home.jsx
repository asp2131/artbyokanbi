import { useState } from 'react';
import ImageList from '../common/components/ImageList';

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

function Home() {
  return (
    <div>
      <ImageList images={images} />
      <a id='source-link' className='meta-link' target='_blank'>
        <i className='fa-solid fa-link'></i>
        <span>All art by Okanbi Ifatola</span>
      </a>
    </div>
  );
}

export default Home;
