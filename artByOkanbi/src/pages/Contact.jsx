import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-[120px] px-10 pb-10 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl mb-5 text-center">Get in Touch</h1>
      <div className="max-w-[800px] text-lg leading-[1.8] text-center">
        <p>
          Interested in commissioning a piece or learning more about the
          available artwork? Feel free to reach out!
        </p>
        <div className="mt-[30px] flex flex-col gap-[15px]">
          <div className="text-xl">Email: 1234okanbi@gmail.com</div>
          <div className="text-xl">Instagram: @artbyokanbi</div>
          <div className="text-xl">Phone: +1 (216) 258-3700</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
