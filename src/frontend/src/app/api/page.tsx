'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Code, Database, Globe, Key, Play, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApiPage = () => {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      method: 'POST',
      path: '/api/chat',
      description: 'Send a finance query for processing',
      parameters: {
        query: { type: 'string', required: true, description: 'The financial query to process' },
        documents: { type: 'array', required: false, description: 'Optional document attachments' },
        search_mode: { type: 'string', required: false, description: 'Agent mode: fast, planner, or reasoning' }
      },
      example: {
        request: {
          query: 'What is the current stock price of Apple?',
          search_mode: 'fast'
        },
        response: {
          response: 'Apple Inc. (AAPL) is currently trading at $175.43...',
          sources: ['Financial Modeling Prep', 'Yahoo Finance'],
          processing_time: '1.2s',
          agent_used: 'Fast Agent'
        }
      }
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'Health check endpoint',
      parameters: {},
      example: {
        request: {},
        response: {
          status: 'healthy',
          timestamp: '2024-01-15T10:30:00Z',
          version: '1.0.0'
        }
      }
    },
    {
      method: 'POST',
      path: '/login',
      description: 'User authentication',
      parameters: {
        email: { type: 'string', required: true, description: 'User email address' },
        password: { type: 'string', required: true, description: 'User password' }
      },
      example: {
        request: {
          email: 'user@example.com',
          password: 'password123'
        },
        response: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          token_type: 'bearer',
          expires_in: 3600
        }
      }
    },
    {
      method: 'POST',
      path: '/stock-predict',
      description: 'Get stock price predictions',
      parameters: {
        symbol: { type: 'string', required: true, description: 'Stock symbol (e.g., AAPL)' },
        days: { type: 'integer', required: false, description: 'Number of days to predict (default: 30)' }
      },
      example: {
        request: {
          symbol: 'AAPL',
          days: 30
        },
        response: {
          symbol: 'AAPL',
          current_price: 175.43,
          predictions: [
            { date: '2024-01-16', price: 176.50, confidence: 0.85 },
            { date: '2024-01-17', price: 177.20, confidence: 0.82 }
          ],
          trend: 'bullish'
        }
      }
    }
  ];

  const codeExamples = {
    python: `import requests

# Send a finance query
response = requests.post('http://localhost:8000/api/chat', 
    json={
        'query': 'What is the current stock price of Apple?',
        'search_mode': 'fast'
    },
    headers={'Authorization': 'Bearer YOUR_TOKEN'}
)

print(response.json())`,
    javascript: `const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({
        query: 'What is the current stock price of Apple?',
        search_mode: 'fast'
    })
});

const data = await response.json();
console.log(data);`,
    curl: `curl -X POST "http://localhost:8000/api/chat" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "query": "What is the current stock price of Apple?",
    "search_mode": "fast"
  }'`
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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
                <Code className="w-5 h-5 text-slate-600" />
                <span className="text-lg font-semibold text-slate-900">API Documentation</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.open('http://localhost:8000/docs', '_blank')}>
                <Globe className="w-4 h-4 mr-2" />
                Swagger UI
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            TheNZT API Reference
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Integrate TheNZT's powerful multi-agent finance processing capabilities into your applications 
            with our comprehensive REST API.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Database className="w-3 h-3" />
              <span>REST API</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Key className="w-3 h-3" />
              <span>JWT Authentication</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>JSON Responses</span>
            </Badge>
          </div>
        </div>

        {/* Base URL */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
            <CardDescription>All API endpoints are relative to this base URL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between">
                <span>http://localhost:8000</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard('http://localhost:8000', 'base-url')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCode === 'base-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-blue-600" />
              <span>Authentication</span>
            </CardTitle>
            <CardDescription>
              TheNZT API uses JWT (JSON Web Token) for authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Getting an Access Token</h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span>POST /login</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard('POST /login', 'auth-endpoint')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCode === 'auth-endpoint' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Using the Token</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Include the access token in the Authorization header:
                </p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span>Authorization: Bearer YOUR_ACCESS_TOKEN</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard('Authorization: Bearer YOUR_ACCESS_TOKEN', 'auth-header')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCode === 'auth-header' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono text-slate-900">{endpoint.path}</code>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`, `endpoint-${index}`)}
                    >
                      {copiedCode === `endpoint-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <CardDescription>{endpoint.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="parameters" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      <TabsTrigger value="request">Request</TabsTrigger>
                      <TabsTrigger value="response">Response</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="parameters" className="space-y-4">
                      {Object.keys(endpoint.parameters).length > 0 ? (
                        <div className="space-y-3">
                          {Object.entries(endpoint.parameters).map(([param, details]: [string, any]) => (
                            <div key={param} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <div>
                                <code className="font-mono text-sm font-semibold">{param}</code>
                                <span className={`ml-2 px-2 py-1 text-xs rounded ${details.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {details.required ? 'required' : 'optional'}
                                </span>
                              </div>
                              <div className="text-sm text-slate-600 text-right">
                                <div className="font-mono">{details.type}</div>
                                <div className="text-xs">{details.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600">No parameters required</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="request">
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                        <div className="flex items-center justify-between">
                          <pre>{JSON.stringify(endpoint.example.request, null, 2)}</pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.example.request, null, 2), `request-${index}`)}
                            className="text-slate-400 hover:text-white"
                          >
                            {copiedCode === `request-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="response">
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                        <div className="flex items-center justify-between">
                          <pre>{JSON.stringify(endpoint.example.response, null, 2)}</pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.example.response, null, 2), `response-${index}`)}
                            className="text-slate-400 hover:text-white"
                          >
                            {copiedCode === `response-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-green-600" />
              <span>Code Examples</span>
            </CardTitle>
            <CardDescription>
              Get started quickly with these code examples in different programming languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <pre className="whitespace-pre-wrap">{code}</pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(code, lang)}
                        className="text-slate-400 hover:text-white"
                      >
                        {copiedCode === lang ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Rate Limits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rate Limits</CardTitle>
            <CardDescription>
              API usage limits to ensure fair usage and system stability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">100</div>
                <div className="text-sm text-slate-600">Requests per minute</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">1000</div>
                <div className="text-sm text-slate-600">Requests per hour</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">10000</div>
                <div className="text-sm text-slate-600">Requests per day</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
            <p className="text-xl text-green-100 mb-8">
              Start building with TheNZT's powerful API today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => router.push('/signup')}>
                Get API Access
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                View Swagger UI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiPage;
