import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calculator, DollarSign, Home, Building, X, TrendingUp, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FloatingToolsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingTools = ({ isOpen, onClose }: FloatingToolsProps) => {
  const [activeTab, setActiveTab] = useState("mortgage");
  const [mortgageData, setMortgageData] = useState({
    price: 500000,
    downPayment: 20,
    interestRate: 3.5,
    loanTerm: 30
  });
  const [roiData, setROIData] = useState({
    investment: 500000,
    annualRent: 60000,
    appreciation: 5,
    expenses: 15000
  });
  const [currency, setCurrency] = useState("AED");

  const calculateMortgage = () => {
    const principal = mortgageData.price * (1 - mortgageData.downPayment / 100);
    const monthlyRate = mortgageData.interestRate / 100 / 12;
    const numPayments = mortgageData.loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: (monthlyPayment * numPayments).toFixed(2),
      totalInterest: (monthlyPayment * numPayments - principal).toFixed(2),
      downPaymentAmount: (mortgageData.price * mortgageData.downPayment / 100).toFixed(2)
    };
  };

  const calculateROI = () => {
    const netRent = roiData.annualRent - roiData.expenses;
    const appreciation = roiData.investment * (roiData.appreciation / 100);
    const totalReturn = netRent + appreciation;
    const roi = (totalReturn / roiData.investment) * 100;
    
    return {
      netRent: netRent.toFixed(2),
      appreciation: appreciation.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      roi: roi.toFixed(2)
    };
  };

  const mortgageResults = calculateMortgage();
  const roiResults = calculateROI();

  const currencySymbols: Record<string, string> = {
    AED: "د.إ",
    USD: "$",
    GBP: "£",
    EUR: "€",
    PKR: "₨",
    RUB: "₽"
  };

  const formatCurrency = (amount: string | number) => {
    return `${currencySymbols[currency]} ${Number(amount).toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass-subtle border-b border-white/10 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-playfair font-semibold text-luxury">Investment Tools</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="magnetic text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Currency Selector */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <Label className="text-sm font-medium">Currency:</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-32 glass-subtle border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 z-[99999]">
                    <SelectItem value="AED">🇦🇪 AED</SelectItem>
                    <SelectItem value="USD">🇺🇸 USD</SelectItem>
                    <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                    <SelectItem value="PKR">🇵🇰 PKR</SelectItem>
                    <SelectItem value="RUB">🇷🇺 RUB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="p-6 border-b border-white/10">
              <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("mortgage")}
                  className={`magnetic flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
                    activeTab === "mortgage" 
                      ? "bg-primary/20 text-primary shadow-gold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home size={18} />
                  <span className="font-medium">Mortgage Calculator</span>
                </button>
                <button
                  onClick={() => setActiveTab("roi")}
                  className={`magnetic flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
                    activeTab === "roi" 
                      ? "bg-primary/20 text-primary shadow-gold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp size={18} />
                  <span className="font-medium">ROI Calculator</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "mortgage" && (
                  <motion.div
                    key="mortgage"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {/* Mortgage Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                        <Building className="w-5 h-5 text-primary" />
                        <span>Property Details</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Property Price</Label>
                          <Input
                            type="number"
                            value={mortgageData.price}
                            onChange={(e) => setMortgageData({...mortgageData, price: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Down Payment (%)</Label>
                          <Input
                            type="number"
                            value={mortgageData.downPayment}
                            onChange={(e) => setMortgageData({...mortgageData, downPayment: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Interest Rate (%)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={mortgageData.interestRate}
                            onChange={(e) => setMortgageData({...mortgageData, interestRate: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Loan Term (Years)</Label>
                          <Input
                            type="number"
                            value={mortgageData.loanTerm}
                            onChange={(e) => setMortgageData({...mortgageData, loanTerm: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mortgage Results */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                        <PieChart className="w-5 h-5 text-primary" />
                        <span>Monthly Breakdown</span>
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Monthly Payment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-primary">
                              {formatCurrency(mortgageResults.monthlyPayment)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Down Payment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                              {formatCurrency(mortgageResults.downPaymentAmount)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Total Interest</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-accent">
                              {formatCurrency(mortgageResults.totalInterest)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Total Payment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                              {formatCurrency(mortgageResults.totalPayment)}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "roi" && (
                  <motion.div
                    key="roi"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {/* ROI Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span>Investment Details</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Initial Investment</Label>
                          <Input
                            type="number"
                            value={roiData.investment}
                            onChange={(e) => setROIData({...roiData, investment: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Annual Rental Income</Label>
                          <Input
                            type="number"
                            value={roiData.annualRent}
                            onChange={(e) => setROIData({...roiData, annualRent: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Annual Appreciation (%)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={roiData.appreciation}
                            onChange={(e) => setROIData({...roiData, appreciation: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Annual Expenses</Label>
                          <Input
                            type="number"
                            value={roiData.expenses}
                            onChange={(e) => setROIData({...roiData, expenses: Number(e.target.value)})}
                            className="mt-1 glass-subtle border-white/20 text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ROI Results */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span>Annual Returns</span>
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Net Rental Income</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-primary">
                              {formatCurrency(roiResults.netRent)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Appreciation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-accent">
                              {formatCurrency(roiResults.appreciation)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Total Return</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                              {formatCurrency(roiResults.totalReturn)}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-subtle border-white/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">ROI</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-luxury">
                              {roiResults.roi}%
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTools;