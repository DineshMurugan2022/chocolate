import hershey from '@/assets/logos/the-hershey-company-logo-color-header.png';
import cadbury from '@/assets/logos/cadbury.svg';
import mars from '@/assets/logos/mars.svg';
import nestle from '@/assets/logos/nestle.svg';
import ferrero from '@/assets/logos/ferrero_logo.jpg';
import toblerone from '@/assets/logos/toblerone.svg';
import ghirardelli from '@/assets/logos/ghirardelli.png';
import ritter from '@/assets/logos/Ritter_Sport_logo.svg';
import godiva from '@/assets/logos/Godiva_Chocolatier_Logo.svg';
import valrhona from '@/assets/logos/Logo-valrhona-2019.jpg';
import tonys from '@/assets/logos/tonys.webp';
import green from '@/assets/logos/Green-and-blacks-logo.jpg';
import scharffen from '@/assets/logos/Scharffen_berger_company_logo.png';
import amedei from '@/assets/logos/amedei.png';
import divine from '@/assets/logos/Divine_Chocolate_logo.jpg';
import alter from '@/assets/logos/Alterecologo.png';
import theo from '@/assets/logos/Theo-logo.png';
import equal from '@/assets/logos/equal_exchange.jpg';
import zotter from '@/assets/logos/zotter.png';
import chocolove from '@/assets/logos/ChocoloveLogo.svg.png';

export interface BrandInfo {
  title: string;
  shortName: string;
  image: string;
  description: string;
}

export const BRANDS: BrandInfo[] = [
  { title: 'The Hershey Company', shortName: 'Hershey', image: hershey, description: 'American Milk Chocolate Bars' },
  { title: 'Cadbury', shortName: 'Cadbury', image: cadbury, description: 'Famous British Dairy Milk' },
  { title: 'Mars Inc.', shortName: 'Mars', image: mars, description: 'Snickers, Twix, and Mars Bars' },
  { title: 'Nestlé', shortName: 'Nestlé', image: nestle, description: 'Kit Kat, Crunch and Milkybar' },
  { title: 'Ferrero SpA', shortName: 'Ferrero', image: ferrero, description: 'Ferrero Rocher, Kinder & Nutella' },
  { title: 'Toblerone', shortName: 'Toblerone', image: toblerone, description: 'Triangular Swiss Honey Nougat' },
  { title: 'Ghirardelli', shortName: 'Ghirardelli', image: ghirardelli, description: 'Rich San Francisco Squares' },
  { title: 'Ritter Sport', shortName: 'Ritter Sport', image: ritter, description: 'German Square Bar Varieties' },
  { title: 'Godiva', shortName: 'Godiva', image: godiva, description: 'Luxury Belgian Truffles' },
  { title: 'Valrhona', shortName: 'Valrhona', image: valrhona, description: 'Chef Grade Single-Origin Cocoa' },
  { title: "Tony's Chocolonely", shortName: "Tony's", image: tonys, description: '100% Slave-Free Dutch Heritage' },
  { title: "Green & Black's", shortName: "Green & Black's", image: green, description: 'Organic Fair Trade Selections' },
  { title: 'Scharffen Berger', shortName: 'Scharffen Berger', image: scharffen, description: 'Intense American Bean-to-Bar' },
  { title: 'Amedei', shortName: 'Amedei', image: amedei, description: 'Italian Luxury Rare Cacao' },
  { title: 'Divine Chocolate', shortName: 'Divine', image: divine, description: 'Ghanaian Farmer-Owned Fairtrade' },
  { title: 'Alter Eco', shortName: 'Alter Eco', image: alter, description: 'Organic Fair Trade B-Corp' },
  { title: 'Theo Chocolate', shortName: 'Theo', image: theo, description: 'First US Organic Certified' },
  { title: 'Equal Exchange', shortName: 'Equal Exchange', image: equal, description: 'Worker-Owned Fair Trade Co-op' },
  { title: 'Zotter Schokolade', shortName: 'Zotter', image: zotter, description: 'Inventive Austrian Layered Bars' },
  { title: 'Chocolove', shortName: 'Chocolove', image: chocolove, description: 'Romantic Belgian Themed Packaging' }
];
