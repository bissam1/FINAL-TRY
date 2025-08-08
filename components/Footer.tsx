import { Building2, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-xl">NOOD</div>
                <div className="text-gray-300 text-xs tracking-wider">PROPERTIES</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              NOOD International Properties specializes in luxury real estate across global markets,
              offering exceptional properties and investment opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Properties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Global Markets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Market Reports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Investment Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Mortgage Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">ROI Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Visa Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Currency Converter</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest luxury properties and market insights.
            </p>
            <div className="flex space-x-2 mb-6">
              <Input 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700"
              />
              <Button className="bg-blue-500 hover:bg-blue-600">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NOOD International Properties. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}