import { observer } from "mobx-react";
import React from "react";
import {
  AiOutlineLinkedin,
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="py-5 mt-3  bg-amber-50 flex flex-wrap justify-center items-center gap-2 md:gap-10  absolute right-0 left-0 fixed-bottom">
      <p>Kart Electro made with 💜 by Mayank Gangwar </p>
      <p className="flex gap-3">
        <a href="https://github.com/Mayankgangwr">
          <AiFillGithub className="text-2xl text-gray-800" />
        </a>
        <a href="https://www.linkedin.com/in/mayank-gangwar-1443831b7/">
          <AiOutlineLinkedin className="text-2xl text-gray-800" />
        </a>
        <a href="https://twitter.com/PrinceDaka7">
          <AiOutlineTwitter className="text-2xl text-gray-800" />
        </a>
      </p>
    </div>
  );
};

export default observer(Footer);
