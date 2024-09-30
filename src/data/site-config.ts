export type Image = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Link = {
  text: string;
  href: string;
  target?: string;
  rel?: string;
};

export type Hero = {
  title?: string;
  text?: string;
  image?: Image;
  actions?: Link[];
};

export type Subscribe = {
  title?: string;
  text?: string;
  formUrl: string;
};

export type SiteConfig = {
  logo?: Image;
  title: string;
  subtitle?: string;
  subtitleAuthor?: string;
  description: string;
  image?: Image;
  headerNavLinks?: Link[];
  footerNavLinks?: Link[];
  socialLinks?: Link[];
  hero?: Hero;
  subscribe?: Subscribe;
  postsPerPage?: number;
  projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
  title: 'Vagner I. de Oliveira',
  subtitle: "I don't believe in charity. I believe in solidarity.",
  subtitleAuthor: "- Eduardo Galeano",
  description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
  image: {
    src: '/dante-preview.jpg',
    alt: 'Dante - Astro.js and Tailwind CSS theme'
  },
  headerNavLinks: [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Projects',
      href: '/projects'
    },
    {
      text: 'Posts',
      href: '/blog'
    },
    {
      text: 'Publications',
      href: '/publications'
    },

    //{
    //  text: 'Resume',
    //  href: 'https://drive.google.com/file/d/1G9tdtGRM9_9QVC3XAaLqtYOdWty3N_Xj/view',
    //  target: '_blank',
    //  rel: 'noopener noreferrer'
    //}
  ],
  footerNavLinks: [
    {
      text: 'About',
      href: '/about'
    },
    {
      text: 'Contact',
      href: '/contact'
    },
    //{
    //  text: 'Terms',
    //  href: '/terms'
    //},
    {
      text: 'Resume',
      href: 'https://drive.google.com/file/d/1G9tdtGRM9_9QVC3XAaLqtYOdWty3N_Xj/view'
    }
  ],
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/vinacioo'
    },
    {
      text: 'LinkekIn',
      href: 'https://www.linkedin.com/in/vagner-inacio/'
    },
  ],
  hero: {
    title: 'Hi There & Welcome to My Corner of the Web!',
    text: "Hello, I'm **Vagner Inacio de Oliveira**, a PhD student in Computer Engineering with a deep fascination for Artificial Intelligence and its transformative applications in the cultural sector. My research focuses on leveraging AI to advance the digitalization of museum collections, bridging the gap between technology and culture. With a foundation in Statistics from my undergraduate studies, I am passionate about pushing the boundaries of what's possible in the intersection of AI and cultural heritage. Explore my work and join me on this exciting journey of discovery.",
    image: {
      src: '/hero-mine-color.jpeg',
      alt: 'A person sitting at a desk in front of a computer'
    },
    actions: [
      {
        text: 'Get in Touch',
        href: '/contact'
      }
    ]
  },
  //subscribe: {
  //  title: 'Subscribe to Dante Newsletter',
  //  text: 'One update per week. All the latest posts directly in your inbox.',
  //  formUrl: '#'
  //},
  postsPerPage: 8,
  projectsPerPage: 8
};

export default siteConfig;
