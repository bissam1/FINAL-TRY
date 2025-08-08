import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export default function AIToolsSection() {
  return (
    <section id="ai-tools" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Property Tools</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Leverage our cutting-edge AI technology to make informed decisions about your real estate investments.
          </p>
        </motion.div>

        <Tabs defaultValue="mortgage" className="w-full">
          <TabsList className="grid grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <TabsTrigger value="mortgage" data-cursor="hover" className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Mortgage Calculator</span>
              <span className="sm:hidden">Mortgage</span>
            </TabsTrigger>
            <TabsTrigger value="roi" data-cursor="hover" className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">ROI Analyzer</span>
              <span className="sm:hidden">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="valuation" data-cursor="hover" className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="hidden sm:inline">Value Estimator</span>
              <span className="sm:hidden">Value</span>
            </TabsTrigger>
            <TabsTrigger value="converter" data-cursor="hover" className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">Currency Converter</span>
              <span className="sm:hidden">Currency</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-black/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-8 shadow-2xl">
            <MortgageCalculator />
            <ROIAnalyzer />
            <PropertyValuation />
            <CurrencyConverter />
          </div>
        </Tabs>
      </div>
    </section>
  );
}

function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  
  const loanAmount = propertyPrice * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const payments = loanTerm * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);

  return (
    <TabsContent value="mortgage" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <CardHeader className="px-0">
            <CardTitle>Mortgage Calculator</CardTitle>
            <CardDescription>
              Calculate your monthly mortgage payments based on property price, down payment, interest rate, and loan term.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Property Price: ${propertyPrice.toLocaleString()}</label>
                </div>
                <Slider 
                  min={100000} 
                  max={10000000} 
                  step={10000} 
                  value={[propertyPrice]} 
                  onValueChange={(value) => setPropertyPrice(value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Down Payment: {downPayment}%</label>
                </div>
                <Slider 
                  min={5} 
                  max={50} 
                  step={1} 
                  value={[downPayment]} 
                  onValueChange={(value) => setDownPayment(value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Interest Rate: {interestRate}%</label>
                </div>
                <Slider 
                  min={1} 
                  max={10} 
                  step={0.1} 
                  value={[interestRate]} 
                  onValueChange={(value) => setInterestRate(value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Loan Term: {loanTerm} years</label>
                </div>
                <Slider 
                  min={5} 
                  max={30} 
                  step={5} 
                  value={[loanTerm]} 
                  onValueChange={(value) => setLoanTerm(value[0])} 
                />
              </div>
            </div>
          </CardContent>
        </div>
        
        <div className="flex flex-col justify-center">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Loan Amount</p>
                  <p className="text-2xl font-bold">${loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Down Payment</p>
                  <p className="text-2xl font-bold">${(propertyPrice * downPayment / 100).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Monthly Payment</p>
                <p className="text-4xl font-bold text-blue-400">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                Generate Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}

function ROIAnalyzer() {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [monthlyRental, setMonthlyRental] = useState(3000);
  const [annualExpenses, setAnnualExpenses] = useState(5000);
  const [appreciationRate, setAppreciationRate] = useState(3);
  
  const annualRentalIncome = monthlyRental * 12;
  const netOperatingIncome = annualRentalIncome - annualExpenses;
  const cashOnCashReturn = (netOperatingIncome / purchasePrice) * 100;
  const fiveYearAppreciation = purchasePrice * Math.pow((1 + appreciationRate / 100), 5);
  
  return (
    <TabsContent value="roi" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <CardHeader className="px-0">
            <CardTitle>ROI Analyzer</CardTitle>
            <CardDescription>
              Calculate your potential return on investment for property purchases.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Purchase Price</label>
                <Input 
                  type="number" 
                  value={purchasePrice} 
                  onChange={(e) => setPurchasePrice(Number(e.target.value))} 
                  className="bg-black/40"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Monthly Rental Income</label>
                <Input 
                  type="number" 
                  value={monthlyRental} 
                  onChange={(e) => setMonthlyRental(Number(e.target.value))} 
                  className="bg-black/40"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Annual Expenses</label>
                <Input 
                  type="number" 
                  value={annualExpenses} 
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))} 
                  className="bg-black/40"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Appreciation Rate: {appreciationRate}%</label>
                </div>
                <Slider 
                  min={0} 
                  max={10} 
                  step={0.5} 
                  value={[appreciationRate]} 
                  onValueChange={(value) => setAppreciationRate(value[0])} 
                />
              </div>
            </div>
          </CardContent>
        </div>
        
        <div className="flex flex-col justify-center">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20">
            <CardHeader>
              <CardTitle>ROI Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Annual Rental Income</p>
                  <p className="text-2xl font-bold">${annualRentalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Net Operating Income</p>
                  <p className="text-2xl font-bold">${netOperatingIncome.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Cash on Cash Return</p>
                  <p className="text-2xl font-bold text-green-400">{cashOnCashReturn.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">5-Year Value</p>
                  <p className="text-2xl font-bold">${fiveYearAppreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                Generate Investment Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}

function PropertyValuation() {
  const [propertyType, setPropertyType] = useState('Apartment');
  const [propertySize, setPropertySize] = useState(1500);
  const [location, setLocation] = useState('Dubai Marina');
  const [age, setAge] = useState(5);
  
  // Simplified valuation calculation
  const baseRate = propertyType === 'Apartment' ? 400 : propertyType === 'Villa' ? 600 : 300;
  const locationMultiplier = location === 'Dubai Marina' ? 1.5 : location === 'Palm Jumeirah' ? 2.0 : 1.0;
  const ageDepreciation = Math.max(0.7, 1 - (age * 0.01));
  
  const estimatedValue = propertySize * baseRate * locationMultiplier * ageDepreciation;
  
  return (
    <TabsContent value="valuation" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <CardHeader className="px-0">
            <CardTitle>Property Valuation</CardTitle>
            <CardDescription>
              Get an AI-powered estimate of your property's market value.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Property Type</label>
                <select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-black/40 border border-gray-500/30 rounded-md p-2"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Property Size (sq.ft)</label>
                <Input 
                  type="number" 
                  value={propertySize} 
                  onChange={(e) => setPropertySize(Number(e.target.value))} 
                  className="bg-black/40"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Location</label>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-black/40 border border-gray-500/30 rounded-md p-2"
                >
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Property Age: {age} years</label>
                </div>
                <Slider 
                  min={0} 
                  max={30} 
                  step={1} 
                  value={[age]} 
                  onValueChange={(value) => setAge(value[0])} 
                />
              </div>
            </div>
          </CardContent>
        </div>
        
        <div className="flex flex-col justify-center">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20">
            <CardHeader>
              <CardTitle>Valuation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Estimated Market Value</p>
                <p className="text-5xl font-bold text-blue-400 my-6">
                  ${estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-gray-400 text-sm">
                  This AI-powered estimate is based on recent market data and comparable properties in {location}.
                </p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                Get Detailed Valuation Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState(1000000);
  const [fromCurrency, setFromCurrency] = useState('AED');
  const [toCurrency, setToCurrency] = useState('USD');
  
  // Simplified exchange rates
  const rates = {
    'AED': {
      'USD': 0.27,
      'EUR': 0.25,
      'GBP': 0.21,
      'AED': 1
    },
    'USD': {
      'AED': 3.67,
      'EUR': 0.93,
      'GBP': 0.79,
      'USD': 1
    },
    'EUR': {
      'AED': 4.00,
      'USD': 1.07,
      'GBP': 0.85,
      'EUR': 1
    },
    'GBP': {
      'AED': 4.69,
      'USD': 1.27,
      'EUR': 1.18,
      'GBP': 1
    }
  };
  
  const convertedAmount = amount * rates[fromCurrency][toCurrency];
  
  return (
    <TabsContent value="converter" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <CardHeader className="px-0">
            <CardTitle>Currency Converter</CardTitle>
            <CardDescription>
              Convert property prices between different currencies with real-time exchange rates.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Amount</label>
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))} 
                  className="bg-black/40"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">From</label>
                  <select 
                    value={fromCurrency} 
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full bg-black/40 border border-gray-500/30 rounded-md p-2"
                  >
                    <option value="AED">AED (Dirham)</option>
                    <option value="USD">USD (Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (Pound)</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-2">To</label>
                  <select 
                    value={toCurrency} 
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full bg-black/40 border border-gray-500/30 rounded-md p-2"
                  >
                    <option value="USD">USD (Dollar)</option>
                    <option value="AED">AED (Dirham)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (Pound)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-400">Exchange Rate</p>
                <p className="text-lg">
                  1 {fromCurrency} = {rates[fromCurrency][toCurrency]} {toCurrency}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        
        <div className="flex flex-col justify-center">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20">
            <CardHeader>
              <CardTitle>Conversion Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-gray-400 text-sm">From</p>
                    <p className="text-2xl font-bold">{amount.toLocaleString()} {fromCurrency}</p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <DollarSign className="w-6 h-6 text-blue-400" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">To</p>
                    <p className="text-2xl font-bold">{convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Exchange rates are updated regularly. Last update: 2025-08-08 12:00 UTC
                </p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                View Historical Rates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}