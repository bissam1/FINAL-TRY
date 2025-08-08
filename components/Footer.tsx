import { motion } from "framer-motion";
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { 
      name: "Facebook", 
      url: "https://www.facebook.com/share/1SYK2GjyMZ/?mibextid=wwXIfr", 
      icon: Facebook,
      color: "hover:text-blue-500"
    },
    { 
      name: "TikTok", 
      url: "https://www.tiktok.com/@nood.properties?_t=ZS-8xwzb4leJBX&_r=1", 
      icon: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: "hover:text-pink-500"
    },
    { 
      name: "Instagram", 
      url: "https://www.instagram.com/nood.uae?igsh=eThtdGticHEwcnhj&utm_source=qr", 
      icon: Instagram,
      color: "hover:text-purple-500"
    },
    { 
      name: "Reddit", 
      url: "https://www.reddit.com/u/Nood_UAE/s/G39MS30cu1", 
      icon: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      color: "hover:text-orange-500"
    },
    { 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/nood-international-properties-5156a136b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
      icon: Linkedin,
      color: "hover:text-blue-600"
    },
    { 
      name: "X", 
      url: "https://x.com/nood_ae?s=21", 
      icon: Twitter,
      color: "hover:text-gray-400"
    },
    { 
      name: "Snapchat", 
      url: "https://t.snapchat.com/BvVE027Z", 
      icon: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-12.014C24.007 5.36 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: "hover:text-yellow-400"
    }
  ];

  const footerSections = [
    {
      title: "Properties",
      links: [
        "United Arab Emirates",
        "United States", 
        "United Kingdom",
        "Russia",
        "Pakistan"
      ]
    },
    {
      title: "Services",
      links: [
        "Property Investment",
        "Property Management",
        "Legal Assistance",
        "Market Analysis",
        "Consultation"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "News",
        "Contact"
      ]
    }
  ];

  return (
    <footer className="bg-card/10 backdrop-blur-md border-t border-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="w-8 h-8 text-secondary" />
                <div>
                  <div className="text-2xl font-bold text-secondary tracking-tight">
                    NŌŌD
                  </div>
                  <div className="text-sm text-foreground/70 tracking-widest">
                    INTERNATIONAL PROPERTIES
                  </div>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed max-w-md">
                Your trusted partner in international luxury real estate. 
                Connecting discerning clients with premium properties across the globe.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-foreground/70">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+971 56 75 75 075</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/70">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>info@noodproperties.com</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/70">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>Al Maqam Tower, ADGM, Abu Dhabi</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-foreground/60 transition-all duration-300 ${social.color} hover:border-secondary/40 hover:scale-110 hover:bg-secondary/20`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    title={social.name}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-foreground font-semibold mb-4 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-foreground/70 hover:text-secondary transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-secondary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-foreground/60 text-sm">
            © 2025 NŌŌD International Properties. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-foreground/60 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/60 hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-foreground/60 hover:text-secondary transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;