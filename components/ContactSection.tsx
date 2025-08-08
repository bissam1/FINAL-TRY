import { motion } from 'framer-motion'
import { Building2, Send, Mail, Phone, Users, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent } from './ui/card'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 relative bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-4">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Get in touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact NOOD Properties
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with our luxury real estate experts to discuss your property needs or investment goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <Input placeholder="John Smith" className="bg-black/40 border-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input placeholder="you@example.com" className="bg-black/40 border-gray-800" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <Input placeholder="+1 (555) 000-0000" className="bg-black/40 border-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Interest
                </label>
                <select className="w-full h-9 rounded-md bg-black/40 border border-gray-800 px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select a service</option>
                  <option value="buy">Buying Property</option>
                  <option value="sell">Selling Property</option>
                  <option value="invest">Investment Advice</option>
                  <option value="finance">Financing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <Textarea 
                placeholder="Tell us about your property interests or questions..."
                className="bg-black/40 border-gray-800 min-h-32"
              />
            </div>
            
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-black/40 border-gray-800 shadow-lg">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="rounded-full bg-blue-500/20 p-3">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-300 mb-2">For general inquiries:</p>
                    <a href="mailto:info@nood-properties.com" className="text-blue-400 hover:text-blue-300">
                      info@nood-properties.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-gray-800 shadow-lg">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="rounded-full bg-purple-500/20 p-3">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-300 mb-2">Global headquarters:</p>
                    <a href="tel:+97144555666" className="text-blue-400 hover:text-blue-300">
                      +971 4 455 5666
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-gray-800 shadow-lg">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="rounded-full bg-green-500/20 p-3">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Private Clients</h4>
                    <p className="text-gray-300 mb-2">VIP services:</p>
                    <a href="mailto:vip@nood-properties.com" className="text-blue-400 hover:text-blue-300">
                      vip@nood-properties.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-gray-800 shadow-lg">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="rounded-full bg-red-500/20 p-3">
                    <MessageSquare className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Live Chat</h4>
                    <p className="text-gray-300 mb-2">Online support:</p>
                    <span className="text-green-400 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Available now
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM GST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 6:00 PM GST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>By appointment only</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}