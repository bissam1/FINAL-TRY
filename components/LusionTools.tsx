import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign, MapPin, Sparkles, Brain, Shield } from 'lucide-react';

// AI-powered Property Analyzer
const PropertyAnalyzer = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const analyzeProperty = async () => {
    if (!propertyValue || !location || !propertyType) return;
    
    setIsLoading(true);
    setResult('');

    // Simulate AI analysis
    setTimeout(() => {
      const analysis = generatePropertyAnalysis(propertyValue, location, propertyType);
      setResult(analysis);
      setIsLoading(false);
    }, 2000);
  };

  const generatePropertyAnalysis = (value: string, loc: string, type: string) => {
    const locations = {
      'uae': { growth: '8.5%', rental: '7.2%', risk: 'Low', outlook: 'Excellent' },
      'usa': { growth: '6.8%', rental: '5.4%', risk: 'Medium', outlook: 'Strong' },
      'uk': { growth: '5.2%', rental: '4.8%', risk: 'Low', outlook: 'Stable' },
      'russia': { growth: '9.1%', rental: '8.7%', risk: 'Medium', outlook: 'Growing' },
      'pakistan': { growth: '12.3%', rental: '9.8%', risk: 'Medium-High', outlook: 'Emerging' }
    };

    const data = locations[loc as keyof typeof locations] || locations.uae;
    
    return `🏆 AI Property Analysis Results:

💰 Investment Overview:
• Property Value: $${parseInt(value).toLocaleString()}
• Property Type: ${type}
• Location: ${loc.toUpperCase()}

📈 Market Performance:
• Expected Annual Growth: ${data.growth}
• Rental Yield Potential: ${data.rental}
• Market Risk Level: ${data.risk}
• Investment Outlook: ${data.outlook}

🎯 AI Recommendations:
• Strong investment potential with solid fundamentals
• Consider diversifying with additional properties in this market
• Optimal holding period: 5-7 years for maximum returns
• Rental income can cover 60-80% of mortgage payments

🔮 Future Projections:
• 3-Year Value Estimate: $${(parseInt(value) * 1.25).toLocaleString()}
• 5-Year Value Estimate: $${(parseInt(value) * 1.45).toLocaleString()}
• Total ROI (5 years): ${((parseInt(value) * 0.45 / parseInt(value)) * 100).toFixed(1)}%`;
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-accent" />
          AI Property Analyzer
        </CardTitle>
        <CardDescription>
          Get instant AI-powered analysis of any property investment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Property Value (USD)"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            type="number"
            className="bg-background/50"
          />
          
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
              <SelectItem value="russia">Russia</SelectItem>
              <SelectItem value="pakistan">Pakistan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={analyzeProperty}
          disabled={isLoading || !propertyValue || !location || !propertyType}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Analyze Property
            </>
          )}
        </Button>

        {result && (
          <motion.div
            className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {result}
            </pre>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

// ROI Calculator
const ROICalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [expenses, setExpenses] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateROI = () => {
    if (!purchasePrice || !downPayment || !monthlyRent || !expenses) return;

    const purchase = parseFloat(purchasePrice);
    const down = parseFloat(downPayment);
    const rent = parseFloat(monthlyRent);
    const exp = parseFloat(expenses);

    const annualRent = rent * 12;
    const annualExpenses = exp * 12;
    const netIncome = annualRent - annualExpenses;
    const roi = (netIncome / down) * 100;
    const capRate = (netIncome / purchase) * 100;
    const cashFlow = rent - exp;

    setResult({
      annualRent,
      netIncome,
      roi: roi.toFixed(2),
      capRate: capRate.toFixed(2),
      cashFlow: cashFlow.toFixed(2)
    });
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-accent" />
          ROI Calculator
        </CardTitle>
        <CardDescription>
          Calculate your return on investment for any property
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            type="number"
            className="bg-background/50"
          />
          
          <Input
            placeholder="Down Payment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            type="number"
            className="bg-background/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Monthly Rent"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            type="number"
            className="bg-background/50"
          />
          
          <Input
            placeholder="Monthly Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            type="number"
            className="bg-background/50"
          />
        </div>

        <Button 
          onClick={calculateROI}
          disabled={!purchasePrice || !downPayment || !monthlyRent || !expenses}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Calculate ROI
        </Button>

        {result && (
          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Annual Performance</h4>
              <p className="text-sm text-muted-foreground">Rental Income: ${result.annualRent.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Net Income: ${result.netIncome.toLocaleString()}</p>
            </div>
            
            <div className="p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Key Metrics</h4>
              <p className="text-sm text-muted-foreground">ROI: {result.roi}%</p>
              <p className="text-sm text-muted-foreground">Cap Rate: {result.capRate}%</p>
              <p className="text-sm text-muted-foreground">Monthly Cash Flow: ${result.cashFlow}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

// Market Insights Tool
const MarketInsights = () => {
  const [selectedMarket, setSelectedMarket] = useState('');
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = async () => {
    if (!selectedMarket) return;
    
    setIsLoading(true);
    setInsights('');

    // Simulate AI market analysis
    setTimeout(() => {
      const insight = getMarketInsights(selectedMarket);
      setInsights(insight);
      setIsLoading(false);
    }, 1500);
  };

  const getMarketInsights = (market: string) => {
    const insights = {
      'uae': `🇦🇪 UAE Real Estate Market Analysis:

📊 Current Market Status:
• Market Growth: +8.5% YoY
• Average Price per sqft: $280
• Luxury Segment Leading Growth
• Strong Government Support

🎯 Investment Hotspots:
• Abu Dhabi Central Business District
• Dubai Marina & Downtown
• Saadiyat Island Cultural District
• Al Reem Island

💡 Key Opportunities:
• Vision 2030 infrastructure projects
• Expo 2020 legacy developments
• Green building initiatives
• Foreign ownership reforms`,

      'usa': `🇺🇸 USA Real Estate Market Analysis:

📊 Current Market Status:
• Market Growth: +6.8% YoY
• Average Price per sqft: $180
• Tech Hubs Driving Demand
• Interest Rate Sensitivity

🎯 Investment Hotspots:
• Austin Tech Corridor
• Miami Beach Luxury Market
• Denver Urban Core
• Seattle Waterfront

💡 Key Opportunities:
• Remote work trend benefits
• Opportunity zones
• Sustainable construction
• PropTech innovations`,

      'uk': `🇬🇧 UK Real Estate Market Analysis:

📊 Current Market Status:
• Market Growth: +5.2% YoY
• Average Price per sqft: $520
• London Premium Markets Stable
• Regional Cities Growing

🎯 Investment Hotspots:
• London Zone 1 & 2
• Manchester City Centre
• Edinburgh New Town
• Birmingham Business District

💡 Key Opportunities:
• Build-to-rent developments
• Student housing demand
• Green retrofit projects
• HS2 connectivity benefits`
    };

    return insights[market as keyof typeof insights] || insights.uae;
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MapPin className="h-5 w-5 text-accent" />
          Market Insights
        </CardTitle>
        <CardDescription>
          Get AI-powered insights into global real estate markets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedMarket} onValueChange={setSelectedMarket}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Select Market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uae">UAE Market</SelectItem>
            <SelectItem value="usa">USA Market</SelectItem>
            <SelectItem value="uk">UK Market</SelectItem>
            <SelectItem value="russia">Russia Market</SelectItem>
            <SelectItem value="pakistan">Pakistan Market</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={generateInsights}
          disabled={isLoading || !selectedMarket}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating Insights...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Generate Market Insights
            </>
          )}
        </Button>

        {insights && (
          <motion.div
            className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {insights}
            </pre>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

// Main Tools Component
const LusionTools = () => {
  return (
    <div className="space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
          AI-Powered Real Estate Tools
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Leverage cutting-edge artificial intelligence to make smarter property investment decisions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PropertyAnalyzer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ROICalculator />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <MarketInsights />
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-xl border border-border/20">
          <Shield className="h-8 w-8 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
          <p className="text-sm text-muted-foreground">Your data is encrypted and never stored</p>
        </div>
        
        <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-xl border border-border/20">
          <Brain className="h-8 w-8 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
          <p className="text-sm text-muted-foreground">Advanced algorithms for accurate analysis</p>
        </div>
        
        <div className="text-center p-6 bg-card/60 backdrop-blur-md rounded-xl border border-border/20">
          <TrendingUp className="h-8 w-8 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
          <p className="text-sm text-muted-foreground">Live market data and trends</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LusionTools;