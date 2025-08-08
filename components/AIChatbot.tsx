import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Globe, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import propertiesData from "@/data/properties.json";
import chatbotResponses from "@/data/chatbotResponses.json";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to NŌŌD International Properties! I'm here to help you find your perfect luxury property. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: Home, text: "Properties in UAE", action: "uae" },
    { icon: Globe, text: "International Options", action: "international" },
    { icon: Phone, text: "Contact Agent", action: "contact" }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("uae") || lowerText.includes("dubai")) {
        botResponse = chatbotResponses.properties.uae;
      } else if (lowerText.includes("usa") || lowerText.includes("america")) {
        botResponse = chatbotResponses.properties.usa;
      } else if (lowerText.includes("uk") || lowerText.includes("london")) {
        botResponse = chatbotResponses.properties.uk;
      } else if (lowerText.includes("russia") || lowerText.includes("moscow")) {
        botResponse = chatbotResponses.properties.russia;
      } else if (lowerText.includes("pakistan") || lowerText.includes("karachi")) {
        botResponse = chatbotResponses.properties.pakistan;
      } else if (lowerText.includes("contact") || lowerText.includes("agent")) {
        botResponse = chatbotResponses.contact;
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        const priceRanges = propertiesData.map(p => p.price).join(', ');
        botResponse = `Our luxury properties range from ${priceRanges}. Each property offers unique value with premium amenities. Which location interests you most?`;
      } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
        botResponse = chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
      } else {
        botResponse = chatbotResponses.fallback;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionTexts = {
      uae: "Show me properties in UAE",
      international: "What international options do you have?",
      contact: "I'd like to speak with an agent"
    };
    
    handleSendMessage(actionTexts[action as keyof typeof actionTexts]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-gold shadow-glow hover:shadow-luxury transition-all duration-300"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/95 backdrop-blur-lg border-secondary/20 shadow-luxury">
              {/* Header */}
              <div className="p-4 border-b border-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-secondary rounded-full animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-foreground">NŌŌD AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Luxury Property Expert</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-gradient-gold text-primary'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-secondary/20">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="text-xs p-2 h-auto"
                    >
                      <action.icon className="h-3 w-3 mr-1" />
                      {action.text}
                    </Button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask about luxury properties..."
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    size="sm"
                    className="bg-gradient-gold hover:bg-secondary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;