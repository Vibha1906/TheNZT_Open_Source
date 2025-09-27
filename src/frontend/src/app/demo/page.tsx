'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, RotateCcw, TrendingUp, BarChart3, Globe, Brain, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DemoPage = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: 'Query Input',
      description: 'User enters a financial query',
      example: 'What is the current stock price of Apple?',
      agent: 'Fast Agent',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Intent Detection',
      description: 'System analyzes query intent and complexity',
      example: 'Stock price query detected - routing to Fast Agent',
      agent: 'Intent Detector',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Data Retrieval',
      description: 'Real-time financial data is fetched',
      example: 'AAPL: $175.43 (+2.1%) - Market Cap: $2.7T',
      agent: 'Finance Data Agent',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Analysis Processing',
      description: 'AI agents process and analyze the data',
      example: 'Analyzing price trends, volume, and market sentiment',
      agent: 'Analysis Engine',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Response Generation',
      description: 'Comprehensive response is generated',
      example: 'Apple Inc. (AAPL) is currently trading at $175.43...',
      agent: 'Response Generator',
      color: 'bg-red-50 border-red-200'
    }
  ];

  const exampleQueries = [
    {
      query: 'What is the current stock price of Tesla?',
      response: 'Tesla Inc. (TSLA) is currently trading at $248.50, up 3.2% from yesterday\'s close. The stock has shown strong performance this week with a 5.8% gain.',
      agent: 'Fast Agent',
      time: '1.2s'
    },
    {
      query: 'Analyze the tech sector performance this quarter',
      response: 'The technology sector has shown mixed performance this quarter. While companies like NVIDIA and Microsoft have seen significant gains due to AI investments, traditional hardware companies have faced challenges.',
      agent: 'Planner Agent',
      time: '4.5s'
    },
    {
      query: 'Compare Apple vs Microsoft financial metrics',
      response: 'Apple and Microsoft show different financial profiles. Apple leads in revenue ($394B vs $211B) and market cap ($2.7T vs $2.1T), while Microsoft has higher P/E ratio (28.5 vs 25.2) and stronger cloud growth.',
      agent: 'Reasoning Agent',
      time: '6.8s'
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Data',
      description: 'Get up-to-date market information instantly',
      metric: '< 2s response time'
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced LLM agents provide intelligent insights',
      metric: '95% accuracy rate'
    },
    {
      icon: Globe,
      title: 'Comprehensive Coverage',
      description: 'Access to global markets and financial data',
      metric: '10+ data sources'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep financial analysis and trend identification',
      metric: '15+ AI agents'
    }
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      setCurrentStep(step);
      step++;
      if (step >= demoSteps.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentStep(0);
      }
    }, 2000);
  };

  const handleResetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/')} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-slate-600" />
                <span className="text-lg font-semibold text-slate-900">Interactive Demo</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push('/docs')}>
                Documentation
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Try It Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            See TheNZT in Action
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Experience how our multi-agent AI system processes financial queries and delivers 
            intelligent insights in real-time.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              onClick={handlePlayDemo}
              disabled={isPlaying}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Playing...' : 'Start Demo'}
            </Button>
            <Button size="lg" variant="outline" onClick={handleResetDemo}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Interactive Demo */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Live Query Processing</span>
            </CardTitle>
            <CardDescription>
              Watch how TheNZT processes a financial query through its multi-agent system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                    index === currentStep
                      ? `${step.color} scale-105 shadow-lg`
                      : index < currentStep
                      ? 'bg-green-50 border-green-300 opacity-75'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentStep
                          ? 'bg-blue-600 text-white'
                          : index < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}>
                        {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{step.title}</h3>
                        <p className="text-sm text-slate-600">{step.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{step.agent}</Badge>
                  </div>
                  {index === currentStep && (
                    <div className="mt-3 p-3 bg-white rounded border-l-4 border-blue-500">
                      <code className="text-sm text-slate-800">{step.example}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Example Queries */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Example Queries & Responses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleQueries.map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{example.agent}</Badge>
                    <span className="text-sm text-slate-500">{example.time}</span>
                  </div>
                  <CardTitle className="text-lg">Query</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-900">"{example.query}"</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Response:</h4>
                      <p className="text-sm text-slate-600">{example.response}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{feature.metric}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Try TheNZT?</h2>
            <p className="text-xl text-green-100 mb-8">
              Experience the power of multi-agent AI for financial analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => router.push('/signup')}>
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoPage;
