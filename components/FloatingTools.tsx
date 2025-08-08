import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, PiggyBank, Passport, RefreshCw, X } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export default function FloatingTools() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const toggleTool = (tool: string) => {
    if (activeTool === tool) {
      setActiveTool(null)
    } else {
      setActiveTool(tool)
      setIsOpen(true)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && activeTool && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full sm:w-96"
          >
            <Card className="bg-black/80 backdrop-blur-lg border-gray-800 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 p-4">
                <h3 className="font-semibold text-white">
                  {activeTool === 'mortgage' && 'Mortgage Calculator'}
                  {activeTool === 'roi' && 'ROI Calculator'}
                  {activeTool === 'visa' && 'Visa Information'}
                  {activeTool === 'currency' && 'Currency Converter'}
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <CardContent className="p-6">
                {activeTool === 'mortgage' && <MortgageCalculator />}
                {activeTool === 'roi' && <ROICalculator />}
                {activeTool === 'visa' && <VisaInformation />}
                {activeTool === 'currency' && <CurrencyConverter />}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-3">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant={activeTool === 'mortgage' ? 'default' : 'outline'}
            size="icon"
            onClick={() => toggleTool('mortgage')}
            className={`rounded-full ${activeTool === 'mortgage' ? 'bg-blue-500 text-white' : 'bg-black/50 backdrop-blur-md border-gray-700 text-gray-300'}`}
          >
            <Calculator className="w-5 h-5" />
          </Button>
          <Button
            variant={activeTool === 'roi' ? 'default' : 'outline'}
            size="icon"
            onClick={() => toggleTool('roi')}
            className={`rounded-full ${activeTool === 'roi' ? 'bg-blue-500 text-white' : 'bg-black/50 backdrop-blur-md border-gray-700 text-gray-300'}`}
          >
            <PiggyBank className="w-5 h-5" />
          </Button>
          <Button
            variant={activeTool === 'visa' ? 'default' : 'outline'}
            size="icon"
            onClick={() => toggleTool('visa')}
            className={`rounded-full ${activeTool === 'visa' ? 'bg-blue-500 text-white' : 'bg-black/50 backdrop-blur-md border-gray-700 text-gray-300'}`}
          >
            <Passport className="w-5 h-5" />
          </Button>
          <Button
            variant={activeTool === 'currency' ? 'default' : 'outline'}
            size="icon"
            onClick={() => toggleTool('currency')}
            className={`rounded-full ${activeTool === 'currency' ? 'bg-blue-500 text-white' : 'bg-black/50 backdrop-blur-md border-gray-700 text-gray-300'}`}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

// Mortgage Calculator Component
function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('1000000')
  const [downPayment, setDownPayment] = useState('20')
  const [interestRate, setInterestRate] = useState('3.5')
  const [loanTerm, setLoanTerm] = useState('25')
  
  // Calculate mortgage payment
  const calculateMortgage = () => {
    const price = parseFloat(propertyPrice)
    const down = parseFloat(downPayment) / 100
    const interest = parseFloat(interestRate) / 100 / 12
    const term = parseFloat(loanTerm) * 12
    
    const loanAmount = price * (1 - down)
    const monthlyPayment = (loanAmount * interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1)
    
    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Property Price (USD)
        </label>
        <Input 
          type="number" 
          value={propertyPrice} 
          onChange={(e) => setPropertyPrice(e.target.value)}
          className="bg-gray-900 border-gray-700"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Down Payment (%)
        </label>
        <Input 
          type="number" 
          value={downPayment} 
          onChange={(e) => setDownPayment(e.target.value)}
          className="bg-gray-900 border-gray-700"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Interest Rate (%)
        </label>
        <Input 
          type="number" 
          step="0.1"
          value={interestRate} 
          onChange={(e) => setInterestRate(e.target.value)}
          className="bg-gray-900 border-gray-700"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Loan Term (years)
        </label>
        <Input 
          type="number" 
          value={loanTerm} 
          onChange={(e) => setLoanTerm(e.target.value)}
          className="bg-gray-900 border-gray-700"
        />
      </div>
      
      <div className="pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Monthly Payment:</span>
          <span className="text-xl font-bold text-blue-400">${calculateMortgage()}</span>
        </div>
      </div>
    </div>
  )
}

// ROI Calculator Component
function ROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState('1000000')
  const [annualRental, setAnnualRental] = useState('60000')
  const [expenses, setExpenses] = useState('12000')
  const [appreciation, setAppreciation] = useState('5')
  
  // Calculate ROI
  const calculateROI = () => {
    const price = parseFloat(purchasePrice)
    const rental = parseFloat(annualRental)
    const expense = parseFloat(expenses)
    const appreciationRate = parseFloat(appreciation) / 100
    
    const annualCashFlow = rental - expense
    const cashROI = (annualCashFlow / price) * 100
    const totalROI = cashROI + appreciationRate * 100
    
    return {
      cashFlow: isNaN(annualCashFlow) ? 0 : annualCashFlow.toFixed(2),
      cashROI: isNaN(cashROI) ? 0 : cashROI.toFixed(2),
      totalROI: isNaN(totalROI) ? 0 : totalROI.toFixed(2)
    }
  }

  const results = calculateROI()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Purchase Price (USD