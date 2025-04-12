interface ITheme {
  name: string;
  label: string;
  colors: {
    foreground: string;
    background: string;
    primary: string;
  };
}

export const THEMES_LIST = [
  'light',
  'dark',
  'theme-kodama-grove',
  'theme-kodama-grove-dark',
  'theme-claude',
  'theme-claude-dark',
  'theme-claymorphism',
  'theme-claymorphism-dark',
  'theme-vintage-paper',
  'theme-vintage-paper-dark',
];

export const themes: ITheme[] = [
  {
    name: 'light',
    label: 'Light',
    colors: {
      foreground: 'bg-[#FAFAFAFF]',
      background: 'bg-[#111113FF]',
      primary: 'bg-[#18181BFF]',
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    colors: {
      foreground: 'bg-[#09090BFF]',
      background: 'bg-[#FFFFFFFF]',
      primary: 'bg-[#E5E5E5FF]',
    },
  },
  {
    name: 'theme-kodama-grove',
    label: 'Kodama Grove',
    colors: {
      foreground: 'bg-[#5D4C40FF]',
      background: 'bg-[#E3D7B3FF]',
      primary: 'bg-[#8E9F4CFF]',
    },
  },
  {
    name: 'theme-kodama-grove-dark',
    label: 'Kodama Grove Dark',
    colors: {
      foreground: 'bg-[#EBE4D6FF]',
      background: 'bg-[#3A352AFF]',
      primary: 'bg-[#8AA17AFF]',
    },
  },
  {
    name: 'theme-claude',
    label: 'Claude',
    colors: {
      foreground: 'bg-[#3D3826FF]',
      background: 'bg-[#F3F2EBFF]',
      primary: 'bg-[#B2572FFF]',
    },
  },
  {
    name: 'theme-claude-dark',
    label: 'Claude Dark',
    colors: {
      foreground: 'bg-[#E4E4E4FF]',
      background: 'bg-[#2C2C26FF]',
      primary: 'bg-[#B2572FFF]',
    },
  },
  {
    name: 'theme-claymorphism',
    label: 'Claymorphism',
    colors: {
      foreground: 'bg-[#1D293DFF]',
      background: 'bg-[#E4E4E4FF]',
      primary: 'bg-[#6468F0FF]',
    },
  },
  {
    name: 'theme-claymorphism-dark',
    label: 'Claymorphism Dark',
    colors: {
      foreground: 'bg-[#E4E8EFFF]',
      background: 'bg-[#1E1A16FF]',
      primary: 'bg-[#818CF9FF]',
    },
  },
  {
    name: 'theme-vintage-paper',
    label: 'Vintage Paper',
    colors: {
      foreground: 'bg-[#4A4037FF]',
      background: 'bg-[#F7F2E3FF]',
      primary: 'bg-[#A87C51FF]',
    },
  },
  {
    name: 'theme-vintage-paper-dark',
    label: 'Vintage Paper Dark',
    colors: {
      foreground: 'bg-[#EBE4D6FF]',
      background: 'bg-[#2A2522FF]',
      primary: 'bg-[#C2A180FF]',
    },
  },
];
