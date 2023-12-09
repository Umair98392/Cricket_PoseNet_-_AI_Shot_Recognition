import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub,faInstagram } from '@fortawesome/free-brands-svg-icons';
import Img1 from './shri.jpg';
import Img2 from './umair.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

function TeamMember({ name, role, description, imageSrc, twitterLink, facebookLink, linkedInLink, githubLink }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);

  return (
    <div
      className="bg-gray-50 rounded-lg shadow dark:bg-[#1E1E1E] flex flex-col sm:flex-row items-center"
      data-aos="fade-up" // Existing animation direction
     
    >
      <div className="w-[175px] flex-shrink-0">
        <a href="#">
          <img
            className="w-full rounded-md sm:rounded-none sm:rounded-l-lg aos-hidden"
            src={imageSrc}
            alt={`${name} Avatar`}
          />
        </a>
      </div>
      <div className="p-5 text-center sm:text-left">
        <h3
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          data-aos="fade-right" // Existing animation direction for the header
         
        >
          <a href="#">{name}</a>
        </h3>
        <span className="text-gray-500 dark:text-gray-400">{role}</span>
        <p
          className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400"
          data-aos="fade-left" // Existing animation direction for the paragraph
         
        >
          {description}
        </p>
        <ul className="flex justify-center sm:justify-start space-x-4 sm:mt-0">
          <li>
            <a href={twitterLink} className="text-gray-500 hover:text-green-700">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href={facebookLink} className="text-gray-500 hover:text-green-700">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href={linkedInLink} className="text-gray-500 hover:text-green-700">
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
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16"
        data-aos="fade-up" // Existing animation direction
       >
          <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-center tracking-tight text-gray-800 dark:text-white">Our Team</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            We’re a dynamic group of individuals who are passionate about what we do
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <TeamMember
            name="Shri Kant"
            role="Designer & Web Developer"
            description="Crafting digital experiences that delight users is my passion. Explore my work and get in touch!"
            imageSrc={Img1}
            twitterLink="https://twitter.com/"
            facebookLink="https://instagram.com/shrikant20.1.7?utm_source=qr&igshid=MThlNWY1MzQwNA=="
            linkedInLink="https://www.linkedin.com/in/shri-kant-a03099200/"
            githubLink="https://github.com/shrIKant-07"
          />
          <TeamMember
            name="Mohd. Umair"
            role="ML Engineer"
            description="Crafting digital experiences that delight users is my passion. Explore my work and get in touch!"
            imageSrc={Img2}
            twitterLink="https://twitter.com/umair98392"
            facebookLink="https://www.instagram.com/umair98392/"
            linkedInLink="https://www.linkedin.com/in/umair98392/"
            githubLink="https://github.com/umair98392"
          />
          {/* Add more TeamMember components here */}
        </div>
      </div>
    </section>
  );
}

export default Team;
