import React from "react";
import styles from "../components/Aboutus.module.css"; // Import the CSS module

const Aboutus = () => {
  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Section */}
          <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d80625.17780420494!2d4.233040034915775!3d50.839743032007114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHERMES!5e0!3m2!1sfr!2sbe!4v1739102252480!5m2!1sfr!2sbe"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-[#8B5E3C] mb-6">Auto Nassiri</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Address</h4>
                <p className="text-gray-600">
                  Bd de Waterloo 50,
                  <br />
                  1000 Bruxelles
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h4>
                <a
                  href="tel:+32470675141"
                  className="text-[#8B5E3C] hover:text-[#6d4930] transition-colors duration-300"
                >
                  0470/67.51.41
                </a>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Email</h4>
                <a
                  href="mailto:info@AutoNassiri.com"
                  className="text-[#8B5E3C] hover:text-[#6d4930] transition-colors duration-300"
                >
                  info@AutoNassiri.com
                </a>
              </div>

              <div className="pt-4">
                <button className="w-full bg-[#8B5E3C] hover:bg-[#6d4930] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Aboutus;
