import i18n from 'i18next'; // Import i18next for handling internationalization
import { initReactI18next } from 'react-i18next'; // Import the integration module for React

// Translation files
const resources = {
    en: {
        translation: {
            dashboard: 'Dashboard',
            about: 'About',
            language: 'Language:',
            aboutTitle: 'About the Bird Flu Cases Dashboard',
            toolbarTitle: 'Bird Flu Dashboard',
            dashboardFeaturesContent: 'The Bird Flu Cases Dashboard provides the following features:\n\n' +
                '- **Choose a Specific Database:** Select from available databases to view relevant data.\n' +
                '- **Compare Data Across Locations:** Analyze and compare bird flu cases across different regions.\n' +
                '- **Select a Specific Period:** Filter data based on specific time periods within the database.\n' +
                '- **Switch Between Views:** Choose between Single Map and Double Map views for data visualization.\n' +
                '- **Timeline Modes:** Toggle between seasonal and monthly timeline views.\n' +
                '- **Map Visualization Options:** Switch between cluster maps and heat maps.\n' +
                '- **Filter Options:** Refine data by infection type, species, and provenance.\n' +
                '- **Time Slider and Playback Controls:** Navigate through data with a time slider and playback controls.\n' +
                '- **PDF Report Capture:** Print out a detailed PDF report of the current view.\n\n' +
                'For admins:\n' +
                '- **Login and View Database:** Secure access to view and manage the database.\n' +
                '- **Update Database:** Ability to update or upload new databases for analysis.',
            aboutContent:
                'The Bird Flu Cases Dashboard offers a comprehensive and interactive platform for exploring avian influenza outbreaks. Monitoring these cases is essential to prevent potential outbreaks in humans and safeguard public health.',
            avianFluTitle: 'What is Avian Influenza?',
            avianFluContent:
                'Avian influenza, commonly known as bird flu, is a highly contagious viral disease affecting both wild and domestic birds. It is caused by influenza type A viruses, which have several subtypes, including H5N1, H5N2, H7N2, and H7N8. Some strains, particularly H5N1, are known to cause severe illness in humans, though human infections are rare and typically occur through direct or close contact with infected birds or contaminated environments.',
            contextTitle: 'Global and Regional Context',
            foph:
                'The [Federal Office of Public Health (FOPH), Switzerland](https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/vogelgrippe-h5n1.html) monitors avian influenza outbreaks and provides public health guidance in Switzerland. They emphasize the importance of preventing the spread of the virus among bird populations and highlight the rare, but serious, risk of transmission to humans.',
            who:
                'The [World Health Organization (WHO)](https://www.who.int/europe/health-topics/Influenza-avian-and-other-zoonotic) tracks avian influenza outbreaks globally, providing updates on cases in birds and humans. The WHO’s guidelines focus on preventing human infections through measures such as monitoring bird populations, controlling outbreaks, and informing the public about the risks. See more in their [recent disease outbreak news](https://www.who.int/emergencies/disease-outbreak-news/item/2024-DON520).',
            ec:
                'The [European Commission, Directorate-General for Health and Food Safety](https://food.ec.europa.eu/animals/animal-diseases/diseases-and-control-measures/avian-influenza_en) oversees the control and prevention of avian influenza within the European Union. They work on coordinated efforts to manage outbreaks in animal populations to protect both public health and the agricultural sector.',
            importanceTitle: 'Importance of Monitoring and Prevention',
            importanceContent:
                'Continuous monitoring of avian influenza is vital to prevent widespread outbreaks in birds and to protect public health. Surveillance helps identify new strains that may pose risks to humans and allows for timely responses, such as culling infected birds, restricting movement, and enhancing biosecurity measures. Public awareness and cooperation are also critical in mitigating the impact of avian influenza.',
            dashboardTitle: 'Bird Flu Cases Dashboard',
            play: 'Play',
            pause: 'Pause',
            reset: 'Reset',
            options: 'Options',
            showClusterMap: 'Show Cluster Map',
            showHeatMap: 'Show Heat Map',
            showSeasons: 'Show Seasons',
            showMonths: 'Show Months',
            infectionType: 'Infection Type',
            species: 'Species',
            provenance: 'Provenance',
            seasons: {
                Spring: 'Spring',
                Summer: 'Summer',
                Autumn: 'Autumn',
                Winter: 'Winter',
            },
            months: {
                January: 'January',
                February: 'February',
                March: 'March',
                April: 'April',
                May: 'May',
                June: 'June',
                July: 'July',
                August: 'August',
                September: 'September',
                October: 'October',
                November: 'November',
                December: 'December',
            },
            adminLogin: 'Admin Login',
            username: 'Username',
            password: 'Password',
            login: 'Login',
            logout: 'Logout',
            invalidCredentials: 'Invalid credentials. Please try again.',
            fetchError: 'Failed to fetch data.',
            databaseManagement: 'Database Management',
            noData: 'No data available to display.',
            latitude: 'Latitude',
            longitude: 'Longitude',
            date: 'Date',
            fluType: 'Flu Type',
            none: 'None',
            database: 'Database',
            contact: 'Contact',
            contactUs: 'Contact Us',
            contactMessage: 'If you have any questions or feedback, feel free to reach out to us at:',
            doubleMapView: 'Double Map View',
            time: 'Time',
            uploadTitle: 'Upload your own file:',
            selectFile: 'Select file',
            submit: 'Submit',
            selectDatabase: 'Select database',
            singleMapView: 'Single Map View',
            fromDate: 'From Date',
            toDate: 'To Date',
            dashboardControl: 'Dashboard control',
        },
    },
    fr: {
        translation: {
            dashboard: 'Tableau de bord',
            about: 'À propos',
            language: 'Langue:',
            aboutTitle: 'À propos du tableau de bord des cas de grippe aviaire',
            toolbarTitle: 'Tableau de bord de la grippe aviaire',
            "dashboardFeaturesContent": "Le tableau de bord des cas de grippe aviaire offre les fonctionnalités suivantes:\n" +
                "- **Choisir une base de données spécifique :** Sélectionnez parmi les bases de données disponibles pour afficher les données pertinentes.\n" +
                "- **Comparer les données entre les lieux :** Analysez et comparez les cas de grippe aviaire dans différentes régions.\n" +
                "- **Choisir une période spécifique :** Filtrer les données en fonction de périodes spécifiques dans la base de données.\n" +
                "- **Changer de vue :** Choisissez entre les vues Carte simple et Carte double pour la visualisation des données.\n" +
                "- **Modes de chronologie :** Basculer entre les vues saisonnières et mensuelles.\n" +
                "- **Options de visualisation cartographique :** Basculer entre les cartes en grappes et les cartes thermiques.\n" +
                "- **Options de filtrage :** Affiner les données par type d'infection, espèce et provenance.\n" +
                "- **Glissière temporelle et commandes de lecture :** Naviguez dans les données à l'aide d'une glissière temporelle et de commandes de lecture.\n" +
                "- **Capture de rapport PDF :** Imprimez un rapport PDF détaillé de la vue actuelle.\n" +
                "Pour les administrateurs :\n" +
                "- **Connexion et visualisation de la base de données :** Accès sécurisé à la visualisation et à la gestion de la base de données.\n" +
                "- **Mise à jour de la base de données :** Possibilité de mettre à jour ou de télécharger de nouvelles bases de données à des fins d'analyse."
            , "aboutContent": "Le tableau de bord des cas de grippe aviaire offre une plateforme complète et interactive pour explorer les épidémies de grippe aviaire. Le suivi de ces cas est essentiel pour prévenir les épidémies potentielles chez l'homme et préserver la santé publique.",
            avianFluTitle: 'Qu’est-ce que la grippe aviaire?',
            avianFluContent:
                'La grippe aviaire, communément appelée grippe aviaire, est une maladie virale hautement contagieuse qui affecte les oiseaux sauvages et domestiques. Elle est causée par les virus de la grippe de type A, qui ont plusieurs sous-types, y compris H5N1, H5N2, H7N2 et H7N8. Certaines souches, en particulier H5N1, sont connues pour causer des maladies graves chez les humains, bien que les infections humaines soient rares et se produisent généralement par contact direct ou étroit avec des oiseaux infectés ou des environnements contaminés.',
            contextTitle: 'Contexte global et régional',
            foph:
                'L’[Office fédéral de la santé publique (OFSP), Suisse](https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/vogelgrippe-h5n1.html) surveille les épidémies de grippe aviaire et fournit des conseils en matière de santé publique en Suisse. Ils insistent sur l’importance de prévenir la propagation du virus parmi les populations d’oiseaux et soulignent le risque rare mais grave de transmission aux humains.',
            who:
                'L’[Organisation mondiale de la Santé (OMS)](https://www.who.int/europe/health-topics/Influenza-avian-and-other-zoonotic) suit les épidémies de grippe aviaire dans le monde entier, fournissant des mises à jour sur les cas chez les oiseaux et les humains. Les directives de l’OMS se concentrent sur la prévention des infections humaines par des mesures telles que la surveillance des populations d’oiseaux, le contrôle des épidémies et l’information du public sur les risques. Plus de détails sont disponibles sur les [dernières nouvelles sur les épidémies](https://www.who.int/emergencies/disease-outbreak-news/item/2024-DON520).',
            ec:
                'La [Commission européenne, Direction générale de la santé et de la sécurité alimentaire](https://food.ec.europa.eu/animals/animal-diseases/diseases-and-control-measures/avian-influenza_en) supervise la lutte et la prévention de la grippe aviaire au sein de l’Union européenne. Ils travaillent sur des efforts coordonnés pour gérer les épidémies dans les populations animales afin de protéger à la fois la santé publique et le secteur agricole.',
            importanceTitle: 'Importance de la surveillance et de la prévention',
            importanceContent:
                'La surveillance continue de la grippe aviaire est essentielle pour prévenir les épidémies généralisées chez les oiseaux et protéger la santé publique. La surveillance aide à identifier les nouvelles souches qui peuvent poser des risques pour les humains et permet des réponses rapides, telles que l’abattage des oiseaux infectés, la restriction des mouvements et l’amélioration des mesures de biosécurité. La sensibilisation et la coopération du public sont également essentielles pour atténuer l’impact de la grippe aviaire.',
            dashboardTitle: 'Tableau de bord des cas de grippe aviaire',
            play: 'Jouer',
            pause: 'Pause',
            reset: 'Réinitialiser',
            options: 'Options',
            showClusterMap: 'Afficher la carte des clusters',
            showHeatMap: 'Afficher la carte de chaleur',
            showSeasons: 'Afficher les saisons',
            showMonths: 'Afficher les mois',
            infectionType: 'Type d\'infection',
            species: 'Espèces',
            provenance: 'Provenance',
            seasons: {
                Spring: 'Printemps',
                Summer: 'Été',
                Autumn: 'Automne',
                Winter: 'Hiver',
            },
            months: {
                January: 'Janvier',
                February: 'Février',
                March: 'Mars',
                April: 'Avril',
                May: 'Mai',
                June: 'Juin',
                July: 'Juillet',
                August: 'Août',
                September: 'Septembre',
                October: 'Octobre',
                November: 'Novembre',
                December: 'Décembre',
            },
            adminLogin: 'Connexion administrateur',
            username: "Nom d'utilisateur",
            password: 'Mot de passe',
            login: 'Connexion',
            logout: 'Déconnexion',
            invalidCredentials: 'Identifiants invalides. Veuillez réessayer.',
            fetchError: 'Échec de la récupération des données.',
            databaseManagement: 'Gestion de la base de données',
            noData: 'Aucune donnée disponible à afficher.',
            latitude: 'Latitude',
            longitude: 'Longitude',
            date: 'Date',
            fluType: 'Type de grippe',
            none: 'Aucun',
            database: 'Base de données',
            contact: 'Contact',
            contactUs: 'Contactez-nous',
            contactMessage: 'Si vous avez des questions ou des commentaires, n’hésitez pas à nous contacter à :',
            doubleMapView: 'Double vue sur la carte',
            time: 'Temps',
            uploadTitle: 'Téléchargez votre propre fichier :',
            selectFile: 'Sélectionner un fichier',
            submit: 'Envoyer',
            selectDatabase: 'Sélectionner la base de données ',
            singleMapView: 'Vue Carte Unique',
            fromDate: 'Date De Début',
            toDate: 'Date De Fin',
            dashboardControl: 'Contrôle du tableau de bord',
        },
    },
    de: {
        translation: {
            dashboard: 'Armaturenbrett',
            about: 'Über',
            language: 'Sprache:',
            aboutTitle: 'Über das Dashboard zu Vogelgrippefällen',
            toolbarTitle: 'Vogelgrippe-Dashboard',
            "dashboardFeaturesContent": "Das Vogelgrippe-Dashboard bietet die folgenden Funktionen:\n" +
                "- **Wählen Sie eine bestimmte Datenbank aus:** Wählen Sie aus den verfügbaren Datenbanken, um relevante Daten anzuzeigen.\n" +
                "- **Datenstandorte vergleichen:** Analysieren und vergleichen Sie Vogelgrippefälle in verschiedenen Regionen.\n" +
                "- **Wählen Sie einen bestimmten Zeitraum aus:** Filtern Sie die Daten nach bestimmten Zeiträumen in der Datenbank.\n" +
                "- **Ansicht wechseln:** Wählen Sie zwischen Einzelkarten- und Doppelkartenansichten zur Datenvisualisierung.\n" +
                "- **Zeitleistenmodi:** Wechseln Sie zwischen saisonalen und monatlichen Ansichten.\n" +
                "- **Kartenansichtsoptionen:** Wechseln Sie zwischen Clusterkarten und Wärmekarten.\n" +
                "- **Filteroptionen:** Verfeinern Sie die Daten nach Infektionstyp, Spezies und Herkunft.\n" +
                "- **Zeitschieberegler und Wiedergabesteuerungen:** Navigieren Sie durch die Daten mit einem Zeitschieberegler und Wiedergabesteuerungen.\n" +
                "- **PDF-Berichtserfassung:** Drucken Sie einen detaillierten PDF-Bericht der aktuellen Ansicht aus.\n" +
                "Für Administratoren:\n" +
                "- **Anmeldung und Datenbankansicht:** Sicherer Zugriff auf die Visualisierung und Verwaltung der Datenbank.\n" +
                "- **Datenbankaktualisierung:** Möglichkeit, neue Datenbanken für Analysezwecke hochzuladen oder zu aktualisieren.",
            "aboutContent": "Das Vogelgrippe-Dashboard bietet eine umfassende und interaktive Plattform zur Untersuchung von Vogelgrippeausbrüchen. Die Überwachung dieser Fälle ist entscheidend, um mögliche Ausbrüche bei Menschen zu verhindern und die öffentliche Gesundheit zu schützen.",
            avianFluTitle: 'Was ist Vogelgrippe?',
            avianFluContent:
                'Die Vogelgrippe, auch bekannt als Vogelgrippe, ist eine hoch ansteckende Viruserkrankung, die sowohl wildlebende als auch Hausvögel betrifft. Sie wird durch Influenza-A-Viren verursacht, die mehrere Subtypen haben, darunter H5N1, H5N2, H7N2 und H7N8. Einige Stämme, insbesondere H5N1, sind dafür bekannt, beim Menschen schwere Krankheiten zu verursachen, obwohl menschliche Infektionen selten sind und typischerweise durch direkten oder engen Kontakt mit infizierten Vögeln oder kontaminierten Umgebungen auftreten.',
            contextTitle: 'Globaler und regionaler Kontext',
            foph:
                'Das [Bundesamt für Gesundheit (BAG), Schweiz](https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/vogelgrippe-h5n1.html) überwacht Ausbrüche der Vogelgrippe und bietet in der Schweiz Richtlinien für die öffentliche Gesundheit. Sie betonen die Bedeutung der Verhinderung der Ausbreitung des Virus unter Vogelpopulationen und heben das seltene, aber ernsthafte Risiko einer Übertragung auf den Menschen hervor.',
            who:
                'Die [Weltgesundheitsorganisation (WHO)](https://www.who.int/europe/health-topics/Influenza-avian-and-other-zoonotic) verfolgt weltweit Ausbrüche der Vogelgrippe und gibt Aktualisierungen zu Fällen bei Vögeln und Menschen heraus. Die Richtlinien der WHO konzentrieren sich auf die Verhinderung menschlicher Infektionen durch Maßnahmen wie die Überwachung von Vogelpopulationen, die Bekämpfung von Ausbrüchen und die Information der Öffentlichkeit über die Risiken. Weitere Informationen finden Sie in den [aktuellen Krankheitsausbruchsnachrichten](https://www.who.int/emergencies/disease-outbreak-news/item/2024-DON520).',
            ec:
                'Die [Europäische Kommission, Generaldirektion Gesundheit und Lebensmittelsicherheit](https://food.ec.europa.eu/animals/animal-diseases/diseases-and-control-measures/avian-influenza_en) überwacht die Kontrolle und Prävention der Vogelgrippe innerhalb der Europäischen Union. Sie arbeiten an koordinierten Bemühungen, um Ausbrüche in Tierpopulationen zu bewältigen und sowohl die öffentliche Gesundheit als auch den Agrarsektor zu schützen.',
            importanceTitle: 'Bedeutung der Überwachung und Prävention',
            importanceContent:
                'Die kontinuierliche Überwachung der Vogelgrippe ist entscheidend, um weit verbreitete Ausbrüche bei Vögeln zu verhindern und die öffentliche Gesundheit zu schützen. Die Überwachung hilft, neue Stämme zu identifizieren, die Risiken für Menschen darstellen könnten, und ermöglicht rechtzeitige Maßnahmen wie die Tötung infizierter Vögel, Bewegungseinschränkungen und die Verbesserung von Biosicherheitsmaßnahmen. Öffentliches Bewusstsein und Zusammenarbeit sind ebenfalls entscheidend, um die Auswirkungen der Vogelgrippe zu mildern.',
            dashboardTitle: 'Vogelgrippe-Fälle Dashboard',
            play: 'Abspielen',
            pause: 'Pause',
            reset: 'Zurücksetzen',
            options: 'Optionen',
            showClusterMap: 'Cluster-Karte anzeigen',
            showHeatMap: 'Heatmap anzeigen',
            showSeasons: 'Saisons anzeigen',
            showMonths: 'Monate anzeigen',
            infectionType: 'Infektionstyp',
            species: 'Arten',
            provenance: 'Herkunft',
            seasons: {
                Spring: 'Frühling',
                Summer: 'Sommer',
                Autumn: 'Herbst',
                Winter: 'Winter',
            },
            months: {
                January: 'Januar',
                February: 'Februar',
                March: 'März',
                April: 'April',
                May: 'Mai',
                June: 'Juni',
                July: 'Juli',
                August: 'August',
                September: 'September',
                October: 'Oktober',
                November: 'November',
                December: 'Dezember',
            },
            adminLogin: 'Admin Anmeldung',
            username: 'Benutzername',
            password: 'Passwort',
            login: 'Anmelden',
            logout: 'Abmelden',
            invalidCredentials: 'Ungültige Anmeldeinformationen. Bitte versuchen Sie es erneut.',
            fetchError: 'Daten konnten nicht abgerufen werden.',
            databaseManagement: 'Datenbankverwaltung',
            noData: 'Keine Daten zum Anzeigen verfügbar.',
            latitude: 'Breite',
            longitude: 'Länge',
            date: 'Datum',
            fluType: 'Grippetyp',
            none: 'Keine',
            database: 'Datenbank',
            contact: 'Kontakt',
            contactUs: 'Kontaktieren Sie uns',
            contactMessage: 'Wenn Sie Fragen oder Feedback haben, können Sie uns gerne kontaktieren unter:',
            doubleMapView: 'Doppelte Kartenansicht',
            time: 'Zeit',
            uploadTitle: 'Eigene Datei hochladen:',
            selectFile: 'Datei auswählen',
            submit: 'Senden',
            selectDatabase: 'Datenbank auswählen',
            singleMapView: 'Einzelkarte Ansicht',
            fromDate: 'Von Datum',
            toDate: 'Bis Datum',
            dashboardControl: 'Dashboard-Steuerung',
        },
    },

    it: {
        translation: {
            dashboard: 'Pannello di controllo',
            about: 'Informazioni',
            language: 'Lingua:',
            aboutTitle: 'Informazioni sul pannello dei casi di influenza aviaria',
            toolbarTitle: 'Pannello di controllo dell\'influenza aviaria',
            "dashboardFeaturesContent": "Il dashboard dei casi di influenza aviaria offre le seguenti funzionalità:\n" +
                "- **Scegli un database specifico:** Seleziona tra i database disponibili per visualizzare i dati pertinenti.\n" +
                "- **Confronta i dati tra le località:** Analizza e confronta i casi di influenza aviaria in diverse regioni.\n" +
                "- **Scegli un periodo specifico:** Filtra i dati in base a periodi specifici nel database.\n" +
                "- **Cambia vista:** Scegli tra visualizzazioni della mappa singola e doppia per la visualizzazione dei dati.\n" +
                "- **Modalità della linea temporale:** Passa tra le visualizzazioni stagionali e mensili.\n" +
                "- **Opzioni di visualizzazione della mappa:** Passa tra mappe a cluster e mappe di calore.\n" +
                "- **Opzioni di filtro:** Affina i dati per tipo di infezione, specie e provenienza.\n" +
                "- **Cursore temporale e controlli di riproduzione:** Naviga nei dati utilizzando un cursore temporale e controlli di riproduzione.\n" +
                "- **Funzione di cattura report PDF:** Stampa un report PDF dettagliato della vista attuale.\n" +
                "Per gli amministratori:\n" +
                "- **Accesso e visualizzazione del database:** Accesso sicuro alla visualizzazione e gestione del database.\n" +
                "- **Aggiornamento del database:** Possibilità di caricare o aggiornare nuovi database per scopi di analisi.",
            "aboutContent": "Il dashboard dei casi di influenza aviaria offre una piattaforma completa e interattiva per esplorare le epidemie di influenza aviaria. Il monitoraggio di questi casi è essenziale per prevenire potenziali focolai tra gli esseri umani e proteggere la salute pubblica.",
            avianFluTitle: 'Cos’è l’influenza aviaria?',
            avianFluContent:
                'L’influenza aviaria, comunemente nota come influenza aviaria, è una malattia virale altamente contagiosa che colpisce sia gli uccelli selvatici che quelli domestici. È causata dai virus dell’influenza di tipo A, che comprendono diversi sottotipi, tra cui H5N1, H5N2, H7N2 e H7N8. Alcuni ceppi, in particolare H5N1, sono noti per causare malattie gravi negli esseri umani, sebbene le infezioni umane siano rare e si verifichino generalmente attraverso il contatto diretto o ravvicinato con uccelli infetti o ambienti contaminati.',
            contextTitle: 'Contesto globale e regionale',
            foph:
                'L’[Ufficio federale della sanità pubblica (UFSP), Svizzera](https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/vogelgrippe-h5n1.html) monitora i focolai di influenza aviaria e fornisce indicazioni sulla salute pubblica in Svizzera. Sottolineano l’importanza di prevenire la diffusione del virus tra le popolazioni di uccelli e evidenziano il raro ma grave rischio di trasmissione agli esseri umani.',
            who:
                'L’[Organizzazione Mondiale della Sanità (OMS)](https://www.who.int/europe/health-topics/Influenza-avian-and-other-zoonotic) monitora i focolai di influenza aviaria a livello globale, fornendo aggiornamenti sui casi negli uccelli e negli esseri umani. Le linee guida dell’OMS si concentrano sulla prevenzione delle infezioni umane attraverso misure come il monitoraggio delle popolazioni di uccelli, il controllo dei focolai e l’informazione al pubblico sui rischi. Maggiori dettagli sono disponibili nelle [notizie recenti sugli epidemie](https://www.who.int/emergencies/disease-outbreak-news/item/2024-DON520).',
            ec:
                'La [Commissione europea, Direzione generale per la salute e la sicurezza alimentare](https://food.ec.europa.eu/animals/animal-diseases/diseases-and-control-measures/avian-influenza_en) supervisiona il controllo e la prevenzione dell’influenza aviaria all’interno dell’Unione Europea. Lavorano su sforzi coordinati per gestire i focolai nelle popolazioni animali per proteggere sia la salute pubblica che il settore agricolo.',
            importanceTitle: 'Importanza del monitoraggio e della prevenzione',
            importanceContent:
                'Il monitoraggio continuo dell’influenza aviaria è essenziale per prevenire focolai diffusi tra gli uccelli e proteggere la salute pubblica. La sorveglianza aiuta a identificare nuovi ceppi che potrebbero rappresentare rischi per gli esseri umani e consente risposte tempestive, come l’abbattimento degli uccelli infetti, la restrizione dei movimenti e il miglioramento delle misure di biosicurezza. La consapevolezza e la cooperazione pubblica sono anche cruciali per mitigare l’impatto dell’influenza aviaria.',
            dashboardTitle: 'Cruscotto dei casi di influenza aviaria',
            play: 'Giocare',
            pause: 'Pausa',
            reset: 'Ripristina',
            options: 'Opzioni',
            showClusterMap: 'Mostra mappa cluster',
            showHeatMap: 'Mostra Heatmap',
            showSeasons: 'Mostra stagioni',
            showMonths: 'Mostra mesi',
            infectionType: 'Tipo di infezione',
            species: 'Specie',
            provenance: 'Provenienza',
            seasons: {
                Spring: 'Primavera',
                Summer: 'Estate',
                Autumn: 'Autunno',
                Winter: 'Inverno',
            },
            months: {
                January: 'Gennaio',
                February: 'Febbraio',
                March: 'Marzo',
                April: 'Aprile',
                May: 'Maggio',
                June: 'Giugno',
                July: 'Luglio',
                August: 'Agosto',
                September: 'Settembre',
                October: 'Ottobre',
                November: 'Novembre',
                December: 'Dicembre',
            },
            adminLogin: 'Accesso amministratore',
            username: 'Nome utente',
            password: 'Password',
            login: 'Accedi',
            logout: 'Disconnetti',
            invalidCredentials: 'Credenziali non valide. Per favore riprova.',
            fetchError: 'Impossibile recuperare i dati.',
            databaseManagement: 'Gestione del database',
            noData: 'Nessun dato disponibile da visualizzare.',
            latitude: 'Latitudine',
            longitude: 'Longitudine',
            date: 'Data',
            fluType: 'Tipo di influenza',
            none: 'Nessuno',
            database: 'Database',
            contact: 'Contattaci',
            contactUs: 'Contattaci',
            contactMessage: 'Se hai domande o feedback, non esitare a contattarci a:',
            doubleMapView: 'Vista mappa doppia',
            time: 'Tempo',
            uploadTitle: 'Carica il tuo file:',
            selectFile: 'Seleziona file',
            submit: 'Invia',
            selectDatabase: 'Seleziona database',
            singleMapView: 'Vista Mappa Singola',
            fromDate: 'Data Di Inizio',
            toDate: 'Data Di Fine',
            dashboardControl: 'Controllo del cruscotto',
        },
    },
};

// Initialize i18n with the resources and default configurations
i18n
    .use(initReactI18next) // Use the React-i18next plugin
    .init({
        resources, // Load the translation resources defined above
        lng: 'en', // Set the default language to English
        interpolation: {
            escapeValue: false, // Disable escaping because React already handles XSS protection
        },
    });

export default i18n;