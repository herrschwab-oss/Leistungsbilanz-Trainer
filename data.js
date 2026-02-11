const BOP_STRUCTURE = {
    name: "Zahlungsbilanz",
    description: "Gesamtheitsrechnung aller wirtschaftlichen Transaktionen zwischen Inländern und Ausländern.",
    details: "Die Zahlungsbilanz ist das 'Kassenbuch' einer Volkswirtschaft. Nach dem Prinzip der doppelten Buchführung ist sie formal immer ausgeglichen.<br><br>Sie gliedert sich in vier Hauptbereiche:<br>1. <strong>Leistungsbilanz</strong><br>2. <strong>Vermögensänderungsbilanz</strong><br>3. <strong>Kapitalbilanz</strong><br>4. <strong>Restposten</strong>",
    children: [
        {
            name: "Leistungsbilanz (LB)",
            id: "lb",
            description: "Austausch von Gütern, Dienstleistungen sowie Einkommen.",
            details: "Die Leistungsbilanz erfasst den realwirtschaftlichen Austausch. Sie setzt sich zusammen aus:<br>• <strong>Handelsbilanz</strong> (Waren)<br>• <strong>Dienstleistungsbilanz</strong><br>• <strong>Einkommensbilanz</strong> (Primäreinkommen)<br>• <strong>Übertragungsbilanz</strong> (Sekundäreinkommen).",
            children: [
                {
                    name: "Handelsbilanz", id: "hb",
                    description: "Warenexporte und -importe.",
                    details: "Hier werden Waren (Autos, Maschinen) erfasst. Exporte = Geld kommt rein (+), Importe = Geld geht raus (-).",
                    impact: "Verkauf eines Autos: Positiv (+) für die Handelsbilanz.",
                    examples: "Ausfuhr von Maschinen, Einfuhr von Rohstoffen."
                },
                {
                    name: "Dienstleistungsbilanz", id: "db",
                    description: "Dienstleistungen, Tourismus, Transport.",
                    details: "Erfasst 'unsichtbare' Leistungen. Wenn Deutsche im Ausland Urlaub machen, zählt das als Import (Geld fließt ab).",
                    impact: "Urlaub in den USA: Negativ (-) für die Dienstleistungsbilanz, da Geld aus Deutschland abfließt.",
                    examples: "Urlaub eines Deutschen in den USA, Transportleistungen durch Reedereien."
                },
                {
                    name: "Einkommensbilanz (Primäreinkommen)", id: "pe",
                    description: "Erwerbs- und Vermögenseinkommen.",
                    details: "Zahlungen für den Einsatz von Arbeit und Kapital. Werden Inländer vom Ausland bezahlt (z.B. Zinsen), ist das ein Zufluss (+).",
                    impact: "Deutsche Bank erhält Zinsen aus den USA: Positiver (+) Zufluss.",
                    examples: "Zinsen auf ausländische Bankguthaben, Dividenden von Aktien, Grenzgängerlöhne."
                },
                {
                    name: "Übertragungsbilanz (Sekundäreinkommen)", id: "se",
                    description: "Laufende Übertragungen.",
                    details: "Hier geht es um 'laufende' (regelmäßige) Zahlungen ohne Gegenleistung. Geld fließt, ohne dass Waren oder Dienste zurückkommen.",
                    impact: "Deutschland zahlt EU-Beitrag: Geld fließt ab (-).",
                    examples: "Entwicklungszusammenarbeit, Beiträge an EU, Heimatüberweisungen von Migranten."
                }
            ]
        },
        {
            name: "Vermögensänderungsbilanz", id: "vb",
            description: "Einmalige Vermögensübertragungen.",
            details: "Die Vermögensänderungsbilanz umfasst einmalige Kapitalübertragungen ohne Gegenleistung (z.B. Schuldenerlass). Sie ist meist deutlich kleiner als die Leistungsbilanz.",
            impact: "Schuldenerlass für ein Land: Einmaliger Abfluss (-) an Vermögenswerten.",
            examples: "Schuldenerlass, Erbschaften, Vermögen von Auswanderern."
        },
        {
            name: "Kapitalbilanz (KB)",
            id: "kb",
            description: "Finanzielle Forderungen und Verbindlichkeiten.",
            details: "Die Kapitalbilanz zeigt die finanzielle Seite. Sie umfasst:<br>• <strong>Direktinvestitionen</strong><br>• <strong>Portfolioinvestitionen</strong><br>• <strong>Sonstige Investitionen</strong><br>• <strong>Währungsreserven</strong>.",
            children: [
                {
                    name: "Direktinvestitionen", id: "di",
                    description: "Beteiligungen an Unternehmen im Ausland.",
                    details: "Langfristige Investitionen mit dem Ziel der unternehmerischen Kontrolle. <strong>Wichtig:</strong> Eine Zunahme von Vermögen im Ausland (Aktiva) wird als Minus (-) gebucht.",
                    impact: "VW baut Werk in China: Zunahme der Forderungen (Aktiva-Zunahme) = Minus (-).",
                    examples: "Gründung einer Zweigstelle, Kauf einer Firma."
                },
                {
                    name: "Portfolioinvestitionen", id: "wa",
                    description: "Wertpapieranlagen (Aktien, Anleihen).",
                    details: "Handel mit Finanzinstrumenten als reine Anlage. <strong>Merke:</strong> Kaufst du US-Aktien, steigen deine Forderungen = Minus (-).",
                    impact: "Kauf von US-Aktien: Zunahme der Forderungen (Aktiva-Zunahme) = Minus (-).",
                    examples: "Kauf von Staatsanleihen, Aktienpakete."
                },
                {
                    name: "Sonstige Investitionen", id: "sk",
                    description: "Bankguthaben, Kredite, Darlehen.",
                    details: "Hier landen oft die Gegenbuchungen für Warenkäufe (Banküberweisungen). <strong>Wichtig:</strong> Erhältst du Geld auf dein Konto, steigt deine Forderung = Minus (-).",
                    impact: "Zahlungseingang aus Indien: Dein Guthaben steigt (Aktiva-Zunahme) = Minus (-).",
                    examples: "Zunahme von Bankguthaben, Kredite."
                },
                {
                    name: "Währungsreserven", id: "wr",
                    description: "Gold und Devisen der Zentralbank.",
                    details: "Bestände der Zentralbank zur Steuerung der Währung. Zunahme der Reserven = Aktiva-Zunahme = Minus (-).",
                    impact: "Kauf von Devisen durch die Bundesbank: Zunahme der Reserven = Minus (-).",
                    examples: "Verkauf von Gold, Devisenhandel der Bundesbank."
                }
            ]
        },
        {
            name: "Restposten", id: "rp",
            description: "Statistische Ungenauigkeiten.",
            details: "Formaler Ausgleichsposten für Daten aus unterschiedlichen Quellen. In der Realität weichen die erfassten Ströme aufgrund statistischer Ungenauigkeiten ab.",
            impact: "Saldenausgleich, wenn LB+VB+KB nicht genau Null ergibt.",
            examples: "Nicht erfassbare Kleingeschäfte."
        }
    ]
};

const QUIZ_QUESTIONS = [
    {
        text: "Ein deutscher Ferienhausbesitzer in Spanien erhält Mieteinnahmen.",
        category: "pe",
        feedback: "Mieteinnahmen sind laufende Erträge aus Kapital (Einkommensbilanz)."
    },
    {
        text: "Deutschland zahlt regelmäßig Gelder in den EU-Haushalt.",
        category: "se",
        feedback: "Dies ist eine laufende Übertragung (Übertragungsbilanz)."
    },
    {
        text: "Ein US-amerikanisches Unternehmen kauft eine deutsche Softwarefirma komplett.",
        category: "di",
        feedback: "Direktinvestition! Eine langfristige Beteiligung mit Kontrolle."
    },
    {
        text: "Ein deutsches Unternehmen exportiert Chemikalien nach Brasilien.",
        category: "hb",
        feedback: "Handelsbilanz – der Export von Waren."
    },
    {
        text: "Die Bundesregierung erlässt einem Staat einmalig hohe Schulden.",
        category: "vb",
        feedback: "Einmalige Vermögensübertragungen gehören in die Vermögensänderungsbilanz."
    }
];

const BOOKING_SCENARIOS = [
    {
        id: 1,
        title: "Warenexport",
        event: "Exporte von Maschinen nach Indien (100.000 €). Bezahlung erfolgt durch Überweisung auf ein deutsches Bankkonto.",
        logic: {
            sideA: { bill: "hb", type: "Plus", amount: 100000, label: "Export (Einnahme)" },
            sideB: { bill: "sk", type: "Minus", amount: 100000, label: "Geldzufluss (Forderungszunahme = Minus)" }
        }
    },
    {
        id: 2,
        title: "Urlaub im Ausland",
        event: "Hotelzahlung in USA (5.000 €) via Kreditkarte.",
        logic: {
            sideA: { bill: "db", type: "Minus", amount: 5000, label: "Import Leistung (Ausgabe)" },
            sideB: { bill: "sk", type: "Plus", amount: 5000, label: "Zunahme Verbindlichkeit (Passiva-Zunahme = Plus)" }
        }
    },
    {
        id: 3,
        title: "Portfolioinvestition",
        event: "Ein deutscher Anleger kauft US-Staatsanleihen im Wert von 20.000 €. Die Bezahlung erfolgt über sein deutsches Bankkonto.",
        logic: {
            sideA: { bill: "wa", type: "Minus", amount: 20000, label: "Wertpapierkauf (Aktiva-Zunahme = Minus)" },
            sideB: { bill: "sk", type: "Plus", amount: 20000, label: "Geldabfluss/Bankguthaben sinkt (Aktiva-Abnahme = Plus)" }
        }
    },
    {
        id: 4,
        title: "Primäreinkommen (Gehalt)",
        event: "Ein Grenzgänger aus Deutschland arbeitet in der Schweiz und erhält sein Monatsgehalt von 6.000 € auf sein deutsches Konto überwiesen.",
        logic: {
            sideA: { bill: "pe", type: "Plus", amount: 6000, label: "Erwerbseinkommen aus dem Ausland (Zufluss)" },
            sideB: { bill: "sk", type: "Minus", amount: 6000, label: "Geldzufluss/Bankguthaben steigt (Aktiva-Zunahme = Minus)" }
        }
    }
];
