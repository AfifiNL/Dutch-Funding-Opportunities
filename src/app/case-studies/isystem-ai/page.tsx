'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Link from 'next/link';
import { Icons } from '@/components/IconSet';

export default function IsystemAiCaseStudyPage() {
  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
      >
        <div className="px-6 py-8 sm:p-10">
          {/* Header */}
          <div className="border-b border-gray-700 pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600/20 rounded-lg px-3 py-1 text-blue-400 text-sm font-medium">
                AI-Powered EdTech
              </div>
              <div className="text-gray-400 text-sm">Case Study • 2025</div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              iSystem.ai: Funding Opportunities for AI-Driven Civic Integration
            </h1>
            <p className="text-gray-300 text-lg">
              A comprehensive analysis of Dutch funding options for an innovative AI startup 
              focused on improving integration outcomes for newcomers
            </p>
          </div>

          {/* Executive Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Executive Summary</h2>
            <p className="text-gray-300 mb-4">
              iSystem.ai is an innovative AI-driven platform that aims to revolutionize the Dutch civic integration process through personalized language learning, administrative automation, and job placement support. As a startup seeking €500,000 in funding, iSystem.ai is well-positioned to benefit from the Netherlands' robust funding landscape for AI ventures, particularly those with measurable social impact.
            </p>
            <p className="text-gray-300">
              The company's dual focus on technological innovation and social integration aligns perfectly with several major funding priorities in the Dutch ecosystem, opening multiple potential funding avenues ranging from government subsidies to private venture capital.
            </p>
          </section>

          {/* Company Profile */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Company Profile: iSystem.ai</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Core Offering</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>AI-powered Dutch language learning platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Administrative automation for integration processes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Job matching for newcomers based on skills and language progress</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Key Metrics</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Funding Needed: €500,000</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Stage: Pre-seed/Seed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Initial Pilot Locations: Breda and Tilburg</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Planned R&D Budget: €180,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Top Funding Opportunities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Top Funding Opportunities</h2>

            <div className="space-y-6">
              {/* Government Grants */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-medium text-white mb-3">Government Grants & Subsidies</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">
                      <Link href="/funding/cf84493c-fdb5-41f3-9ad6-143195019ea2" className="hover:underline flex items-center">
                        AiNed Programme (National Growth Fund)
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <a href="https://nlaic.com/en/about-nl-aic/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-300 ml-2">
                        (official website)
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-2">
                      €276 million allocated for AI innovation with focus on solving societal challenges.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">€100K - €500K</span>
                      <span>Perfect alignment with iSystem.ai's R&D plans</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">
                      <Link href="/funding/53fcb7b1-482e-4fe7-b76e-ce2723e31deb" className="hover:underline flex items-center">
                        Innovatiekrediet (RVO)
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <a href="https://www.rvo.nl/subsidie-en-financieringswijzer/innovatiekrediet" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-300 ml-2">
                        (official website)
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-2">
                      €50 million available for innovative projects with technical risks but strong market potential.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">Up to 45% of project costs</span>
                      <span>Finances technical development phase</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">
                      <Link href="/funding/2bd9f8e2-0ea9-49ad-8f26-56c77db5654e" className="hover:underline flex items-center">
                        WBSO (R&D Tax Credit)
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <a href="https://english.rvo.nl/subsidies-programmes/wbso" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-300 ml-2">
                        (official website)
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-2">
                      Expanded budget of €1,582 million for 2025, with favorable treatment for AI development costs.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">Tax credits</span>
                      <span>Reduce wage costs for R&D staff</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Regional Development Organizations */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-medium text-white mb-3">Regional Development Organizations</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">
                      BOM (Brabantse Ontwikkelings Maatschappij)
                      <a href="https://www.bom.nl/en" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-300 ml-2">
                        (official website)
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-2">
                      Regional investment agency for Noord-Brabant, ideal for iSystem.ai's Breda and Tilburg pilot locations.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">€50K - €500K</span>
                      <span>Geographic alignment with initial operations</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">
                      European Fund for Regional Development (EFRO)
                      <a href="https://ec.europa.eu/regional_policy/funding/erdf_en" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-300 ml-2">
                        (official website)
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-2">
                      Subsidies for initiatives promoting innovation and regional economic development.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">Varies by region</span>
                      <span>Strong precedent with other Dutch AI startups</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Private Investment */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-medium text-white mb-3">Venture Capital & Private Investment</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Specialized AI Investors</h4>
                    <p className="text-gray-300 mb-2">
                      Several Dutch VC firms specifically focusing on AI startups in 2025.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Link href="/funding/11ceb2bf-9633-4f5a-9d08-e3f92f372161" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors group relative">
                        Volta Ventures
                        <span className="hidden group-hover:flex absolute -bottom-7 left-0 bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap">
                          <a href="https://www.volta.ventures/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Visit website</a>
                        </span>
                      </Link>
                      <Link href="/funding/eea00847-9323-4037-9489-24a33a7a7146" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors group relative">
                        Antler
                        <span className="hidden group-hover:flex absolute -bottom-7 left-0 bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap">
                          <a href="https://www.antler.co/location/netherlands" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Visit website</a>
                        </span>
                      </Link>
                      <Link href="/funding/9bf2f53b-0ea8-481d-8d12-087e4fcaa6fc" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors group relative">
                        LUMO Labs Pre-seed AI Fund
                        <span className="hidden group-hover:flex absolute -bottom-7 left-0 bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap">
                          <a href="https://lumolabs.io/millions-in-funding-for-dutch-ai-consortium-to-support-early-stage-ai-startups/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Visit website</a>
                        </span>
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">EdTech Investors</h4>
                    <p className="text-gray-300 mb-2">
                      The Dutch EdTech sector has seen approximately €110 million in venture capital since 2016.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3">Growing at 90% CAGR</span>
                      <span>Strong interest in AI-powered learning platforms</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Impact Investors</h4>
                    <p className="text-gray-300 mb-2">
                      Social impact focus creates opportunities with dual-goal investors.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="https://www.worldstartup.co/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors">WorldStartup</a>
                      <a href="https://impactcapitalpartners.nl/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Impact Capital Partners</a>
                      <a href="https://www.forwardincubator.com/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Forward Incubator</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accelerator Programs */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-medium text-white mb-3">Accelerator Programs</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">AI-Specialized Programs</h4>
                    <p className="text-gray-300 mb-2">
                      Accelerators focusing specifically on AI startups with funding components.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Link href="/funding/e84bcc06-0598-4682-b9f1-b50bfdefb28b" className="text-gray-300 hover:text-blue-400 transition-colors">
                            Antler Amsterdam
                          </Link>
                          <a href="https://www.antler.co/location/amsterdam" target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-gray-500 hover:text-blue-400">
                            <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        <span className="text-blue-400">€100K for 10% equity</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Link href="/funding/ba751fbb-6116-4adb-a3af-77334bff5ece" className="text-gray-300 hover:text-blue-400 transition-colors">
                            Rockstart Emerging Tech
                          </Link>
                          <a href="https://rockstart.com/emerging-tech/" target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-gray-500 hover:text-blue-400">
                            <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        <span className="text-blue-400">€135K investment</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-300">YES!Delft AI Program</span>
                          <a href="https://www.yesdelft.com/" target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-gray-500 hover:text-blue-400">
                            <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        <span className="text-blue-400">Non-equity support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Public-Private Collaborations</h4>
                    <p className="text-gray-300 mb-2">
                      Programs connecting startups with public sector opportunities.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <div className="flex items-center">
                        <Link href="/funding/d6e603a5-8b40-4bfc-bcd9-0efbba38b247" className="bg-blue-900/30 text-blue-400 rounded px-2 py-0.5 mr-3 hover:bg-blue-800/40 transition-colors">
                          Startup in Residence (SiR)
                        </Link>
                        <a href="https://startupinresidence.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-300/70 hover:text-blue-300">
                          <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      <span>Direct connection to municipalities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Strategic Funding Recommendations</h2>
            
            <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/30">
              <h3 className="text-xl font-medium text-white mb-4">Optimal Funding Mix for iSystem.ai</h3>
              
              <ol className="space-y-4 text-gray-300">
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-800/40 text-blue-400 mr-3 font-medium">1</span>
                  <div>
                    <p className="font-medium text-white">Pursue AiNed funding for R&D components (€180K)</p>
                    <p className="text-gray-400 mt-1">The perfect alignment with national AI priorities makes this an ideal funding source for the R&D portion of iSystem.ai's plan.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-800/40 text-blue-400 mr-3 font-medium">2</span>
                  <div>
                    <p className="font-medium text-white">Apply for BOM investment (€150K)</p>
                    <p className="text-gray-400 mt-1">The geographic focus on Noord-Brabant perfectly matches iSystem.ai's pilot locations in Breda and Tilburg.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-800/40 text-blue-400 mr-3 font-medium">3</span>
                  <div>
                    <p className="font-medium text-white">Secure specialized AI venture capital (€170K)</p>
                    <p className="text-gray-400 mt-1">Target firms like LUMO Labs Pre-seed AI Fund or impact investors to complete the funding round with equity investment.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-800/40 text-blue-400 mr-3 font-medium">4</span>
                  <div>
                    <p className="font-medium text-white">Apply for WBSO tax credits (supplementary)</p>
                    <p className="text-gray-400 mt-1">Reduce ongoing R&D expenses through tax credits, maximizing the runway of direct investment.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Competitive Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Competitive Funding Advantage</h2>
            
            <p className="text-gray-300 mb-4">
              iSystem.ai has several unique advantages when competing for funding in the Dutch innovation ecosystem:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Dual Innovation Focus</h4>
                <p className="text-gray-300">
                  The combination of AI technology innovation and civic integration creates dual funding pathways unavailable to pure tech or pure social startups.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Municipality Partnerships</h4>
                <p className="text-gray-300">
                  Existing relationships with Breda and Tilburg demonstrate market validation and provide powerful references for funding applications.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Clear Market Need</h4>
                <p className="text-gray-300">
                  The documented challenges in Dutch civic integration create a compelling case for solution funding with clear ROI for both investors and government.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">R&D Focus</h4>
                <p className="text-gray-300">
                  The substantial R&D component (€180K) aligns perfectly with innovation funding priorities across multiple government programs.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Conclusion</h2>
            
            <p className="text-gray-300 mb-4">
              iSystem.ai is exceptionally well-positioned to secure its €500,000 funding requirement through a strategic mix of government grants, regional development funds, and private investment. The company's focus on applying AI to solve integration challenges represents a perfect alignment with Dutch funding priorities at both national and regional levels.
            </p>
            
            <p className="text-gray-300 mb-4">
              The optimal funding strategy involves leveraging multiple complementary sources rather than pursuing a single investment, creating a more stable financial foundation while also building valuable strategic partnerships across the Dutch innovation ecosystem.
            </p>
            
            <p className="text-gray-300">
              With the robust support available for AI startups in the Netherlands in 2025, particularly those addressing social challenges, iSystem.ai has a clear pathway to not only secure initial funding but also position itself for future growth capital as the business scales.
            </p>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-800/30">
            <h3 className="text-xl font-semibold text-white mb-3">Ready to explore these funding opportunities?</h3>
            <p className="text-gray-300 mb-4">
              Our platform can connect you with the right investors and grant programs for your startup's specific needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/funding" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Icons.Search className="w-4 h-4 mr-2" />
                Explore All Funding
              </Link>
              <Link 
                href="/profile" 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Icons.Profile className="w-4 h-4 mr-2" />
                Update Your Profile
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AuthenticatedLayout>
  );
} 