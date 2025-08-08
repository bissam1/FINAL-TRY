import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Home, 
  ArrowRight,
  Globe,
  Percent
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComparisonChartsProps {
  title?: string;
  subtitle?: string;
}

const ComparisonCharts = ({ 
  title = "Why Abu Dhabi Over Other Markets?",
  subtitle = "Compare key investment metrics across global real estate markets"
}: ComparisonChartsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCurrency, setActiveCurrency] = useState("AED");

  // Market comparison data
  const rentalYieldData = [
    { country: "UAE", yield: 8.2, growth: 12.4, avgPrice: 850000 },
    { country: "UK", yield: 4.1, growth: 8.7, avgPrice: 720000 },
    { country: "USA", yield: 6.8, growth: 11.2, avgPrice: 650000 },
    { country: "Pakistan", yield: 12.5, growth: 15.8, avgPrice: 180000 },
    { country: "Russia", yield: 7.9, growth: 9.3, avgPrice: 320000 }
  ];

  const costPerSqftData = [
    { country: "UAE", cost: 425, tax: 0 },
    { country: "UK", cost: 680, tax: 28 },
    { country: "USA", cost: 520, tax: 35 },
    { country: "Pakistan", cost: 85, tax: 15 },
    { country: "Russia", cost: 180, tax: 20 }
  ];

  const taxSavingsData = [
    { name: "UAE", value: 0, color: "#FFD700" },
    { name: "UK", value: 28, color: "#FF6B6B" },
    { name: "USA", value: 35, color: "#4ECDC4" },
    { name: "Pakistan", value: 15, color: "#45B7D1" },
    { name: "Russia", value: 20, color: "#96CEB4" }
  ];

  const marketGrowthData = [
    { year: "2020", UAE: 5.2, UK: 2.1, USA: 4.8, Pakistan: 8.9, Russia: 3.1 },
    { year: "2021", UAE: 8.7, UK: 4.2, USA: 7.3, Pakistan: 12.4, Russia: 5.8 },
    { year: "2022", UAE: 12.1, UK: 6.8, USA: 9.1, Pakistan: 15.7, Russia: 2.3 },
    { year: "2023", UAE: 15.3, UK: 3.9, USA: 8.7, Pakistan: 18.2, Russia: 4.6 },
    { year: "2024", UAE: 18.6, UK: 7.1, USA: 11.4, Pakistan: 21.8, Russia: 6.2 }
  ];

  const currencies = {
    AED: { symbol: "د.إ", rate: 1 },
    USD: { symbol: "$", rate: 0.27 },
    GBP: { symbol: "£", rate: 0.22 },
    EUR: { symbol: "€", rate: 0.25 },
    PKR: { symbol: "₨", rate: 76.8 },
    RUB: { symbol: "₽", rate: 25.1 }
  };

  const formatCurrency = (value: number) => {
    const currency = currencies[activeCurrency as keyof typeof currencies];
    const convertedValue = value * currency.rate;
    return `${currency.symbol}${convertedValue.toLocaleString()}`;
  };

  const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <section ref={containerRef} className="py-24 px-6 bg-gradient-cinematic relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Market Analysis
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-luxury mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Currency Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center space-x-2 mt-8"
          >
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-4">Currency:</span>
            {Object.keys(currencies).map((currency) => (
              <button
                key={currency}
                onClick={() => setActiveCurrency(currency)}
                className={`magnetic px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCurrency === currency
                    ? "bg-primary text-black shadow-gold"
                    : "glass-subtle text-muted-foreground hover:text-foreground"
                }`}
              >
                {currency}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Rental Yield Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="glass-subtle border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Rental Yield Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rentalYieldData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="country" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="yield" fill="#FFD700" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cost per Sq Ft */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card className="glass-subtle border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Home className="w-5 h-5 text-primary" />
                  <span>Cost per Sq Ft</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costPerSqftData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="country" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="cost" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tax Savings Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Card className="glass-subtle border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Percent className="w-5 h-5 text-primary" />
                  <span>Property Tax Rates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taxSavingsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {taxSavingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Market Growth Trend */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Card className="glass-subtle border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>5-Year Growth Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="UAE" stroke="#FFD700" strokeWidth={3} dot={{ fill: '#FFD700' }} />
                    <Line type="monotone" dataKey="UK" stroke="#FF6B6B" strokeWidth={2} dot={{ fill: '#FF6B6B' }} />
                    <Line type="monotone" dataKey="USA" stroke="#4ECDC4" strokeWidth={2} dot={{ fill: '#4ECDC4' }} />
                    <Line type="monotone" dataKey="Pakistan" stroke="#45B7D1" strokeWidth={2} dot={{ fill: '#45B7D1' }} />
                    <Line type="monotone" dataKey="Russia" stroke="#96CEB4" strokeWidth={2} dot={{ fill: '#96CEB4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: DollarSign,
              title: "0% Property Tax",
              description: "Unlike UK (28%) or USA (35%), UAE offers zero property taxation",
              highlight: "Save up to 35%"
            },
            {
              icon: TrendingUp,
              title: "Higher Rental Yields",
              description: "8.2% average rental yield, double the UK market returns",
              highlight: "8.2% ROI"
            },
            {
              icon: Home,
              title: "Lower Entry Cost",
              description: "Competitive pricing with premium quality and world-class amenities",
              highlight: "Premium Value"
            }
          ].map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
              className="glass-subtle rounded-xl p-6 text-center hover:shadow-gold transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <advantage.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{advantage.description}</p>
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                {advantage.highlight}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center"
        >
          <Button 
            size="lg"
            className="magnetic bg-primary text-black hover:bg-primary/90 px-8 py-4 text-lg font-medium tracking-wide"
          >
            Get Detailed Market Report
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonCharts;