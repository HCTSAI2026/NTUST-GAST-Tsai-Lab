(() => {
  'use strict';

  const STORAGE_KEY = 'hct-lab-language';
  const originalText = new WeakMap();
  const originalTitle = document.title;

  const titleZh = {
    'Hsieh-Chih Tsai Research Group': '生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Profile': '個人資料 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Research': '研究方向 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Publications | Hsieh-Chih Tsai Research Group': '學術著作 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Members | Hsieh-Chih Tsai Research Group': '團隊成員 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Facilities | Hsieh-Chih Tsai Research Group': '儀器設備 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊',
    'Contact | Hsieh-Chih Tsai Research Group': '聯絡資訊 | 生醫高分子與光電薄膜實驗室-蔡協致教授團隊'
  };

  const pairs = [
    ['Graduate Institute of Applied Science and Technology & Advanced Membrane Materials Research Center', '應用科技研究所暨先進薄膜材料研究中心'],
    ['National Taiwan University of Science and Technology', '國立臺灣科技大學'],
    ['Hsieh-Chih Tsai Research Group', '生醫高分子與光電薄膜實驗室-蔡協致教授團隊'],

    ['We develop functional and porous polymer systems—including smart hydrogels, micro- and nanoparticles, and COF/COP-based materials—for localized drug delivery, theranostics, tissue repair, bioseparation, and wearable bioelectronics. In parallel, we engineer ion-conductive and selective membranes for fuel cells, redox-flow batteries, electrolysis, and advanced separation technologies.', '本研究團隊開發功能性與多孔高分子系統，包括智慧型水膠、微米／奈米粒子及 COF/COP 材料，應用於局部藥物傳輸、診療整合、組織修復、生物分離與穿戴式生醫電子。同時，我們亦開發具離子傳導與選擇性的薄膜，用於燃料電池、氧化還原液流電池、電解與先進分離技術。'],
    ['Functional Polymers, Hydrogels & Advanced Membranes', '功能性高分子、水膠與先進薄膜'],
    ['TAIWAN TECH · GIAST', '臺灣科技大學 · 應用科技研究所'],
    ['Explore Research', '了解研究方向'],
    ['Professor Profile', '教授簡介'],
    ['Research Highlights', '研究亮點'],
    ['Sprayable Thermosensitive Hydrogels', '可噴塗熱敏型水膠'],
    ['Minimally invasive hydrogel systems for tissue coverage, anti-adhesion and hemostatic applications.', '適用於組織覆蓋、防沾黏與止血之微創水膠系統。'],
    ['Hydrogel & COF Drug Delivery Systems', '水膠與 COF 藥物傳輸系統'],
    ['Localized and controlled delivery platforms integrating smart hydrogels with porous COF-based materials.', '整合智慧型水膠與多孔 COF 材料之局部與控制釋放平台。'],
    ['COF Ionic Membranes', 'COF 離子傳輸薄膜'],
    ['Ordered ion-transport pathways for energy conversion and biomedical sensing.', '利用有序離子傳輸通道進行能源轉換與生醫感測。'],
    ['STUDENT ACHIEVEMENTS', '學生成就'],
    ['Student Honors & Awards · 2021–2025', '學生榮譽與獎項 · 2021–2025'],
    ['Recent recognitions received by graduate students of the Hsieh-Chih Tsai Research Group at national and international conferences and academic competitions.', '本研究團隊研究生近年於國內外研討會與學術競賽獲得之重要獎項與肯定。'],
    ['Student Awards', '學生獎項'],
    ['Student Award', '學生獎項'],
    ['Excellent Poster Paper Award', '優秀海報論文獎'],
    ['SYIS Poster Award', 'SYIS 海報獎'],
    ['Best Poster Paper Award', '最佳海報論文獎'],
    ['Outstanding Young Scholar Award', '優秀青年學者獎'],
    ['Bronze Poster Award', '海報銅獎'],
    ['Excellent Poster Presentation Award', '優秀海報發表獎'],
    ['Merit Oral Presentation Award', '口頭發表優良獎'],
    ['Excellence Award for Poster Presentation', '海報發表優等獎'],
    ['Outstanding Student Paper Award', '優秀學生論文獎'],
    ['Lab & Collaboration', '實驗室與合作交流'],
    ['TMU–Spain collaborative project', '臺北醫學大學－西班牙合作計畫'],
    ['International research collaboration', '國際研究合作'],
    ['Academic exchange with international collaborators', '與國際合作夥伴學術交流'],

    ['Research Areas', '研究領域'],
    ['Functional Polymer', '功能性高分子'],
    ['Micro and Nanoparticles', '微米與奈米粒子'],
    ['Polymeric Hydrogel', '高分子水膠'],
    ['Ionic Membrane', '離子傳輸膜'],
    ['Photo-resistance Film', '光阻薄膜'],
    ['Education', '學歷'],
    ['Ph.D. in Chemical Engineering, National Tsing Hua University (2002.09–2007.07)', '國立清華大學 化學工程博士（2002.09–2007.07）'],
    ['M.S. in Chemical Engineering, Tunghai University (2000.09–2002.07)', '東海大學 化學工程碩士（2000.09–2002.07）'],
    ['B.S. in Chemical Engineering, Tunghai University (1996.09–2000.06)', '東海大學 化學工程學士（1996.09–2000.06）'],
    ['Current Roles', '現任職務'],
    ['Professor and Chairman, Graduate Institute of Applied Science and Technology, Taiwan Tech', '教授兼所長，國立臺灣科技大學應用科技研究所'],
    ['Director, Advanced Membrane Materials Center, Taiwan Tech', '主任，國立臺灣科技大學先進薄膜材料研究中心'],
    ['Professional Appointments', '專業經歷'],
    ['Director, Advanced Membrane Materials Center, National Taiwan University of Science and Technology', '主任，國立臺灣科技大學先進薄膜材料研究中心'],
    ['Chairman, Graduate Institute of Applied Science and Technology, National Taiwan University of Science and Technology', '所長，國立臺灣科技大學應用科技研究所'],
    ['Professor, Graduate Institute of Applied Science and Technology, National Taiwan University of Science and Technology', '教授，國立臺灣科技大學應用科技研究所'],
    ['Associate Professor, Graduate Institute of Applied Science and Technology, National Taiwan University of Science and Technology', '副教授，國立臺灣科技大學應用科技研究所'],
    ['Assistant Professor, Graduate Institute of Applied Science and Technology, National Taiwan University of Science and Technology', '助理教授，國立臺灣科技大學應用科技研究所'],
    ['Postdoctoral Researcher, Biomedical Engineering Center, National Tsing Hua University', '博士後研究員，國立清華大學生醫工程中心'],
    ['Visiting Researcher, Graduate School of Medicine, The University of Tokyo', '訪問研究員，東京大學醫學系研究科'],
    ['Honors & Awards', '榮譽與獎項'],
    ['2020 Outstanding Research Award, National Taiwan University of Science and Technology', '2020 國立臺灣科技大學傑出研究獎'],
    ['2020 Excellent Teaching Award, National Taiwan University of Science and Technology', '2020 國立臺灣科技大學教學優良獎'],
    ['2022 Excellent Research Award, National Taiwan University of Science and Technology', '2022 國立臺灣科技大學研究優良獎'],
    ['2024 Excellent Research Award, National Taiwan University of Science and Technology', '2024 國立臺灣科技大學研究優良獎'],
    ['2026 Excellent Research Award, National Taiwan University of Science and Technology', '2026 國立臺灣科技大學研究優良獎'],
    ['Research Profiles', '研究者資訊'],
    ['View external scientist profile and research performance information', '查看外部研究者檔案與研究表現資訊'],
    ['Research Recognition', '研究榮譽'],
    ['TopSciNet Scientist Profile · Click to view the full profile', 'TopSciNet Scientist Profile · 點擊查看完整資料'],
    ['Professor & Chairman, Graduate Institute of Applied Science and Technology', '教授兼所長，應用科技研究所'],

    ['RESEARCH THEMES', '研究主題'],
    ['Wearable ECG Hydrogel Nanocomposites', '穿戴式 ECG 水膠奈米複合材料'],
    ['Soft, skin-compatible conductive hydrogel nanocomposites for stable ECG monitoring, long-term attachment and flexible electronics.', '開發柔軟且具皮膚相容性的導電水膠奈米複合材料，用於穩定 ECG 監測、長時間貼附與柔性電子。'],
    ['Thermal-sensitive sprayable hydrogel systems for minimally invasive application, postoperative anti-adhesion barriers and hemostatic coverage.', '開發熱敏型可噴塗水膠系統，用於微創施作、術後防沾黏屏障與止血覆蓋。'],
    ['Integrated hydrogel and covalent organic framework platforms for localized delivery, controlled release and advanced biomedical applications.', '整合水膠與共價有機骨架材料，建構局部傳輸、控制釋放與先進生醫應用平台。'],
    ['Microbeads for Bioseparation & Detection', '生物分離與檢測用微球'],
    ['Functional microbead platforms for selective capture and recovery of nanoscale biological targets from complex samples.', '建立功能性微球平台，用於複雜樣品中奈米尺度生物標的之選擇性捕捉與回收。'],
    ['COF-Integrated Ionic Membranes', 'COF 整合型離子薄膜'],
    ['COF-integrated ionic membranes for controlled ion transport, energy, separation and sensing systems.', '開發 COF 整合型離子薄膜，用於可控離子傳輸、能源、分離與感測系統。'],
    ['Nano-/Micromaterial Modification for Polymer Compatibility', '提升高分子相容性的奈米／微米材料改質'],
    ['Surface modification of nano- and micromaterials to improve dispersion and interfacial compatibility within polymer matrices and functional composite systems.', '藉由奈米與微米材料表面改質，提升其在高分子基材與功能性複合材料中的分散性與界面相容性。'],

    ['RECENT PUBLICATIONS · 2022–2026', '近期學術著作 · 2022–2026'],
    ['73 journal articles from the most recent five-year period are listed below, grouped by publication year.', '以下列出近五年共 73 篇期刊論文，並依出版年度分類。'],
    ['View Scopus Profile', '查看 Scopus 個人檔案'],
    ['Articles', '篇論文'],
    ['Five-year period', '近五年'],
    ['Scopus Author ID', 'Scopus 作者 ID'],
    ["Recent publications are presented from the laboratory's curated publication list. The Scopus profile link is provided for the complete indexed record.", '近期論文依本實驗室整理之著作清單呈現；完整索引紀錄請參閱 Scopus 個人檔案。'],

    ['OUR TEAM', '研究團隊'],
    ['Current members of the Hsieh-Chih Tsai Research Group at National Taiwan University of Science and Technology.', '國立臺灣科技大學蔡協致研究團隊現任成員。'],
    ['LEADERSHIP & RESEARCH STAFF', '實驗室主持人與研究人員'],
    ['Principal Investigator & Postdoctoral Researcher', '主持人與博士後研究員'],
    ['Principal Investigator', '主持人'],
    ['View Professor Profile →', '查看教授簡介 →'],
    ['Postdoctoral Researcher', '博士後研究員'],
    ['DOCTORAL PROGRAM', '博士班'],
    ['Ph.D. Students', '博士班學生'],
    ['INTERNATIONAL EXCHANGE', '國際交流'],
    ['Exchange Students', '交換／研習學生'],
    ['Internship Ph.D. Student', '博士班研習生'],
    ["MASTER'S PROGRAM", '碩士班'],
    ["Master's Students", '碩士班學生'],
    ['LAB LIFE', '實驗室生活'],
    ['Research Group · 2024', '研究團隊 · 2024'],
    ['Research Group · 2026', '研究團隊 · 2026'],
    ['GLOBAL CONNECTIONS', '國際合作'],
    ['International Collaboration & Academic Exchange', '國際合作與學術交流'],
    ['Academic exchange with visiting researchers', '與訪問研究人員學術交流'],

    ['LABORATORY CAPABILITIES', '實驗室研究量能'],
    ['Facilities & Instruments', '實驗室設備與儀器'],
    ['Our laboratory integrates particle and surface characterization, optical spectroscopy, chromatographic analysis, rheology, and cell-based biomedical instrumentation to support research in functional polymers, hydrogels, particles, membranes, biomaterials, and drug-delivery systems.', '本實驗室整合粒徑與表面分析、光譜分析、層析分析、流變量測及細胞生醫儀器，以支援功能性高分子、水膠、粒子、薄膜、生醫材料與藥物傳輸系統之研究。'],
    ['Particle & Surface Characterization', '粒徑與表面特性分析'],
    ['Dynamic Light Scattering Analyzer', '動態光散射分析儀'],
    ['Particle-size and colloidal characterization for nanoparticles, polymer assemblies, micelles, and microspheres.', '用於奈米粒子、高分子組裝體、微胞與微球之粒徑及膠體特性分析。'],
    ['Contact Angle Analyzer', '接觸角分析儀'],
    ['Surface wettability and interfacial characterization for membranes, coatings, polymer films, and functional surfaces.', '用於薄膜、塗層、高分子膜與功能性表面之潤濕性及界面特性分析。'],
    ['Spectroscopy & Optical Analysis', '光譜與光學分析'],
    ['Spectrofluorometer', '螢光光譜儀'],
    ['Fluorescence excitation and emission measurements for probes, nanoparticles, biomaterials, and drug-delivery studies.', '用於探針、奈米粒子、生醫材料與藥物傳輸研究之螢光激發與放射量測。'],
    ['Raman Spectrometer', '拉曼光譜儀'],
    ['Raman spectroscopy and chemical mapping for polymers, membranes, particles, composites, and functional materials.', '用於高分子、薄膜、粒子、複合材料與功能性材料之拉曼光譜與化學映射分析。'],
    ['UV–Visible Spectrophotometer', '紫外－可見光分光光度計'],
    ['Absorbance and optical characterization for polymers, nanoparticles, drug formulations, and solution-based assays.', '用於高分子、奈米粒子、藥物配方與溶液分析之吸光度及光學特性量測。'],
    ['Chromatography & Separation', '層析與分離分析'],
    ['Chromatographic Analysis System', '層析分析系統'],
    ['Automated chromatographic platform for polymer and formulation analysis, including oil-phase GPC-related workflows.', '自動化層析平台，用於高分子與配方分析，包括油相 GPC 相關流程。'],
    ['High-Performance Liquid Chromatography', '高效液相層析儀'],
    ['Separation and quantitative analysis of small molecules, drugs, degradation products, and formulation components.', '用於小分子、藥物、降解產物與配方成分之分離及定量分析。'],
    ['Rheology & Material Characterization', '流變與材料特性分析'],
    ['Rheometer', '流變儀'],
    ['Viscoelasticity, flow behavior, gelation, and temperature-dependent rheological characterization of hydrogels and polymers.', '用於水膠與高分子之黏彈性、流動行為、凝膠化及溫度依賴流變特性分析。'],
    ['Cell Culture & Biomedical Instruments', '細胞培養與生醫儀器'],
    ['ELISA Microplate Reader', 'ELISA 微量盤讀取儀'],
    ['Microplate-based absorbance and fluorescence measurements for ELISA, cell viability assays, protein quantification, and other cell-based biomedical experiments.', '用於 ELISA、細胞存活率、蛋白質定量及其他細胞生醫實驗之微量盤吸光與螢光量測。'],
    ['Inverted Fluorescence Microscope', '倒立式螢光顯微鏡'],
    ['Fluorescence imaging for cell morphology, biomaterial interfaces, cellular uptake, localization studies, and fluorescently labeled samples.', '用於細胞形態、生醫材料界面、細胞攝取、定位研究及螢光標記樣品之影像觀察。'],

    ['Professor Office', '教授辦公室'],
    ['Student Space', '學生空間'],
    ['Student Lounge 1', '學生休息室 1'],
    ['Student Lounge 2', '學生休息室 2'],
    ['Location Map', '位置圖'],
    ['The map highlights the main locations of the research group on the Taiwan Tech campus.', '本地圖標示研究團隊在臺科大校園內的主要位置。'],
    ['are marked as Location 1, and', '標示為位置 1，'],
    ['is marked as Location 2.', '標示為位置 2。'],
    ['Open Taiwan Tech in Google Maps', '在 Google 地圖開啟臺科大'],
    ['Location 1', '位置 1'],
    ['Location 2', '位置 2'],
    ['Prof. Office / Student Lounge 1', '教授辦公室 / 學生休息室 1'],

    ['HOME', '首頁'],
    ['PROFILE', '個人資料'],
    ['RESEARCH', '研究方向'],
    ['PUBLICATIONS', '學術著作'],
    ['MEMBERS', '團隊成員'],
    ['FACILITIES', '儀器設備'],
    ['CONTACT', '聯絡資訊'],
    ['Publications', '學術著作'],
    ['Members', '團隊成員'],
    ['Research Group', '研究團隊'],
    ['Contact', '聯絡資訊'],
    ['Email:', '電子郵件：'],
    ['Tel:', '電話：'],
    ['Office:', '辦公室：'],
    ['Room:', '房間：'],
    ['ext.', '分機'],
    ["Master's Student", '碩士班學生'],
    ['Ph.D. Student', '博士班學生']
  ].sort((a, b) => b[0].length - a[0].length);

  function shouldSkip(node) {
    const el = node.parentElement;
    if (!el) return true;
    return Boolean(el.closest('script, style, code, pre, .lang-switch, .citation-text, .instrument-model'));
  }

  function zhText(text) {
    let output = text;
    for (const [en, zh] of pairs) {
      if (output.includes(en)) output = output.split(en).join(zh);
    }
    output = output
      .replace(/\b(\d+) students\b/g, '$1 位學生')
      .replace(/\b1 student\b/g, '1 位學生')
      .replace(/\b(\d+) members\b/g, '$1 位成員')
      .replace(/\b1 member\b/g, '1 位成員')
      .replace(/\b(\d+) instruments\b/g, '$1 項儀器')
      .replace(/\b1 instrument\b/g, '1 項儀器')
      .replace(/\b(\d+) articles\b/g, '$1 篇論文')
      .replace(/\b1 article\b/g, '1 篇論文');
    return output;
  }

  function applyLanguage(lang) {
    const isZh = lang === 'zh';
    document.documentElement.lang = isZh ? 'zh-Hant' : 'en';
    document.title = isZh ? (titleZh[originalTitle] || originalTitle) : originalTitle;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      if (shouldSkip(node)) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      node.nodeValue = isZh ? zhText(source) : source;
    }

    const yearNav = document.querySelector('.year-nav');
    if (yearNav) yearNav.setAttribute('aria-label', isZh ? '出版年度' : 'Publication years');

    document.querySelectorAll('.lang-switch button').forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const switcher = document.querySelector('.lang-switch');
    if (switcher) switcher.setAttribute('aria-label', isZh ? '語言切換' : 'Language switch');

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function addSwitcher() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.lang-switch')) return;

    const style = document.createElement('style');
    style.textContent = `
      .lang-switch{display:inline-flex;align-items:center;gap:4px;margin-left:8px;padding-left:10px;border-left:1px solid rgba(255,255,255,.28);white-space:nowrap}
      .lang-switch button{appearance:none;border:0;background:transparent;color:inherit;font:inherit;font-size:12px;font-weight:800;letter-spacing:.03em;padding:5px 7px;border-radius:7px;cursor:pointer;opacity:.68}
      .lang-switch button:hover,.lang-switch button.active{background:rgba(255,255,255,.14);opacity:1}
      .lang-switch .lang-sep{opacity:.45;font-size:11px}
      @media(max-width:760px){.lang-switch{margin-left:0;padding-left:0;border-left:0}.lang-switch button{padding:5px 6px}}
    `;
    document.head.appendChild(style);

    const switcher = document.createElement('span');
    switcher.className = 'lang-switch';
    switcher.innerHTML = '<button type="button" data-lang="en" aria-pressed="false">EN</button><span class="lang-sep">|</span><button type="button" data-lang="zh" aria-pressed="false">中文</button>';
    switcher.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-lang]');
      if (button) applyLanguage(button.dataset.lang);
    });
    nav.appendChild(switcher);
  }

  function init() {
    addSwitcher();
    let lang = 'en';
    try { lang = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (_) {}
    if (lang !== 'zh') lang = 'en';
    applyLanguage(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();