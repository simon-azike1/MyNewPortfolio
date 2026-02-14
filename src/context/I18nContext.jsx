import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const I18nContext = createContext();

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      connect: 'Connect with me',
      resume: 'Resume',
      downloadResume: 'Download Resume',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: 'Language',
      available: 'Available for collaborations',
      toggleMenu: 'Toggle mobile menu'
    },
    hero: {
      role: 'Software & Network Engineer',
      intro:
        'I build secure, efficient, high-performing digital systems. My work blends polished front-end experiences with dependable infrastructure across React, JavaScript, and network technologies.',
      viewWork: 'View Work',
      contact: 'Contact',
      statsYears: 'Years Experience',
      statsProjects: 'Projects Completed',
      statsDomains: 'Tech Domains',
      basedIn: 'Based in',
      focus: 'Focused on',
      location: 'Rabat, Morocco',
      focusValue: 'Full-Stack Delivery',
      scroll: 'Scroll to explore'
    },
    about: {
      title: 'About Me',
      name: 'Simon Azike',
      role: 'Software Engineer',
      journeyTitle: 'My Journey',
      journeyText:
        'I discovered my passion for coding shortly after starting at Cardiff Metropolitan University on August 3rd, 2022. Coming from a high school background in Electrical and Electronics, programming quickly became more than a skill.',
      journeyNote:
        "It's now a craft I enjoy, constantly learning and creating solutions that make an impact.",
      statsStart: 'Started Journey',
      statsSkills: 'Skills Learned',
      statsPassion: 'Passion Level',
      cardiffTitle: 'About Cardiff Metropolitan University',
      cardiffBody:
        'Cardiff Metropolitan University is a public university in Cardiff, Wales, known for strong programs in design, technology, and applied research.',
      cardiffLink: 'Visit university website'
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Technical expertise across frontend, backend, and development tools.',
      categories: {
        all: 'All',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools'
      },
      loading: 'Loading skills...',
      empty: 'No skills available yet.'
    },
    projects: {
      title: 'Selected Work',
      subtitle:
        'A curated selection of projects showcasing web development expertise across frontend and full-stack solutions.',
      sectionLabel: 'Portfolio Projects',
      metaTitle: 'What you will find',
      metaOne: 'Product-focused builds with clean UX and maintainable architecture.',
      metaTwo: 'Full-stack integrations, APIs, and performance-focused optimizations.',
      metaThree: 'Production-ready designs and documentation for smooth handoffs.',
      loading: 'Loading projects...',
      empty: 'No projects available yet.',
      featured: 'Featured',
      viewLive: 'View Live Site',
      viewCode: 'View Code',
      overview: 'Overview',
      technologies: 'Technologies'
    },
    testimonials: {
      title: 'Client Feedback',
      subtitle: 'What clients say about working with me',
      sectionLabel: 'Client Testimonials',
      loading: 'Loading testimonials...',
      empty: 'No testimonials available yet.'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Open to discussing new opportunities and project collaborations.',
      sectionLabel: 'Contact Information',
      formLabel: 'Contact form',
      infoEmail: 'Email',
      infoPhone: 'Phone',
      infoLocation: 'Location',
      infoEmailDesc: 'Send me an email anytime',
      infoPhoneDesc: 'Message me directly on WhatsApp',
      infoLocationDesc: 'Based in Morocco, available globally',
      connectTitle: 'Connect',
      sendTitle: 'Send a Message',
      sendSubtitle: "Have a project in mind? Let's discuss how we can work together.",
      fullName: 'Full Name',
      email: 'Email Address',
      message: 'Message',
      required: 'required',
      placeholderName: 'Enter your full name',
      placeholderEmail: 'your.email@example.com',
      placeholderMessage: 'Tell me about your project, ideas, or just say hello...',
      count: 'characters',
      submit: 'Send Message',
      sending: 'Sending...',
      sent: 'Message Sent!',
      retry: 'Try Again',
      successTitle: 'Message sent successfully!',
      successBody: "Thank you for reaching out. I'll get back to you soon.",
      errorTitle: 'Something went wrong',
      errorBody: 'Please try again or contact me directly via email.',
      ctaTitle: 'Ready to start your project?',
      ctaBody: "Let's discuss your ideas and bring them to life together.",
      ctaButton: 'Email Me Directly',
      whatsappMessage: 'Hello Simon, I saw your portfolio and would like to discuss a project. Are you available for a quick chat?'
    },
    footer: {
      quickLinks: 'Quick Links',
      connect: 'Connect',
      builtWith: 'Built with:',
      scrollTop: 'Scroll to top',
      tagline: 'Crafting digital experiences with passion and precision. Transforming ideas into reality.'
    },
    admin: {
      menu: {
        overview: 'Overview',
        projects: 'Projects',
        skills: 'Skills',
        testimonials: 'Testimonials'
      },
      overviewTitle: 'Dashboard Overview',
      overviewSubtitle: "Welcome back! Here's what's happening with your portfolio.",
      quickActions: 'Quick Actions',
      addProject: 'Add New Project',
      addSkill: 'Add New Skill',
      addTestimonial: 'Add Testimonial',
      recentActivity: 'Recent Activity',
      activityProject: 'Project "YACSN" was updated',
      activitySkill: 'New skill "React.js" added',
      activityTestimonial: 'Testimonial from client received',
      timeTwoHours: '2 hours ago',
      timeOneDay: '1 day ago',
      timeThreeDays: '3 days ago',
      logout: 'Logout',
      stats: {
        projects: 'Total Projects',
        skills: 'Skills',
        testimonials: 'Testimonials',
        years: 'Years Experience'
      },
      loginTitle: 'Admin Panel',
      loginSubtitle: 'Sign in to manage your portfolio',
      loginEmail: 'Email Address',
      loginPassword: 'Password',
      loginButton: 'Sign In',
      loginLoading: 'Signing in...',
      loginInfoTitle: 'Admin Access Only',
      loginInfoBody: 'Use your registered credentials to sign in',
      loginError: 'Login failed. Please try again.',
      alerts: {
        projectLoadFailed: 'Failed to load projects. Make sure the server is running.',
        projectDeleteConfirm: 'Are you sure you want to delete this project?',
        projectDeleteFailed: 'Failed to delete project.',
        projectSaveFailed: 'Failed to save project.',
        skillLoadFailed: 'Failed to load skills.',
        skillDeleteConfirm: 'Are you sure you want to delete this skill?',
        skillDeleteFailed: 'Failed to delete skill.',
        skillSaveFailed: 'Failed to save skill.',
        testimonialLoadFailed: 'Failed to load testimonials.',
        testimonialDeleteConfirm: 'Are you sure you want to delete this testimonial?',
        testimonialDeleteFailed: 'Failed to delete testimonial.',
        testimonialSaveFailed: 'Failed to save testimonial.'
      },
      projects: {
        title: 'Projects Management',
        subtitle: 'Manage your portfolio projects',
        add: 'Add Project',
        loading: 'Loading projects...',
        empty: 'No projects yet. Add your first project!',
        featured: 'Featured',
        liveDemo: 'Live Demo',
        sourceCode: 'Source Code',
        edit: 'Edit Project',
        addNew: 'Add New Project',
        formTitle: 'Project Title',
        formCategory: 'Category',
        formDescription: 'Description',
        formImage: 'Image URL',
        formLive: 'Live URL',
        formGithub: 'GitHub URL',
        formTech: 'Technologies (comma separated)',
        placeholderImage: 'https://...',
        placeholderLive: 'https://...',
        placeholderGithub: 'https://github.com/...',
        placeholderTech: 'React, Node.js, MongoDB',
        formFeatured: 'Mark as Featured Project',
        submitAdd: 'Add Project',
        submitUpdate: 'Update Project',
        cancel: 'Cancel',
        categoryWeb: 'Web',
        categoryMobile: 'Mobile',
        categoryDesign: 'Design',
        categoryOther: 'Other'
      },
      skillsManage: {
        title: 'Skills Management',
        subtitle: 'Manage your technical skills',
        add: 'Add Skill',
        loading: 'Loading skills...',
        empty: 'No skills yet. Add your first skill!',
        edit: 'Edit Skill',
        addNew: 'Add New Skill',
        formName: 'Skill Name',
        formCategory: 'Category',
        formLevel: 'Level',
        formProficiency: 'Proficiency',
        formExperience: 'Experience',
        placeholderName: 'e.g., React.js',
        placeholderExperience: 'e.g., 2+ years',
        submitAdd: 'Add Skill',
        submitUpdate: 'Update Skill',
        cancel: 'Cancel',
        categoryFrontend: 'Frontend',
        categoryBackend: 'Backend',
        categoryTools: 'Tools',
        levelBeginner: 'Beginner',
        levelIntermediate: 'Intermediate',
        levelAdvanced: 'Advanced',
        levelExpert: 'Expert'
      },
      testimonialsManage: {
        title: 'Testimonials Management',
        subtitle: 'Manage client testimonials and reviews',
        add: 'Add Testimonial',
        loading: 'Loading testimonials...',
        empty: 'No testimonials yet. Add your first testimonial!',
        edit: 'Edit Testimonial',
        addNew: 'Add New Testimonial',
        formName: 'Client Name',
        formRole: 'Role & Company',
        formContent: 'Testimonial',
        formRating: 'Rating',
        placeholderName: 'John Doe',
        placeholderRole: 'CEO, Company Name',
        placeholderContent: 'Write the testimonial here...',
        submitAdd: 'Add Testimonial',
        submitUpdate: 'Update',
        cancel: 'Cancel'
      }
    },
    forms: {
      invalidName: 'Name must be at least 2 characters long',
      invalidEmail: 'Please enter a valid email address',
      invalidMessage: 'Message must be at least 10 characters long',
      sendFailed: 'Failed to send:',
      sendInvalid: 'Invalid form data. Please check your inputs.',
      sendAuth: 'Authentication failed. Please try again later.',
      sendNetwork: 'Network error. Please check your connection and try again.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
      connect: 'Me contacter',
      resume: 'CV',
      downloadResume: 'Télécharger le CV',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
      language: 'Langue',
      available: 'Disponible pour collaborer',
      toggleMenu: 'Basculer le menu mobile'
    },
    hero: {
      role: 'Ingénieur logiciel & réseau',
      intro:
        "Je conçois des systèmes numériques sûrs, efficaces et performants. Mon travail combine des expériences front-end soignées avec une infrastructure fiable autour de React, JavaScript et des technologies réseau.",
      viewWork: 'Voir les projets',
      contact: 'Contact',
      statsYears: "Années d'expérience",
      statsProjects: 'Projets réalisés',
      statsDomains: 'Domaines tech',
      basedIn: 'Basé à',
      focus: 'Spécialisé',
      location: 'Rabat, Maroc',
      focusValue: 'Livraison full-stack',
      scroll: 'Faire défiler'
    },
    about: {
      title: 'À propos de moi',
      name: 'Simon Azike',
      role: 'Ingénieur logiciel',
      journeyTitle: 'Mon parcours',
      journeyText:
        "J'ai découvert ma passion pour le code peu après avoir commencé à Cardiff Metropolitan University le 3 août 2022. Avec un parcours en électricité et électronique, la programmation est vite devenue plus qu'une compétence.",
      journeyNote:
        "C'est désormais un métier que j'apprécie, en apprenant constamment et en créant des solutions à impact.",
      statsStart: 'Début du parcours',
      statsSkills: 'Compétences acquises',
      statsPassion: 'Niveau de passion',
      cardiffTitle: 'À propos de Cardiff Metropolitan University',
      cardiffBody:
        "Cardiff Metropolitan University est une université publique à Cardiff, au pays de Galles, reconnue pour ses programmes en design, technologie et recherche appliquée.",
      cardiffLink: "Visiter le site de l'université"
    },
    skills: {
      title: 'Compétences & technologies',
      subtitle: 'Expertise technique en frontend, backend et outils de développement.',
      categories: {
        all: 'Tout',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Outils'
      },
      loading: 'Chargement des compétences...',
      empty: 'Aucune compétence pour le moment.'
    },
    projects: {
      title: 'Travaux sélectionnés',
      subtitle:
        'Une sélection de projets mettant en valeur mon expertise en développement web et full-stack.',
      sectionLabel: 'Projets du portfolio',
      metaTitle: 'Ce que vous trouverez',
      metaOne: 'Des produits orientés UX avec une architecture maintenable.',
      metaTwo: 'Intégrations full-stack, APIs et optimisations de performance.',
      metaThree: 'Designs prêts pour la production et documentation claire.',
      loading: 'Chargement des projets...',
      empty: 'Aucun projet disponible pour le moment.',
      featured: 'En vedette',
      viewLive: 'Voir le site',
      viewCode: 'Voir le code',
      overview: 'Aperçu',
      technologies: 'Technologies'
    },
    testimonials: {
      title: 'Avis clients',
      subtitle: 'Ce que disent les clients',
      sectionLabel: 'Témoignages clients',
      loading: 'Chargement des témoignages...',
      empty: 'Aucun témoignage pour le moment.'
    },
    contact: {
      title: 'Prendre contact',
      subtitle: 'Ouvert aux nouvelles opportunités et collaborations.',
      sectionLabel: 'Informations de contact',
      formLabel: 'Formulaire de contact',
      infoEmail: 'Email',
      infoPhone: 'Téléphone',
      infoLocation: 'Localisation',
      infoEmailDesc: '?crivez-moi à tout moment',
      infoPhoneDesc: '?crivez-moi sur WhatsApp',
      infoLocationDesc: 'Basé au Maroc, disponible à l?international',
      connectTitle: 'Réseaux',
      sendTitle: 'Envoyer un message',
      sendSubtitle: "Vous avez un projet ? Discutons‑en ensemble.",
      fullName: 'Nom complet',
      email: 'Adresse email',
      message: 'Message',
      required: 'requis',
      placeholderName: 'Entrez votre nom complet',
      placeholderEmail: 'votre.email@example.com',
      placeholderMessage: 'Parlez-moi de votre projet, idées, ou dites bonjour...',
      count: 'caractères',
      submit: 'Envoyer',
      sending: 'Envoi...',
      sent: 'Message envoyé !',
      retry: 'Réessayer',
      successTitle: 'Message envoyé avec succès !',
      successBody: "Merci pour votre message. Je vous répondrai bientôt.",
      errorTitle: 'Une erreur est survenue',
      errorBody: "Réessayez ou contactez-moi par email.",
      ctaTitle: 'Prêt à lancer votre projet ?',
      ctaBody: "Discutons de vos idées et donnons-leur vie.",
      ctaButton: 'M?écrire directement',
      whatsappMessage: "Bonjour Simon, j'ai vu votre portfolio et je voudrais discuter d'un projet. Êtes‑vous disponible pour un court échange ?"
    },
    footer: {
      quickLinks: 'Liens rapides',
      connect: 'Contact',
      builtWith: 'Réalisé avec :',
      scrollTop: 'Retour en haut',
      tagline: 'Des expériences numériques soignées, avec passion et précision. Des idées transformées en réalité.'
    },
    admin: {
      menu: {
        overview: 'Aperçu',
        projects: 'Projets',
        skills: 'Compétences',
        testimonials: 'Témoignages'
      },
      overviewTitle: 'Aperçu du tableau de bord',
      overviewSubtitle: 'Voici ce qui se passe sur votre portfolio.',
      quickActions: 'Actions rapides',
      addProject: 'Ajouter un projet',
      addSkill: 'Ajouter une compétence',
      addTestimonial: 'Ajouter un témoignage',
      recentActivity: 'Activité récente',
      activityProject: 'Le projet "YACSN" a été mis à jour',
      activitySkill: 'Nouvelle compétence "React.js" ajoutée',
      activityTestimonial: 'Témoignage client reçu',
      timeTwoHours: 'il y a 2 heures',
      timeOneDay: 'il y a 1 jour',
      timeThreeDays: 'il y a 3 jours',
      logout: 'Se déconnecter',
      stats: {
        projects: 'Total des projets',
        skills: 'Compétences',
        testimonials: 'Témoignages',
        years: "Années d'expérience"
      },
      loginTitle: "Panneau d'administration",
      loginSubtitle: 'Connectez-vous pour gérer votre portfolio',
      loginEmail: 'Adresse email',
      loginPassword: 'Mot de passe',
      loginButton: 'Se connecter',
      loginLoading: 'Connexion...',
      loginInfoTitle: 'Accès admin uniquement',
      loginInfoBody: 'Utilisez vos identifiants enregistrés',
      loginError: '?chec de la connexion. Réessayez.',
      alerts: {
        projectLoadFailed: 'Echec du chargement des projets. Verifiez que le serveur fonctionne.',
        projectDeleteConfirm: 'Voulez-vous vraiment supprimer ce projet ?',
        projectDeleteFailed: 'Echec de la suppression du projet.',
        projectSaveFailed: 'Echec de l enregistrement du projet.',
        skillLoadFailed: 'Echec du chargement des competences.',
        skillDeleteConfirm: 'Voulez-vous vraiment supprimer cette competence ?',
        skillDeleteFailed: 'Echec de la suppression de la competence.',
        skillSaveFailed: 'Echec de l enregistrement de la competence.',
        testimonialLoadFailed: 'Echec du chargement des temoignages.',
        testimonialDeleteConfirm: 'Voulez-vous vraiment supprimer ce temoignage ?',
        testimonialDeleteFailed: 'Echec de la suppression du temoignage.',
        testimonialSaveFailed: 'Echec de l enregistrement du temoignage.'
      },
      projects: {
        title: 'Gestion des projets',
        subtitle: 'Gérez vos projets de portfolio',
        add: 'Ajouter un projet',
        loading: 'Chargement des projets...',
        empty: 'Aucun projet. Ajoutez votre premier projet !',
        featured: 'En vedette',
        liveDemo: 'Démo',
        sourceCode: 'Code source',
        edit: 'Modifier le projet',
        addNew: 'Ajouter un nouveau projet',
        formTitle: 'Titre du projet',
        formCategory: 'Catégorie',
        formDescription: 'Description',
        formImage: "URL de l'image",
        formLive: 'URL live',
        formGithub: 'URL GitHub',
        formTech: 'Technologies (séparées par des virgules)',
        placeholderImage: 'https://...',
        placeholderLive: 'https://...',
        placeholderGithub: 'https://github.com/...',
        placeholderTech: 'React, Node.js, MongoDB',
        formFeatured: 'Marquer comme projet en vedette',
        submitAdd: 'Ajouter le projet',
        submitUpdate: 'Mettre à jour',
        cancel: 'Annuler',
        categoryWeb: 'Web',
        categoryMobile: 'Mobile',
        categoryDesign: 'Design',
        categoryOther: 'Autre'
      },
      skillsManage: {
        title: 'Gestion des compétences',
        subtitle: 'Gérez vos compétences techniques',
        add: 'Ajouter une compétence',
        loading: 'Chargement des compétences...',
        empty: 'Aucune compétence. Ajoutez la première !',
        edit: 'Modifier la compétence',
        addNew: 'Ajouter une nouvelle compétence',
        formName: 'Nom de la compétence',
        formCategory: 'Catégorie',
        formLevel: 'Niveau',
        formProficiency: 'Maîtrise',
        formExperience: 'Expérience',
        placeholderName: 'ex. React.js',
        placeholderExperience: 'ex. 2+ ans',
        submitAdd: 'Ajouter la compétence',
        submitUpdate: 'Mettre à jour',
        cancel: 'Annuler',
        categoryFrontend: 'Frontend',
        categoryBackend: 'Backend',
        categoryTools: 'Outils',
        levelBeginner: 'Débutant',
        levelIntermediate: 'Intermédiaire',
        levelAdvanced: 'Avancé',
        levelExpert: 'Expert'
      },
      testimonialsManage: {
        title: 'Gestion des témoignages',
        subtitle: 'Gérez les témoignages et avis clients',
        add: 'Ajouter un témoignage',
        loading: 'Chargement des témoignages...',
        empty: 'Aucun témoignage. Ajoutez le premier !',
        edit: 'Modifier le témoignage',
        addNew: 'Ajouter un nouveau témoignage',
        formName: 'Nom du client',
        formRole: 'Rôle et entreprise',
        formContent: 'Témoignage',
        formRating: 'Note',
        placeholderName: 'Jean Dupont',
        placeholderRole: 'CEO, Nom de société',
        placeholderContent: '?crivez le témoignage ici...',
        submitAdd: 'Ajouter un témoignage',
        submitUpdate: 'Mettre à jour',
        cancel: 'Annuler'
      }
    },
    forms: {
      invalidName: 'Le nom doit comporter au moins 2 caractères',
      invalidEmail: 'Veuillez entrer une adresse email valide',
      invalidMessage: 'Le message doit contenir au moins 10 caractères',
      sendFailed: "?chec de l'envoi :",
      sendInvalid: 'Données invalides. Vérifiez vos informations.',
      sendAuth: "?chec d'authentification. Réessayez plus tard.",
      sendNetwork: 'Erreur réseau. Vérifiez votre connexion.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      connect: 'Conecta conmigo',
      resume: 'CV',
      downloadResume: 'Descargar CV',
      lightMode: 'Modo claro',
      darkMode: 'Modo oscuro',
      language: 'Idioma',
      available: 'Disponible para colaborar',
      toggleMenu: 'Alternar menú móvil'
    },
    hero: {
      role: 'Ingeniero de software y redes',
      intro:
        'Construyo sistemas digitales seguros, eficientes y de alto rendimiento. Mi trabajo combina experiencias front-end pulidas con infraestructura confiable en React, JavaScript y tecnologías de red.',
      viewWork: 'Ver proyectos',
      contact: 'Contacto',
      statsYears: 'Años de experiencia',
      statsProjects: 'Proyectos completados',
      statsDomains: 'Áreas tech',
      basedIn: 'Ubicado en',
      focus: 'Enfocado en',
      location: 'Rabat, Marruecos',
      focusValue: 'Entrega full-stack',
      scroll: 'Desplazar para explorar'
    },
    about: {
      title: 'Sobre mí',
      name: 'Simon Azike',
      role: 'Ingeniero de software',
      journeyTitle: 'Mi camino',
      journeyText:
        'Descubrí mi pasión por programar poco después de comenzar en Cardiff Metropolitan University el 3 de agosto de 2022. Con formación en electricidad y electrónica, la programación se convirtió en algo más que una habilidad.',
      journeyNote:
        'Ahora es un oficio que disfruto, aprendiendo constantemente y creando soluciones con impacto.',
      statsStart: 'Inicio del camino',
      statsSkills: 'Habilidades aprendidas',
      statsPassion: 'Nivel de pasión',
      cardiffTitle: 'Sobre Cardiff Metropolitan University',
      cardiffBody:
        'Cardiff Metropolitan University es una universidad pública en Cardiff, Gales, reconocida por sus programas en diseño, tecnología e investigación aplicada.',
      cardiffLink: 'Visitar el sitio web'
    },
    skills: {
      title: 'Habilidades y tecnologías',
      subtitle: 'Experiencia técnica en frontend, backend y herramientas de desarrollo.',
      categories: {
        all: 'Todas',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Herramientas'
      },
      loading: 'Cargando habilidades...',
      empty: 'Aún no hay habilidades disponibles.'
    },
    projects: {
      title: 'Trabajo seleccionado',
      subtitle:
        'Una selección de proyectos que muestran experiencia en desarrollo web y full-stack.',
      sectionLabel: 'Proyectos del portafolio',
      metaTitle: 'Lo que encontrarás',
      metaOne: 'Productos centrados en UX con arquitectura mantenible.',
      metaTwo: 'Integraciones full-stack, APIs y optimización de rendimiento.',
      metaThree: 'Diseños listos para producción y documentación clara.',
      loading: 'Cargando proyectos...',
      empty: 'No hay proyectos disponibles.',
      featured: 'Destacado',
      viewLive: 'Ver sitio',
      viewCode: 'Ver código',
      overview: 'Resumen',
      technologies: 'Tecnologías'
    },
    testimonials: {
      title: 'Opiniones de clientes',
      subtitle: 'Lo que dicen los clientes',
      sectionLabel: 'Testimonios de clientes',
      loading: 'Cargando testimonios...',
      empty: 'Aún no hay testimonios.'
    },
    contact: {
      title: 'Ponte en contacto',
      subtitle: 'Abierto a nuevas oportunidades y colaboraciones.',
      sectionLabel: 'Información de contacto',
      formLabel: 'Formulario de contacto',
      infoEmail: 'Email',
      infoPhone: 'Teléfono',
      infoLocation: 'Ubicación',
      infoEmailDesc: 'Envíame un email en cualquier momento',
      infoPhoneDesc: 'Escríbeme por WhatsApp',
      infoLocationDesc: 'Con base en Marruecos, disponible globalmente',
      connectTitle: 'Conectar',
      sendTitle: 'Enviar un mensaje',
      sendSubtitle: '¿Tienes un proyecto? Hablemos.',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      message: 'Mensaje',
      required: 'requerido',
      placeholderName: 'Ingresa tu nombre completo',
      placeholderEmail: 'tu.email@example.com',
      placeholderMessage: 'Cuéntame sobre tu proyecto o di hola...',
      count: 'caracteres',
      submit: 'Enviar',
      sending: 'Enviando...',
      sent: '¡Mensaje enviado!',
      retry: 'Reintentar',
      successTitle: '¡Mensaje enviado correctamente!',
      successBody: 'Gracias por tu mensaje. Te responderé pronto.',
      errorTitle: 'Algo salió mal',
      errorBody: 'Inténtalo de nuevo o contáctame por email.',
      ctaTitle: '¿Listo para iniciar tu proyecto?',
      ctaBody: 'Hablemos de tus ideas y hagámoslas realidad.',
      ctaButton: 'Escríbeme por email',
      whatsappMessage: 'Hola Simon, vi tu portafolio y me gustaría hablar sobre un proyecto. ¿Estás disponible para una charla rápida?'
    },
    footer: {
      quickLinks: 'Enlaces',
      connect: 'Conectar',
      builtWith: 'Creado con:',
      scrollTop: 'Volver arriba',
      tagline: 'Experiencias digitales con pasión y precisión. Ideas convertidas en realidad.'
    },
    admin: {
      menu: {
        overview: 'Resumen',
        projects: 'Proyectos',
        skills: 'Habilidades',
        testimonials: 'Testimonios'
      },
      overviewTitle: 'Resumen del panel',
      overviewSubtitle: 'Esto es lo que ocurre con tu portafolio.',
      quickActions: 'Acciones rápidas',
      addProject: 'Agregar proyecto',
      addSkill: 'Agregar habilidad',
      addTestimonial: 'Agregar testimonio',
      recentActivity: 'Actividad reciente',
      activityProject: 'El proyecto "YACSN" fue actualizado',
      activitySkill: 'Nueva habilidad "React.js" agregada',
      activityTestimonial: 'Testimonio de cliente recibido',
      timeTwoHours: 'hace 2 horas',
      timeOneDay: 'hace 1 día',
      timeThreeDays: 'hace 3 días',
      logout: 'Cerrar sesión',
      stats: {
        projects: 'Total de proyectos',
        skills: 'Habilidades',
        testimonials: 'Testimonios',
        years: 'Años de experiencia'
      },
      loginTitle: 'Panel de administración',
      loginSubtitle: 'Inicia sesión para gestionar tu portafolio',
      loginEmail: 'Correo electrónico',
      loginPassword: 'Contraseña',
      loginButton: 'Iniciar sesión',
      loginLoading: 'Ingresando...',
      loginInfoTitle: 'Solo acceso admin',
      loginInfoBody: 'Usa tus credenciales registradas',
      loginError: 'Error de inicio de sesión. Inténtalo de nuevo.',
      alerts: {
        projectLoadFailed: 'No se pudieron cargar los proyectos. Asegura que el servidor este activo.',
        projectDeleteConfirm: 'Seguro que deseas eliminar este proyecto?',
        projectDeleteFailed: 'No se pudo eliminar el proyecto.',
        projectSaveFailed: 'No se pudo guardar el proyecto.',
        skillLoadFailed: 'No se pudieron cargar las habilidades.',
        skillDeleteConfirm: 'Seguro que deseas eliminar esta habilidad?',
        skillDeleteFailed: 'No se pudo eliminar la habilidad.',
        skillSaveFailed: 'No se pudo guardar la habilidad.',
        testimonialLoadFailed: 'No se pudieron cargar los testimonios.',
        testimonialDeleteConfirm: 'Seguro que deseas eliminar este testimonio?',
        testimonialDeleteFailed: 'No se pudo eliminar el testimonio.',
        testimonialSaveFailed: 'No se pudo guardar el testimonio.'
      },
      projects: {
        title: 'Gestión de proyectos',
        subtitle: 'Administra tus proyectos del portafolio',
        add: 'Agregar proyecto',
        loading: 'Cargando proyectos...',
        empty: 'Aún no hay proyectos. ¡Agrega el primero!',
        featured: 'Destacado',
        liveDemo: 'Demo en vivo',
        sourceCode: 'Código fuente',
        edit: 'Editar proyecto',
        addNew: 'Agregar nuevo proyecto',
        formTitle: 'Título del proyecto',
        formCategory: 'Categoría',
        formDescription: 'Descripción',
        formImage: 'URL de la imagen',
        formLive: 'URL en vivo',
        formGithub: 'URL de GitHub',
        formTech: 'Tecnologías (separadas por comas)',
        placeholderImage: 'https://...',
        placeholderLive: 'https://...',
        placeholderGithub: 'https://github.com/...',
        placeholderTech: 'React, Node.js, MongoDB',
        formFeatured: 'Marcar como proyecto destacado',
        submitAdd: 'Agregar proyecto',
        submitUpdate: 'Actualizar',
        cancel: 'Cancelar',
        categoryWeb: 'Web',
        categoryMobile: 'Móvil',
        categoryDesign: 'Diseño',
        categoryOther: 'Otro'
      },
      skillsManage: {
        title: 'Gestión de habilidades',
        subtitle: 'Administra tus habilidades técnicas',
        add: 'Agregar habilidad',
        loading: 'Cargando habilidades...',
        empty: 'Aún no hay habilidades. ¡Agrega la primera!',
        edit: 'Editar habilidad',
        addNew: 'Agregar nueva habilidad',
        formName: 'Nombre de la habilidad',
        formCategory: 'Categoría',
        formLevel: 'Nivel',
        formProficiency: 'Dominio',
        formExperience: 'Experiencia',
        placeholderName: 'ej. React.js',
        placeholderExperience: 'ej. 2+ años',
        submitAdd: 'Agregar habilidad',
        submitUpdate: 'Actualizar',
        cancel: 'Cancelar',
        categoryFrontend: 'Frontend',
        categoryBackend: 'Backend',
        categoryTools: 'Herramientas',
        levelBeginner: 'Principiante',
        levelIntermediate: 'Intermedio',
        levelAdvanced: 'Avanzado',
        levelExpert: 'Experto'
      },
      testimonialsManage: {
        title: 'Gestión de testimonios',
        subtitle: 'Administra testimonios y reseñas',
        add: 'Agregar testimonio',
        loading: 'Cargando testimonios...',
        empty: 'Aún no hay testimonios. ¡Agrega el primero!',
        edit: 'Editar testimonio',
        addNew: 'Agregar nuevo testimonio',
        formName: 'Nombre del cliente',
        formRole: 'Rol y empresa',
        formContent: 'Testimonio',
        formRating: 'Calificación',
        placeholderName: 'Juan Pérez',
        placeholderRole: 'CEO, Nombre de empresa',
        placeholderContent: 'Escribe el testimonio aquí...',
        submitAdd: 'Agregar testimonio',
        submitUpdate: 'Actualizar',
        cancel: 'Cancelar'
      }
    },
    forms: {
      invalidName: 'El nombre debe tener al menos 2 caracteres',
      invalidEmail: 'Ingresa un correo válido',
      invalidMessage: 'El mensaje debe tener al menos 10 caracteres',
      sendFailed: 'Error al enviar:',
      sendInvalid: 'Datos inválidos. Verifica la información.',
      sendAuth: 'Fallo de autenticación. Inténtalo más tarde.',
      sendNetwork: 'Error de red. Revisa tu conexión.'
    }
  }
};

const getValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = useMemo(() => {
    return (key) => {
      const value = getValue(translations[language], key);
      if (value !== null && value !== undefined) {
        return value;
      }
      const fallback = getValue(translations.en, key);
      return fallback !== null && fallback !== undefined ? fallback : key;
    };
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};


