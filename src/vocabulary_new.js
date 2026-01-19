/**
 * German Citizenship Test Vocabulary
 * 
 * Each entry contains:
 * - de: German word/phrase (with article for nouns)
 * - en: English translation
 * - word: Core word without article (for matching)
 * - forms: All grammatical forms (cases, conjugations, plurals)
 * - gender: masculine, feminine, neuter, or none (for verbs/adjectives)
 * - wordType: noun, verb, adjective, etc.
 * - category: Thematic category
 * - example_de/example_en: Example usage
 */

export const CITIZENSHIP_VOCABULARY = [
  // ============================================
  // GOVERNMENT & POLITICS
  // ============================================
  {
    "de": "die Regierung",
    "en": "government",
    "word": "Regierung",
    "forms": ["die Regierung", "der Regierung", "die Regierungen", "einer Regierung", "Regierung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen.",
    "example_en": "In Germany, people can openly say something against the government."
  },
  {
    "de": "der Staat",
    "en": "state",
    "word": "Staat",
    "forms": ["der Staat", "des Staates", "dem Staat", "den Staat", "die Staaten", "Staat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Staat muss sich an die Gesetze halten.",
    "example_en": "The state must comply with the laws."
  },
  {
    "de": "der Bundesstaat",
    "en": "federal state",
    "word": "Bundesstaat",
    "forms": ["der Bundesstaat", "des Bundesstaates", "dem Bundesstaat", "den Bundesstaat", "die Bundesstaaten", "Bundesstaat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Deutschland ist ein demokratischer und sozialer Bundesstaat.",
    "example_en": "Germany is a democratic and social federal state."
  },
  {
    "de": "der Rechtsstaat",
    "en": "constitutional state / rule of law",
    "word": "Rechtsstaat",
    "forms": ["der Rechtsstaat", "des Rechtsstaates", "dem Rechtsstaat", "den Rechtsstaat", "Rechtsstaat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Deutschland ist ein Rechtsstaat.",
    "example_en": "Germany is a constitutional state."
  },
  {
    "de": "der Sozialstaat",
    "en": "welfare state",
    "word": "Sozialstaat",
    "forms": ["der Sozialstaat", "des Sozialstaates", "dem Sozialstaat", "den Sozialstaat", "Sozialstaat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Deutschland ist auch ein Sozialstaat.",
    "example_en": "Germany is also a welfare state."
  },
  {
    "de": "das Grundgesetz",
    "en": "Basic Law / constitution",
    "word": "Grundgesetz",
    "forms": ["das Grundgesetz", "des Grundgesetzes", "dem Grundgesetz", "Grundgesetz", "im Grundgesetz"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Grundgesetz ist die Verfassung von Deutschland.",
    "example_en": "The Basic Law is the constitution of Germany."
  },
  {
    "de": "die Verfassung",
    "en": "constitution",
    "word": "Verfassung",
    "forms": ["die Verfassung", "der Verfassung", "die Verfassungen", "Verfassung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Wie heißt die deutsche Verfassung?",
    "example_en": "What is the German constitution called?"
  },
  {
    "de": "der Bundestag",
    "en": "Federal Parliament / Bundestag",
    "word": "Bundestag",
    "forms": ["der Bundestag", "des Bundestages", "dem Bundestag", "den Bundestag", "im Bundestag", "Bundestag"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Bundestag beschließt in Deutschland ein neues Gesetz.",
    "example_en": "The Bundestag passes a new law in Germany."
  },
  {
    "de": "der Bundesrat",
    "en": "Federal Council / Bundesrat",
    "word": "Bundesrat",
    "forms": ["der Bundesrat", "des Bundesrates", "dem Bundesrat", "den Bundesrat", "im Bundesrat", "Bundesrat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Bundesrat vertritt die Interessen der Bundesländer.",
    "example_en": "The Federal Council represents the interests of the federal states."
  },
  {
    "de": "die Bundesregierung",
    "en": "Federal Government",
    "word": "Bundesregierung",
    "forms": ["die Bundesregierung", "der Bundesregierung", "Bundesregierung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Bundesregierung besteht aus dem Bundeskanzler und den Ministern.",
    "example_en": "The Federal Government consists of the Federal Chancellor and the ministers."
  },
  {
    "de": "der Bundeskanzler",
    "en": "Federal Chancellor (male)",
    "word": "Bundeskanzler",
    "forms": ["der Bundeskanzler", "des Bundeskanzlers", "dem Bundeskanzler", "den Bundeskanzler", "Bundeskanzler"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Bundeskanzler wird vom Bundestag gewählt.",
    "example_en": "The Federal Chancellor is elected by the Bundestag."
  },
  {
    "de": "die Bundeskanzlerin",
    "en": "Federal Chancellor (female)",
    "word": "Bundeskanzlerin",
    "forms": ["die Bundeskanzlerin", "der Bundeskanzlerin", "Bundeskanzlerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Angela Merkel war deutsche Bundeskanzlerin.",
    "example_en": "Angela Merkel was the German Federal Chancellor."
  },
  {
    "de": "der Bundespräsident",
    "en": "Federal President (male)",
    "word": "Bundespräsident",
    "forms": ["der Bundespräsident", "des Bundespräsidenten", "dem Bundespräsidenten", "den Bundespräsidenten", "Bundespräsident"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Bundespräsident ist das Staatsoberhaupt.",
    "example_en": "The Federal President is the head of state."
  },
  {
    "de": "die Bundespräsidentin",
    "en": "Federal President (female)",
    "word": "Bundespräsidentin",
    "forms": ["die Bundespräsidentin", "der Bundespräsidentin", "Bundespräsidentin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Bundespräsidentin repräsentiert Deutschland.",
    "example_en": "The Federal President represents Germany."
  },
  {
    "de": "das Parlament",
    "en": "parliament",
    "word": "Parlament",
    "forms": ["das Parlament", "des Parlaments", "dem Parlament", "die Parlamente", "im Parlament", "Parlament"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Parlament beschließt die Gesetze.",
    "example_en": "The parliament passes the laws."
  },
  {
    "de": "die Partei",
    "en": "political party",
    "word": "Partei",
    "forms": ["die Partei", "der Partei", "die Parteien", "einer Partei", "Partei"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Eine Partei im Deutschen Bundestag will die Pressefreiheit abschaffen.",
    "example_en": "A party in the German Bundestag wants to abolish press freedom."
  },
  {
    "de": "die Koalition",
    "en": "coalition",
    "word": "Koalition",
    "forms": ["die Koalition", "der Koalition", "die Koalitionen", "einer Koalition", "Koalition"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Regierungsparteien bilden eine Koalition.",
    "example_en": "The governing parties form a coalition."
  },
  {
    "de": "die Opposition",
    "en": "opposition",
    "word": "Opposition",
    "forms": ["die Opposition", "der Opposition", "Opposition"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Opposition kontrolliert die Regierung.",
    "example_en": "The opposition monitors the government."
  },
  {
    "de": "die Fraktion",
    "en": "parliamentary group / faction",
    "word": "Fraktion",
    "forms": ["die Fraktion", "der Fraktion", "die Fraktionen", "einer Fraktion", "Fraktion"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Jede Partei im Bundestag bildet eine Fraktion.",
    "example_en": "Each party in the Bundestag forms a parliamentary group."
  },
  {
    "de": "der Abgeordnete",
    "en": "member of parliament (male)",
    "word": "Abgeordnete",
    "forms": ["der Abgeordnete", "des Abgeordneten", "dem Abgeordneten", "den Abgeordneten", "die Abgeordneten", "Abgeordnete"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Abgeordneten im Bundestag vertreten das Volk.",
    "example_en": "The members of parliament in the Bundestag represent the people."
  },
  {
    "de": "die Abgeordnete",
    "en": "member of parliament (female)",
    "word": "Abgeordnete",
    "forms": ["die Abgeordnete", "der Abgeordneten", "die Abgeordneten", "Abgeordnete"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Jede Abgeordnete hat eine Stimme im Parlament.",
    "example_en": "Each member of parliament has a vote in parliament."
  },
  {
    "de": "der Minister",
    "en": "minister (male)",
    "word": "Minister",
    "forms": ["der Minister", "des Ministers", "dem Minister", "den Minister", "die Minister", "Minister"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Minister leitet ein Ministerium.",
    "example_en": "The minister heads a ministry."
  },
  {
    "de": "die Ministerin",
    "en": "minister (female)",
    "word": "Ministerin",
    "forms": ["die Ministerin", "der Ministerin", "die Ministerinnen", "Ministerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Ministerin wird vom Bundeskanzler ernannt.",
    "example_en": "The minister is appointed by the Federal Chancellor."
  },
  {
    "de": "das Ministerium",
    "en": "ministry",
    "word": "Ministerium",
    "forms": ["das Ministerium", "des Ministeriums", "dem Ministerium", "die Ministerien", "Ministerium"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Ministerium ist für bestimmte Aufgaben zuständig.",
    "example_en": "The ministry is responsible for certain tasks."
  },
  {
    "de": "der Ministerpräsident",
    "en": "minister president / state premier (male)",
    "word": "Ministerpräsident",
    "forms": ["der Ministerpräsident", "des Ministerpräsidenten", "dem Ministerpräsidenten", "den Ministerpräsidenten", "die Ministerpräsidenten", "Ministerpräsident"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Ministerpräsident leitet die Landesregierung.",
    "example_en": "The minister president heads the state government."
  },
  {
    "de": "die Ministerpräsidentin",
    "en": "minister president / state premier (female)",
    "word": "Ministerpräsidentin",
    "forms": ["die Ministerpräsidentin", "der Ministerpräsidentin", "die Ministerpräsidentinnen", "Ministerpräsidentin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Ministerpräsidentin vertritt das Bundesland.",
    "example_en": "The minister president represents the federal state."
  },
  {
    "de": "das Bundesland",
    "en": "federal state",
    "word": "Bundesland",
    "forms": ["das Bundesland", "des Bundeslandes", "dem Bundesland", "die Bundesländer", "einem Bundesland", "Bundesland"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Deutschland hat 16 Bundesländer.",
    "example_en": "Germany has 16 federal states."
  },
  {
    "de": "der Landtag",
    "en": "state parliament",
    "word": "Landtag",
    "forms": ["der Landtag", "des Landtages", "dem Landtag", "den Landtag", "die Landtage", "im Landtag", "Landtag"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Landtag ist das Parlament eines Bundeslandes.",
    "example_en": "The Landtag is the parliament of a federal state."
  },
  {
    "de": "die Gemeinde",
    "en": "municipality / community",
    "word": "Gemeinde",
    "forms": ["die Gemeinde", "der Gemeinde", "die Gemeinden", "einer Gemeinde", "Gemeinde"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Gemeinde ist die kleinste politische Einheit.",
    "example_en": "The municipality is the smallest political unit."
  },
  {
    "de": "die Kommune",
    "en": "local government / municipality",
    "word": "Kommune",
    "forms": ["die Kommune", "der Kommune", "die Kommunen", "einer Kommune", "Kommune"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Kommune verwaltet die lokalen Angelegenheiten.",
    "example_en": "The local government manages local affairs."
  },
  {
    "de": "der Bürgermeister",
    "en": "mayor (male)",
    "word": "Bürgermeister",
    "forms": ["der Bürgermeister", "des Bürgermeisters", "dem Bürgermeister", "den Bürgermeister", "die Bürgermeister", "Bürgermeister"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Der Bürgermeister leitet die Gemeinde.",
    "example_en": "The mayor leads the municipality."
  },
  {
    "de": "die Bürgermeisterin",
    "en": "mayor (female)",
    "word": "Bürgermeisterin",
    "forms": ["die Bürgermeisterin", "der Bürgermeisterin", "die Bürgermeisterinnen", "Bürgermeisterin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Bürgermeisterin wird direkt gewählt.",
    "example_en": "The mayor is directly elected."
  },
  {
    "de": "die Behörde",
    "en": "authority / government agency",
    "word": "Behörde",
    "forms": ["die Behörde", "der Behörde", "die Behörden", "einer Behörde", "Behörde"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Man muss zur Behörde gehen, um einen Pass zu beantragen.",
    "example_en": "One must go to the authority to apply for a passport."
  },
  {
    "de": "die Verwaltung",
    "en": "administration",
    "word": "Verwaltung",
    "forms": ["die Verwaltung", "der Verwaltung", "die Verwaltungen", "Verwaltung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Verwaltung führt die Beschlüsse aus.",
    "example_en": "The administration implements the decisions."
  },

  // ============================================
  // DEMOCRACY & POLITICAL CONCEPTS
  // ============================================
  {
    "de": "die Demokratie",
    "en": "democracy",
    "word": "Demokratie",
    "forms": ["die Demokratie", "der Demokratie", "Demokratie", "eine Demokratie"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Deutschland ist eine Demokratie.",
    "example_en": "Germany is a democracy."
  },
  {
    "de": "die Diktatur",
    "en": "dictatorship",
    "word": "Diktatur",
    "forms": ["die Diktatur", "der Diktatur", "die Diktaturen", "eine Diktatur", "Diktatur"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Eine Partei will eine Diktatur errichten.",
    "example_en": "A party wants to establish a dictatorship."
  },
  {
    "de": "die Monarchie",
    "en": "monarchy",
    "word": "Monarchie",
    "forms": ["die Monarchie", "der Monarchie", "die Monarchien", "eine Monarchie", "Monarchie"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Deutschland ist keine Monarchie.",
    "example_en": "Germany is not a monarchy."
  },
  {
    "de": "die Republik",
    "en": "republic",
    "word": "Republik",
    "forms": ["die Republik", "der Republik", "die Republiken", "eine Republik", "Republik"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Deutschland ist eine Republik.",
    "example_en": "Germany is a republic."
  },
  {
    "de": "die Gewaltenteilung",
    "en": "separation of powers",
    "word": "Gewaltenteilung",
    "forms": ["die Gewaltenteilung", "der Gewaltenteilung", "Gewaltenteilung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Die Gewaltenteilung teilt die Macht zwischen Legislative, Exekutive und Judikative.",
    "example_en": "The separation of powers divides power between legislative, executive, and judiciary."
  },
  {
    "de": "die Legislative",
    "en": "legislative branch",
    "word": "Legislative",
    "forms": ["die Legislative", "der Legislative", "Legislative"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Der Bundestag gehört zur Legislative.",
    "example_en": "The Bundestag belongs to the legislative branch."
  },
  {
    "de": "die Exekutive",
    "en": "executive branch",
    "word": "Exekutive",
    "forms": ["die Exekutive", "der Exekutive", "Exekutive"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Die Regierung gehört zur Exekutive.",
    "example_en": "The government belongs to the executive branch."
  },
  {
    "de": "die Judikative",
    "en": "judicial branch",
    "word": "Judikative",
    "forms": ["die Judikative", "der Judikative", "Judikative"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Die Gerichte gehören zur Judikative.",
    "example_en": "The courts belong to the judicial branch."
  },
  {
    "de": "die Volkssouveränität",
    "en": "popular sovereignty",
    "word": "Volkssouveränität",
    "forms": ["die Volkssouveränität", "der Volkssouveränität", "Volkssouveränität"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Political Concepts",
    "example_de": "Volkssouveränität bedeutet: Alle Staatsgewalt geht vom Volke aus.",
    "example_en": "Popular sovereignty means: All state power emanates from the people."
  },

  // ============================================
  // ELECTIONS & VOTING
  // ============================================
  {
    "de": "die Wahl",
    "en": "election",
    "word": "Wahl",
    "forms": ["die Wahl", "der Wahl", "die Wahlen", "einer Wahl", "bei der Wahl", "zur Wahl", "Wahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Wahlen in Deutschland sind frei, gleich und geheim.",
    "example_en": "Elections in Germany are free, equal, and secret."
  },
  {
    "de": "die Bundestagswahl",
    "en": "federal election",
    "word": "Bundestagswahl",
    "forms": ["die Bundestagswahl", "der Bundestagswahl", "die Bundestagswahlen", "Bundestagswahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Bei der Bundestagswahl wählen die Bürger den Bundestag.",
    "example_en": "In the federal election, citizens elect the Bundestag."
  },
  {
    "de": "die Landtagswahl",
    "en": "state election",
    "word": "Landtagswahl",
    "forms": ["die Landtagswahl", "der Landtagswahl", "die Landtagswahlen", "Landtagswahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Bei der Landtagswahl wird der Landtag gewählt.",
    "example_en": "In the state election, the state parliament is elected."
  },
  {
    "de": "die Kommunalwahl",
    "en": "local election",
    "word": "Kommunalwahl",
    "forms": ["die Kommunalwahl", "der Kommunalwahl", "die Kommunalwahlen", "Kommunalwahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Bei der Kommunalwahl werden lokale Vertreter gewählt.",
    "example_en": "In the local election, local representatives are elected."
  },
  {
    "de": "die Europawahl",
    "en": "European election",
    "word": "Europawahl",
    "forms": ["die Europawahl", "der Europawahl", "die Europawahlen", "Europawahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Bei der Europawahl wählt man Abgeordnete des EU-Parlaments.",
    "example_en": "In the European election, members of the EU Parliament are elected."
  },
  {
    "de": "die Stimme",
    "en": "vote / voice",
    "word": "Stimme",
    "forms": ["die Stimme", "der Stimme", "die Stimmen", "eine Stimme", "Stimme"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Jeder Wähler hat zwei Stimmen.",
    "example_en": "Each voter has two votes."
  },
  {
    "de": "die Erststimme",
    "en": "first vote (direct candidate)",
    "word": "Erststimme",
    "forms": ["die Erststimme", "der Erststimme", "die Erststimmen", "Erststimme"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Mit der Erststimme wählt man eine Person.",
    "example_en": "With the first vote, you vote for a person."
  },
  {
    "de": "die Zweitstimme",
    "en": "second vote (party vote)",
    "word": "Zweitstimme",
    "forms": ["die Zweitstimme", "der Zweitstimme", "die Zweitstimmen", "mit der Zweitstimme", "Zweitstimme"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Mit der Zweitstimme wählt man eine Partei.",
    "example_en": "With the second vote, you vote for a party."
  },
  {
    "de": "die Stimmabgabe",
    "en": "casting a vote",
    "word": "Stimmabgabe",
    "forms": ["die Stimmabgabe", "der Stimmabgabe", "Stimmabgabe"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Die Stimmabgabe ist geheim.",
    "example_en": "Casting a vote is secret."
  },
  {
    "de": "der Stimmzettel",
    "en": "ballot paper",
    "word": "Stimmzettel",
    "forms": ["der Stimmzettel", "des Stimmzettels", "dem Stimmzettel", "die Stimmzettel", "Stimmzettel"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Man markiert seine Wahl auf dem Stimmzettel.",
    "example_en": "You mark your choice on the ballot paper."
  },
  {
    "de": "die Wahlkabine",
    "en": "voting booth",
    "word": "Wahlkabine",
    "forms": ["die Wahlkabine", "der Wahlkabine", "die Wahlkabinen", "Wahlkabine"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Man wählt in der Wahlkabine.",
    "example_en": "You vote in the voting booth."
  },
  {
    "de": "die Briefwahl",
    "en": "postal vote",
    "word": "Briefwahl",
    "forms": ["die Briefwahl", "der Briefwahl", "Briefwahl", "per Briefwahl"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Man kann auch per Briefwahl wählen.",
    "example_en": "You can also vote by postal vote."
  },
  {
    "de": "das Wahlrecht",
    "en": "right to vote / voting rights",
    "word": "Wahlrecht",
    "forms": ["das Wahlrecht", "des Wahlrechts", "dem Wahlrecht", "Wahlrecht"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Das Wahlrecht ist ein wichtiges Grundrecht.",
    "example_en": "The right to vote is an important basic right."
  },
  {
    "de": "das Wahlgeheimnis",
    "en": "secrecy of the ballot",
    "word": "Wahlgeheimnis",
    "forms": ["das Wahlgeheimnis", "des Wahlgeheimnisses", "dem Wahlgeheimnis", "Wahlgeheimnis"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Das Wahlgeheimnis schützt die freie Entscheidung.",
    "example_en": "The secrecy of the ballot protects the free decision."
  },
  {
    "de": "der Wähler",
    "en": "voter (male)",
    "word": "Wähler",
    "forms": ["der Wähler", "des Wählers", "dem Wähler", "den Wähler", "die Wähler", "Wähler"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Der Wähler darf nicht beeinflusst werden.",
    "example_en": "The voter must not be influenced."
  },
  {
    "de": "die Wählerin",
    "en": "voter (female)",
    "word": "Wählerin",
    "forms": ["die Wählerin", "der Wählerin", "die Wählerinnen", "Wählerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Die Wählerin entscheidet frei.",
    "example_en": "The voter decides freely."
  },
  {
    "de": "der Kandidat",
    "en": "candidate (male)",
    "word": "Kandidat",
    "forms": ["der Kandidat", "des Kandidaten", "dem Kandidaten", "den Kandidaten", "die Kandidaten", "Kandidat"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Der Kandidat bewirbt sich um einen Sitz im Bundestag.",
    "example_en": "The candidate is applying for a seat in the Bundestag."
  },
  {
    "de": "die Kandidatin",
    "en": "candidate (female)",
    "word": "Kandidatin",
    "forms": ["die Kandidatin", "der Kandidatin", "die Kandidatinnen", "Kandidatin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Elections",
    "example_de": "Die Kandidatin stellt sich zur Wahl.",
    "example_en": "The candidate is standing for election."
  },

  // ============================================
  // RIGHTS & FREEDOMS
  // ============================================
  {
    "de": "das Recht",
    "en": "right / law",
    "word": "Recht",
    "forms": ["das Recht", "des Rechts", "dem Recht", "die Rechte", "ein Recht", "Recht"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Jeder Mensch hat Rechte.",
    "example_en": "Every person has rights."
  },
  {
    "de": "das Grundrecht",
    "en": "basic right / fundamental right",
    "word": "Grundrecht",
    "forms": ["das Grundrecht", "des Grundrechts", "dem Grundrecht", "die Grundrechte", "ein Grundrecht", "Grundrecht"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Meinungsfreiheit ist ein Grundrecht in Deutschland.",
    "example_en": "Freedom of expression is a basic right in Germany."
  },
  {
    "de": "die Meinungsfreiheit",
    "en": "freedom of expression / freedom of speech",
    "word": "Meinungsfreiheit",
    "forms": ["die Meinungsfreiheit", "der Meinungsfreiheit", "Meinungsfreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Meinungsfreiheit in Deutschland heißt, dass ich meine Meinung äußern kann.",
    "example_en": "Freedom of expression in Germany means I can express my opinion."
  },
  {
    "de": "die Pressefreiheit",
    "en": "freedom of the press",
    "word": "Pressefreiheit",
    "forms": ["die Pressefreiheit", "der Pressefreiheit", "Pressefreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Die Pressefreiheit ist ein Grundrecht.",
    "example_en": "Freedom of the press is a basic right."
  },
  {
    "de": "die Religionsfreiheit",
    "en": "freedom of religion",
    "word": "Religionsfreiheit",
    "forms": ["die Religionsfreiheit", "der Religionsfreiheit", "Religionsfreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "In Deutschland gilt Religionsfreiheit.",
    "example_en": "Freedom of religion applies in Germany."
  },
  {
    "de": "die Versammlungsfreiheit",
    "en": "freedom of assembly",
    "word": "Versammlungsfreiheit",
    "forms": ["die Versammlungsfreiheit", "der Versammlungsfreiheit", "Versammlungsfreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Die Versammlungsfreiheit erlaubt friedliche Demonstrationen.",
    "example_en": "Freedom of assembly allows peaceful demonstrations."
  },
  {
    "de": "die Freizügigkeit",
    "en": "freedom of movement",
    "word": "Freizügigkeit",
    "forms": ["die Freizügigkeit", "der Freizügigkeit", "Freizügigkeit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Freizügigkeit bedeutet, man darf sich seinen Wohnort selbst aussuchen.",
    "example_en": "Freedom of movement means you may choose your place of residence."
  },
  {
    "de": "die Glaubensfreiheit",
    "en": "freedom of belief",
    "word": "Glaubensfreiheit",
    "forms": ["die Glaubensfreiheit", "der Glaubensfreiheit", "Glaubensfreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Die Glaubensfreiheit ist im Grundgesetz garantiert.",
    "example_en": "Freedom of belief is guaranteed in the Basic Law."
  },
  {
    "de": "die Gewissensfreiheit",
    "en": "freedom of conscience",
    "word": "Gewissensfreiheit",
    "forms": ["die Gewissensfreiheit", "der Gewissensfreiheit", "Gewissensfreiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Die Gewissensfreiheit schützt persönliche Überzeugungen.",
    "example_en": "Freedom of conscience protects personal convictions."
  },
  {
    "de": "die Menschenwürde",
    "en": "human dignity",
    "word": "Menschenwürde",
    "forms": ["die Menschenwürde", "der Menschenwürde", "Menschenwürde"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Die Würde des Menschen ist unantastbar.",
    "example_en": "Human dignity is inviolable."
  },
  {
    "de": "die Gleichberechtigung",
    "en": "equal rights / equality",
    "word": "Gleichberechtigung",
    "forms": ["die Gleichberechtigung", "der Gleichberechtigung", "Gleichberechtigung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Männer und Frauen haben in Deutschland Gleichberechtigung.",
    "example_en": "Men and women have equal rights in Germany."
  },
  {
    "de": "die Diskriminierung",
    "en": "discrimination",
    "word": "Diskriminierung",
    "forms": ["die Diskriminierung", "der Diskriminierung", "Diskriminierung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Diskriminierung ist verboten.",
    "example_en": "Discrimination is prohibited."
  },
  {
    "de": "das Asyl",
    "en": "asylum",
    "word": "Asyl",
    "forms": ["das Asyl", "des Asyls", "Asyl"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Das Grundrecht auf Asyl gilt für Ausländer.",
    "example_en": "The basic right to asylum applies to foreigners."
  },

  // ============================================
  // LAW & JUSTICE
  // ============================================
  {
    "de": "das Gesetz",
    "en": "law",
    "word": "Gesetz",
    "forms": ["das Gesetz", "des Gesetzes", "dem Gesetz", "die Gesetze", "ein Gesetz", "Gesetz"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Das Parlament beschließt ein neues Gesetz.",
    "example_en": "The parliament passes a new law."
  },
  {
    "de": "das Gericht",
    "en": "court",
    "word": "Gericht",
    "forms": ["das Gericht", "des Gerichts", "dem Gericht", "die Gerichte", "zum Gericht", "Gericht"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Man geht zum Gericht bei Rechtsfragen.",
    "example_en": "One goes to court for legal matters."
  },
  {
    "de": "das Bundesverfassungsgericht",
    "en": "Federal Constitutional Court",
    "word": "Bundesverfassungsgericht",
    "forms": ["das Bundesverfassungsgericht", "des Bundesverfassungsgerichts", "dem Bundesverfassungsgericht", "Bundesverfassungsgericht"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Das Bundesverfassungsgericht prüft die Verfassungsmäßigkeit von Gesetzen.",
    "example_en": "The Federal Constitutional Court reviews the constitutionality of laws."
  },
  {
    "de": "die Rechtsprechung",
    "en": "jurisdiction / judiciary",
    "word": "Rechtsprechung",
    "forms": ["die Rechtsprechung", "der Rechtsprechung", "Rechtsprechung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Die Rechtsprechung ist unabhängig.",
    "example_en": "The judiciary is independent."
  },
  {
    "de": "die Gesetzgebung",
    "en": "legislation",
    "word": "Gesetzgebung",
    "forms": ["die Gesetzgebung", "der Gesetzgebung", "Gesetzgebung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Die Gesetzgebung ist Aufgabe des Parlaments.",
    "example_en": "Legislation is the task of parliament."
  },
  {
    "de": "die Strafe",
    "en": "punishment / penalty",
    "word": "Strafe",
    "forms": ["die Strafe", "der Strafe", "die Strafen", "eine Strafe", "Strafe"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Die Geldstrafe ist mit dem Grundgesetz vereinbar.",
    "example_en": "The monetary fine is compatible with the Basic Law."
  },
  {
    "de": "die Geldstrafe",
    "en": "fine / monetary penalty",
    "word": "Geldstrafe",
    "forms": ["die Geldstrafe", "der Geldstrafe", "die Geldstrafen", "eine Geldstrafe", "Geldstrafe"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Die Geldstrafe ist eine mögliche Strafe.",
    "example_en": "The fine is a possible penalty."
  },
  {
    "de": "die Todesstrafe",
    "en": "death penalty",
    "word": "Todesstrafe",
    "forms": ["die Todesstrafe", "der Todesstrafe", "Todesstrafe"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Die Todesstrafe ist in Deutschland verboten.",
    "example_en": "The death penalty is prohibited in Germany."
  },
  {
    "de": "die Folter",
    "en": "torture",
    "word": "Folter",
    "forms": ["die Folter", "der Folter", "Folter"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Folter ist in Deutschland verboten.",
    "example_en": "Torture is prohibited in Germany."
  },
  {
    "de": "die Zwangsarbeit",
    "en": "forced labor",
    "word": "Zwangsarbeit",
    "forms": ["die Zwangsarbeit", "der Zwangsarbeit", "Zwangsarbeit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Law",
    "example_de": "Das Grundgesetz verbietet Zwangsarbeit.",
    "example_en": "The Basic Law prohibits forced labor."
  },

  // ============================================
  // HISTORY
  // ============================================
  {
    "de": "die DDR",
    "en": "German Democratic Republic (GDR / East Germany)",
    "word": "DDR",
    "forms": ["die DDR", "der DDR", "in der DDR", "DDR"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Die DDR existierte von 1949 bis 1990.",
    "example_en": "The GDR existed from 1949 to 1990."
  },
  {
    "de": "die BRD",
    "en": "Federal Republic of Germany (West Germany)",
    "word": "BRD",
    "forms": ["die BRD", "der BRD", "in der BRD", "BRD"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Die BRD wurde 1949 gegründet.",
    "example_en": "The FRG was founded in 1949."
  },
  {
    "de": "die Mauer",
    "en": "the Wall (Berlin Wall)",
    "word": "Mauer",
    "forms": ["die Mauer", "der Mauer", "die Mauern", "die Berliner Mauer", "Mauer"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Die Mauer in Berlin wurde 1961 gebaut.",
    "example_en": "The Wall in Berlin was built in 1961."
  },
  {
    "de": "die Wiedervereinigung",
    "en": "reunification",
    "word": "Wiedervereinigung",
    "forms": ["die Wiedervereinigung", "der Wiedervereinigung", "Wiedervereinigung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Die Wiedervereinigung Deutschlands war 1990.",
    "example_en": "German reunification was in 1990."
  },
  {
    "de": "der Nationalsozialismus",
    "en": "National Socialism / Nazism",
    "word": "Nationalsozialismus",
    "forms": ["der Nationalsozialismus", "des Nationalsozialismus", "dem Nationalsozialismus", "Nationalsozialismus"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Die Nationalsozialisten waren von 1933 bis 1945 an der Macht.",
    "example_en": "The Nazis were in power from 1933 to 1945."
  },
  {
    "de": "der Holocaust",
    "en": "Holocaust",
    "word": "Holocaust",
    "forms": ["der Holocaust", "des Holocaust", "den Holocaust", "Holocaust"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Der Holocaust war der Völkermord an den europäischen Juden.",
    "example_en": "The Holocaust was the genocide of European Jews."
  },
  {
    "de": "der Zweite Weltkrieg",
    "en": "World War II",
    "word": "Weltkrieg",
    "forms": ["der Zweite Weltkrieg", "des Zweiten Weltkriegs", "dem Zweiten Weltkrieg", "Zweite Weltkrieg", "Weltkrieg"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Der Zweite Weltkrieg endete 1945.",
    "example_en": "World War II ended in 1945."
  },
  {
    "de": "der Kalte Krieg",
    "en": "Cold War",
    "word": "Krieg",
    "forms": ["der Kalte Krieg", "des Kalten Krieges", "dem Kalten Krieg", "Kalte Krieg", "Krieg"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "History",
    "example_de": "Der Kalte Krieg war ein Konflikt zwischen Ost und West.",
    "example_en": "The Cold War was a conflict between East and West."
  },

  // ============================================
  // SOCIETY
  // ============================================
  {
    "de": "das Volk",
    "en": "people / nation",
    "word": "Volk",
    "forms": ["das Volk", "des Volkes", "dem Volk", "die Völker", "vom Volk", "Volk"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Alle Staatsgewalt geht vom Volke aus.",
    "example_en": "All state power emanates from the people."
  },
  {
    "de": "der Bürger",
    "en": "citizen (male)",
    "word": "Bürger",
    "forms": ["der Bürger", "des Bürgers", "dem Bürger", "den Bürger", "die Bürger", "Bürger"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Jeder Bürger hat das Wahlrecht.",
    "example_en": "Every citizen has the right to vote."
  },
  {
    "de": "die Bürgerin",
    "en": "citizen (female)",
    "word": "Bürgerin",
    "forms": ["die Bürgerin", "der Bürgerin", "die Bürgerinnen", "Bürgerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Jede Bürgerin kann wählen.",
    "example_en": "Every citizen can vote."
  },
  {
    "de": "der Einwohner",
    "en": "resident (male)",
    "word": "Einwohner",
    "forms": ["der Einwohner", "des Einwohners", "dem Einwohner", "den Einwohner", "die Einwohner", "Einwohner"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Alle Einwohner müssen sich an die Gesetze halten.",
    "example_en": "All residents must obey the laws."
  },
  {
    "de": "die Einwohnerin",
    "en": "resident (female)",
    "word": "Einwohnerin",
    "forms": ["die Einwohnerin", "der Einwohnerin", "die Einwohnerinnen", "Einwohnerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Jede Einwohnerin hat Rechte und Pflichten.",
    "example_en": "Every resident has rights and duties."
  },
  {
    "de": "der Ausländer",
    "en": "foreigner (male)",
    "word": "Ausländer",
    "forms": ["der Ausländer", "des Ausländers", "dem Ausländer", "den Ausländer", "die Ausländer", "Ausländer"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Ausländer haben auch Grundrechte.",
    "example_en": "Foreigners also have basic rights."
  },
  {
    "de": "die Ausländerin",
    "en": "foreigner (female)",
    "word": "Ausländerin",
    "forms": ["die Ausländerin", "der Ausländerin", "die Ausländerinnen", "Ausländerin"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Das Asylrecht gilt für Ausländerinnen.",
    "example_en": "The right to asylum applies to foreigners."
  },
  {
    "de": "die Familie",
    "en": "family",
    "word": "Familie",
    "forms": ["die Familie", "der Familie", "die Familien", "einer Familie", "Familie"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Familie steht unter dem Schutz des Staates.",
    "example_en": "The family is under the protection of the state."
  },
  {
    "de": "die Eltern",
    "en": "parents",
    "word": "Eltern",
    "forms": ["die Eltern", "der Eltern", "den Eltern", "Eltern"],
    "gender": "none",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Eltern können entscheiden, ob ihr Kind am Religionsunterricht teilnimmt.",
    "example_en": "Parents can decide whether their child participates in religious education."
  },
  {
    "de": "das Kind",
    "en": "child",
    "word": "Kind",
    "forms": ["das Kind", "des Kindes", "dem Kind", "die Kinder", "ein Kind", "Kind"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Kinder haben besondere Rechte.",
    "example_en": "Children have special rights."
  },
  {
    "de": "die Schule",
    "en": "school",
    "word": "Schule",
    "forms": ["die Schule", "der Schule", "die Schulen", "einer Schule", "in der Schule", "Schule"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "In Deutschland gibt es Schulpflicht.",
    "example_en": "There is compulsory education in Germany."
  },
  {
    "de": "der Religionsunterricht",
    "en": "religious education",
    "word": "Religionsunterricht",
    "forms": ["der Religionsunterricht", "des Religionsunterrichts", "dem Religionsunterricht", "am Religionsunterricht", "Religionsunterricht"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Eltern können entscheiden, ob ihr Kind am Religionsunterricht teilnimmt.",
    "example_en": "Parents can decide whether their child participates in religious education."
  },
  {
    "de": "die Steuer",
    "en": "tax",
    "word": "Steuer",
    "forms": ["die Steuer", "der Steuer", "die Steuern", "Steuern", "Steuer"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Menschen zahlen Steuern.",
    "example_en": "People pay taxes."
  },
  {
    "de": "die Meinung",
    "en": "opinion",
    "word": "Meinung",
    "forms": ["die Meinung", "der Meinung", "die Meinungen", "meine Meinung", "Meinung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Jeder darf seine Meinung sagen.",
    "example_en": "Everyone may express their opinion."
  },
  {
    "de": "die Religion",
    "en": "religion",
    "word": "Religion",
    "forms": ["die Religion", "der Religion", "die Religionen", "einer Religion", "Religion"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Religionsfreiheit schützt alle Religionen.",
    "example_en": "Freedom of religion protects all religions."
  },
  {
    "de": "die Religionsgemeinschaft",
    "en": "religious community",
    "word": "Religionsgemeinschaft",
    "forms": ["die Religionsgemeinschaft", "der Religionsgemeinschaft", "die Religionsgemeinschaften", "Religionsgemeinschaft"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Staat und Religionsgemeinschaften sind getrennt.",
    "example_en": "State and religious communities are separated."
  },
  {
    "de": "die Sozialversicherung",
    "en": "social insurance",
    "word": "Sozialversicherung",
    "forms": ["die Sozialversicherung", "der Sozialversicherung", "die Sozialversicherungen", "Sozialversicherung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Sozialversicherung wird durch Sozialabgaben finanziert.",
    "example_en": "Social insurance is financed by social security contributions."
  },
  {
    "de": "die Krankenversicherung",
    "en": "health insurance",
    "word": "Krankenversicherung",
    "forms": ["die Krankenversicherung", "der Krankenversicherung", "die Krankenversicherungen", "Krankenversicherung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Krankenversicherung ist Teil der Sozialversicherung.",
    "example_en": "Health insurance is part of social insurance."
  },
  {
    "de": "die Pflegeversicherung",
    "en": "long-term care insurance",
    "word": "Pflegeversicherung",
    "forms": ["die Pflegeversicherung", "der Pflegeversicherung", "Pflegeversicherung"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Pflegeversicherung gehört zur Sozialversicherung.",
    "example_en": "Long-term care insurance belongs to social insurance."
  },
  {
    "de": "die Marktwirtschaft",
    "en": "market economy",
    "word": "Marktwirtschaft",
    "forms": ["die Marktwirtschaft", "der Marktwirtschaft", "soziale Marktwirtschaft", "Marktwirtschaft"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Deutschland hat eine soziale Marktwirtschaft.",
    "example_en": "Germany has a social market economy."
  },

  // ============================================
  // VERBS
  // ============================================
  {
    "de": "wählen",
    "en": "to vote / to elect / to choose",
    "word": "wählen",
    "forms": ["wählen", "wählt", "wählst", "wähle", "wählte", "wählten", "gewählt", "ich wähle", "du wählst", "er wählt", "wir wählen", "sie wählen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Man wählt den Bundestag alle vier Jahre.",
    "example_en": "You vote for the Bundestag every four years."
  },
  {
    "de": "gehören",
    "en": "to belong to",
    "word": "gehören",
    "forms": ["gehören", "gehört", "gehörst", "gehöre", "gehörte", "gehörten", "ich gehöre", "du gehörst", "er gehört", "wir gehören", "sie gehören"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Welches Recht gehört zu den Grundrechten?",
    "example_en": "Which right belongs to the basic rights?"
  },
  {
    "de": "dürfen",
    "en": "to be allowed to / may",
    "word": "dürfen",
    "forms": ["dürfen", "darf", "darfst", "dürft", "durfte", "durften", "gedurft", "ich darf", "du darfst", "er darf", "wir dürfen", "sie dürfen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "In Deutschland dürfen Menschen offen ihre Meinung sagen.",
    "example_en": "In Germany, people are allowed to openly express their opinion."
  },
  {
    "de": "können",
    "en": "can / to be able to",
    "word": "können",
    "forms": ["können", "kann", "kannst", "könnt", "konnte", "konnten", "gekonnt", "ich kann", "du kannst", "er kann", "wir können", "sie können"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Man kann seine Meinung frei äußern.",
    "example_en": "One can freely express their opinion."
  },
  {
    "de": "müssen",
    "en": "must / to have to",
    "word": "müssen",
    "forms": ["müssen", "muss", "musst", "müsst", "musste", "mussten", "gemusst", "ich muss", "du musst", "er muss", "wir müssen", "sie müssen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Alle müssen sich an die Gesetze halten.",
    "example_en": "Everyone must comply with the laws."
  },
  {
    "de": "sollen",
    "en": "should / ought to",
    "word": "sollen",
    "forms": ["sollen", "soll", "sollst", "sollt", "sollte", "sollten", "gesollt", "ich soll", "du sollst", "er soll", "wir sollen", "sie sollen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Alle sollen gleich behandelt werden.",
    "example_en": "Everyone should be treated equally."
  },
  {
    "de": "haben",
    "en": "to have",
    "word": "haben",
    "forms": ["haben", "hat", "hast", "habt", "hatte", "hatten", "gehabt", "ich habe", "du hast", "er hat", "wir haben", "sie haben"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Menschen haben das Wahlrecht.",
    "example_en": "People have the right to vote."
  },
  {
    "de": "sein",
    "en": "to be",
    "word": "sein",
    "forms": ["sein", "ist", "bist", "seid", "sind", "war", "waren", "gewesen", "ich bin", "du bist", "er ist", "wir sind", "sie sind"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Deutschland ist eine Demokratie.",
    "example_en": "Germany is a democracy."
  },
  {
    "de": "werden",
    "en": "to become / will",
    "word": "werden",
    "forms": ["werden", "wird", "wirst", "werdet", "wurde", "wurden", "geworden", "ich werde", "du wirst", "er wird", "wir werden", "sie werden"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Der Bundeskanzler wird vom Bundestag gewählt.",
    "example_en": "The Federal Chancellor is elected by the Bundestag."
  },
  {
    "de": "gelten",
    "en": "to apply / to be valid",
    "word": "gelten",
    "forms": ["gelten", "gilt", "giltst", "geltet", "galt", "galten", "gegolten", "ich gelte", "du giltst", "er gilt", "wir gelten", "sie gelten"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "In Deutschland gilt Religionsfreiheit.",
    "example_en": "Freedom of religion applies in Germany."
  },
  {
    "de": "halten",
    "en": "to hold / to keep / to stop",
    "word": "halten",
    "forms": ["halten", "hält", "hältst", "haltet", "hielt", "hielten", "gehalten", "ich halte", "du hältst", "er hält", "wir halten", "sie halten", "sich halten an"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Der Staat muss sich an die Gesetze halten.",
    "example_en": "The state must comply with the laws."
  },
  {
    "de": "entscheiden",
    "en": "to decide",
    "word": "entscheiden",
    "forms": ["entscheiden", "entscheidet", "entscheidest", "entschied", "entschieden", "ich entscheide", "du entscheidest", "er entscheidet", "wir entscheiden", "sie entscheiden"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Eltern können entscheiden.",
    "example_en": "The parents can decide."
  },
  {
    "de": "teilnehmen",
    "en": "to participate",
    "word": "teilnehmen",
    "forms": ["teilnehmen", "nimmt teil", "nimmst teil", "nehmt teil", "nahm teil", "teilgenommen", "ich nehme teil", "du nimmst teil", "er nimmt teil", "wir nehmen teil", "sie nehmen teil"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Das Kind nimmt am Religionsunterricht teil.",
    "example_en": "The child participates in religious education."
  },
  {
    "de": "bedeuten",
    "en": "to mean",
    "word": "bedeuten",
    "forms": ["bedeuten", "bedeutet", "bedeutest", "bedeutete", "bedeuteten", "ich bedeute", "du bedeutest", "er bedeutet", "wir bedeuten", "sie bedeuten"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Was bedeutet Rechtsstaat?",
    "example_en": "What does constitutional state mean?"
  },
  {
    "de": "sagen",
    "en": "to say",
    "word": "sagen",
    "forms": ["sagen", "sagt", "sagst", "sagte", "sagten", "gesagt", "ich sage", "du sagst", "er sagt", "wir sagen", "sie sagen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Jeder darf seine Meinung sagen.",
    "example_en": "Everyone may express their opinion."
  },
  {
    "de": "zahlen",
    "en": "to pay",
    "word": "zahlen",
    "forms": ["zahlen", "zahlt", "zahlst", "zahlte", "zahlten", "gezahlt", "ich zahle", "du zahlst", "er zahlt", "wir zahlen", "sie zahlen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Menschen zahlen Steuern.",
    "example_en": "People pay taxes."
  },
  {
    "de": "beschließen",
    "en": "to decide / to pass (a law)",
    "word": "beschließen",
    "forms": ["beschließen", "beschließt", "beschließest", "beschloss", "beschlossen", "ich beschließe", "du beschließt", "er beschließt", "wir beschließen", "sie beschließen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Das Parlament beschließt ein neues Gesetz.",
    "example_en": "The parliament passes a new law."
  },
  {
    "de": "bekommen",
    "en": "to receive / to get",
    "word": "bekommen",
    "forms": ["bekommen", "bekommt", "bekommst", "bekam", "bekamen", "ich bekomme", "du bekommst", "er bekommt", "wir bekommen", "sie bekommen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Partei bekommt viele Stimmen.",
    "example_en": "The party receives many votes."
  },
  {
    "de": "verbieten",
    "en": "to prohibit / to forbid",
    "word": "verbieten",
    "forms": ["verbieten", "verbietet", "verbietest", "verbot", "verboten", "ich verbiete", "du verbietest", "er verbietet", "wir verbieten", "sie verbieten"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Das Grundgesetz verbietet die Todesstrafe.",
    "example_en": "The Basic Law prohibits the death penalty."
  },
  {
    "de": "abschaffen",
    "en": "to abolish",
    "word": "abschaffen",
    "forms": ["abschaffen", "schafft ab", "schaffst ab", "schaffte ab", "abgeschafft", "ich schaffe ab", "du schaffst ab", "er schafft ab", "wir schaffen ab", "sie schaffen ab"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Partei will die Pressefreiheit abschaffen.",
    "example_en": "The party wants to abolish press freedom."
  },
  {
    "de": "wohnen",
    "en": "to live / to reside",
    "word": "wohnen",
    "forms": ["wohnen", "wohnt", "wohnst", "wohnte", "wohnten", "gewohnt", "ich wohne", "du wohnst", "er wohnt", "wir wohnen", "sie wohnen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Man darf wohnen, wo man will.",
    "example_en": "One may live wherever they want."
  },
  {
    "de": "demonstrieren",
    "en": "to demonstrate",
    "word": "demonstrieren",
    "forms": ["demonstrieren", "demonstriert", "demonstrierst", "demonstrierte", "demonstrierten", "ich demonstriere", "du demonstrierst", "er demonstriert", "wir demonstrieren", "sie demonstrieren"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Bürger dürfen friedlich demonstrieren.",
    "example_en": "Citizens may demonstrate peacefully."
  },
  {
    "de": "äußern",
    "en": "to express",
    "word": "äußern",
    "forms": ["äußern", "äußert", "äußerst", "äußerte", "geäußert", "ich äußere", "du äußerst", "er äußert", "wir äußern", "sie äußern"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Man kann seine Meinung frei äußern.",
    "example_en": "One can freely express their opinion."
  },
  {
    "de": "annehmen",
    "en": "to accept / to assume",
    "word": "annehmen",
    "forms": ["annehmen", "nimmt an", "nimmst an", "nahm an", "angenommen", "ich nehme an", "du nimmst an", "er nimmt an", "wir nehmen an", "sie nehmen an"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Man darf kein Geld annehmen für seine Stimme.",
    "example_en": "One may not accept money for their vote."
  },
  {
    "de": "ernennen",
    "en": "to appoint",
    "word": "ernennen",
    "forms": ["ernennen", "ernennt", "ernennst", "ernannte", "ernannt", "ich ernenne", "du ernennst", "er ernennt", "wir ernennen", "sie ernennen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Der Bundespräsident ernennt die Minister.",
    "example_en": "The Federal President appoints the ministers."
  },
  {
    "de": "bestimmen",
    "en": "to determine / to decide",
    "word": "bestimmen",
    "forms": ["bestimmen", "bestimmt", "bestimmst", "bestimmte", "bestimmten", "ich bestimme", "du bestimmst", "er bestimmt", "wir bestimmen", "sie bestimmen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Bundesländer bestimmen die Schulpolitik.",
    "example_en": "The federal states determine education policy."
  },
  {
    "de": "vertreten",
    "en": "to represent",
    "word": "vertreten",
    "forms": ["vertreten", "vertritt", "vertrittst", "vertrat", "vertraten", "ich vertrete", "du vertrittst", "er vertritt", "wir vertreten", "sie vertreten"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Abgeordneten vertreten das Volk.",
    "example_en": "The members of parliament represent the people."
  },
  {
    "de": "bilden",
    "en": "to form / to educate",
    "word": "bilden",
    "forms": ["bilden", "bildet", "bildest", "bildete", "gebildet", "ich bilde", "du bildest", "er bildet", "wir bilden", "sie bilden"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Parteien bilden eine Koalition.",
    "example_en": "The parties form a coalition."
  },
  {
    "de": "kontrollieren",
    "en": "to control / to check",
    "word": "kontrollieren",
    "forms": ["kontrollieren", "kontrolliert", "kontrollierst", "kontrollierte", "kontrolliert", "ich kontrolliere", "du kontrollierst", "er kontrolliert", "wir kontrollieren", "sie kontrollieren"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Die Opposition kontrolliert die Regierung.",
    "example_en": "The opposition monitors the government."
  },
  {
    "de": "heißen",
    "en": "to be called / to mean",
    "word": "heißen",
    "forms": ["heißen", "heißt", "heißt", "hieß", "hießen", "geheißen", "ich heiße", "du heißt", "er heißt", "wir heißen", "sie heißen"],
    "gender": "none",
    "wordType": "verb",
    "category": "Verbs",
    "example_de": "Wie heißt die deutsche Verfassung?",
    "example_en": "What is the German constitution called?"
  },

  // ============================================
  // ADJECTIVES
  // ============================================
  {
    "de": "frei",
    "en": "free",
    "word": "frei",
    "forms": ["frei", "freie", "freier", "freien", "freies", "freiem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Wahlen in Deutschland sind frei.",
    "example_en": "Elections in Germany are free."
  },
  {
    "de": "geheim",
    "en": "secret",
    "word": "geheim",
    "forms": ["geheim", "geheime", "geheimer", "geheimen", "geheimes", "geheimem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Wahlen sind geheim.",
    "example_en": "Elections are secret."
  },
  {
    "de": "gleich",
    "en": "equal / same",
    "word": "gleich",
    "forms": ["gleich", "gleiche", "gleicher", "gleichen", "gleiches", "gleichem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Alle sind vor dem Gesetz gleich.",
    "example_en": "All are equal before the law."
  },
  {
    "de": "demokratisch",
    "en": "democratic",
    "word": "demokratisch",
    "forms": ["demokratisch", "demokratische", "demokratischer", "demokratischen", "demokratisches", "demokratischem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Deutschland ist ein demokratischer Staat.",
    "example_en": "Germany is a democratic state."
  },
  {
    "de": "sozial",
    "en": "social",
    "word": "sozial",
    "forms": ["sozial", "soziale", "sozialer", "sozialen", "soziales", "sozialem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Deutschland ist ein sozialer Bundesstaat.",
    "example_en": "Germany is a social federal state."
  },
  {
    "de": "unabhängig",
    "en": "independent",
    "word": "unabhängig",
    "forms": ["unabhängig", "unabhängige", "unabhängiger", "unabhängigen", "unabhängiges", "unabhängigem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Die Gerichte sind unabhängig.",
    "example_en": "The courts are independent."
  },
  {
    "de": "verfassungswidrig",
    "en": "unconstitutional",
    "word": "verfassungswidrig",
    "forms": ["verfassungswidrig", "verfassungswidrige", "verfassungswidriger", "verfassungswidrigen", "verfassungswidriges"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Eine Partei, die eine Diktatur will, ist verfassungswidrig.",
    "example_en": "A party that wants a dictatorship is unconstitutional."
  },
  {
    "de": "wahlberechtigt",
    "en": "eligible to vote",
    "word": "wahlberechtigt",
    "forms": ["wahlberechtigt", "wahlberechtigte", "wahlberechtigter", "wahlberechtigten", "wahlberechtigtes"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Wahlberechtigte Personen dürfen wählen.",
    "example_en": "Eligible persons may vote."
  },
  {
    "de": "verboten",
    "en": "prohibited / forbidden",
    "word": "verboten",
    "forms": ["verboten", "verbotene", "verbotener", "verbotenen", "verbotenes"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Die Todesstrafe ist verboten.",
    "example_en": "The death penalty is prohibited."
  },
  {
    "de": "unantastbar",
    "en": "inviolable",
    "word": "unantastbar",
    "forms": ["unantastbar", "unantastbare", "unantastbarer", "unantastbaren", "unantastbares"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Die Würde des Menschen ist unantastbar.",
    "example_en": "Human dignity is inviolable."
  },
  {
    "de": "friedlich",
    "en": "peaceful",
    "word": "friedlich",
    "forms": ["friedlich", "friedliche", "friedlicher", "friedlichen", "friedliches", "friedlichem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Bürger dürfen friedlich demonstrieren.",
    "example_en": "Citizens may demonstrate peacefully."
  },
  {
    "de": "öffentlich",
    "en": "public",
    "word": "öffentlich",
    "forms": ["öffentlich", "öffentliche", "öffentlicher", "öffentlichen", "öffentliches", "öffentlichem"],
    "gender": "none",
    "wordType": "adjective",
    "category": "Adjectives",
    "example_de": "Man darf seine Meinung öffentlich äußern.",
    "example_en": "One may express their opinion publicly."
  },

  // ============================================
  // OTHER IMPORTANT WORDS
  // ============================================
  {
    "de": "das Wappen",
    "en": "coat of arms",
    "word": "Wappen",
    "forms": ["das Wappen", "des Wappens", "dem Wappen", "die Wappen", "Wappen"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Symbols",
    "example_de": "Das Wappen Deutschlands zeigt einen Adler.",
    "example_en": "The coat of arms of Germany shows an eagle."
  },
  {
    "de": "der Adler",
    "en": "eagle",
    "word": "Adler",
    "forms": ["der Adler", "des Adlers", "dem Adler", "den Adler", "die Adler", "Adler"],
    "gender": "masculine",
    "wordType": "noun",
    "category": "Symbols",
    "example_de": "Der Adler ist das Wappentier Deutschlands.",
    "example_en": "The eagle is the heraldic animal of Germany."
  },
  {
    "de": "die Nationalhymne",
    "en": "national anthem",
    "word": "Nationalhymne",
    "forms": ["die Nationalhymne", "der Nationalhymne", "Nationalhymne"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Symbols",
    "example_de": "Die deutsche Nationalhymne beginnt mit 'Einigkeit und Recht und Freiheit'.",
    "example_en": "The German national anthem begins with 'Unity and justice and freedom'."
  },
  {
    "de": "die Einigkeit",
    "en": "unity",
    "word": "Einigkeit",
    "forms": ["die Einigkeit", "der Einigkeit", "Einigkeit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Concepts",
    "example_de": "Einigkeit und Recht und Freiheit.",
    "example_en": "Unity and justice and freedom."
  },
  {
    "de": "die Freiheit",
    "en": "freedom",
    "word": "Freiheit",
    "forms": ["die Freiheit", "der Freiheit", "die Freiheiten", "Freiheit"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Concepts",
    "example_de": "Die Freiheit ist ein wichtiger Wert.",
    "example_en": "Freedom is an important value."
  },
  {
    "de": "die Würde",
    "en": "dignity",
    "word": "Würde",
    "forms": ["die Würde", "der Würde", "Würde"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Concepts",
    "example_de": "Die Würde des Menschen ist unantastbar.",
    "example_en": "Human dignity is inviolable."
  },
  {
    "de": "die Demonstration",
    "en": "demonstration",
    "word": "Demonstration",
    "forms": ["die Demonstration", "der Demonstration", "die Demonstrationen", "einer Demonstration", "Demonstration"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Man darf an friedlichen Demonstrationen teilnehmen.",
    "example_en": "One may participate in peaceful demonstrations."
  },
  {
    "de": "die Petition",
    "en": "petition",
    "word": "Petition",
    "forms": ["die Petition", "der Petition", "die Petitionen", "eine Petition", "Petition"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Rights",
    "example_de": "Bürger haben das Recht, Petitionen einzureichen.",
    "example_en": "Citizens have the right to submit petitions."
  },
  {
    "de": "die Presse",
    "en": "press / media",
    "word": "Presse",
    "forms": ["die Presse", "der Presse", "Presse"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Die Presse ist keine staatliche Gewalt.",
    "example_en": "The press is not a state power."
  },
  {
    "de": "die Pressezensur",
    "en": "press censorship",
    "word": "Pressezensur",
    "forms": ["die Pressezensur", "der Pressezensur", "Pressezensur"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Society",
    "example_de": "Pressezensur ist kein Merkmal der Demokratie.",
    "example_en": "Press censorship is not a characteristic of democracy."
  },
  {
    "de": "die Polizei",
    "en": "police",
    "word": "Polizei",
    "forms": ["die Polizei", "der Polizei", "Polizei"],
    "gender": "feminine",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Die Polizei gehört zur Exekutive.",
    "example_en": "The police belong to the executive."
  },
  {
    "de": "das Militär",
    "en": "military",
    "word": "Militär",
    "forms": ["das Militär", "des Militärs", "dem Militär", "Militär"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Militär wählt nicht den Bundestag.",
    "example_en": "The military does not elect the Bundestag."
  },
  {
    "de": "das Finanzamt",
    "en": "tax office",
    "word": "Finanzamt",
    "forms": ["das Finanzamt", "des Finanzamts", "dem Finanzamt", "die Finanzämter", "Finanzamt"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Finanzamt gehört zur Exekutive.",
    "example_en": "The tax office belongs to the executive."
  },
  {
    "de": "das Ordnungsamt",
    "en": "public order office",
    "word": "Ordnungsamt",
    "forms": ["das Ordnungsamt", "des Ordnungsamts", "dem Ordnungsamt", "die Ordnungsämter", "Ordnungsamt"],
    "gender": "neuter",
    "wordType": "noun",
    "category": "Government",
    "example_de": "Das Ordnungsamt gehört zur Gemeindeverwaltung.",
    "example_en": "The public order office belongs to municipal administration."
  },
  {
    "de": "zu",
    "en": "to / at",
    "word": "zu",
    "forms": ["zu", "zum", "zur"],
    "gender": "none",
    "wordType": "preposition",
    "category": "Grammar",
    "example_de": "Welches Recht gehört zu den Grundrechten?",
    "example_en": "Which right belongs to the basic rights?"
  },
  {
    "de": "gegen",
    "en": "against",
    "word": "gegen",
    "forms": ["gegen"],
    "gender": "none",
    "wordType": "preposition",
    "category": "Grammar",
    "example_de": "Man darf etwas gegen die Regierung sagen.",
    "example_en": "One may say something against the government."
  },
  {
    "de": "weil",
    "en": "because",
    "word": "weil",
    "forms": ["weil"],
    "gender": "none",
    "wordType": "conjunction",
    "category": "Grammar",
    "example_de": "Man darf seine Meinung sagen, weil Meinungsfreiheit gilt.",
    "example_en": "One may express their opinion because freedom of expression applies."
  },
  {
    "de": "wann",
    "en": "when",
    "word": "wann",
    "forms": ["wann"],
    "gender": "none",
    "wordType": "adverb",
    "category": "Grammar",
    "example_de": "Wann ist die Meinungsfreiheit eingeschränkt?",
    "example_en": "When is freedom of expression restricted?"
  }
];
