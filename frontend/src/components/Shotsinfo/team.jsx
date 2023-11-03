import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Img1 from './shri.jpg';
import Img2 from './umair.jpg';

function TeamMember({ name, role, description, imageSrc, twitterLink, facebookLink, linkedInLink, githubLink }) {
  return (
    <div className="bg-gray-50 rounded-lg shadow dark:bg-[#1E1E1E] flex flex-col sm:flex-row items-center">
      <div className=" w-[175px]  flex-shrink-0">
        <a href="#">
          <img
            className="w-full   rounded-md sm:rounded-none sm:rounded-l-lg"
            src={imageSrc}
            alt={`${name} Avatar`}
          />
        </a>
      </div>
      <div className="p-5 text-center sm:text-left">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#">{name}</a>
        </h3>
        <span className="text-gray-500 dark:text-gray-400">{role}</span>
        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
        <ul className="flex justify-center sm:justify-start space-x-4 sm:mt-0">
          <li>
            <a href={twitterLink} className="text-gray-500 hover:text-green-700 ">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href={facebookLink} className="text-gray-500 hover:text-green-700 ">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href={linkedInLink} className="text-gray-500  hover:text-green-700">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
          <li>
            <a href={githubLink} className="text-gray-500 hover:text-green-700">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}


function Team() {
  return (
    <section className="bg-gray-100 dark:bg-black">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-center tracking-tight  text-gray-800 dark:text-white">Our Team</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            We’re a dynamic group of individuals who are passionate about what we do
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <TeamMember
            name="Shri Kant"
            role="Designer & Web Developer"
            description=" Crafting digital experiences that delight users is my passion. Explore my work and get in touch!"
            imageSrc={Img1}
            twitterLink="https://twitter.com/bonniegreen"
            facebookLink="https://facebook.com/bonniegreen"
            linkedInLink="https://www.linkedin.com/in/shri-kant-a03099200/"
            githubLink="https://github.com/shrIKant-07"
          />
          <TeamMember
            name="Mohd. Umair"
            role="ML Engineer"
            description="  Crafting digital experiences that delight users is my passion. Explore my work and get in touch!"
            imageSrc={Img2}
            twitterLink="https://twitter.com/jeseleos"
            facebookLink="https://facebook.com/jeseleos"
            linkedInLink="https://www.linkedin.com/in/jeseleos"
            githubLink="https://github.com/jeseleos"
          />
        </div>
      </div>
    </section>
  );
}

export default Team;
