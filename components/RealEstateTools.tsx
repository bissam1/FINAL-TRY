import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function RealEstateTools() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [mortgageResult, setMortgageResult] = useState('');
  const [roiResult, setRoiResult] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    setMortgageResult(`Monthly Payment: AED ${monthlyPayment.toFixed(2)}`);
  };

  const compareROI = () => {
    const roiData = {
      'UAE and Abu Dhabi': 6.99,
      'USA and New York': 4.5,
      'UK and London': 3.8,
      'Russia and Moscow': 5.0,
      'Pakistan and Islamabad': 6.0
    };
    
    setRoiResult(`UAE (Abu Dhabi): 6.99% - Superior stability and growth compared to other markets`);
  };

  const compareProperties = () => {
    const properties = {
      'Abu Dhabi': { price: 2000000, roi: 6.99, growth: 17.3 },
      'New York': { price: 2500000, roi: 4.5, growth: 5.1 },
      'London': { price: 2200000, roi: 3.8, growth: 4.2 }
    };
    
    setComparisonResult(`
      Abu Dhabi: Price AED ${properties['Abu Dhabi'].price.toLocaleString()}, ROI ${properties['Abu Dhabi'].roi}%, Growth ${properties['Abu Dhabi'].growth}%
      New York: Price AED ${properties['New York'].price.toLocaleString()}, ROI ${properties['New York'].roi}%, Growth ${properties['New York'].growth}%
      London: Price AED ${properties['London'].price.toLocaleString()}, ROI ${properties['London'].roi}%, Growth ${properties['London'].growth}%
      
      Abu Dhabi offers higher ROI and growth with lower volatility.
    `);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/60 backdrop-blur-sm border-border/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Mortgage Calculator</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loan-amount">Loan Amount (AED)</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="loan-term">Loan Term (Years)</Label>
              <Input
                id="loan-term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            <Button onClick={calculateMortgage} className="w-full">
              Calculate Mortgage
            </Button>
            {mortgageResult && (
              <p className="text-sm text-muted-foreground mt-2">{mortgageResult}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/60 backdrop-blur-sm border-border/20">
          <CardContent className="p-4">
            <Button onClick={compareROI} className="w-full mb-4">
              Compare ROI
            </Button>
            {roiResult && (
              <p className="text-sm text-muted-foreground">{roiResult}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/20">
          <CardContent className="p-4">
            <Button onClick={compareProperties} className="w-full mb-4">
              Compare Properties
            </Button>
            {comparisonResult && (
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{comparisonResult}</pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}