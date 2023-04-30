import React from "react";
import { BsInstagram ,BsLinkedin} from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";


const SocialMedia = () => {
  return (
    <div className="app__social">

      <a href="https://www.facebook.com/moazelsokary"> 
        <FaFacebookF />
      </a>
      <a href="https://www.linkedin.com/in/moazelsokary"> 
        <BsLinkedin />
      </a>
      <a href="https://www.instagram.com/moazelsokary/"> 
        <BsInstagram />
      </a>
    
    </div>
  );
};

export default SocialMedia;
