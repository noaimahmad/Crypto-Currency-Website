
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-nav');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

async function loadPrices(){
  try{
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd'
    );
    if(!res.ok) throw new Error('Network error');
    const data = await res.json();
    const $ = (id) => document.getElementById(id);

    if ($('BTC')) $('BTC').textContent = `$${Number(data.bitcoin.usd).toLocaleString()}`;
    if ($('ETH')) $('ETH').textContent = `$${Number(data.ethereum.usd).toLocaleString()}`;
    if ($('DOG')) $('DOG').textContent = `$${Number(data.dogecoin.usd)}`;
  }catch(e){
    
  }
}
loadPrices();

setInterval(loadPrices, 60000);



const langBtn = document.getElementById('lang-btn');
let currentLang = 'EN';

function applyTranslations(lang){
  for(const id in translations[lang]){
    const el = document.getElementById(id);
    if(el) el.innerHTML = translations[lang][id];
  }
}

const translations = {
  EN: {
    "hero-title": "BUY AND <br>SELL <span>CRYPTO</span>",
    "hero-desc": "World's biggest Cryptocurrency exchange available on web <br>as well as mobile phone.",
    "hero-btn": "EXPLORE MORE",
    "market": "Market",
    "features": "Features",
    "whitepapers": "White Papers",
    "about": "About Us"
  },
  PS: {
    "hero-title": "پير او <br>پلور <span>کریپټو</span>",
    "hero-desc": ".د نړۍ تر ټولو ستر د کریپټو کرنسي تبادله چې د ويب او موبایل لپاره شته",
    "hero-btn": "نور وپلټئ",
    "market": "مارکېټ",
    "features": "ځانګړتیاوې",
    "whitepapers": "سپينې پاڼې",
    "about": "زموږ په اړه"
  }
};



langBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentLang = currentLang === 'EN' ? 'PS' : 'EN';
  langBtn.textContent = currentLang;
  applyTranslations(currentLang);
});


applyTranslations(currentLang);

