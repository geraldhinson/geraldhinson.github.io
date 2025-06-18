// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "thoughts on tech, faith, coffee, and other topics worthy of rumination",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "things I have worked on",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "post-house-stories-signs-of-god-39-s-provision-v2",
        
          title: "House Stories - Signs of God&#39;s Provision (v2)",
        
        description: "How far God goes to show He is with us!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GlennAndLaurel-HousePrayerAnswer/";
          
        },
      },{id: "post-house-stories-signs-of-god-39-s-provision-v1",
        
          title: "House Stories - Signs of God&#39;s Provision (v1)",
        
        description: "Signs of Provision along the path",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/HouseSellProvisionOfGod/";
          
        },
      },{id: "post-bad-reviews-prayers-and-roller-coasters",
        
          title: "Bad Reviews, Prayers, and Roller Coasters",
        
        description: "Am I being axed? Or, pruned?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/BadReviews-Prayers-AndRollerCoasters/";
          
        },
      },{id: "post-the-value-of-folklore",
        
          title: "The value of Folklore",
        
        description: "The importance of telling and retelling",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Folklore/";
          
        },
      },{id: "post-pragmatic-genai",
        
          title: "Pragmatic GenAI",
        
        description: "Daily (non-vibe) usage for developers",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/PragmaticUsageOfGenAI/";
          
        },
      },{id: "post-on-the-dangers-of-hype",
        
          title: "On the dangers of Hype",
        
        description: "Even Apple got it wrong",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/HypeIsDangerous/";
          
        },
      },{id: "post-silos-and-specializations",
        
          title: "Silos and Specializations",
        
        description: "Who benefits? You, your company, both?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/SilosAndSpecialization/";
          
        },
      },{id: "post-bad-bosses-suck",
        
          title: "Bad bosses suck",
        
        description: "And life is short",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/BadBossesSuck/";
          
        },
      },{id: "post-one-ring-to",
        
          title: "One Ring to ...",
        
        description: "The importance of actually caring",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/LordOfTheBins/";
          
        },
      },{id: "post-holistic-engineering",
        
          title: "Holistic engineering",
        
        description: "The only path to success",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/LessonsFromMargaretHamiltonOfNASA/";
          
        },
      },{id: "post-on-writing",
        
          title: "On writing",
        
        description: "Impasses don&#39;t care if you&#39;re famous!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Writing-StephenKing/";
          
        },
      },{id: "post-but-what-is-it-bad-at",
        
          title: "But, what is it bad at?",
        
        description: "The question that should be asked more",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/WhatIsItBadAt/";
          
        },
      },{id: "post-engineers-can-be-hilarious",
        
          title: "Engineers can be hilarious",
        
        description: "Doing it wrong for fun and profit",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/EngineeringHumor/";
          
        },
      },{id: "post-this-is-not-the-way",
        
          title: "This is NOT the way",
        
        description: "Blind faith that ignores data-protection realities? No thank you!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/BlindToReality/";
          
        },
      },{id: "post-this-is-the-way",
        
          title: "This IS the way",
        
        description: "Ignore the naysayers",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ThisIsTheWay/";
          
        },
      },{id: "post-refusing-defeat",
        
          title: "Refusing Defeat",
        
        description: "When quitting is not in the playbook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/CreativeSolutions/";
          
        },
      },{id: "post-how-healthy-is-your-team",
        
          title: "How healthy is your team?",
        
        description: "Thoughts on initial &#39;e-value-ations&#39;",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/TeamHealthEval/";
          
        },
      },{id: "post-it-was-not-the-process",
        
          title: "It was NOT the process",
        
        description: "Don&#39;t believe the lie",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/ItsNotTheProcess/";
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%65%72%61%6C%64%74%68%75%73%66%61%72@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://linkedin.com/in/geraldhinson", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
