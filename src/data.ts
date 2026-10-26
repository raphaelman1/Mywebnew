import { ServiceData, BlogPost, FAQItem } from './types';

export const SERVICES: ServiceData[] = [
  {
    id: 'heslb',
    titleEnglish: 'HESLB Loan Application',
    titleSwahili: 'Maombi ya Mkopo HESLB',
    shortDescSwahili: 'Mwongozo na orodha ya mahitaji ya kuomba mkopo wa chuo mkuu bila makosa yoyote.',
    shortDescEnglish: 'Essential checklist and complete guide to secure your Higher Education Student’s Loan.',
    purposeSwahili: 'Mkopo wa Elimu ya Juu hukusaidia kulipia ada ya chuo, chakula na malazi (boom), pamoja na vitabu. Mwongozo huu unakuhakikishia kuelewa kila hatua ili usikose mkopo kwa makosa madogo ya kiufundi.',
    purposeEnglish: 'The Higher Education Students’ Loans Board provides financial support for tuition fees, meals, accommodation (often known as Boom), and book allowance. This guide helps you navigate the OLAS portal correctly to avoid application rejection.',
    officialLink: 'https://olams.heslb.go.tz',
    linkText: 'Fungua Tovuti ya OLAMS (HESLB)',
    colorAccent: 'border-l-4 border-l-emerald-600',
    iconName: 'GraduationCap',
    requirements: [
      { id: 'h1', textSwahili: 'Namba ya Mtihani wa Kidato cha Nne (Form Four Index Number)', textEnglish: 'CSEE Form Four Index Number' },
      { id: 'h2', textSwahili: 'Cheti cha Kuzaliwa kilichohakikiwa na RITA (Verification Number)', textEnglish: 'Birth Certificate verified by RITA with verification code' },
      { id: 'h3', textSwahili: 'Namba ya NIDA ya mwombaji au ya mzazi (NIDA/NIN)', textEnglish: 'Applicant or Parent National ID Number (NIN)' },
      { id: 'h4', textSwahili: 'Barua ya mdhamini (Guarantor details) ikiwa na nakala ya kitambulisho chake', textEnglish: 'Guarantor signature and verified passport copy / ID copy' },
      { id: 'h5', textSwahili: 'Nyaraka ya kuthibitisha vifo vya wazazi (kama ni yatima - kutoka RITA)', textEnglish: 'Death certificates for deceased parents (if applicable, verified by RITA)' },
      { id: 'h6', textSwahili: 'Picha ndogo ya Pasipoti (Passport size) yenye mandhari meupe nyuma (white background)', textEnglish: 'Passport size photo with a clear white background' },
      { id: 'h7', textSwahili: 'Kujaza fomu ya maombi mtandaoni na kulipia ada rasmi (takribani Tsh 30,000 via GePG Control Number — thibitisha kwenye heslb.go.tz)', textEnglish: 'Online submission and official application fee (historically Tsh 30,000 via GePG Control Number — verify current guidelines on heslb.go.tz)' }
    ],
    steps: [
      {
        stepNumber: 1,
        titleSwahili: 'Kufungua Akaunti (SIPA)',
        titleEnglish: 'Create a SIPA Account',
        descriptionSwahili: 'Fungua mfumo wa SIPA kwenye tovuti ya HESLB ukitumia Namba yako ya Kidato cha Nne na mwaka uliomaliza.',
        descriptionEnglish: 'Sign up on the Student’s Information Portability Assistant (SIPA) using your Form Four index number.'
      },
      {
        stepNumber: 2,
        titleSwahili: 'Kuhakiki Vyeti RITA',
        titleEnglish: 'Verify Certificates via RITA',
        descriptionSwahili: 'Hakikisha cheti chako cha kuzaliwa tayari kimehakikiwa kupitia mfumo wa e-RITA ili upate namba maalum ya uhakiki.',
        descriptionEnglish: 'Ensure your birth certificate is verified on e-RITA to get back the official verification number required on OLAS.'
      },
      {
        stepNumber: 3,
        titleSwahili: 'Kujaza Taarifa Binafsi',
        titleEnglish: 'Enter Personal Details',
        descriptionSwahili: 'Jaza taarifa zako za shule, familia, na hali ya kijamii. Hakikisha majina yote yanafanana kabisa na cheti cha kuzaliwa na vyeti vya shule.',
        descriptionEnglish: 'Fill details about your primary and secondary education, family background, and social status. Ensure name spelling matches all other certificates.'
      },
      {
        stepNumber: 4,
        titleSwahili: 'Kuweka Wadhamini na Kulipa Ada',
        titleEnglish: 'Add Guarantors & Settle Fee',
        descriptionSwahili: 'Pakua fomu ya udhamini, saini kwa Mwanasheria/Mahakamani na mtendaji wa Serikali za Mitaa. Lipa Tsh 30,000 kwa Control Number utakayopewa.',
        descriptionEnglish: 'Download the guarantor sheet, get it signed by a local executive / advocate, and pay the Tsh 30,000 application fee using the generated GePG control number.'
      },
      {
        stepNumber: 5,
        titleSwahili: 'Kupakia Nyaraka na Kutuma',
        titleEnglish: 'Upload Documents and Submit',
        descriptionSwahili: 'Changanua (scan) na upakie nyaraka zote katika mfumo wa PDF. Pitia tena maombi yako kisha bonyeza SUBMIT. Usisahau kuhifadhi nakala ya fomu iliyokamilika!',
        descriptionEnglish: 'Scan all signed papers into clear PDF documents. Double check all data and hit SUBMIT. Save a PDF copy of the final application receipt.'
      }
    ],
    mistakesSwahili: [
      'Kutofautiana kwa majina kati ya cheti cha kuzaliwa, kitambulisho cha NIDA, na vyeti vya shule (mfano "Juma" na "Jumanne").',
      'Kuchanganua nyaraka kwa simu kijuujuu kiasi cha kufanya mandhari ya barua yasomeke kwa shida. Tumia "CamScanner" au mashine ya kuscan ofisini.',
      'Kutokugonga muhuri au saini ya Mtendaji wa Kijiji/Mtaa au Mahakama kwenye fomu za udhamini.',
      'Kusubiri hadi siku ya mwisho ambapo mtandao unajaa na kuwa mzito (server overload).',
      'Marafiki kutumia akaunti moja au barua pepe moja kupakia maombi yao.'
    ],
    mistakesEnglish: [
      'Misspelled names or mismatches across birth certificates, NIDA registers, and school transcripts.',
      'Uploading blurry, unreadable photos or scans of documents. Use dedicated scanner tools with light filters.',
      'Forgetting to secure official stamps from the local Ward/Village government or a commissioner for oaths.',
      'Waiting until the very last week when servers experience heavy traffic and crash.',
      'Sharing emails or phone numbers with other applicants. Each profile requires distinct contact details.'
    ],
    deadline: '2026-06-01'
  },
  {
    id: 'nida',
    titleEnglish: 'NIDA Identification Number',
    titleSwahili: 'Kupata Namba ya NIDA',
    shortDescSwahili: 'Jinsi ya kupata Namba yako ya Taifa (NIN) haraka mtandaoni au kwenye ofisi za wilaya.',
    shortDescEnglish: 'Quick steps to reference and pull your National ID Number (NIN) online without queuing.',
    purposeSwahili: 'Namba ya NIDA (NIN) ni takwa la lazima sasa ili kuomba Mkopo wa HESLB, kusajili kadi za simu, na kutuma maombi ya vyuo vikuu au pasi ya kusafiria.',
    purposeEnglish: 'The National ID Number (NIN) from NIDA is a mandatory element for your HESLB loan, SIM enrollment, university registration, and passport requests.',
    officialLink: 'https://services.nida.go.tz/eservice',
    linkText: 'Pakua Kitambulisho Chako (e-NIDA)',
    colorAccent: 'border-l-4 border-l-sky-550',
    iconName: 'Fingerprint',
    requirements: [
      { id: 'n1', textSwahili: 'Namba ya cheti cha kuzaliwa au maelezo kamili ya wazazi', textEnglish: 'Certified Birth Certificate registry number or parents profile details' },
      { id: 'n2', textSwahili: 'Namba ya faharasa ya Kidato cha Nne (CSEE Index Number)', textEnglish: 'Your O-Level Form Four Index Number' },
      { id: 'n3', textSwahili: 'Kadi au kadi ya kliniki ya utoto (inapohitajika ofisini)', textEnglish: 'Child vaccine card or school leaving certificate if visiting the office' },
      { id: 'n4', textSwahili: 'Nakala ya Kitambulisho cha Mzazi kimoja au vyote (NIDA ya Baba/Mama)', textEnglish: 'At least one Parent National ID card copy (Father or Mother)' }
    ],
    steps: [
      {
        stepNumber: 1,
        titleSwahili: 'Kutafuta Mtandaoni (Query Portal)',
        titleEnglish: 'Search Online on NIDA Portal',
        descriptionSwahili: 'Tembelea tovuti ya NIDA, bofya "Kujua Namba ya NIDA". Weka majina yako matatu, tarehe ya kuzaliwa, na jina kamili la mama kupata NIN ya bure.',
        descriptionEnglish: 'Go to NIDA e-portal, select "Get National ID Number". Provide your first, middle, and last name, birth date, and mother’s maiden name to lookup your NIN.'
      },
      {
        stepNumber: 2,
        titleSwahili: 'Uhakiki wa USSD ya Simu',
        titleEnglish: 'Check Mobile USSD',
        descriptionSwahili: 'Piga namba *152*00# ukiwa na laini yako iliyosajiliwa, chagua namba 3 (NIDA), kisha fuata maelekezo kuangalia namba yako kwenye skrini ya simu.',
        descriptionEnglish: 'Dial *152*00# from your phone, choose option 3 for NIDA, and input your primary particulars to quickly text your NIN back.'
      },
      {
        stepNumber: 3,
        titleSwahili: 'Kupakua Kitambulisho Kidogo (e-ID)',
        titleEnglish: 'Download Electronic ID Card',
        descriptionSwahili: 'Kama umepata Namba ya NIDA, fungua e-NIDA Portal ili kupakua nakala yenye picha na saini yako kwa urahisi kama faili la PDF la kuchapisha.',
        descriptionEnglish: 'If your number is found, log onto the official e-service web to download and export your soft-copy PDF ID containing your portrait and bar-code.'
      },
      {
        stepNumber: 4,
        titleSwahili: 'Kutengeneza barua kwa Wasio na Namba',
        titleEnglish: 'What to do if not registered',
        descriptionSwahili: 'Kama jina halionekani mtandaoni, tembelea Ofisi ya NIDA ya Wilaya iliyo karibu nawe ukiwa na nakala zako zote za vyeti vya shule na wazazi.',
        descriptionEnglish: 'If your search returns flatly empty, gather your O-level papers, parents ID copies, and visit the nearest municipal NIDA district desk for enrollment.'
      }
    ],
    mistakesSwahili: [
      'Kujaza jina la mama kinyume na lile lililosajiliwa mwanzo (kama mama jina lake lilibadilika au ana majina mawili).',
      'Kutumia majina ya utani au herufi fupi zisizofanana na cheti cha kuzaliwa.',
      'Kusafiri kwenda ofisi za mbali wakati NIDA ipo ngazi ya wilaya yako tu ya makazi au unaweza kuitafuta kwanza bure kwenye mtandao.'
    ],
    mistakesEnglish: [
      'Using maternal nicknames or alternative maiden spellings that mismatch earlier primary school records.',
      'Inserting decorative initials (e.g. "S.J. Mwakalindile") instead of the official spelling on the birth document.',
      'Rushing to national headquarters when local municipal halls handle all retrieval activities smoothly.'
    ]
  },
  {
    id: 'rita',
    titleEnglish: 'Birth Certificate - RITA',
    titleSwahili: 'Cheti cha Kuzaliwa - RITA',
    shortDescSwahili: 'Kuhakiki na kuandalia cheti cha kuzaliwa ambacho ndio msingi wa maombi ya mkopo na pasipoti.',
    shortDescEnglish: 'Verify or secure a certified Birth Certificate issued by the Registration Insolvency and Trusteeship Agency.',
    purposeSwahili: 'RITA ndio mdhamini mkuu wa uhalali wa uzazi. Bila barua ya uhakiki ya e-RITA, mfumo wa HESLB hautakubali cheti chako cha kuzaliwa kabisa.',
    purposeEnglish: 'RITA validates your authentic birth details. High school graduates applying for HESLB loans must submit verified birth certificates validated on the e-RITA server.',
    officialLink: 'https://e.rita.go.tz',
    linkText: 'Uhakiki au Maombi e-RITA',
    colorAccent: 'border-l-4 border-l-amber-500',
    iconName: 'FileBadge',
    requirements: [
      { id: 'r1', textSwahili: 'Kitabu au Kadi ya Kliniki ya utotoni yenye jina la mama na mtoto', textEnglish: 'Original childhood immunization card with mother-baby match' },
      { id: 'r2', textSwahili: 'Cheti cha sasa cha kuzaliwa (kama kimeandikwa kwa mkono ukitake cha digitali)', textEnglish: 'Current handwritten birth sheet or old registry papers' },
      { id: 'r3', textSwahili: 'Vitambulisho vya NIDA vya Baba na Mama', textEnglish: 'Copy of legal national identifiers / NIDA for both parents' },
      { id: 'r4', textSwahili: 'Ada rasmi ya uhakiki kupitia GePG (takribani Tsh 10,000 kwa uhakiki au Tsh 20,000 kwa cheti kipya — thibitisha kwenye rita.go.tz)', textEnglish: 'Official GePG fee (historically Tsh 10,000 for verification or Tsh 20,000 for new digital certificates — verify on rita.go.tz)' }
    ],
    steps: [
      {
        stepNumber: 1,
        titleSwahili: 'Kujiandikisha Kwenye Tovuti ya RITA',
        titleEnglish: 'Register on the e-RITA portal',
        descriptionSwahili: 'Fungua akaunti ya mwombaji kwenye e-RITA ukitumia barua pepe (email) na namba yako ya simu.',
        descriptionEnglish: 'Go to e-RITA platform, select applicant registration, and sign up with active phone and email handles.'
      },
      {
        stepNumber: 2,
        titleSwahili: 'Kuchagua Huduma Inayostahili',
        titleEnglish: 'Select the Appropriate Service',
        descriptionSwahili: 'Chagua "Verification of Birth Certificate" kama una cheti cha zamani tayari na unataka uhakiki wa mkopo, au chagua "Application for New Birth Certificate" kama huna kabisa.',
        descriptionEnglish: 'Choose "Verification" to certify an existing certificate for student loans, or select "New Application" if you never had a certificate before.'
      },
      {
        stepNumber: 3,
        titleSwahili: 'Kupakia Nyaraka (Upload Documents)',
        titleEnglish: 'Type Stats & Upload Scans',
        descriptionSwahili: 'Jaza maelezo ya sehemu uliyozaliwa na majina ya wazazi kisha pakia vyeti vya shule na kliniki ukiwa umeviscan vizuri kwa PDF.',
        descriptionEnglish: 'Key in birth hospital, district coordinates, and upload crisp PDFs of your education certificates and baby records.'
      },
      {
        stepNumber: 4,
        titleSwahili: 'Kupata Control Number na Kulipa',
        titleEnglish: 'Get Control Number & Pay',
        descriptionSwahili: 'Mfumo utakuzalishia GePG Control Number. Lipa kupitia M-Pesa, TigoPesa, AirtelMoney au benki. Usipolipa, maombi hayatafanyiwa kazi.',
        descriptionEnglish: 'The system issues a designated GePG control identifier. Make real-time mobile money payment to allow review to start.'
      },
      {
        stepNumber: 5,
        titleSwahili: 'Kupokea Barua ya Uhakiki',
        titleEnglish: 'Fetch Your Approved Letter',
        descriptionSwahili: 'Baada ya siku 3 hadi 7 za kazi, ingia tena kwenye tovuti na upakue "Verification Letter" yenye namba na QR code maalum utakayoijaza HESLB.',
        descriptionEnglish: 'In about 3-7 operational days, access your profile to fetch a certified PDF Validation Certificate containing the QR code code of entry.'
      }
    ],
    mistakesSwahili: [
      'Kupakia picha zenye kivuli au zisizosomeka (kadi ya kliniki isiyoleta herufi vizuri).',
      'Kuhakiki dakika za lala salama ambapo foleni ya maombi inakuwa kubwa sana e-RITA, na kuchelewesha matokeo yako.',
      'Kukosea namba za simu au barua pepe wakati wa usajili kiasi cha kutopata ujumbe wa mafanikio au namba ya usajili.'
    ],
    mistakesEnglish: [
      'Uploading dark, illegible phone camera snaps of vaccine records which get rejected instantly.',
      'Submitting applications too close to the HESLB cutoff date when thousands of other students overwhelm the reviewers.',
      'Entering misspelled email addresses and losing your system credentials or payment invoices.'
    ]
  },
  {
    id: 'tcu',
    titleEnglish: 'University Apps (TCU/TAMISEMI)',
    titleSwahili: 'Maombi ya Vyuo (TCU / TAMISEMI)',
    shortDescSwahili: 'Mwongozo wa kuchagua vyuo vikuu vizuri kulingana na ufaulu ulionao na jinsi ya kutumia Selform ya TAMISEMI.',
    shortDescEnglish: 'Navigate university select cut-offs, direct admission portals, and TAMISEMI placement.',
    purposeSwahili: 'TCU hudhibiti udahili wa vyuo vikuu kuhakikisha unachagua kozi inayouana na mchepuo na points zako. TAMISEMI inashughulikia upangaji wa kozi za stashahada (diploma) na astashahada (certificate) katika vyuo vya serikali.',
    purposeEnglish: 'The Tanzania Commission for Universities (TCU) coordinates academic admissions ensuring high school combinations align with target bachelor paths. TAMISEMI manages governmental certificates and educational diplomas.',
    officialLink: 'https://www.tcu.go.tz',
    linkText: 'Fungua Mwongozo wa TCU (Admissions)',
    colorAccent: 'border-l-4 border-l-black',
    iconName: 'Building2',
    requirements: [
      { id: 't1', textSwahili: 'Hati na Alama za matokeo ya Kidato cha Nne (ACSEE) na Kidato cha Sita (CSEE)', textEnglish: 'Verified high school Grade slip and index codes for O-level and A-level' },
      { id: 't2', textSwahili: 'Namba ya NIDA ama NIN', textEnglish: 'National NIN / Personal NIDA Number' },
      { id: 't3', textSwahili: 'Kufahamu pointi zako za Kidato cha Sita kulingana na TCU (Mchanganuo wa alama)', textEnglish: 'Evaluating exact combination points as specified by TCU standard entry schemes' },
      { id: 't4', textSwahili: 'Barua pepe yako rasmi yenye uwezo wa kufunguka (Active Email)', textEnglish: 'Secure personal email address with full access' }
    ],
    steps: [
      {
        stepNumber: 1,
        titleSwahili: 'Pitia Mwongozo wa TCU (Admission Guidebook)',
        titleEnglish: 'Review the TCU Guidebook',
        descriptionSwahili: 'Kila mwaka TCU wanatoa kijitabu cha mwongozo chenye orodha ya vyuo, kozi zote, pointi zinazohitajika (cut-off), na ada husika. Soma hapa kwanza!',
        descriptionEnglish: 'TCU publishes an annual Admission Guidebook detailing every single fully registered degree program, corresponding point demands, and cost guidelines.'
      },
      {
        stepNumber: 2,
        titleSwahili: 'Chagua Vyuo na Kozi unazozitaka (Kuweka Vipaumbele)',
        titleEnglish: 'Shortlist Courses Wisely',
        descriptionSwahili: 'Orodhesha kozi 3 hadi 5 unazozipenda ambazo ufaulu wako unaruhusu. Usiweke kipaumbele kozi ya points 8 ukiwa na points 4 tu.',
        descriptionEnglish: 'Choose fields matching your criteria. Never prioritize courses requiring 8 points if you have 4 or 5 points.'
      },
      {
        stepNumber: 3,
        titleSwahili: 'Tuma Maombi Kupitia Tovuti Husika ya Chuo (Direct Application)',
        titleEnglish: 'Apply Direct on University Portals',
        descriptionSwahili: 'Nenda moja kwa moja kwenye tovuti ya chuo unachokitaka (mfano UDSM, Mzumbe, SUA, ARU) na ufungue mfumo wa maombi (Online Admission System). TCU haipokei maombi yenyewe tena.',
        descriptionEnglish: 'Visit your target college website directly (like UDSM, SUA, MZUMBE) and launch applications via their dedicated admissions software.'
      },
      {
        stepNumber: 4,
        titleSwahili: 'Uhakiki na Kukubali Chaguo Moja (Multiple Admissions)',
        titleEnglish: 'Resolve Multiple Selections',
        descriptionSwahili: 'Kama ukichaguliwa vyuo zaidi ya kimoja, utatumiwa namba ya siri (confirmation code) kwa SMS au Email ili uthibitishe chuo kimoja tu unachopendelea kukisoma.',
        descriptionEnglish: 'If admitted into more than one university, you will receive a unique SMS/Email confirmation code to select and seal your singular final preference.'
      }
    ],
    mistakesSwahili: [
      'Kuchagua kozi bila kusoma mwongozo wa TCU na kujaza masomo ambayo hauna vigezo nayo (mfano kuomba Udaktari bila kemia/biolojia ya kutosha).',
      'Kuwaamini marafiki au watu wa internet cafe wakujazie bila kuwaangalia vizuri na kuishia kuchagua chuo usichokitaka.',
      'Kupoteza namba ya siri ya udahili na SMS za uthibitisho (hifadhi message yako vizuri!).',
      'Kudharau TAMISEMI Selform ikiwa bado hauna uhakika wa kudahiliwa moja kwa moja vyuo vikuu.'
    ],
    mistakesEnglish: [
      'Choosing programs blind without reviewing combining combinations (e.g., trying to study Medicine without sufficient points in chemistry and biology).',
      'Letting cyber cafe operators choose careers for you without supervising their keyboard entries.',
      'Deleting verification SMS texts and emails that hold active entry codes.',
      'Discarding the TAMISEMI priority forms alternative while staying unsure about competitive Bachelor qualifications.'
    ],
    deadline: '2026-06-02'
  },
  {
    id: 'jobs',
    titleEnglish: 'Job & Internship Applications',
    titleSwahili: 'Kazi na Mafunzo (Ajira Portal)',
    shortDescSwahili: 'Unda wasifu (CV) ushindani na jinsi ya kuomba kazi au internships kupitia mifumo ya Serikali na binafsi.',
    shortDescEnglish: 'Craft a professional profile to secure public internships or private junior projects.',
    purposeSwahili: 'Kupitia mifumo kama Sekretarieti ya Ajira (Ajira Portal) unaweza kupata mafunzo rasmi (internships) au kazi za kudumu mara tu unapomaliza masomo yako ya juu au kwa elimu yako ya sasa.',
    purposeEnglish: 'The Public Service Recruitment Secretariat (Ajira Portal) acts as the principal gate for national corporate vacancies, graduate apprenticeships, and municipal entry jobs.',
    officialLink: 'https://portal.ajira.go.tz',
    linkText: 'Tovuti ya Sekretarieti ya Ajira',
    colorAccent: 'border-l-4 border-l-blue-600',
    iconName: 'Briefcase',
    requirements: [
      { id: 'j1', textSwahili: 'Wasifu Binafsi uliotayarishwa kitaalamu (Professional PDF CV)', textEnglish: 'A highly structured, descriptive PDF CV' },
      { id: 'j2', textSwahili: 'Vyeti vya Kitaaluma vikiwa vimeskaniwa (Kidato cha 4, 6 na vinginevyo)', textEnglish: 'Scanned digital copies of CSEE, ACSEE, and related training achievements' },
      { id: 'j3', textSwahili: 'Namba ya Kitambulisho cha Taifa (NIDA)', textEnglish: 'Valid National ID Number (NINA)' },
      { id: 'j4', textSwahili: 'Barua ya maombi ya kazi kulingana na nafasi husika (Cover Letter)', textEnglish: 'A professionally focused application draft or Cover Letter' }
    ],
    steps: [
      {
        stepNumber: 1,
        titleSwahili: 'Kuandaa Wasifu Safi (CV)',
        titleEnglish: 'Build a Polished Clean CV',
        descriptionSwahili: 'Unda CV isiyozidi kurasa mbili. Jumuisha masomo uliyosoma, miradi ndogo, na uzoefu wa uongozi au klabu mbalimbali za shule au mitaani.',
        descriptionEnglish: 'Draft a clean CV spanning max 2 pages. List high school leadership roles, volunteer clubs, and project milestones.'
      },
      {
        stepNumber: 2,
        titleSwahili: 'Kujiandikisha Kwenye Portal ya Ajira',
        titleEnglish: 'Create an Ajira Portal Account',
        descriptionSwahili: 'Fungua akaunti yako, jaza kila sehemu: Personal Info, Contact, Education, Language, na Referees. Usiache sehemu wazi.',
        descriptionEnglish: 'Register on the portal, fully filling out personal details, standard education tracks, and referencing verified instructors.'
      },
      {
        stepNumber: 3,
        titleSwahili: 'Kupakia Vyeti vyote Rasmi',
        titleEnglish: 'Upload Official Certificates',
        descriptionSwahili: 'Pakia vyeti vyako halisi, kamwe usipakie nakala ya picha tu ikiwa haina muhuri. Mfumo unahitaji PDF yenye ubora wa hali ya juu.',
        descriptionEnglish: 'Attach your formal transcript papers. Upload legible PDFs rather than camera-skewed crops of original documents.'
      },
      {
        stepNumber: 4,
        titleSwahili: 'Tafuta Nafasi zinazolingana na Utume Maombi',
        titleEnglish: 'Search Roles & Launch Applicaton',
        descriptionSwahili: 'Pitia sehemu ya "Vacancies", chagua nafasi za ufundi, usaidizi, au internships unazokidhi vigezo vyake kisha bonyeza kitufe cha Apply.',
        descriptionEnglish: 'Navigate the live vacancies tab, identify prospective technical/intern roles matching your background and hit apply.'
      }
    ],
    mistakesSwahili: [
      'Kutumia barua pepe za utani au zisizo za kitaalamu (mfano "coolboy99@gmail.com" au "babygirltz@gmail.com"). Tumia rasmi: majina yako.',
      'Kupakia fomu ya matokeo ya mtandaoni (Result slip) ya simu badala ya cheti rasmi cha NECTA ikishatoka.',
      'Kutoweka wadhamini (referees) sahihi na wenye namba za simu zinazobofika au wasio wepesi kujibu barua pepe.'
    ],
    mistakesEnglish: [
      'Applying using street email handles like "superstarbaby@yahoo.com". Use clean, standard setups (e.g. "samuel.john@gmail.com").',
      'Uploading online result-slip captures long after formal NECTA certificates have been released.',
      'Stating dormant referees who do not respond to inquiries from prospective vetting agents.'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    titleSwahili: 'Matokeo ya Kidato cha Sita Yametoka! Nini Kifuate Sasa hivi?',
    titleEnglish: 'ACSEE Form Six Results Released! What is Your Next Priority?',
    date: 'May 24, 2026',
    category: 'General',
    contentSwahili: 'Hongera sana kwa kidato cha sita wote waliomaliza vizuri mitihani yao! Hatua inayofuata sasa hivi kabla hujawaza hata chuo ni kuhakikisha unatafuta namba yako ya NIDA na kuangalia kama cheti chako cha kuzaliwa kina majina yanayofanana sawa kabisa na matokeo yako ya Kidato cha nne na sita kabla HESLB hawajafungua mfumo rasmi. Kaa mkao wa kula na usome kila mwongozo hapa!',
    contentEnglish: 'Congratulations to all Form Six candidates on completing their exams! The absolute priority before rushing to apply for universities is ensuring your NIDA registration is active and confirming your birth certificate spelling matches your secondary school names precisely. Do not postpone this preparatory step.',
    author: 'Brother Raphael (Kaka Mkuu)',
    readTime: 'Dakika 4'
  },
  {
    id: 'b2',
    titleSwahili: 'HESLB Yafungua Mfumo: Mambo 3 Muhimu Yakupasa Kuzingatia Mapema',
    titleEnglish: 'HESLB Portal Launched: 3 Crucial Mistakes to Sidestep Today',
    date: 'May 26, 2026',
    category: 'HESLB',
    contentSwahili: 'Hatimaye bodi ya mikopo (HESLB) imefungua rasmi milango ya kuanza kutuma maombi ya mkopo mtandaoni. Kumbuka, mkopo hauji hivi hivi! Jambo la kwanza, hakikisha unatumia cheti cha RITA kilichohakikiwa kidigitali. Jambo la pili, pakia nyaraka zenye ubora mzuri zikitumia kivuli kizuri. Jambo la tatu ni kupata wadhamini ambao wana sifa stahiki na saini zao zitathibitishwa na viongozi wa kijiji au mwanasheria wa serikalini.',
    contentEnglish: 'The Higher Education Students’ Loans Board has officially opened its web window. Remember, securing a loan requires attention to detail. First, always submit digitalized certification from RITA. Second, avoid uploading low-contrast mobile camera photos. Lastly, fetch a legal guarantor registered on the public database.',
    author: 'Brother Raphael (Kaka Mkuu)',
    readTime: 'Dakika 6'
  },
  {
    id: 'b3',
    titleSwahili: 'Mfumo Mpya wa TAMISEMI Selform: Hatua kwa Hatua upate Chuo',
    titleEnglish: 'Understanding the TAMISEMI Selform System: Complete Guide',
    date: 'May 20, 2026',
    category: 'TCU',
    contentSwahili: 'Je unafahamu kuwa ulikosea kujaza Selform shuleni unaweza kubadilisha sasa hivi kupitia mfumo mpya wa TAMISEMI? Ingia kwenye portal ubadilishe kozi za diploma na vipaumbele kabla ya upangaji rasmi wa vyuo vya ualimu, afya na ufundi haujafanyika mwisho wa mwezi huu.',
    contentEnglish: 'Did you know you can still modify your Selform courses from high school on the new TAMISEMI web portal? Log into the platform to update your diploma preferences before allocation results for vocational, health, and teacher colleges are locked next month.',
    author: 'Brother Raphael (Kaka Mkuu)',
    readTime: 'Dakika 5'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    questionSwahili: 'Je kama cheti changu cha kuzaliwa hakina namba ya RITA nafanyaje?',
    questionEnglish: 'What should I do if my birth certificate does not have a RITA number?',
    answerSwahili: 'Unapaswa kuingia kwenye mfumo wa e-RITA na kuomba uhakiki (Verification) au kuomba cheti kipya cha kisasa ambacho kitatoka na namba na QR code zote muhimu inayokubalika na HESLB.',
    answerEnglish: 'You need to create an account on the e-RITA server and apply for certificate legalization or register for a brand new digital certificate with a verification number.',
    category: 'RITA',
    views: 1250,
    addedDate: '2026-05-10'
  },
  {
    id: 'f2',
    questionSwahili: 'Nilipoteza cheti cha Kidato cha Nne (NECTA) lakini matokeo ninayo, je ninaweza kuomba mkopo au chuo?',
    questionEnglish: 'I lost my original Form Four NECTA card but have results. Can I apply for loans and college?',
    answerSwahili: 'HESLB na vyuo havipokei fomu za matokeo tu zilizochapishwa. Lazima uombe "Letter of Confirmation of Results" kutoka NECTA ili kitumike kama mbadala sahihi wa kisheria.',
    answerEnglish: 'No, printouts or simple results slips are not accepted as permanent proofs. You must apply for an official Confirmation of Results Letter directly from NECTA as a legal substitute.',
    category: 'TCU / HESLB',
    views: 1820,
    addedDate: '2026-05-12'
  },
  {
    id: 'f3',
    questionSwahili: 'Nimepata Namba ya NIDA (NIN) lakini sijapewa kitambulisho halisi cha plastiki, je naweza kuomba mkopo?',
    questionEnglish: 'I got my NIDA Number (NIN) but no physical plastic card. Can I request a loan?',
    answerSwahili: 'Ndiyo kabisa! Namba ya tarakimu 20 ya NIN inatosha kabisa kujaza fomu zote. Huitaji kitambulisho cha plastiki kukamilisha usajili wako mtandaoni.',
    answerEnglish: 'Yes, absolutely! The 20-digit National Identification Number is the legally required parameter. You do not need to hold physical plastic cards to complete registration.',
    category: 'NIDA',
    views: 2450,
    addedDate: '2026-05-18'
  },
  {
    id: 'f4',
    questionSwahili: 'Inachukua siku ngapi kupata majibu ya uhakiki wa cheti RITA?',
    questionEnglish: 'How long does e-RITA take to certify/verify a birth document?',
    answerSwahili: 'Katika vipindi vya kawaida huchukua takribani siku 2 hadi 5 za kazi baada ya kulipia ada rasmi ya GePG. Hata hivyo, wakati wa msimu wa maombi maelfu ya wanafunzi huwasilisha maombi, hivyo inashauriwa kuanza mapema.',
    answerEnglish: 'Under standard conditions, verification typically takes between 2 to 5 business days after paying the GePG invoice. However, during peak application months delays may occur, so applicants are advised to initiate early.',
    category: 'RITA',
    views: 940,
    addedDate: '2026-05-22'
  },
  {
    id: 'f5',
    questionSwahili: 'Boom (Malazi na Chakula ya HESLB) ni kiasi gani kwa siku chuoni?',
    questionEnglish: 'How much is the HESLB meal & accommodation (boom) allowance per day?',
    answerSwahili: 'Kiasi cha posho ya kujikimu (Boom) hupangwa na serikali na Bodi ya Mikopo kwa mujibu wa bajeti na mwongozo wa mwaka husika wa masomo (kwa miaka ya hivi karibuni kiwango kimekuwa takribani Tsh 10,000 kwa siku ya masomo). Rejea mwongozo rasmi wa HESLB wa mwaka wako.',
    answerEnglish: 'Meal and accommodation allocations (Boom) are stipulated annually by HESLB based on government appropriations (recent academic schedules provided approximately Tsh 10,000 per academic day for qualified students). Always consult the current year HESLB guidelines at heslb.go.tz.',
    category: 'HESLB',
    views: 3120,
    addedDate: '2026-05-25'
  },
  {
    id: 'f6',
    questionSwahili: 'Je, mwanafunzi mwenye ufaulu wa Stashahada (Diploma) anahitaji cheti cha kidato cha sita kuomba mkopo?',
    questionEnglish: 'Does a Diploma graduate applicant require high school ACSEE certificate on HESLB?',
    answerSwahili: 'Hapana. Waombaji wa diploma (Direct/Equivalent entry) wanatumia namba ya mtihani wa diploma pamoja na namba ya kidato cha nne badala ya cheti cha kidato cha sita.',
    answerEnglish: 'No. Diploma entries register using their official tertiary award registration number alongside their primary Form Four O-Level records is sufficient.',
    category: 'TCU / HESLB',
    views: 1100,
    addedDate: '2026-05-26'
  }
];
