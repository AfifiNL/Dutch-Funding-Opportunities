-- Generated SQL for importing fund data


-- Insert VC profiles


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '5dbb1ad9-a3ad-4e23-a991-0e204bdb199d',
    'contact@setventures.example.com',
    'Setventures Ventures',
    'investor',
    'Setventures',
    'Investment firm',
    'http://www.setventures.com/',
    'https://randomuser.me/api/portraits/men/92.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'b6db474a-8347-461c-92b7-957eb46bcdc9',
    'contact@linkedin.example.com',
    'Linkedin Ventures',
    'investor',
    'Linkedin',
    'Investment firm',
    'https://www.linkedin.com/company/loadedventures',
    'https://randomuser.me/api/portraits/men/9.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '79e9a497-00a7-4e19-b9bc-df0750596ed2',
    'contact@dff.example.com',
    'Dff Ventures',
    'investor',
    'Dff',
    'Investment firm',
    'http://www.dff.ventures/',
    'https://randomuser.me/api/portraits/men/3.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '993b5c96-9aeb-41bf-ad9e-5ec3f1fd2c23',
    'contact@hollandcapital.example.com',
    'Hollandcapital Ventures',
    'investor',
    'Hollandcapital',
    'Investment firm',
    'http://www.hollandcapital.nl/',
    'https://randomuser.me/api/portraits/men/1.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '84bcd8d8-7c3b-4bc5-9460-4b0577ed4c15',
    'contact@curiosityvc.example.com',
    'Curiosityvc Ventures',
    'investor',
    'Curiosityvc',
    'Investment firm',
    'https://www.curiosityvc.com/',
    'https://randomuser.me/api/portraits/men/70.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '4a91faef-16ec-4007-868d-d3c41b50d039',
    'contact@stecc.example.com',
    'Stecc Ventures',
    'investor',
    'Stecc',
    'Investment firm',
    'https://stecc.com/',
    'https://randomuser.me/api/portraits/men/47.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '224cb42a-28b7-41b8-8f9c-5528d5a7f51a',
    'contact@venturecapital.example.com',
    'Venturecapital Ventures',
    'investor',
    'Venturecapital',
    'Investment firm',
    'https://www.venturecapital.nl/',
    'https://randomuser.me/api/portraits/men/22.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '008ebb52-2826-4a35-b605-b1f2e412078e',
    'contact@henq.example.com',
    'Henq Ventures',
    'investor',
    'Henq',
    'Investment firm',
    'https://henq.vc/',
    'https://randomuser.me/api/portraits/men/94.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '4818b3e0-d72b-43d4-8976-6ace0d7ec7f0',
    'contact@biogenerationventures.example.com',
    'Biogenerationventures Ventures',
    'investor',
    'Biogenerationventures',
    'Investment firm',
    'http://www.biogenerationventures.com/',
    'https://randomuser.me/api/portraits/men/15.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '5a311809-b0c6-4022-9abe-d92ba4595faf',
    'contact@venturerock.example.com',
    'Venturerock Ventures',
    'investor',
    'Venturerock',
    'Investment firm',
    'http://www.venturerock.com/',
    'https://randomuser.me/api/portraits/men/63.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '51d3749f-8b3a-4b1f-9ec1-c62c7e3a3469',
    'contact@forward.example.com',
    'Forward Ventures',
    'investor',
    'Forward',
    'Investment firm',
    'http://www.forward.one/',
    'https://randomuser.me/api/portraits/men/33.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '81085d02-114b-46d5-9a41-2daaccbb8977',
    'contact@bw.example.com',
    'Bw Ventures',
    'investor',
    'Bw',
    'Investment firm',
    'http://bw.ventures/',
    'https://randomuser.me/api/portraits/men/21.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'ed1fb6c3-413e-41cd-97e6-ee1cea328387',
    'contact@momentum.example.com',
    'Momentum Ventures',
    'investor',
    'Momentum',
    'Investment firm',
    'http://www.momentum.ventures/',
    'https://randomuser.me/api/portraits/men/61.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '3b0347ec-c5ab-459c-b6c2-ebb573282ceb',
    'contact@vortexcp.example.com',
    'Vortexcp Ventures',
    'investor',
    'Vortexcp',
    'Investment firm',
    'https://vortexcp.com/',
    'https://randomuser.me/api/portraits/men/7.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '71a82300-059c-49ab-a892-34ceabdfc8f6',
    'contact@volta.example.com',
    'Volta Ventures',
    'investor',
    'Volta',
    'Investment firm',
    'https://www.volta.ventures/locations/amsterdam-netherlands/',
    'https://randomuser.me/api/portraits/men/89.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'bb8b622d-ca05-4da0-8394-53199d2b292e',
    'contact@tincapital.example.com',
    'Tincapital Ventures',
    'investor',
    'Tincapital',
    'Investment firm',
    'https://www.tincapital.vc/',
    'https://randomuser.me/api/portraits/men/62.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'f380d824-b043-4a86-8f00-5d22698bb2f4',
    'contact@dsif.example.com',
    'Dsif Ventures',
    'investor',
    'Dsif',
    'Investment firm',
    'https://www.dsif.nl/',
    'https://randomuser.me/api/portraits/men/57.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '7c4c75c5-6464-4864-bc50-c5f6a9a1607b',
    'contact@solidventures.example.com',
    'Solidventures Ventures',
    'investor',
    'Solidventures',
    'Investment firm',
    'http://www.solidventures.vc/',
    'https://randomuser.me/api/portraits/men/80.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '11265652-7299-45ad-ad52-69d243b24a8e',
    'contact@newion.example.com',
    'Newion Ventures',
    'investor',
    'Newion',
    'Investment firm',
    'https://www.newion.com/',
    'https://randomuser.me/api/portraits/men/21.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '00a6257c-0800-46d2-ba19-fe0b4234b47e',
    'contact@keenventurepartners.example.com',
    'Keenventurepartners Ventures',
    'investor',
    'Keenventurepartners',
    'Investment firm',
    'http://keenventurepartners.com/',
    'https://randomuser.me/api/portraits/men/94.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'c7291972-f41e-4c6c-86bd-ef2a38ee27cb',
    'contact@hpegrowth.example.com',
    'Hpegrowth Ventures',
    'investor',
    'Hpegrowth',
    'Investment firm',
    'http://www.hpegrowth.com/',
    'https://randomuser.me/api/portraits/men/70.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'adacfaae-d978-46ba-a4f1-1112d60d29ef',
    'contact@finchcapital.example.com',
    'Finchcapital Ventures',
    'investor',
    'Finchcapital',
    'Investment firm',
    'http://www.finchcapital.com/',
    'https://randomuser.me/api/portraits/men/41.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'a32902b6-04c0-46a0-9f6f-645bc57b311f',
    'contact@valuecreationcapital.example.com',
    'Valuecreationcapital Ventures',
    'investor',
    'Valuecreationcapital',
    'Investment firm',
    'http://valuecreationcapital.com/',
    'https://randomuser.me/api/portraits/men/77.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '3c28ae57-87f1-4f3f-928a-7f49d2129a45',
    'contact@nlc.example.com',
    'Nlc Ventures',
    'investor',
    'Nlc',
    'Investment firm',
    'http://nlc.health/',
    'https://randomuser.me/api/portraits/men/57.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '791a5270-9b9c-436e-a364-43ff6ebe279d',
    'contact@dcventurecapitalpartners.example.com',
    'Dcventurecapitalpartners Ventures',
    'investor',
    'Dcventurecapitalpartners',
    'Investment firm',
    'http://www.dcventurecapitalpartners.com/',
    'https://randomuser.me/api/portraits/men/72.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '605143e7-b6ba-4c34-886f-5b1be95355de',
    'contact@ecfg.example.com',
    'Ecfg Ventures',
    'investor',
    'Ecfg',
    'Investment firm',
    'http://www.ecfg.nl/',
    'https://randomuser.me/api/portraits/men/4.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '3b833a46-056a-4308-8657-3b5215f02065',
    'contact@carbonequity.example.com',
    'Carbonequity Ventures',
    'investor',
    'Carbonequity',
    'Investment firm',
    'http://www.carbonequity.com/',
    'https://randomuser.me/api/portraits/men/20.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '49ecf3d6-d7e4-4ea3-bb53-2003b1d459c1',
    'contact@craftcapital.example.com',
    'Craftcapital Ventures',
    'investor',
    'Craftcapital',
    'Investment firm',
    'https://www.craftcapital.nl/',
    'https://randomuser.me/api/portraits/men/85.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'ee87bb30-baa7-4479-b2bb-713ffa05fde2',
    'contact@anterracapital.example.com',
    'Anterracapital Ventures',
    'investor',
    'Anterracapital',
    'Investment firm',
    'http://www.anterracapital.com/',
    'https://randomuser.me/api/portraits/men/51.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'f7542a88-6984-4c0f-b2f7-a0327214a2c0',
    'contact@ventureiq.example.com',
    'Ventureiq Ventures',
    'investor',
    'Ventureiq',
    'Investment firm',
    'http://www.ventureiq.nl/',
    'https://randomuser.me/api/portraits/men/75.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '93bd9dd4-3ba5-4f73-b44f-f17672e56553',
    'contact@investnl.example.com',
    'Invest Nl Ventures',
    'investor',
    'Invest Nl',
    'Investment firm',
    'http://www.invest-nl.nl/',
    'https://randomuser.me/api/portraits/men/85.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '74c06e3c-bb20-4fa8-b8c9-6728a787d5d2',
    'contact@voccp.example.com',
    'Voccp Ventures',
    'investor',
    'Voccp',
    'Investment firm',
    'http://www.voccp.com/',
    'https://randomuser.me/api/portraits/men/89.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '2b4e2360-73d4-4e53-9f78-76ff53edce51',
    'contact@rivervp.example.com',
    'Rivervp Ventures',
    'investor',
    'Rivervp',
    'Investment firm',
    'https://rivervp.com/',
    'https://randomuser.me/api/portraits/men/13.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '4938443c-d869-43e4-9797-dc7d3cb2e768',
    'contact@rotterdamportfund.example.com',
    'Rotterdamportfund Ventures',
    'investor',
    'Rotterdamportfund',
    'Investment firm',
    'http://www.rotterdamportfund.com/',
    'https://randomuser.me/api/portraits/men/14.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '83f09561-4b5f-4caa-9893-1086c2974c9f',
    'contact@rockstart.example.com',
    'Rockstart Ventures',
    'investor',
    'Rockstart',
    'Investment firm',
    'https://www.rockstart.com/',
    'https://randomuser.me/api/portraits/men/85.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '21d777d2-1772-4d82-803e-cd41824f339f',
    'contact@nosuchventures.example.com',
    'Nosuchventures Ventures',
    'investor',
    'Nosuchventures',
    'Investment firm',
    'https://nosuchventures.com/',
    'https://randomuser.me/api/portraits/men/35.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '2275b4e8-d095-4ae9-b3f7-8a985582cde9',
    'contact@bolsterinvestments.example.com',
    'Bolsterinvestments Ventures',
    'investor',
    'Bolsterinvestments',
    'Investment firm',
    'https://bolsterinvestments.nl/',
    'https://randomuser.me/api/portraits/men/94.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'f20aaaba-f7aa-46a7-8224-8f4d360bb1b0',
    'contact@forbion.example.com',
    'Forbion Ventures',
    'investor',
    'Forbion',
    'Investment firm',
    'http://www.forbion.com/',
    'https://randomuser.me/api/portraits/men/62.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '10196ece-42e2-4008-8a02-ca2e860bf3ff',
    'contact@qapitalgroup.example.com',
    'Qapitalgroup Ventures',
    'investor',
    'Qapitalgroup',
    'Investment firm',
    'https://www.qapitalgroup.com/',
    'https://randomuser.me/api/portraits/men/85.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '1990644e-61a2-4136-9733-7179e42f5be9',
    'contact@connectedcapital.example.com',
    'Connectedcapital Ventures',
    'investor',
    'Connectedcapital',
    'Investment firm',
    'http://www.connectedcapital.nl/',
    'https://randomuser.me/api/portraits/men/22.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '9b14235f-1c8b-427a-b3e7-9a58ca398ba7',
    'contact@dealroom.example.com',
    'Dealroom Ventures',
    'investor',
    'Dealroom',
    'Investment firm',
    'https://dealroom.co/',
    'https://randomuser.me/api/portraits/men/40.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '7782f0b9-3a25-454b-ab39-dfa6083398f5',
    'contact@conventcapital.example.com',
    'Conventcapital Ventures',
    'investor',
    'Conventcapital',
    'Investment firm',
    'http://www.conventcapital.nl/en/',
    'https://randomuser.me/api/portraits/men/96.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'c1e6210b-9730-4292-bc0f-f11c347d6edf',
    'contact@dutchcapitalpartners.example.com',
    'Dutch Capital Partners Ventures',
    'investor',
    'Dutch Capital Partners',
    'Investment firm',
    'https://www.dutch-capital-partners.nl/',
    'https://randomuser.me/api/portraits/men/67.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '1a8f1a72-1414-49c3-8366-1a0ef96168a6',
    'contact@nofivetrees.example.com',
    'Nofivetrees Ventures',
    'investor',
    'Nofivetrees',
    'Investment firm',
    'http://www.nofivetrees.com/',
    'https://randomuser.me/api/portraits/men/15.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    'a01fdf5e-de6f-4d9b-86d9-d45aa1c80634',
    'contact@venturecapital-nl.example.com',
    'venture capital-NL',
    'investor',
    'venture capital-NL',
    'Investment firm focused on innovative companies.',
    '',
    'https://randomuser.me/api/portraits/men/87.jpg'
)
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '4c112edb-ff7b-454b-a245-46a71c805122',
    'contact@overviewofantler'sdutchstartupportfolio.example.com',
    'Overview of Antler''s Dutch Startup Portfolio',
    'investor',
    'Overview of Antler''s Dutch Startup Portfolio',
    'Engaging and original audio entertainment for kids.
Website: Not provided.',
    '',
    'https://randomuser.me/api/portraits/men/87.jpg'
)
ON CONFLICT (id) DO NOTHING;


-- Insert investor profiles


INSERT INTO public.investor_profiles (profile_id, investment_thesis, investment_stages, preferred_industries, investment_sizes)
VALUES (
    'a01fdf5e-de6f-4d9b-86d9-d45aa1c80634',
    'Investing in innovative technology companies with high growth potential.',
    '{"Seed","Series A"}',
    '{"Technology","Software","Consumer"}',
    '{"min": 100000, "max": 1000000, "currency": "EUR"}'::jsonb
)
ON CONFLICT (profile_id) DO UPDATE SET
    investment_thesis = EXCLUDED.investment_thesis,
    investment_stages = EXCLUDED.investment_stages,
    preferred_industries = EXCLUDED.preferred_industries,
    investment_sizes = EXCLUDED.investment_sizes;


INSERT INTO public.investor_profiles (profile_id, investment_thesis, investment_stages, preferred_industries, investment_sizes)
VALUES (
    '4c112edb-ff7b-454b-a245-46a71c805122',
    'Investing in innovative technology companies with high growth potential.',
    '{"Seed","Series A"}',
    '{"Technology","Software","Consumer"}',
    '{"min": 100000, "max": 1000000, "currency": "EUR"}'::jsonb
)
ON CONFLICT (profile_id) DO UPDATE SET
    investment_thesis = EXCLUDED.investment_thesis,
    investment_stages = EXCLUDED.investment_stages,
    preferred_industries = EXCLUDED.preferred_industries,
    investment_sizes = EXCLUDED.investment_sizes;


-- Update Antler portfolio


UPDATE public.investor_profiles
SET portfolio = '[{"company_name": "0-mission", "year": "2022", "location": "Denmark", "sector": "Energy and ClimateTech", "website": "https://the0mission.dk", "description": "Enables SMEs to add renewables to the grid"}, {"company_name": "913.ai", "year": "2023", "location": "Germany", "sector": "B2B Software", "website": "https://www.913.ai", "description": "One Platform to Build Test and Integrate Custom AI Agents to Handle all your Workflows and Knowledge"}, {"company_name": "ABIVO", "year": "2025", "location": "Canada", "sector": "FinTech", "website": "https://abivo.ai", "description": "AI collections staff that can call text and email clients ensuring timely follow-ups and reducing overdue invoices"}, {"company_name": "ACSIRYO K.K.", "year": "2025", "location": "Japan", "sector": "Health and BioTech", "website": "https://acsiryo.com/", "description": "Automating chronic disease monitoring through satellite health stations and cloud-based specialist support"}, {"company_name": "ARCA", "year": "2024", "location": "", "sector": "Energy and ClimateTech", "website": "https://arca.eco", "description": "Revolutionizing recycling through advanced waste sorting solutions"}, {"company_name": "ARDOR", "year": "2024", "location": "Singapore", "sector": "B2B Software", "website": "https://ardor.cloud", "description": "The Platform Where Agents Build Agents to Revolutionize Software"}, {"company_name": "ARKI", "year": "2023", "location": "Canada", "sector": "Real Estate and PropTech", "website": "https://www.getarki.com/", "description": "AI search for construction to leverage internal data for automating future work"}, {"company_name": "AURELIA INSIGHTS", "year": "2025", "location": "Malaysia", "sector": "B2B Software", "website": "https://www.aurelia.asia/", "description": "Future proof food safety compliance"}, {"company_name": "Abel Studios", "year": "2024", "location": "Netherlands", "sector": "ConsumerTech", "website": "", "description": "Engaging and original audio entertainment for kids"}, {"company_name": "Abode", "year": "2023", "location": "", "sector": "Real Estate and PropTech", "website": "https://www.withabode.com/", "description": "AI powered platform transforming housing affordability and providing investors access to unique single-family rentals"}, {"company_name": "Abode Labs", "year": "2024", "location": "US", "sector": "Real Estate and PropTech", "website": "https://abodelabs.ai/", "description": "AI-first automation for Real Estate starting with Title"}, {"company_name": "Abstraction", "year": "2024", "location": "US", "sector": "B2B Software", "website": "https://www.abstractionlabs.ai", "description": "AI teammates for sales CX and product teams to automate complex workflows 10x faster and deploy in minutes"}, {"company_name": "Acanthis", "year": "2022", "location": "Australia", "sector": "B2B Software", "website": "https://acanthis.io", "description": "Integrated SaaS web application that provides SMBs with insights and advice in an understandable way"}, {"company_name": "Access Carbon", "year": "2024", "location": "", "sector": "FinTech", "website": "https://www.access-carbon.com/", "description": "Accelerating efficient pricing of emissions through unlocking individual and institutional investment access to global carbon markets"}, {"company_name": "Acrux Education", "year": "2023", "location": "Australia", "sector": "ConsumerTech", "website": "https://teacherea.com", "description": "Revolutionizes Maths education with AI-powered assessment marking enhancing student performance"}, {"company_name": "Ad Auris", "year": "2021", "location": "", "sector": "ConsumerTech", "website": "https://www.ad-auris.com", "description": ""}, {"company_name": "Adamata", "year": "2024", "location": "Indonesia", "sector": "Energy and ClimateTech", "website": "", "description": "Waste Mining: AI-Powered Robot Sorter for Indonesian Mixed Waste"}, {"company_name": "Adrenaline Interactive", "year": "2024", "location": "US", "sector": "B2B Software", "website": "https://adrenalineinteractive.ai/", "description": "Programmatic product placement in video games"}, {"company_name": "AdvancePay (Zilla)", "year": "2022", "location": "", "sector": "B2B Software", "website": "https://www.advancepay.io/", "description": "Database showing content creator and brand relationships for transparent influencer marketing"}, {"company_name": "AdviseWell", "year": "2024", "location": "Australia", "sector": "B2B Software", "website": "https://www.advisewell.co/", "description": "Streamlines and automates complex financial strategy creation for Financial Advisers"}, {"company_name": "Aesty", "year": "2024", "location": "United Arab Emirates", "sector": "ConsumerTech", "website": "https://aesty.ai", "description": "AI-powered closet companion for wardrobe organization and shopping recommendations"}, {"company_name": "Aevy", "year": "2024", "location": "", "sector": "Energy and ClimateTech", "website": "https://aevy.io/", "description": "Scalable renewable asset management"}, {"company_name": "Agenta.ai", "year": "", "location": "", "sector": "", "website": "https://agenta.ai", "description": "The open-source platform for bringing LLM apps to production"}, {"company_name": "Agentio", "year": "2023", "location": "US", "sector": "B2B Software", "website": "https://agentio.com/", "description": "Programmatic ad network for professional content creators"}, {"company_name": "Agri Sparta", "year": "2023", "location": "Indonesia", "sector": "Industrials", "website": "http://www.agrisparta.com", "description": "Industrializing rice farming"}, {"company_name": "Agrigate", "year": "2023", "location": "Indonesia", "sector": "Industrials", "website": "https://www.agrigate.id/", "description": "Building resilient agricultural supply chains for businesses worldwide"}, {"company_name": "Agrovisia", "year": "2024", "location": "Brazil", "sector": "Industrials", "website": "https://www.agrovisia.com.br/", "description": "Real-time soil fertility mapping"}, {"company_name": "AiCare", "year": "2021", "location": "Kenya", "sector": "B2B Software", "website": "http://aicare.co.ke", "description": "IoT and AI for accurate motor insurance risk assessment"}, {"company_name": "Aiba", "year": "2022", "location": "", "sector": "B2B Software", "website": "https://aiba.ai", "description": "Detection of fake profiles online grooming and toxicity"}, {"company_name": "Aiden", "year": "2024", "location": "Germany", "sector": "Real Estate and PropTech", "website": "https://getaiden.com", "description": "AI-Assistant for Residential Property Management"}, {"company_name": "Aimars", "year": "2023", "location": "Germany", "sector": "B2B Software", "website": "https://www.aimars.io/", "description": "The AI Driven Sales Optimization Platform"}, {"company_name": "Airalo", "year": "2019", "location": "Singapore", "sector": "ConsumerTech", "website": "https://www.airalo.com/", "description": "World's first eSIM store for 190+ countries worldwide at affordable prices"}, {"company_name": "Airballoon", "year": "2023", "location": "Korea", "sector": "ConsumerTech", "website": "https://airballoon.app", "description": "Business authentication and brokerage platform for online business"}, {"company_name": "Aircity", "year": "2022", "location": "", "sector": "Real Estate and PropTech", "website": "https://www.aircity.network/", "description": "Property Management Made Simplified"}, {"company_name": "Airmo", "year": "2023", "location": "Germany", "sector": "Energy and ClimateTech", "website": "https://airmo.io", "description": "New approach to locate quantify and track methane emissions"}, {"company_name": "Aival", "year": "2020", "location": "UK", "sector": "Health and BioTech", "website": "https://www.aival.io/", "description": "Software to evaluate and monitor AI solutions in healthcare"}, {"company_name": "Akar", "year": "2022", "location": "Indonesia", "sector": "Industrials", "website": "https://www.akar.cloud", "description": "Manufacturing and distribution of modular indoor farming in urban cities"}, {"company_name": "Alcolase", "year": "2023", "location": "Denmark", "sector": "Health and BioTech", "website": "https://alcolase.com/", "description": "Developing dietary supplement for alcohol intolerance"}, {"company_name": "Alea Health", "year": "2024", "location": "United Arab Emirates", "sector": "Health and BioTech", "website": "https://aleahealth.co/", "description": "AI-assisted virtual mental health clinic"}, {"company_name": "Allihoop", "year": "2020", "location": "Sweden", "sector": "Real Estate and PropTech", "website": "https://www.allihoop.se/", "description": "Technology enabled co-living brand for urban professionals"}, {"company_name": "Allspring", "year": "2022", "location": "", "sector": "B2B Software", "website": "https://www.tryallspring.com", "description": ""}, {"company_name": "Alpha Impact", "year": "2021", "location": "", "sector": "FinTech", "website": "https://alphaimpact.fi/", "description": "Platform for cryptocurrency trading following industry veterans"}, {"company_name": "AlphaNova", "year": "2024", "location": "United Arab Emirates", "sector": "FinTech", "website": "https://www.alphanova.tech", "description": "Asset Management platform crowdsourcing trading signals"}, {"company_name": "AlphaShine", "year": "2022", "location": "Canada", "sector": "ConsumerTech", "website": "https://www.alphashine.io/", "description": "Digital subscription for car detailing"}, {"company_name": "Alphaguard", "year": "2024", "location": "France", "sector": "FinTech", "website": "https://alphaguard.ai/", "description": "AI agents for preventing fraud in public procurement"}, {"company_name": "Alphaloops", "year": "2023", "location": "UK", "sector": "FinTech", "website": "https://www.alphaloops.ai/", "description": "Automating investment management operations using AI"}, {"company_name": "Alt Fashion", "year": "2024", "location": "India", "sector": "ConsumerTech", "website": "https://www.myalt.shop/", "description": "Meta search engine for fashion"}, {"company_name": "Alterno", "year": "2023", "location": "", "sector": "Energy and ClimateTech", "website": "https://www.alterno.group", "description": "Silica-based zero emission commercial heat solution"}, {"company_name": "Alva", "year": "2024", "location": "Norway", "sector": "Energy and ClimateTech", "website": "https://www.alva.as", "description": "Automated & hassle-free energy management system"}, {"company_name": "Aman Vision", "year": "2024", "location": "Saudi Arabia", "sector": "B2B Software", "website": "https://www.amanvision.ai", "description": "AI-powered Environment Health and Safety (EHS) platform"}, {"company_name": "American Housing Corp", "year": "2024", "location": "US", "sector": "Industrials", "website": "https://americanhousing.co/", "description": "Modular building system to address housing crisis"}, {"company_name": "Amino Chain", "year": "2023", "location": "US", "sector": "Health and BioTech", "website": "https://aminochain.io/", "description": "Platform for biospecimen discovery and acquisition"}, {"company_name": "Ampfox", "year": "2024", "location": "Brazil", "sector": "B2B Software", "website": "https://www.ampfox.co/", "description": "Digital platform for efficient electric vehicle adoption"}, {"company_name": "Amptiv Biosciences", "year": "2024", "location": "US", "sector": "Health and BioTech", "website": "https://www.amptivbio.com/", "description": "Augmenting mRNA therapeutics with novel molecular toolkit"}, {"company_name": "Anda", "year": "2023", "location": "Australia", "sector": "Health and BioTech", "website": "https://breathewithanda.com/", "description": "Stylish smart wearable company for wellness"}, {"company_name": "Andisor", "year": "2021", "location": "Australia", "sector": "B2B Software", "website": "http://www.andisor.com", "description": "Wholesale sourcing platform for multibrand retailers"}, {"company_name": "Animum", "year": "2024", "location": "Sweden", "sector": "Industrials", "website": "https://animum.ai", "description": "Software for robots and autonomous retail restocking"}, {"company_name": "Annuum", "year": "2023", "location": "", "sector": "FinTech", "website": "https://www.annuum.io", "description": "Optimising commercial real estate financing"}, {"company_name": "Anyreach", "year": "2025", "location": "US", "sector": "B2B Software", "website": "https://anyreach.ai/", "description": "AI-voice solution for call optimization"}, {"company_name": "Aona AI", "year": "2023", "location": "Australia", "sector": "B2B Software", "website": "https://www.aona.ai/", "description": "Secure advanced AI access platform for business"}, {"company_name": "Arable", "year": "2024", "location": "Saudi Arabia", "sector": "Industrials", "website": "https://www.arablefarms.com", "description": "Hydroponic technology for arid conditions farming"}, {"company_name": "Arbo", "year": "2024", "location": "", "sector": "Industrials", "website": "https://www.arbo-holz.de/", "description": "Digital B2B marketplace for timber procurement"}, {"company_name": "Arctiq", "year": "2023", "location": "", "sector": "ConsumerTech", "website": "https://www.arctiq.ai", "description": "AI-powered study assistance platform"}, {"company_name": "Arkion", "year": "2019", "location": "Sweden", "sector": "Energy and ClimateTech", "website": "https://www.arkion.co/", "description": "AI-powered asset intelligence for power grids"}, {"company_name": "ArkoPay", "year": "2023", "location": "Indonesia", "sector": "FinTech", "website": "https://arkopay.com/", "description": "Financial solution for construction businesses"}, {"company_name": "Armada Brands", "year": "2021", "location": "", "sector": "ConsumerTech", "website": "https://www.armada-brands.com/", "description": "Acquires and grows high performing ecommerce brands"}, {"company_name": "Arus", "year": "2024", "location": "", "sector": "Real Estate and PropTech", "website": "https://www.arus.aero/", "description": "Maintenance drones for property management"}, {"company_name": "AskVinny", "year": "2024", "location": "UK", "sector": "Real Estate and PropTech", "website": "https://www.askvinny.co.uk/", "description": "AI agents for property management"}, {"company_name": "AssetFindr", "year": "2024", "location": "Indonesia", "sector": "B2B Software", "website": "https://assetfindr.com/", "description": "End-to-end asset maintenance management"}, {"company_name": "AssistTeacher", "year": "2024", "location": "", "sector": "ConsumerTech", "website": "https://www.assistteacher.com", "description": "AI-enabled education tools for homework and assessment"}, {"company_name": "Assure AI", "year": "2024", "location": "US", "sector": "B2B Software", "website": "https://www.weassure.ai/home", "description": "Helping vendors sell into healthcare faster"}, {"company_name": "Astrid Wild", "year": "2019", "location": "Sweden", "sector": "ConsumerTech", "website": "https://astridwild.com", "description": "Outdoor fashion for women"}, {"company_name": "Atium", "year": "", "location": "", "sector": "", "website": "", "description": ""}, {"company_name": "Aumber", "year": "2022", "location": "", "sector": "B2B Software", "website": "https://aumber.io/", "description": "Cloud platform for smart device testing"}, {"company_name": "Auric", "year": "2024", "location": "Australia", "sector": "Health and BioTech", "website": "https://www.auric.au", "description": "AI-powered Mood as a Service with connected aromas"}, {"company_name": "Authentified", "year": "2024", "location": "Australia", "sector": "B2B Software", "website": "http://www.authentified.co", "description": "Authentication platform for resale ecosystem"}, {"company_name": "Autodraft", "year": "2024", "location": "India", "sector": "B2B Software", "website": "https://autodraft.in/", "description": "AI animation tool for content creators"}, {"company_name": "Automicle", "year": "", "location": "Netherlands", "sector": "B2B Software", "website": "", "description": "Unified API for local mobility services"}, {"company_name": "AvataraLabs", "year": "2025", "location": "Indonesia", "sector": "B2B Software", "website": "https://avataralabs.ai/", "description": "AI Virtual Sellers platform"}, {"company_name": "Avertro", "year": "2019", "location": "Australia", "sector": "B2B Software", "website": "https://www.avertro.com/", "description": "Cybersecurity management and reporting platform"}, {"company_name": "Avid International", "year": "2019", "location": "", "sector": "ConsumerTech", "website": "avid.fm", "description": "Platform for creating and selling audio courses"}, {"company_name": "AxisNow", "year": "2025", "location": "Singapore", "sector": "B2B Software", "website": "https://www.axisnow.io/", "description": "Identity and Access Management for Non-Human Entities"}, {"company_name": "B4Grad", "year": "2022", "location": "", "sector": "ConsumerTech", "website": "https://b4grad.com/", "description": "Edtech platform for student notes and flashcards"}, {"company_name": "Balo", "year": "2024", "location": "Australia", "sector": "B2B Software", "website": "https://balo.expert", "description": "Enterprise Software Help Desk with expert network"}, {"company_name": "Balthazar", "year": "2024", "location": "Netherlands", "sector": "B2B Software", "website": "https://balthazar.app/", "description": "Self-driving labs for hardware"}, {"company_name": "BankBridge", "year": "2023", "location": "UK", "sector": "FinTech", "website": "https://bankbridge.uk", "description": "Due diligence platform for financial institutions"}, {"company_name": "Banqora", "year": "2024", "location": "UK", "sector": "FinTech", "website": "https://www.banqora.com/", "description": "Operational efficiency platform for financial institutions"}, {"company_name": "Barely Skin", "year": "2024", "location": "Vietnam", "sector": "ConsumerTech", "website": "https://www.barely.skin/", "description": "Personalized dermatology-level skin treatment"}, {"company_name": "Base", "year": "2019", "location": "", "sector": "ConsumerTech", "website": "https://www.base.co.id/", "description": "Personalized skincare in Indonesia"}, {"company_name": "Baselime", "year": "2021", "location": "", "sector": "B2B Software", "website": "baselime.io", "description": "Observability solution for serverless architectures"}, {"company_name": "Basemaker", "year": "2023", "location": "Brazil", "sector": "ConsumerTech", "website": "https://www.basemaker.co/", "description": "Digital marketing platform for influencer campaigns"}, {"company_name": "Baser", "year": "2022", "location": "", "sector": "B2B Software", "website": "https://getbaser.com/", "description": "Automated SEO optimization platform"}, {"company_name": "Beemi", "year": "2023", "location": "Kenya", "sector": "ConsumerTech", "website": "https://beemi.app/", "description": "Interactive games platform for social media streaming"}, {"company_name": "Bella", "year": "2024", "location": "Australia", "sector": "B2B Software", "website": "https://bellasales.io/", "description": "AI Sales Agent for LinkedIn & Email"}, {"company_name": "Benjamin Capital", "year": "2022", "location": "", "sector": "FinTech", "website": "https://www.benjaminone.com/", "description": "Banking platform connecting merchants and customers"}, {"company_name": "BetterChoice", "year": "2023", "location": "", "sector": "Energy and ClimateTech", "website": "https://betterchoice.today", "description": "Holistic scoring system for sustainable purchasing"}, {"company_name": "Beyond Robotics", "year": "2024", "location": "Korea", "sector": "Industrials", "website": "https://www.beyond-robotics.ai", "description": "3D AI Vision-based Mobile Robot for Agriculture"}, {"company_name": "fileAI", "year": "2024", "location": "", "sector": "B2B Software", "website": "https://www.file.ai/", "description": "AI automation solutions for end-to-end file processing"}, {"company_name": "HIFI Bridge", "year": "2024", "location": "", "sector": "FinTech", "website": "https://www.hifibridge.com/", "description": "Crypto payment acceptance platform for businesses"}, {"company_name": "Klearly", "year": "2024", "location": "", "sector": "FinTech", "website": "https://klearly.nl", "description": "Simplify payment acceptance for SMBs throughout Europe"}, {"company_name": "ORA", "year": "2024", "location": "", "sector": "Health and BioTech", "website": "https://www.ora.group", "description": "Powering direct-to-patient healthcare in South East Asia"}, {"company_name": "Pemo", "year": "2024", "location": "United Arab Emirates", "sector": "FinTech", "website": "https://www.pemo.io", "description": "Expense management platform for MENA businesses"}, {"company_name": "Sona", "year": "2024", "location": "", "sector": "B2B Software", "website": "https://www.getsona.com", "description": "Frontline workforce efficiency and engagement solution"}, {"company_name": "Two", "year": "2024", "location": "", "sector": "FinTech", "website": "https://two.inc", "description": "BNPL for B2B"}, {"company_name": "Wrtn", "year": "2024", "location": "Korea", "sector": "B2B Software", "website": "https://wrtn.ai", "description": "AI natural language superapp for South Korea"}]'::jsonb[]
WHERE profile_id = '4c112edb-ff7b-454b-a245-46a71c805122';


-- Insert funding opportunities


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '06f84027-c271-4942-ab50-a465333f9910',
    'Setventures Seed Fund',
    'Setventures',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Setventures invests in Technology companies at Seed stages.',
    '{"http://www.setventures.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '39c5c405-3cb8-41e6-89f1-f12a4fb3dd82',
    '5dbb1ad9-a3ad-4e23-a991-0e204bdb199d',
    '06f84027-c271-4942-ab50-a465333f9910',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '0ad993f6-ed42-4d6f-94e7-e51b84bdaa85',
    'Linkedin Seed Fund',
    'Linkedin',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Linkedin invests in Technology companies at Seed stages.',
    '{"https://www.linkedin.com/company/loadedventures"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '50f083a2-86f3-4866-b48f-229ff3f4ca9d',
    'b6db474a-8347-461c-92b7-957eb46bcdc9',
    '0ad993f6-ed42-4d6f-94e7-e51b84bdaa85',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'ff755d2e-dca9-4cb8-8f84-886bd96ed104',
    'Dff Seed Fund',
    'Dff',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Dff invests in Technology companies at Seed stages.',
    '{"http://www.dff.ventures/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '27b43f56-6571-470f-92aa-0245668826fc',
    '79e9a497-00a7-4e19-b9bc-df0750596ed2',
    'ff755d2e-dca9-4cb8-8f84-886bd96ed104',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '0dd393c2-672e-48f8-8796-e018c7893487',
    'Hollandcapital Seed Fund',
    'Hollandcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Hollandcapital invests in Technology companies at Seed stages.',
    '{"http://www.hollandcapital.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '4dececae-dbee-4ffd-8b80-60308e5115f6',
    '993b5c96-9aeb-41bf-ad9e-5ec3f1fd2c23',
    '0dd393c2-672e-48f8-8796-e018c7893487',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '85ada706-19d6-4db6-970a-f2d8c913e624',
    'Curiosityvc Seed Fund',
    'Curiosityvc',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Curiosityvc invests in Technology companies at Seed stages.',
    '{"https://www.curiosityvc.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '0e3928a2-9eb7-468a-bb5d-f4f08bc8443a',
    '84bcd8d8-7c3b-4bc5-9460-4b0577ed4c15',
    '85ada706-19d6-4db6-970a-f2d8c913e624',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '5ba8e8ec-1236-4553-b368-6931cd12fefe',
    'Stecc Seed Fund',
    'Stecc',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Stecc invests in Technology companies at Seed stages.',
    '{"https://stecc.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '8c7bf092-6051-4aaf-9269-b91bc5f2e82a',
    '4a91faef-16ec-4007-868d-d3c41b50d039',
    '5ba8e8ec-1236-4553-b368-6931cd12fefe',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'b20d06f7-6650-431a-9cec-f9f2b54a2003',
    'Venturecapital Seed Fund',
    'Venturecapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Venturecapital invests in Technology companies at Seed stages.',
    '{"https://www.venturecapital.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '272d819e-b15d-4948-9b94-d68f9a4d6eae',
    '224cb42a-28b7-41b8-8f9c-5528d5a7f51a',
    'b20d06f7-6650-431a-9cec-f9f2b54a2003',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'c0103287-f1c1-421c-a045-c9d83e69839d',
    'Henq Seed Fund',
    'Henq',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Henq invests in Technology companies at Seed stages.',
    '{"https://henq.vc/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '599e278f-5f05-4bf8-b67a-55ca34d91bf6',
    '008ebb52-2826-4a35-b605-b1f2e412078e',
    'c0103287-f1c1-421c-a045-c9d83e69839d',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'eb636ca8-9936-4ff1-a4ca-9599974c53d0',
    'Biogenerationventures Seed Fund',
    'Biogenerationventures',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Biogenerationventures invests in Technology companies at Seed stages.',
    '{"http://www.biogenerationventures.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'c9b88b87-9609-461c-9f22-13c7df5f2b9c',
    '4818b3e0-d72b-43d4-8976-6ace0d7ec7f0',
    'eb636ca8-9936-4ff1-a4ca-9599974c53d0',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '1f28a3ab-df26-4e73-8de2-1a5f43abe4dc',
    'Venturerock Seed Fund',
    'Venturerock',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Venturerock invests in Technology companies at Seed stages.',
    '{"http://www.venturerock.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'b1ad88e6-4deb-427a-a10c-0c815e21ec9c',
    '5a311809-b0c6-4022-9abe-d92ba4595faf',
    '1f28a3ab-df26-4e73-8de2-1a5f43abe4dc',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '6f894073-9a2f-4188-a4b4-b51bf2214e59',
    'Forward Seed Fund',
    'Forward',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Forward invests in Technology companies at Seed stages.',
    '{"http://www.forward.one/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '6d177745-8d92-4acf-b953-5159691ce73b',
    '51d3749f-8b3a-4b1f-9ec1-c62c7e3a3469',
    '6f894073-9a2f-4188-a4b4-b51bf2214e59',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '928a0562-bf57-4992-b6c9-f8e3395833ae',
    'Bw Seed Fund',
    'Bw',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Bw invests in Technology companies at Seed stages.',
    '{"http://bw.ventures/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'aa0a1e73-81dc-4e15-99f4-ce2fbaef3520',
    '81085d02-114b-46d5-9a41-2daaccbb8977',
    '928a0562-bf57-4992-b6c9-f8e3395833ae',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '0c39a343-8466-4a5e-adf8-c3c1079e1623',
    'Momentum Seed Fund',
    'Momentum',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Momentum invests in Technology companies at Seed stages.',
    '{"http://www.momentum.ventures/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'b67f07d9-1303-4489-bd31-a8d360a753c5',
    'ed1fb6c3-413e-41cd-97e6-ee1cea328387',
    '0c39a343-8466-4a5e-adf8-c3c1079e1623',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'dacb00da-6595-4b8a-aa3b-4b05643a2bac',
    'Vortexcp Seed Fund',
    'Vortexcp',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Vortexcp invests in Technology companies at Seed stages.',
    '{"https://vortexcp.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '1aa96e33-fd44-4c0d-84fc-62fd9aedbc72',
    '3b0347ec-c5ab-459c-b6c2-ebb573282ceb',
    'dacb00da-6595-4b8a-aa3b-4b05643a2bac',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '11ceb2bf-9633-4f5a-9d08-e3f92f372161',
    'Volta Seed Fund',
    'Volta',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Volta invests in Technology companies at Seed stages.',
    '{"https://www.volta.ventures/locations/amsterdam-netherlands/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '8dfebc57-05e7-469a-ad12-bd408add516d',
    '71a82300-059c-49ab-a892-34ceabdfc8f6',
    '11ceb2bf-9633-4f5a-9d08-e3f92f372161',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '75cbf3d1-09e1-4a94-80b4-2655711e15b0',
    'Tincapital Seed Fund',
    'Tincapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Tincapital invests in Technology companies at Seed stages.',
    '{"https://www.tincapital.vc/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '92224619-a4d1-4e03-864f-3122dc42cdbd',
    'bb8b622d-ca05-4da0-8394-53199d2b292e',
    '75cbf3d1-09e1-4a94-80b4-2655711e15b0',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'd8319fd6-d21c-4604-9fae-b8512b6f4ccd',
    'Dsif Seed Fund',
    'Dsif',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Dsif invests in Technology companies at Seed stages.',
    '{"https://www.dsif.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '7fbb2db3-526e-437a-a7b7-4df41c296a60',
    'f380d824-b043-4a86-8f00-5d22698bb2f4',
    'd8319fd6-d21c-4604-9fae-b8512b6f4ccd',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'b843f2f8-cb20-4ffd-986b-fe30a5eebf77',
    'Solidventures Seed Fund',
    'Solidventures',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Solidventures invests in Technology companies at Seed stages.',
    '{"http://www.solidventures.vc/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'a395ba23-fcba-4d2c-a943-f7dbb7c4d399',
    '7c4c75c5-6464-4864-bc50-c5f6a9a1607b',
    'b843f2f8-cb20-4ffd-986b-fe30a5eebf77',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'd4ca8c8d-163b-4175-8a55-4fa03a69f582',
    'Newion Seed Fund',
    'Newion',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Newion invests in Technology companies at Seed stages.',
    '{"https://www.newion.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'a34d9259-e313-44a9-8f7c-a87ab3443d85',
    '11265652-7299-45ad-ad52-69d243b24a8e',
    'd4ca8c8d-163b-4175-8a55-4fa03a69f582',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'd3779ae0-9592-4aa9-9f5a-a640d8fb270b',
    'Keenventurepartners Seed Fund',
    'Keenventurepartners',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Keenventurepartners invests in Technology companies at Seed stages.',
    '{"http://keenventurepartners.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'ea6daaca-bd31-4484-a9bf-075ba613d145',
    '00a6257c-0800-46d2-ba19-fe0b4234b47e',
    'd3779ae0-9592-4aa9-9f5a-a640d8fb270b',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'a861a723-7634-425b-a8ca-e35734963851',
    'Hpegrowth Seed Fund',
    'Hpegrowth',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Hpegrowth invests in Technology companies at Seed stages.',
    '{"http://www.hpegrowth.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '08792957-f79d-4a1f-bab0-49d398d88e94',
    'c7291972-f41e-4c6c-86bd-ef2a38ee27cb',
    'a861a723-7634-425b-a8ca-e35734963851',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '4ab3e219-c5f5-4f06-8265-611fffdfb524',
    'Finchcapital Seed Fund',
    'Finchcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Finchcapital invests in Technology companies at Seed stages.',
    '{"http://www.finchcapital.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '5067decb-a635-42be-974d-386e274ba202',
    'adacfaae-d978-46ba-a4f1-1112d60d29ef',
    '4ab3e219-c5f5-4f06-8265-611fffdfb524',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '67e7c2e4-9524-4897-9874-62bbe49fac89',
    'Valuecreationcapital Seed Fund',
    'Valuecreationcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Valuecreationcapital invests in Technology companies at Seed stages.',
    '{"http://valuecreationcapital.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'ade79e41-39c7-4898-8756-ce57ebc0ccab',
    'a32902b6-04c0-46a0-9f6f-645bc57b311f',
    '67e7c2e4-9524-4897-9874-62bbe49fac89',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'ba0c5843-d0a8-4b9b-a30a-ab29f3b3e997',
    'Nlc Seed Fund',
    'Nlc',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Nlc invests in Technology companies at Seed stages.',
    '{"http://nlc.health/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '98329312-3e8a-4676-95b0-d44aeef3d212',
    '3c28ae57-87f1-4f3f-928a-7f49d2129a45',
    'ba0c5843-d0a8-4b9b-a30a-ab29f3b3e997',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '641ed216-4fb2-49ac-b3a3-e297115ebe15',
    'Dcventurecapitalpartners Seed Fund',
    'Dcventurecapitalpartners',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Dcventurecapitalpartners invests in Technology companies at Seed stages.',
    '{"http://www.dcventurecapitalpartners.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'd4e447ba-a40a-482c-ae7b-60e596dde123',
    '791a5270-9b9c-436e-a364-43ff6ebe279d',
    '641ed216-4fb2-49ac-b3a3-e297115ebe15',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '6f724c03-8eea-4ec0-a797-a14198b950f9',
    'Ecfg Seed Fund',
    'Ecfg',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Ecfg invests in Technology companies at Seed stages.',
    '{"http://www.ecfg.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '7a2ffce8-5837-46a9-8049-4680a7810e10',
    '605143e7-b6ba-4c34-886f-5b1be95355de',
    '6f724c03-8eea-4ec0-a797-a14198b950f9',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'b40eea80-7f6a-46de-a5be-9e8d04cbfe07',
    'Carbonequity Seed Fund',
    'Carbonequity',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Carbonequity invests in Technology companies at Seed stages.',
    '{"http://www.carbonequity.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '67ee33fe-d625-49c2-8f56-575d9f8ca1c0',
    '3b833a46-056a-4308-8657-3b5215f02065',
    'b40eea80-7f6a-46de-a5be-9e8d04cbfe07',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '7d8a0e09-d31f-49ec-9276-962e1051f43e',
    'Craftcapital Seed Fund',
    'Craftcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Craftcapital invests in Technology companies at Seed stages.',
    '{"https://www.craftcapital.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'd9b1f331-9d68-4678-9fc8-88b1e899bd21',
    '49ecf3d6-d7e4-4ea3-bb53-2003b1d459c1',
    '7d8a0e09-d31f-49ec-9276-962e1051f43e',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '85cbc4a2-7de7-4966-b492-8ce023c1adf8',
    'Anterracapital Seed Fund',
    'Anterracapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Anterracapital invests in Technology companies at Seed stages.',
    '{"http://www.anterracapital.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'fb23391f-e787-47f6-8787-37c25cba834e',
    'ee87bb30-baa7-4479-b2bb-713ffa05fde2',
    '85cbc4a2-7de7-4966-b492-8ce023c1adf8',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '0f99b4a6-9c5a-4b58-aaf0-f3b9f882f399',
    'Ventureiq Seed Fund',
    'Ventureiq',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Ventureiq invests in Technology companies at Seed stages.',
    '{"http://www.ventureiq.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '5b4f7dfa-c725-4984-81f8-51b3024d72ed',
    'f7542a88-6984-4c0f-b2f7-a0327214a2c0',
    '0f99b4a6-9c5a-4b58-aaf0-f3b9f882f399',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'c443a2b4-6beb-428a-a667-03b46579fd46',
    'Invest Nl Seed Fund',
    'Invest Nl',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Invest Nl invests in Technology companies at Seed stages.',
    '{"http://www.invest-nl.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '9a876bc6-6ccc-4d80-bc29-d51bdaeb6d9b',
    '93bd9dd4-3ba5-4f73-b44f-f17672e56553',
    'c443a2b4-6beb-428a-a667-03b46579fd46',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'efbe43fe-0b76-40bf-a9fc-4bd18f03548f',
    'Voccp Seed Fund',
    'Voccp',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Voccp invests in Technology companies at Seed stages.',
    '{"http://www.voccp.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '73831501-9df1-45e2-bf10-bd3bc6ab7074',
    '74c06e3c-bb20-4fa8-b8c9-6728a787d5d2',
    'efbe43fe-0b76-40bf-a9fc-4bd18f03548f',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '52a74b9c-3e50-4f02-9b6e-dee2d0f4d8e2',
    'Rivervp Seed Fund',
    'Rivervp',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Rivervp invests in Technology companies at Seed stages.',
    '{"https://rivervp.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'e69af830-0337-4abd-b6be-0c450b639e8e',
    '2b4e2360-73d4-4e53-9f78-76ff53edce51',
    '52a74b9c-3e50-4f02-9b6e-dee2d0f4d8e2',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '7ee82672-6f0b-462f-a619-12ea6de2e134',
    'Rotterdamportfund Seed Fund',
    'Rotterdamportfund',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Rotterdamportfund invests in Technology companies at Seed stages.',
    '{"http://www.rotterdamportfund.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '3716c818-ad6a-449e-bd50-60175be470ed',
    '4938443c-d869-43e4-9797-dc7d3cb2e768',
    '7ee82672-6f0b-462f-a619-12ea6de2e134',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '5471a498-4645-43b1-850e-abfe1b8874d5',
    'Rockstart Seed Fund',
    'Rockstart',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Rockstart invests in Technology companies at Seed stages.',
    '{"https://www.rockstart.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'e9f31566-bd16-45db-8178-4580699c6bf2',
    '83f09561-4b5f-4caa-9893-1086c2974c9f',
    '5471a498-4645-43b1-850e-abfe1b8874d5',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '43aa399b-541b-4c80-9242-725a8c4cb53d',
    'Nosuchventures Seed Fund',
    'Nosuchventures',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Nosuchventures invests in Technology companies at Seed stages.',
    '{"https://nosuchventures.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'b4d40ae4-f304-4343-85f8-ecd8275a863f',
    '21d777d2-1772-4d82-803e-cd41824f339f',
    '43aa399b-541b-4c80-9242-725a8c4cb53d',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'c622e4e3-0745-4180-b69e-0cbf57881ac1',
    'Bolsterinvestments Seed Fund',
    'Bolsterinvestments',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Bolsterinvestments invests in Technology companies at Seed stages.',
    '{"https://bolsterinvestments.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '2acbb739-9a18-4185-b73d-ec6a3b23d579',
    '2275b4e8-d095-4ae9-b3f7-8a985582cde9',
    'c622e4e3-0745-4180-b69e-0cbf57881ac1',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'd4633a82-ad32-4003-a17e-184a854fd089',
    'Forbion Seed Fund',
    'Forbion',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Forbion invests in Technology companies at Seed stages.',
    '{"http://www.forbion.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'bfd61481-a803-4427-b72b-26fbefc4ad6b',
    'f20aaaba-f7aa-46a7-8224-8f4d360bb1b0',
    'd4633a82-ad32-4003-a17e-184a854fd089',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'e7affc40-bed1-4be9-b6d2-271bde850f90',
    'Qapitalgroup Seed Fund',
    'Qapitalgroup',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Qapitalgroup invests in Technology companies at Seed stages.',
    '{"https://www.qapitalgroup.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '45f5feee-e81e-4213-9411-4fc5b0458f50',
    '10196ece-42e2-4008-8a02-ca2e860bf3ff',
    'e7affc40-bed1-4be9-b6d2-271bde850f90',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '762a26e7-46a5-44d2-806d-8163a43de038',
    'Connectedcapital Seed Fund',
    'Connectedcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Connectedcapital invests in Technology companies at Seed stages.',
    '{"http://www.connectedcapital.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '88ddd0b0-b14e-418f-9175-5ae9f9165dde',
    '1990644e-61a2-4136-9733-7179e42f5be9',
    '762a26e7-46a5-44d2-806d-8163a43de038',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '190ef16e-c7f3-4064-9615-37b46946e2d6',
    'Dealroom Seed Fund',
    'Dealroom',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Dealroom invests in Technology companies at Seed stages.',
    '{"https://dealroom.co/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '7774b877-598b-42cb-aa5e-0f88b2da5b41',
    '9b14235f-1c8b-427a-b3e7-9a58ca398ba7',
    '190ef16e-c7f3-4064-9615-37b46946e2d6',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '572adf67-6675-4c12-bae8-1d0195d23d11',
    'Conventcapital Seed Fund',
    'Conventcapital',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Conventcapital invests in Technology companies at Seed stages.',
    '{"http://www.conventcapital.nl/en/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'f4e14f31-aebd-4330-8e1e-7090e69612a9',
    '7782f0b9-3a25-454b-ab39-dfa6083398f5',
    '572adf67-6675-4c12-bae8-1d0195d23d11',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '21e068a9-4a68-45c1-b1d5-a731f47582d8',
    'Dutch Capital Partners Seed Fund',
    'Dutch Capital Partners',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Dutch Capital Partners invests in Technology companies at Seed stages.',
    '{"https://www.dutch-capital-partners.nl/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'be66bbfa-d0b0-4053-b0c1-8265d48c4d36',
    'c1e6210b-9730-4292-bc0f-f11c347d6edf',
    '21e068a9-4a68-45c1-b1d5-a731f47582d8',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '925a4b87-65fa-44ab-a7f6-ce8662e67b45',
    'Nofivetrees Seed Fund',
    'Nofivetrees',
    'Technology',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Nofivetrees invests in Technology companies at Seed stages.',
    '{"http://www.nofivetrees.com/"}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '5c286fe4-b229-46d0-adaa-9908772bf3a6',
    '1a8f1a72-1414-49c3-8366-1a0ef96168a6',
    '925a4b87-65fa-44ab-a7f6-ce8662e67b45',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'd0e0b04a-336a-4ad3-b4b3-4499fbb9a479',
    'venture capital-NL Seed Fund',
    'venture capital-NL',
    'Technology, Software, Consumer',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'venture capital-NL invests in Technology, Software, Consumer companies at Seed, Series A stages.',
    '{}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    'ba8970a6-85cf-4ac6-9797-5aad39309235',
    'a01fdf5e-de6f-4d9b-86d9-d45aa1c80634',
    'd0e0b04a-336a-4ad3-b4b3-4499fbb9a479',
    'provider'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    'eea00847-9323-4037-9489-24a33a7a7146',
    'Overview of Antler's Dutch Startup Portfolio Seed Fund',
    'Overview of Antler''s Dutch Startup Portfolio',
    'Technology, Software, Consumer',
    '100,000 - 1,000,000 EUR',
    100000,
    1000000,
    'Netherlands',
    'Overview of Antler''s Dutch Startup Portfolio invests in Technology, Software, Consumer companies at Seed, Series A stages.',
    '{}',
    'default',
    'Seed',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '39136744-01f5-4eb7-af6b-b12d84dbcf0f',
    '4c112edb-ff7b-454b-a245-46a71c805122',
    'eea00847-9323-4037-9489-24a33a7a7146',
    'provider'
)
ON CONFLICT DO NOTHING;

