import { Scale, Landmark, Users, History, Map, Award, GraduationCap, Heart, Home } from 'lucide-react';

// Transformed questions from fullData.json
export const QUESTIONS = [
  {
    "id": 1,
    "question_de": "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …",
    "question_en": "In Germany, people are allowed to openly say something against the government because...",
    "options_de": [
      "hier Religionsfreiheit gilt.",
      "die Menschen Steuern zahlen.",
      "die Menschen das Wahlrecht haben.",
      "hier Meinungsfreiheit gilt."
    ],
    "options_en": [
      "freedom of religion applies here.",
      "people pay taxes.",
      "people have the right to vote.",
      "freedom of expression applies here."
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 2,
    "question_de": "In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am …",
    "question_en": "In Germany, parents can decide until their child's 14th birthday whether it participates in... at school",
    "options_de": [
      "Geschichtsunterricht teilnimmt.",
      "Religionsunterricht teilnimmt.",
      "Politikunterricht teilnimmt.",
      "Sprachunterricht teilnimmt."
    ],
    "options_en": [
      "history classes.",
      "religious education.",
      "politics classes.",
      "language classes."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 3,
    "question_de": "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
    "question_en": "Germany is a constitutional state. What does this mean?",
    "options_de": [
      "Alle Einwohnerinnen / Einwohner und der Staat müssen sich an die Gesetze halten.",
      "Der Staat muss sich nicht an die Gesetze halten.",
      "Nur Deutsche müssen die Gesetze befolgen.",
      "Die Gerichte machen die Gesetze."
    ],
    "options_en": [
      "All residents and the state must obey the laws.",
      "The state does not have to obey the laws.",
      "Only Germans must follow the laws.",
      "The courts make the laws."
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 4,
    "question_de": "Welches Recht gehört zu den Grundrechten in Deutschland?",
    "question_en": "Which right is among the basic rights in Germany?",
    "options_de": [
      "Waffenbesitz",
      "Faustrecht",
      "Meinungsfreiheit",
      "Selbstjustiz"
    ],
    "options_en": [
      "Weapon ownership",
      "Might makes right",
      "Freedom of expression",
      "Vigilante justice"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 5,
    "question_de": "Wahlen in Deutschland sind frei. Was bedeutet das?",
    "question_en": "Elections in Germany are free. What does this mean?",
    "options_de": [
      "Man darf Geld annehmen, wenn man dafür eine bestimmte Kandidatin / einen bestimmten Kandidaten wählt.",
      "Nur Personen, die noch nie im Gefängnis waren, dürfen wählen.",
      "Die Wählerin / der Wähler darf bei der Wahl weder beeinflusst noch zu einer bestimmten Stimmabgabe gezwungen werden und keine Nachteile durch die Wahl haben.",
      "Alle wahlberechtigten Personen müssen wählen."
    ],
    "options_en": [
      "You may accept money if you vote for a specific candidate.",
      "Only people who have never been in prison may vote.",
      "The voter must not be influenced or forced to cast a specific vote and must not suffer any disadvantages from the election.",
      "All eligible persons must vote."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 6,
    "question_de": "Wie heißt die deutsche Verfassung?",
    "question_en": "What is the German constitution called?",
    "options_de": [
      "Volksgesetz",
      "Bundesgesetz",
      "Deutsches Gesetz",
      "Grundgesetz"
    ],
    "options_en": [
      "People's Law",
      "Federal Law",
      "German Law",
      "Basic Law"
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 7,
    "question_de": "Welches Recht gehört zu den Grundrechten, die nach der deutschen Verfassung garantiert werden? Das Recht auf …",
    "question_en": "Which right is among the basic rights guaranteed by the German constitution? The right to...",
    "options_de": [
      "Glaubens- und Gewissensfreiheit",
      "Unterhaltung",
      "Bildung und Arbeit",
      "Wohnung"
    ],
    "options_en": [
      "freedom of belief and conscience",
      "entertainment",
      "education and work",
      "housing"
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 8,
    "question_de": "Was steht nicht im Grundgesetz von Deutschland?",
    "question_en": "What is not in the Basic Law of Germany?",
    "options_de": [
      "Die Würde des Menschen ist unantastbar.",
      "Alle sollen gleich viel Geld haben.",
      "Jeder Mensch darf seine Meinung sagen.",
      "Alle sind vor dem Gesetz gleich."
    ],
    "options_en": [
      "Human dignity is inviolable.",
      "Everyone should have the same amount of money.",
      "Every person may express their opinion.",
      "All are equal before the law."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 9,
    "question_de": "Welches Grundrecht gilt in Deutschland nur für Ausländerinnen / Ausländer? Das Grundrecht auf …",
    "question_en": "Which basic right in Germany applies only to foreigners? The basic right to...",
    "options_de": [
      "Schutz der Familie",
      "Menschenwürde",
      "Asyl",
      "Meinungsfreiheit"
    ],
    "options_en": [
      "protection of the family",
      "human dignity",
      "asylum",
      "freedom of expression"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 10,
    "question_de": "Was ist mit dem deutschen Grundgesetz vereinbar?",
    "question_en": "What is compatible with the German Basic Law?",
    "options_de": [
      "die Prügelstrafe",
      "die Folter",
      "die Todesstrafe",
      "die Geldstrafe"
    ],
    "options_en": [
      "corporal punishment",
      "torture",
      "death penalty",
      "monetary fine"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 11,
    "question_de": "Wie wird die Verfassung der Bundesrepublik Deutschland genannt?",
    "question_en": "What is the constitution of the Federal Republic of Germany called?",
    "options_de": [
      "Grundgesetz",
      "Bundesverfassung",
      "Gesetzbuch",
      "Verfassungsvertrag"
    ],
    "options_en": [
      "Basic Law",
      "Federal Constitution",
      "Legal Code",
      "Constitutional Treaty"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 12,
    "question_de": "Eine Partei im Deutschen Bundestag will die Pressefreiheit abschaffen. Ist das möglich?",
    "question_en": "A party in the German Bundestag wants to abolish press freedom. Is this possible?",
    "options_de": [
      "Ja, wenn mehr als die Hälfte der Abgeordneten im Bundestag dafür sind.",
      "Ja, aber dazu müssen zwei Drittel der Abgeordneten im Bundestag dafür sein.",
      "Nein, denn die Pressefreiheit ist ein Grundrecht. Sie kann nicht abgeschafft werden.",
      "Nein, denn nur der Bundesrat kann die Pressefreiheit abschaffen."
    ],
    "options_en": [
      "Yes, if more than half of the members of the Bundestag are in favor.",
      "Yes, but two-thirds of the members of the Bundestag must be in favor.",
      "No, because press freedom is a basic right. It cannot be abolished.",
      "No, because only the Bundesrat can abolish press freedom."
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 13,
    "question_de": "Im Parlament steht der Begriff 'Opposition' für …",
    "question_en": "In parliament, the term 'opposition' refers to...",
    "options_de": [
      "die regierenden Parteien.",
      "die Fraktion mit den meisten Abgeordneten.",
      "alle Parteien, die bei der letzten Wahl die 5%-Hürde erreichen konnten.",
      "alle Abgeordneten, die nicht zu der Regierungspartei / den Regierungsparteien gehören."
    ],
    "options_en": [
      "the governing parties.",
      "the parliamentary group with the most members.",
      "all parties that passed the 5% threshold in the last election.",
      "all members who do not belong to the governing party/parties."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 14,
    "question_de": "Meinungsfreiheit in Deutschland heißt, dass ich …",
    "question_en": "Freedom of expression in Germany means that I...",
    "options_de": [
      "Passanten auf der Straße beschimpfen darf.",
      "meine Meinung im Internet äußern kann.",
      "Nazi-, Hamas- oder Islamischer Staat-Symbole öffentlich tragen darf.",
      "meine Meinung nur dann äußern darf, solange ich der Regierung nicht widerspreche."
    ],
    "options_en": [
      "may insult passers-by on the street.",
      "can express my opinion on the internet.",
      "may publicly wear Nazi, Hamas or Islamic State symbols.",
      "may only express my opinion as long as I don't contradict the government."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 15,
    "question_de": "Was verbietet das deutsche Grundgesetz?",
    "question_en": "What does the German Basic Law prohibit?",
    "options_de": [
      "Militärdienst",
      "Zwangsarbeit",
      "freie Berufswahl",
      "Arbeit im Ausland"
    ],
    "options_en": [
      "military service",
      "forced labor",
      "free choice of occupation",
      "working abroad"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 16,
    "question_de": "Wann ist die Meinungsfreiheit in Deutschland eingeschränkt?",
    "question_en": "When is freedom of expression restricted in Germany?",
    "options_de": [
      "bei der öffentlichen Verbreitung falscher Behauptungen über einzelne Personen",
      "bei Meinungsäußerungen über die Bundesregierung",
      "bei Diskussionen über Religionen",
      "bei Kritik am Staat"
    ],
    "options_en": [
      "when publicly spreading false claims about individuals",
      "when expressing opinions about the federal government",
      "when discussing religions",
      "when criticizing the state"
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 17,
    "question_de": "Die deutschen Gesetze verbieten …",
    "question_en": "German laws prohibit...",
    "options_de": [
      "Meinungsfreiheit der Einwohnerinnen und Einwohner.",
      "Petitionen der Bürgerinnen und Bürger.",
      "Versammlungsfreiheit der Einwohnerinnen und Einwohner.",
      "Ungleichbehandlung der Bürgerinnen und Bürger durch den Staat."
    ],
    "options_en": [
      "freedom of expression of residents.",
      "petitions from citizens.",
      "freedom of assembly of residents.",
      "unequal treatment of citizens by the state."
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 18,
    "question_de": "Welches Grundrecht ist in Artikel 1 des Grundgesetzes der Bundesrepublik Deutschland garantiert?",
    "question_en": "Which basic right is guaranteed in Article 1 of the Basic Law of the Federal Republic of Germany?",
    "options_de": [
      "die Unantastbarkeit der Menschenwürde",
      "das Recht auf Leben",
      "Religionsfreiheit",
      "Meinungsfreiheit"
    ],
    "options_en": [
      "the inviolability of human dignity",
      "the right to life",
      "freedom of religion",
      "freedom of expression"
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 19,
    "question_de": "Was versteht man unter dem Recht der 'Freizügigkeit' in Deutschland?",
    "question_en": "What is meant by the right of 'freedom of movement' in Germany?",
    "options_de": [
      "Man darf sich seinen Wohnort selbst aussuchen.",
      "Man kann seinen Beruf wechseln.",
      "Man darf sich für eine andere Religion entscheiden.",
      "Man darf sich in der Öffentlichkeit nur leicht bekleidet bewegen."
    ],
    "options_en": [
      "You may choose your place of residence yourself.",
      "You can change your profession.",
      "You may choose another religion.",
      "You may only move lightly dressed in public."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 20,
    "question_de": "Eine Partei in Deutschland verfolgt das Ziel, eine Diktatur zu errichten. Sie ist dann …",
    "question_en": "A party in Germany aims to establish a dictatorship. It is then...",
    "options_de": [
      "tolerant.",
      "rechtsstaatlich orientiert.",
      "gesetzestreu.",
      "verfassungswidrig."
    ],
    "options_en": [
      "tolerant.",
      "oriented towards the rule of law.",
      "law-abiding.",
      "unconstitutional."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 21,
    "question_de": "Welches ist das Wappen der Bundesrepublik Deutschland?",
    "question_en": "Which is the coat of arms of the Federal Republic of Germany?",
    "options_de": [
      "Bild 1",
      "Bild 2",
      "Bild 3",
      "Bild 4"
    ],
    "options_en": [
      "Image 1",
      "Image 2",
      "Image 3",
      "Image 4"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 22,
    "question_de": "Was für eine Staatsform hat Deutschland?",
    "question_en": "What form of government does Germany have?",
    "options_de": [
      "Monarchie",
      "Diktatur",
      "Republik",
      "Fürstentum"
    ],
    "options_en": [
      "Monarchy",
      "Dictatorship",
      "Republic",
      "Principality"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 23,
    "question_de": "In Deutschland sind die meisten Erwerbstätigen …",
    "question_en": "In Germany, most employed people are...",
    "options_de": [
      "in kleinen Familienunternehmen beschäftigt.",
      "ehrenamtlich für ein Bundesland tätig.",
      "selbstständig mit einer eigenen Firma tätig.",
      "bei einer Firma oder Behörde beschäftigt."
    ],
    "options_en": [
      "employed in small family businesses.",
      "working voluntarily for a federal state.",
      "self-employed with their own company.",
      "employed by a company or authority."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 24,
    "question_de": "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
    "question_en": "How many federal states does the Federal Republic of Germany have?",
    "options_de": [
      "14",
      "15",
      "16",
      "17"
    ],
    "options_en": [
      "14",
      "15",
      "16",
      "17"
    ],
    "correct_index": 2,
    "category": "Politik"
  },
  {
    "id": 25,
    "question_de": "Was ist kein Bundesland der Bundesrepublik Deutschland?",
    "question_en": "What is not a federal state of the Federal Republic of Germany?",
    "options_de": [
      "Elsass-Lothringen",
      "Nordrhein-Westfalen",
      "Mecklenburg-Vorpommern",
      "Sachsen-Anhalt"
    ],
    "options_en": [
      "Alsace-Lorraine",
      "North Rhine-Westphalia",
      "Mecklenburg-Western Pomerania",
      "Saxony-Anhalt"
    ],
    "correct_index": 0,
    "category": "Politik"
  },
  {
    "id": 26,
    "question_de": "Deutschland ist …",
    "question_en": "Germany is...",
    "options_de": [
      "eine kommunistische Republik.",
      "ein demokratischer und sozialer Bundesstaat.",
      "eine kapitalistische und soziale Monarchie.",
      "ein sozialer und sozialistischer Bundesstaat."
    ],
    "options_en": [
      "a communist republic.",
      "a democratic and social federal state.",
      "a capitalist and social monarchy.",
      "a social and socialist federal state."
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 27,
    "question_de": "Deutschland ist …",
    "question_en": "Germany is...",
    "options_de": [
      "ein sozialistischer Staat.",
      "ein Bundesstaat.",
      "eine Diktatur.",
      "eine Monarchie."
    ],
    "options_en": [
      "a socialist state.",
      "a federal state.",
      "a dictatorship.",
      "a monarchy."
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 28,
    "question_de": "Wer wählt in Deutschland die Abgeordneten zum Bundestag?",
    "question_en": "Who elects the members of the Bundestag in Germany?",
    "options_de": [
      "das Militär",
      "die Wirtschaft",
      "das wahlberechtigte Volk",
      "die Verwaltung"
    ],
    "options_en": [
      "the military",
      "the economy",
      "the eligible voters",
      "the administration"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 29,
    "question_de": "Welches Tier ist das Wappentier der Bundesrepublik Deutschland?",
    "question_en": "Which animal is the heraldic animal of the Federal Republic of Germany?",
    "options_de": [
      "Löwe",
      "Adler",
      "Bär",
      "Pferd"
    ],
    "options_en": [
      "Lion",
      "Eagle",
      "Bear",
      "Horse"
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 30,
    "question_de": "Was ist kein Merkmal unserer Demokratie?",
    "question_en": "What is not a characteristic of our democracy?",
    "options_de": [
      "regelmäßige Wahlen",
      "Pressezensur",
      "Meinungsfreiheit",
      "verschiedene Parteien"
    ],
    "options_en": [
      "regular elections",
      "press censorship",
      "freedom of expression",
      "various parties"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 31,
    "question_de": "Die Zusammenarbeit von Parteien zur Bildung einer Regierung nennt man in Deutschland …",
    "question_en": "The cooperation of parties to form a government is called... in Germany",
    "options_de": [
      "Einheit.",
      "Koalition.",
      "Ministerium.",
      "Fraktion."
    ],
    "options_en": [
      "Unity.",
      "Coalition.",
      "Ministry.",
      "Parliamentary group."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 32,
    "question_de": "Was ist keine staatliche Gewalt in Deutschland?",
    "question_en": "What is not a state power in Germany?",
    "options_de": [
      "Gesetzgebung",
      "Regierung",
      "Presse",
      "Rechtsprechung"
    ],
    "options_en": [
      "Legislation",
      "Government",
      "Press",
      "Judiciary"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 33,
    "question_de": "Welche Aussage ist richtig? In Deutschland …",
    "question_en": "Which statement is correct? In Germany...",
    "options_de": [
      "sind Staat und Religionsgemeinschaften voneinander getrennt.",
      "bilden die Religionsgemeinschaften den Staat.",
      "ist der Staat abhängig von den Religionsgemeinschaften.",
      "bilden Staat und Religionsgemeinschaften eine Einheit."
    ],
    "options_en": [
      "state and religious communities are separated from each other.",
      "religious communities form the state.",
      "the state is dependent on religious communities.",
      "state and religious communities form a unity."
    ],
    "correct_index": 0,
    "category": "Kultur"
  },
  {
    "id": 34,
    "question_de": "Was ist Deutschland nicht?",
    "question_en": "What is Germany not?",
    "options_de": [
      "eine Demokratie",
      "ein Rechtsstaat",
      "eine Monarchie",
      "ein Sozialstaat"
    ],
    "options_en": [
      "a democracy",
      "a constitutional state",
      "a monarchy",
      "a welfare state"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 35,
    "question_de": "Womit finanziert der deutsche Staat die Sozialversicherung?",
    "question_en": "How does the German state finance social insurance?",
    "options_de": [
      "Kirchensteuer",
      "Sozialabgaben",
      "Spendengeldern",
      "Vereinsbeiträgen"
    ],
    "options_en": [
      "Church tax",
      "Social security contributions",
      "Donation funds",
      "Association fees"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 36,
    "question_de": "Welche Maßnahme schafft in Deutschland soziale Sicherheit?",
    "question_en": "Which measure creates social security in Germany?",
    "options_de": [
      "die Krankenversicherung",
      "die Autoversicherung",
      "die Gebäudeversicherung",
      "die Haftpflichtversicherung"
    ],
    "options_en": [
      "health insurance",
      "car insurance",
      "building insurance",
      "liability insurance"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 37,
    "question_de": "Wie werden die Regierungschefinnen / Regierungschefs der meisten Bundesländer in Deutschland genannt?",
    "question_en": "What are the heads of government of most federal states in Germany called?",
    "options_de": [
      "Erste Ministerin / Erster Minister",
      "Premierministerin / Premierminister",
      "Senatorin / Senator",
      "Ministerpräsidentin / Ministerpräsident"
    ],
    "options_en": [
      "First Minister",
      "Prime Minister",
      "Senator",
      "Minister President"
    ],
    "correct_index": 3,
    "category": "Politik"
  },
  {
    "id": 38,
    "question_de": "Die Bundesrepublik Deutschland ist ein demokratischer und sozialer …",
    "question_en": "The Federal Republic of Germany is a democratic and social...",
    "options_de": [
      "Staatenverbund.",
      "Bundesstaat.",
      "Staatenbund.",
      "Zentralstaat."
    ],
    "options_en": [
      "association of states.",
      "federal state.",
      "confederation of states.",
      "centralized state."
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 39,
    "question_de": "Was hat jedes deutsche Bundesland?",
    "question_en": "What does every German federal state have?",
    "options_de": [
      "eine eigene Außenministerin / einen eigenen Außenminister",
      "eine eigene Währung",
      "eine eigene Armee",
      "eine eigene Regierung"
    ],
    "options_en": [
      "its own foreign minister",
      "its own currency",
      "its own army",
      "its own government"
    ],
    "correct_index": 3,
    "category": "Politik"
  },
  {
    "id": 40,
    "question_de": "Mit welchen Worten beginnt die deutsche Nationalhymne?",
    "question_en": "With which words does the German national anthem begin?",
    "options_de": [
      "Völker, hört die Signale …",
      "Einigkeit und Recht und Freiheit …",
      "Freude schöner Götterfunken …",
      "Deutschland einig Vaterland …"
    ],
    "options_en": [
      "Peoples, hear the signals...",
      "Unity and justice and freedom...",
      "Joy, beautiful spark of divinity...",
      "Germany, united fatherland..."
    ],
    "correct_index": 1,
    "category": "Kultur"
  },
  {
    "id": 41,
    "question_de": "Warum gibt es in einer Demokratie mehr als eine Partei?",
    "question_en": "Why are there more than one party in a democracy?",
    "options_de": [
      "weil dadurch die unterschiedlichen Meinungen der Bürgerinnen und Bürger vertreten werden",
      "damit Bestechung in der Politik begrenzt wird",
      "um politische Demonstrationen zu verhindern",
      "um wirtschaftlichen Wettbewerb anzuregen"
    ],
    "options_en": [
      "because this represents the different opinions of citizens",
      "to limit bribery in politics",
      "to prevent political demonstrations",
      "to stimulate economic competition"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 42,
    "question_de": "Wer beschließt in Deutschland ein neues Gesetz?",
    "question_en": "Who decides on a new law in Germany?",
    "options_de": [
      "die Regierung",
      "das Parlament",
      "die Gerichte",
      "die Polizei"
    ],
    "options_en": [
      "the government",
      "the parliament",
      "the courts",
      "the police"
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 43,
    "question_de": "Wann kann in Deutschland eine Partei verboten werden?",
    "question_en": "When can a party be banned in Germany?",
    "options_de": [
      "wenn ihr Wahlkampf zu teuer ist",
      "wenn sie gegen die Verfassung kämpft",
      "wenn sie Kritik am Staatsoberhaupt äußert",
      "wenn ihr Programm eine neue Richtung vorschlägt"
    ],
    "options_en": [
      "when its election campaign is too expensive",
      "when it fights against the constitution",
      "when it criticizes the head of state",
      "when its program suggests a new direction"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 44,
    "question_de": "Wen kann man als Bürgerin / Bürger in Deutschland nicht direkt wählen?",
    "question_en": "Who cannot be directly elected as a citizen in Germany?",
    "options_de": [
      "Abgeordnete des EU-Parlaments",
      "Die Bundespräsidentin / den Bundespräsidenten",
      "Landtagsabgeordnete",
      "Bundestagsabgeordnete"
    ],
    "options_en": [
      "Members of the European Parliament",
      "The Federal President",
      "State parliament members",
      "Bundestag members"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 45,
    "question_de": "Zu welcher Versicherung gehört die Pflegeversicherung?",
    "question_en": "Which insurance does long-term care insurance belong to?",
    "options_de": [
      "Sozialversicherung",
      "Unfallversicherung",
      "Hausratsversicherung",
      "Haftpflicht- und Feuerversicherung"
    ],
    "options_en": [
      "Social insurance",
      "Accident insurance",
      "Household contents insurance",
      "Liability and fire insurance"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 46,
    "question_de": "Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört dazu?",
    "question_en": "The German state has many tasks. Which task is included?",
    "options_de": [
      "Er baut Straßen und Schulen.",
      "Er verkauft Lebensmittel und Kleidung.",
      "Er versorgt alle Einwohnerinnen und Einwohner kostenlos mit Zeitungen.",
      "Er produziert Autos und Busse."
    ],
    "options_en": [
      "It builds roads and schools.",
      "It sells food and clothing.",
      "It provides all residents with free newspapers.",
      "It produces cars and buses."
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 47,
    "question_de": "Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört nicht dazu?",
    "question_en": "The German state has many tasks. Which task is not included?",
    "options_de": [
      "Er bezahlt für alle Staatsangehörigen Urlaubsreisen.",
      "Er zahlt Kindergeld.",
      "Er unterstützt Museen.",
      "Er fördert Sportlerinnen und Sportler."
    ],
    "options_en": [
      "It pays for vacation trips for all nationals.",
      "It pays child benefits.",
      "It supports museums.",
      "It promotes athletes."
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 48,
    "question_de": "Welches Organ gehört nicht zu den Verfassungsorganen Deutschlands?",
    "question_en": "Which body is not among the constitutional organs of Germany?",
    "options_de": [
      "der Bundesrat",
      "die Bundespräsidentin / der Bundespräsident",
      "die Bürgerversammlung",
      "die Regierung"
    ],
    "options_en": [
      "the Bundesrat",
      "the Federal President",
      "the citizens' assembly",
      "the government"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 49,
    "question_de": "Wer bestimmt in Deutschland die Schulpolitik?",
    "question_en": "Who determines education policy in Germany?",
    "options_de": [
      "die Lehrer und Lehrerinnen",
      "die Bundesländer",
      "das Familienministerium",
      "die Universitäten"
    ],
    "options_en": [
      "the teachers",
      "the federal states",
      "the family ministry",
      "the universities"
    ],
    "correct_index": 1,
    "category": "Politik"
  },
  {
    "id": 50,
    "question_de": "Die Wirtschaftsform in Deutschland nennt man …",
    "question_en": "The economic system in Germany is called...",
    "options_de": [
      "freie Zentralwirtschaft.",
      "soziale Marktwirtschaft.",
      "gelenkte Zentralwirtschaft.",
      "Planwirtschaft."
    ],
    "options_en": [
      "free central economy.",
      "social market economy.",
      "controlled central economy.",
      "planned economy."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 51,
    "question_de": "Zu einem demokratischen Rechtsstaat gehört es nicht, dass …",
    "question_en": "It is not part of a democratic constitutional state that...",
    "options_de": [
      "Menschen sich kritisch über die Regierung äußern können.",
      "Bürger friedlich demonstrieren gehen dürfen.",
      "Menschen von einer Privatpolizei ohne Grund verhaftet werden.",
      "jemand ein Verbrechen begeht und deshalb verhaftet wird."
    ],
    "options_en": [
      "people can express criticism of the government.",
      "citizens may demonstrate peacefully.",
      "people are arrested by a private police without reason.",
      "someone commits a crime and is therefore arrested."
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 52,
    "question_de": "Was bedeutet 'Volkssouveränität'? Alle Staatsgewalt geht vom ...",
    "question_en": "What does 'popular sovereignty' mean? All state power emanates from the...",
    "options_de": [
      "Volke aus.",
      "Bundestag aus.",
      "preußischen König aus.",
      "Bundesverfassungsgericht aus."
    ],
    "options_en": [
      "people.",
      "Bundestag.",
      "Prussian king.",
      "Federal Constitutional Court."
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 53,
    "question_de": "Was bedeutet 'Rechtsstaat' in Deutschland?",
    "question_en": "What does 'constitutional state' mean in Germany?",
    "options_de": [
      "Der Staat hat Recht.",
      "Es gibt nur rechte Parteien.",
      "Die Bürgerinnen und Bürger entscheiden über Gesetze.",
      "Der Staat muss die Gesetze einhalten."
    ],
    "options_en": [
      "The state is right.",
      "There are only right-wing parties.",
      "Citizens decide on laws.",
      "The state must obey the laws."
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 54,
    "question_de": "Was ist keine staatliche Gewalt in Deutschland?",
    "question_en": "What is not a state power in Germany?",
    "options_de": [
      "Legislative",
      "Judikative",
      "Exekutive",
      "Direktive"
    ],
    "options_en": [
      "Legislative",
      "Judiciary",
      "Executive",
      "Directive"
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 55,
    "question_de": "Was zeigt dieses Bild?",
    "question_en": "What does this picture show?",
    "options_de": [
      "den Bundestagssitz in Berlin",
      "das Bundesverfassungsgericht in Karlsruhe",
      "das Bundesratsgebäude in Berlin",
      "das Bundeskanzleramt in Berlin"
    ],
    "options_en": [
      "the Bundestag seat in Berlin",
      "the Federal Constitutional Court in Karlsruhe",
      "the Bundesrat building in Berlin",
      "the Federal Chancellery in Berlin"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 56,
    "question_de": "Welches Amt gehört in Deutschland zur Gemeindeverwaltung?",
    "question_en": "Which office belongs to municipal administration in Germany?",
    "options_de": [
      "Pfarramt",
      "Ordnungsamt",
      "Finanzamt",
      "Auswärtiges Amt"
    ],
    "options_en": [
      "Parish office",
      "Public order office",
      "Tax office",
      "Foreign Office"
    ],
    "correct_index": 1,
    "category": "Politik"
  },
  {
    "id": 57,
    "question_de": "Wer wird meistens zur Präsidentin / zum Präsidenten des Deutschen Bundestages gewählt?",
    "question_en": "Who is usually elected as President of the German Bundestag?",
    "options_de": [
      "die / der älteste Abgeordnete im Parlament",
      "die Ministerpräsidentin / der Ministerpräsident des größten Bundeslandes",
      "eine ehemalige Bundeskanzlerin / ein ehemaliger Bundeskanzler",
      "eine Abgeordnete / ein Abgeordneter der stärksten Fraktion"
    ],
    "options_en": [
      "the oldest member of parliament",
      "the minister president of the largest federal state",
      "a former federal chancellor",
      "a member of the strongest parliamentary group"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 58,
    "question_de": "Wer ernennt in Deutschland die Ministerinnen / die Minister der Bundesregierung?",
    "question_en": "Who appoints the ministers of the federal government in Germany?",
    "options_de": [
      "die Präsidentin / der Präsident des Bundesverfassungsgerichtes",
      "die Bundespräsidentin / der Bundespräsident",
      "die Bundesratspräsidentin / der Bundesratspräsident",
      "die Bundestagspräsidentin / der Bundestagspräsident"
    ],
    "options_en": [
      "the President of the Federal Constitutional Court",
      "the Federal President",
      "the President of the Bundesrat",
      "the President of the Bundestag"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 59,
    "question_de": "Vor wie vielen Jahren gab es erstmals eine jüdische Gemeinde auf dem Gebiet des heutigen Deutschlands?",
    "question_en": "How many years ago was there first a Jewish community in the territory of today's Germany?",
    "options_de": [
      "vor etwa 300 Jahren",
      "vor etwa 700 Jahren",
      "vor etwa 1150 Jahren",
      "vor etwa 1700 Jahren"
    ],
    "options_en": [
      "about 300 years ago",
      "about 700 years ago",
      "about 1150 years ago",
      "about 1700 years ago"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 60,
    "question_de": "In Deutschland gehören der Bundestag und der Bundesrat zur …",
    "question_en": "In Germany, the Bundestag and Bundesrat belong to the...",
    "options_de": [
      "Exekutive.",
      "Legislative.",
      "Direktive.",
      "Judikative."
    ],
    "options_en": [
      "Executive.",
      "Legislative.",
      "Directive.",
      "Judiciary."
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 61,
    "question_de": "Was bedeutet 'Volkssouveränität'?",
    "question_en": "What does 'popular sovereignty' mean?",
    "options_de": [
      "Die Königin / der König herrscht über das Volk.",
      "Das Bundesverfassungsgericht steht über der Verfassung.",
      "Die Interessenverbände üben die Souveränität zusammen mit der Regierung aus.",
      "Die Staatsgewalt geht vom Volke aus."
    ],
    "options_en": [
      "The queen/king rules over the people.",
      "The Federal Constitutional Court stands above the constitution.",
      "Interest groups exercise sovereignty together with the government.",
      "State power emanates from the people."
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 62,
    "question_de": "Wenn das Parlament eines deutschen Bundeslandes gewählt wird, nennt man das …",
    "question_en": "When the parliament of a German federal state is elected, this is called...",
    "options_de": [
      "Kommunalwahl",
      "Landtagswahl",
      "Europawahl",
      "Bundestagswahl"
    ],
    "options_en": [
      "local election",
      "state parliament election",
      "European election",
      "federal election"
    ],
    "correct_index": 1,
    "category": "Politik"
  },
  {
    "id": 63,
    "question_de": "Was gehört in Deutschland nicht zur Exekutive?",
    "question_en": "What does not belong to the executive in Germany?",
    "options_de": [
      "die Polizei",
      "die Gerichte",
      "das Finanzamt",
      "die Ministerien"
    ],
    "options_en": [
      "the police",
      "the courts",
      "the tax office",
      "the ministries"
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 64,
    "question_de": "Die Bundesrepublik Deutschland ist heute gegliedert in …",
    "question_en": "The Federal Republic of Germany is today divided into...",
    "options_de": [
      "vier Besatzungszonen.",
      "einen Oststaat und einen Weststaat.",
      "16 Kantone.",
      "Bund, Länder und Kommunen."
    ],
    "options_en": [
      "four occupation zones.",
      "an eastern state and a western state.",
      "16 cantons.",
      "federation, states and municipalities."
    ],
    "correct_index": 3,
    "category": "Politik"
  },
  {
    "id": 65,
    "question_de": "Es gehört nicht zu den Aufgaben des Deutschen Bundestages, …",
    "question_en": "It is not among the tasks of the German Bundestag to...",
    "options_de": [
      "Gesetze zu entwerfen.",
      "die Bundesregierung zu kontrollieren.",
      "die Bundeskanzlerin / den Bundeskanzler zu wählen.",
      "das Bundeskabinett zu bilden."
    ],
    "options_en": [
      "draft laws.",
      "control the federal government.",
      "elect the Federal Chancellor.",
      "form the federal cabinet."
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 66,
    "question_de": "Welche Städte haben die größten jüdischen Gemeinden in Deutschland?",
    "question_en": "Which cities have the largest Jewish communities in Germany?",
    "options_de": [
      "Berlin und München",
      "Hamburg und Essen",
      "Nürnberg und Stuttgart",
      "Worms und Speyer"
    ],
    "options_en": [
      "Berlin and Munich",
      "Hamburg and Essen",
      "Nuremberg and Stuttgart",
      "Worms and Speyer"
    ],
    "correct_index": 0,
    "category": "Kultur"
  },
  {
    "id": 67,
    "question_de": "Was ist in Deutschland vor allem eine Aufgabe der Bundesländer?",
    "question_en": "What is primarily a task of the federal states in Germany?",
    "options_de": [
      "Verteidigungspolitik",
      "Außenpolitik",
      "Wirtschaftspolitik",
      "Schulpolitik"
    ],
    "options_en": [
      "defense policy",
      "foreign policy",
      "economic policy",
      "education policy"
    ],
    "correct_index": 3,
    "category": "Politik"
  },
  {
    "id": 68,
    "question_de": "Warum kontrolliert der Staat in Deutschland das Schulwesen?",
    "question_en": "Why does the state control the education system in Germany?",
    "options_de": [
      "weil es in Deutschland nur staatliche Schulen gibt",
      "weil alle Schülerinnen und Schüler einen Schulabschluss haben müssen",
      "weil es in den Bundesländern verschiedene Schulen gibt",
      "weil es nach dem Grundgesetz seine Aufgabe ist"
    ],
    "options_en": [
      "because there are only state schools in Germany",
      "because all students must have a school leaving certificate",
      "because there are different schools in the federal states",
      "because it is its task according to the Basic Law"
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 69,
    "question_de": "Die Bundesrepublik Deutschland hat einen dreistufigen Verwaltungsaufbau. Wie heißt die unterste politische Stufe?",
    "question_en": "The Federal Republic of Germany has a three-tier administrative structure. What is the lowest political level called?",
    "options_de": [
      "Stadträte",
      "Landräte",
      "Gemeinden",
      "Bezirksämter"
    ],
    "options_en": [
      "City councils",
      "District administrators",
      "Municipalities",
      "District offices"
    ],
    "correct_index": 2,
    "category": "Politik"
  },
  {
    "id": 70,
    "question_de": "Der deutsche Bundespräsident Gustav Heinemann gibt Helmut Schmidt 1974 die Ernennungsurkunde zum deutschen Bundeskanzler. Was gehört zu den Aufgaben der deutschen Bundespräsidentin / des deutschen Bundespräsidenten?",
    "question_en": "German Federal President Gustav Heinemann gives Helmut Schmidt the appointment certificate as German Federal Chancellor in 1974. What is among the tasks of the German Federal President?",
    "options_de": [
      "Sie / Er führt die Regierungsgeschäfte.",
      "Sie / Er kontrolliert die Regierungspartei.",
      "Sie / Er wählt die Ministerinnen / Minister aus.",
      "Sie / Er schlägt die Kanzlerin / den Kanzler zur Wahl vor."
    ],
    "options_en": [
      "They conduct government business.",
      "They control the governing party.",
      "They select the ministers.",
      "They propose the chancellor for election."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 71,
    "question_de": "Wo hält sich die deutsche Bundeskanzlerin / der deutsche Bundeskanzler am häufigsten auf?",
    "question_en": "Where does the German Federal Chancellor spend most of their time?",
    "options_de": [
      "in Bonn, weil sich dort das Bundeskanzleramt und der Bundestag befinden.",
      "auf Schloss Meseberg, dem Gästehaus der Bundesregierung, um Staatsgäste zu empfangen.",
      "auf Schloss Bellevue, dem Amtssitz der Bundespräsidentin / des Bundespräsidenten, um Staatsgäste zu empfangen.",
      "in Berlin, weil sich dort das Bundeskanzleramt und der Bundestag befinden."
    ],
    "options_en": [
      "in Bonn, because the Federal Chancellery and Bundestag are located there.",
      "at Schloss Meseberg, the guest house of the federal government, to receive state guests.",
      "at Schloss Bellevue, the official residence of the Federal President, to receive state guests.",
      "in Berlin, because the Federal Chancellery and Bundestag are located there."
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 72,
    "question_de": "Wie heißt die jetzige Bundeskanzlerin / der jetzige Bundeskanzler von Deutschland?",
    "question_en": "What is the name of the current Federal Chancellor of Germany?",
    "options_de": [
      "Gerhard Schröder",
      "Angela Merkel",
      "Ursula von der Leyen",
      "Friedrich Merz"
    ],
    "options_en": [
      "Gerhard Schröder",
      "Angela Merkel",
      "Ursula von der Leyen",
      "Friedrich Merz"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 73,
    "question_de": "Die beiden größten Fraktionen im Deutschen Bundestag heißen zurzeit …",
    "question_en": "The two largest parliamentary groups in the German Bundestag are currently called...",
    "options_de": [
      "CDU/CSU und AfD.",
      "Die Linke und Bündnis 90/Die Grünen.",
      "Bündnis 90/Die Grünen und SPD.",
      "Die Linke und CDU/CSU."
    ],
    "options_en": [
      "CDU/CSU and AfD.",
      "The Left and Alliance 90/The Greens.",
      "Alliance 90/The Greens and SPD.",
      "The Left and CDU/CSU."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 74,
    "question_de": "Wie heißt das Parlament für ganz Deutschland?",
    "question_en": "What is the parliament for all of Germany called?",
    "options_de": [
      "Bundesversammlung",
      "Volkskammer",
      "Bundestag",
      "Bundesgerichtshof"
    ],
    "options_en": [
      "Federal Assembly",
      "People's Chamber",
      "Bundestag",
      "Federal Court of Justice"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 75,
    "question_de": "Wie heißt Deutschlands heutiges Staatsoberhaupt?",
    "question_en": "What is the name of Germany's current head of state?",
    "options_de": [
      "Frank-Walter Steinmeier",
      "Bärbel Bas",
      "Bodo Ramelow",
      "Joachim Gauck"
    ],
    "options_en": [
      "Frank-Walter Steinmeier",
      "Bärbel Bas",
      "Bodo Ramelow",
      "Joachim Gauck"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 76,
    "question_de": "Was bedeutet die Abkürzung CDU in Deutschland?",
    "question_en": "What does the abbreviation CDU mean in Germany?",
    "options_de": [
      "Christliche Deutsche Union",
      "Club Deutscher Unternehmer",
      "Christlicher Deutscher Umweltschutz",
      "Christlich Demokratische Union"
    ],
    "options_en": [
      "Christian German Union",
      "Club of German Entrepreneurs",
      "Christian German Environmental Protection",
      "Christian Democratic Union"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 77,
    "question_de": "Was ist die Bundeswehr?",
    "question_en": "What is the Bundeswehr?",
    "options_de": [
      "die deutsche Polizei",
      "ein deutscher Hafen",
      "eine deutsche Bürgerinitiative",
      "die deutsche Armee"
    ],
    "options_en": [
      "the German police",
      "a German harbor",
      "a German citizens' initiative",
      "the German army"
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 78,
    "question_de": "Was bedeutet die Abkürzung SPD?",
    "question_en": "What does the abbreviation SPD mean?",
    "options_de": [
      "Sozialistische Partei Deutschlands",
      "Sozialpolitische Partei Deutschlands",
      "Sozialdemokratische Partei Deutschlands",
      "Sozialgerechte Partei Deutschlands"
    ],
    "options_en": [
      "Socialist Party of Germany",
      "Social Policy Party of Germany",
      "Social Democratic Party of Germany",
      "Socially Just Party of Germany"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 79,
    "question_de": "Was bedeutet die Abkürzung FDP in Deutschland?",
    "question_en": "What does the abbreviation FDP mean in Germany?",
    "options_de": [
      "Friedliche Demonstrative Partei",
      "Freie Deutschland Partei",
      "Führende Demokratische Partei",
      "Freie Demokratische Partei"
    ],
    "options_en": [
      "Peaceful Demonstrative Party",
      "Free Germany Party",
      "Leading Democratic Party",
      "Free Democratic Party"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 80,
    "question_de": "Welches Gericht in Deutschland ist zuständig für die Auslegung des Grundgesetzes?",
    "question_en": "Which court in Germany is responsible for interpreting the Basic Law?",
    "options_de": [
      "Oberlandesgericht",
      "Amtsgericht",
      "Bundesverfassungsgericht",
      "Verwaltungsgericht"
    ],
    "options_en": [
      "Higher Regional Court",
      "Local Court",
      "Federal Constitutional Court",
      "Administrative Court"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 81,
    "question_de": "Wer wählt die Bundeskanzlerin / den Bundeskanzler in Deutschland?",
    "question_en": "Who elects the Federal Chancellor in Germany?",
    "options_de": [
      "der Bundesrat",
      "die Bundesversammlung",
      "das Volk",
      "der Bundestag"
    ],
    "options_en": [
      "the Bundesrat",
      "the Federal Assembly",
      "the people",
      "the Bundestag"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 82,
    "question_de": "Wer leitet das deutsche Bundeskabinett?",
    "question_en": "Who leads the German federal cabinet?",
    "options_de": [
      "die Bundestagspräsidentin / der Bundestagspräsident",
      "die Bundespräsidentin / der Bundespräsident",
      "die Bundesratspräsidentin / der Bundesratspräsident",
      "die Bundeskanzlerin / der Bundeskanzler"
    ],
    "options_en": [
      "the President of the Bundestag",
      "the Federal President",
      "the President of the Bundesrat",
      "the Federal Chancellor"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 83,
    "question_de": "Wer wählt die deutsche Bundeskanzlerin / den deutschen Bundeskanzler?",
    "question_en": "Who elects the German Federal Chancellor?",
    "options_de": [
      "das Volk",
      "die Bundesversammlung",
      "der Bundestag",
      "die Bundesregierung"
    ],
    "options_en": [
      "the people",
      "the Federal Assembly",
      "the Bundestag",
      "the federal government"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 84,
    "question_de": "Welche Hauptaufgabe hat die deutsche Bundespräsidentin / der deutsche Bundespräsident? Sie/Er …",
    "question_en": "What is the main task of the German Federal President? They...",
    "options_de": [
      "regiert das Land.",
      "entwirft die Gesetze.",
      "repräsentiert das Land.",
      "überwacht die Einhaltung der Gesetze."
    ],
    "options_en": [
      "govern the country.",
      "draft laws.",
      "represent the country.",
      "monitor compliance with laws."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 85,
    "question_de": "Wer bildet den deutschen Bundesrat?",
    "question_en": "Who forms the German Bundesrat?",
    "options_de": [
      "die Abgeordneten des Bundestages",
      "die Ministerinnen und Minister der Bundesregierung",
      "die Regierungsvertreter der Bundesländer",
      "die Parteimitglieder"
    ],
    "options_en": [
      "the members of the Bundestag",
      "the ministers of the federal government",
      "the government representatives of the federal states",
      "the party members"
    ],
    "correct_index": 2,
    "category": "Politik"
  },
  {
    "id": 86,
    "question_de": "Wer wählt in Deutschland die Bundespräsidentin/den Bundespräsidenten?",
    "question_en": "Who elects the Federal President in Germany?",
    "options_de": [
      "die Bundesversammlung",
      "der Bundesrat",
      "das Bundesparlament",
      "das Bundesverfassungsgericht"
    ],
    "options_en": [
      "the Federal Assembly",
      "the Bundesrat",
      "the federal parliament",
      "the Federal Constitutional Court"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 87,
    "question_de": "Wer ist das Staatsoberhaupt der Bundesrepublik Deutschland?",
    "question_en": "Who is the head of state of the Federal Republic of Germany?",
    "options_de": [
      "die Bundeskanzlerin / der Bundeskanzler",
      "die Bundespräsidentin / der Bundespräsident",
      "die Bundesratspräsidentin / der Bundesratspräsident",
      "die Bundestagspräsidentin / der Bundestagspräsident"
    ],
    "options_en": [
      "the Federal Chancellor",
      "the Federal President",
      "the President of the Bundesrat",
      "the President of the Bundestag"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 88,
    "question_de": "Die parlamentarische Opposition im Deutschen Bundestag …",
    "question_en": "The parliamentary opposition in the German Bundestag...",
    "options_de": [
      "kontrolliert die Regierung.",
      "entscheidet, wer Bundesministerin / Bundesminister wird.",
      "bestimmt, wer im Bundesrat sitzt.",
      "schlägt die Regierungschefinnen / Regierungschefs der Länder vor."
    ],
    "options_en": [
      "controls the government.",
      "decides who becomes a federal minister.",
      "determines who sits in the Bundesrat.",
      "proposes the heads of government of the states."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 89,
    "question_de": "Wie nennt man in Deutschland die Vereinigung von Abgeordneten einer Partei im Parlament?",
    "question_en": "What is the association of members of a party in parliament called in Germany?",
    "options_de": [
      "Verband",
      "Ältestenrat",
      "Fraktion",
      "Opposition"
    ],
    "options_en": [
      "Association",
      "Council of Elders",
      "Parliamentary group",
      "Opposition"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 90,
    "question_de": "Die deutschen Bundesländer wirken an der Gesetzgebung des Bundes mit durch …",
    "question_en": "The German federal states participate in federal legislation through...",
    "options_de": [
      "den Bundesrat.",
      "die Bundesversammlung.",
      "den Bundestag.",
      "die Bundesregierung."
    ],
    "options_en": [
      "the Bundesrat.",
      "the Federal Assembly.",
      "the Bundestag.",
      "the federal government."
    ],
    "correct_index": 0,
    "category": "Politik"
  },
  {
    "id": 91,
    "question_de": "In Deutschland kann ein Regierungswechsel in einem Bundesland Auswirkungen auf die Bundespolitik haben. Das Regieren wird …",
    "question_en": "In Germany, a change of government in a federal state can have effects on federal politics. Governing becomes...",
    "options_de": [
      "schwieriger, wenn sich dadurch die Mehrheit im Bundestag ändert.",
      "leichter, wenn dadurch neue Parteien in den Bundesrat kommen.",
      "schwieriger, wenn dadurch die Mehrheit im Bundesrat verändert wird.",
      "leichter, wenn es sich um ein reiches Bundesland handelt."
    ],
    "options_en": [
      "more difficult if this changes the majority in the Bundestag.",
      "easier if new parties enter the Bundesrat as a result.",
      "more difficult if this changes the majority in the Bundesrat.",
      "easier if it is a rich federal state."
    ],
    "correct_index": 2,
    "category": "Politik"
  },
  {
    "id": 92,
    "question_de": "Was bedeutet die Abkürzung CSU in Deutschland?",
    "question_en": "What does the abbreviation CSU mean in Germany?",
    "options_de": [
      "Christlich Sichere Union",
      "Christlich Süddeutsche Union",
      "Christlich Sozialer Unternehmerverband",
      "Christlich Soziale Union"
    ],
    "options_en": [
      "Christian Secure Union",
      "Christian South German Union",
      "Christian Social Entrepreneurs Association",
      "Christian Social Union"
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 93,
    "question_de": "Je mehr 'Zweitstimmen' eine Partei bei einer Bundestagswahl bekommt, desto …",
    "question_en": "The more 'second votes' a party gets in a federal election, the...",
    "options_de": [
      "weniger Erststimmen kann sie haben.",
      "mehr Direktkandidaten der Partei ziehen ins Parlament ein.",
      "größer ist das Risiko, eine Koalition bilden zu müssen.",
      "mehr Sitze erhält die Partei im Parlament."
    ],
    "options_en": [
      "fewer first votes it can have.",
      "more direct candidates from the party enter parliament.",
      "greater the risk of having to form a coalition.",
      "more seats the party gets in parliament."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 94,
    "question_de": "Ab welchem Alter darf man in Deutschland an der Wahl zum Deutschen Bundestag teilnehmen?",
    "question_en": "From what age can one participate in elections for the German Bundestag in Germany?",
    "options_de": [
      "16",
      "18",
      "21",
      "23"
    ],
    "options_en": [
      "16",
      "18",
      "21",
      "23"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 95,
    "question_de": "Was gilt für die meisten Kinder in Deutschland?",
    "question_en": "What applies to most children in Germany?",
    "options_de": [
      "Wahlpflicht",
      "Schulpflicht",
      "Schweigepflicht",
      "Religionspflicht"
    ],
    "options_en": [
      "Compulsory voting",
      "Compulsory schooling",
      "Duty of confidentiality",
      "Religious obligation"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 96,
    "question_de": "Wie kann jemand, der den Holocaust leugnet, bestraft werden?",
    "question_en": "How can someone who denies the Holocaust be punished?",
    "options_de": [
      "Kürzung sozialer Leistungen",
      "bis zu 100 Sozialstunden",
      "gar nicht, Holocaustleugnung ist erlaubt",
      "mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe"
    ],
    "options_en": [
      "Reduction of social benefits",
      "up to 100 hours of community service",
      "not at all, Holocaust denial is allowed",
      "with imprisonment of up to five years or with a fine"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 97,
    "question_de": "Was bezahlt man in Deutschland automatisch, wenn man fest angestellt ist?",
    "question_en": "What do you automatically pay in Germany when you are permanently employed?",
    "options_de": [
      "Sozialversicherung",
      "Sozialhilfe",
      "Kindergeld",
      "Wohngeld"
    ],
    "options_en": [
      "Social security",
      "Social welfare",
      "Child benefit",
      "Housing benefit"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 98,
    "question_de": "Wenn Abgeordnete im Deutschen Bundestag ihre Fraktion wechseln, …",
    "question_en": "When members of the German Bundestag change their parliamentary group...",
    "options_de": [
      "dürfen sie nicht mehr an den Sitzungen des Parlaments teilnehmen.",
      "kann die Regierung ihre Mehrheit verlieren.",
      "muss die Bundespräsidentin / der Bundespräsident zuvor ihr/sein Einverständnis geben.",
      "dürfen die Wählerinnen / Wähler dieser Abgeordneten noch einmal wählen."
    ],
    "options_en": [
      "they may no longer participate in parliamentary sessions.",
      "the government can lose its majority.",
      "the Federal President must give their consent beforehand.",
      "the voters of these members may vote again."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 99,
    "question_de": "Wer bezahlt in Deutschland die Sozialversicherungen?",
    "question_en": "Who pays for social insurance in Germany?",
    "options_de": [
      "Arbeitgeberinnen / Arbeitgeber und Arbeitnehmerinnen / Arbeitnehmer",
      "nur Arbeitnehmerinnen / Arbeitnehmer",
      "alle Staatsangehörigen",
      "nur Arbeitgeberinnen / Arbeitgeber"
    ],
    "options_en": [
      "Employers and employees",
      "only employees",
      "all nationals",
      "only employers"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 100,
    "question_de": "Was gehört nicht zur gesetzlichen Sozialversicherung?",
    "question_en": "What does not belong to statutory social insurance?",
    "options_de": [
      "die Lebensversicherung",
      "die gesetzliche Rentenversicherung",
      "die Arbeitslosenversicherung",
      "die Pflegeversicherung"
    ],
    "options_en": [
      "life insurance",
      "statutory pension insurance",
      "unemployment insurance",
      "long-term care insurance"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 101,
    "question_de": "Gewerkschaften sind Interessenverbände der …",
    "question_en": "Trade unions are interest groups of...",
    "options_de": [
      "Jugendlichen.",
      "Arbeitnehmerinnen und Arbeitnehmer.",
      "Rentnerinnen und Rentner.",
      "Arbeitgeberinnen und Arbeitgeber."
    ],
    "options_en": [
      "young people.",
      "employees.",
      "pensioners.",
      "employers."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 102,
    "question_de": "Womit kann man in der Bundesrepublik Deutschland geehrt werden, wenn man auf politischem, wirtschaftlichem, kulturellem, geistigem oder sozialem Gebiet eine besondere Leistung erbracht hat? Mit dem …",
    "question_en": "How can one be honored in the Federal Republic of Germany if one has achieved a special accomplishment in political, economic, cultural, intellectual or social fields? With the...",
    "options_de": [
      "Bundesverdienstkreuz",
      "Bundesadler",
      "Vaterländischen Verdienstorden",
      "Ehrentitel 'Held der Deutschen Demokratischen Republik'"
    ],
    "options_en": [
      "Order of Merit of the Federal Republic of Germany",
      "Federal Eagle",
      "Patriotic Order of Merit",
      "Honorary title 'Hero of the German Democratic Republic'"
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 103,
    "question_de": "Was wird in Deutschland als 'Ampelkoalition' bezeichnet? Die Zusammenarbeit …",
    "question_en": "What is referred to as 'traffic light coalition' in Germany? The cooperation...",
    "options_de": [
      "der Bundestagsfraktionen von CDU und CSU",
      "von SPD, FDP und Bündnis 90/Die Grünen in einer Regierung",
      "von CSU, Die LINKE und Bündnis 90/Die Grünen in einer Regierung",
      "der Bundestagsfraktionen von CDU und SPD"
    ],
    "options_en": [
      "of the CDU and CSU parliamentary groups in the Bundestag",
      "of SPD, FDP and Alliance 90/The Greens in a government",
      "of CSU, The Left and Alliance 90/The Greens in a government",
      "of the CDU and SPD parliamentary groups in the Bundestag"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 104,
    "question_de": "Eine Frau in Deutschland verliert ihre Arbeit. Was darf nicht der Grund für diese Entlassung sein?",
    "question_en": "A woman in Germany loses her job. What may not be the reason for this dismissal?",
    "options_de": [
      "Die Frau ist lange krank und arbeitsunfähig.",
      "Die Frau kam oft zu spät zur Arbeit.",
      "Die Frau erledigt private Sachen während der Arbeitszeit.",
      "Die Frau bekommt ein Kind und ihr Chef weiß das."
    ],
    "options_en": [
      "The woman has been ill for a long time and is unable to work.",
      "The woman often came to work late.",
      "The woman does private things during working hours.",
      "The woman is having a child and her boss knows this."
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 105,
    "question_de": "Was ist eine Aufgabe von Wahlhelferinnen / Wahlhelfern in Deutschland?",
    "question_en": "What is a task of election helpers in Germany?",
    "options_de": [
      "Sie helfen alten Menschen bei der Stimmabgabe in der Wahlkabine.",
      "Sie schreiben die Wahlbenachrichtigungen vor der Wahl.",
      "Sie geben Zwischenergebnisse an die Medien weiter.",
      "Sie zählen die Stimmen nach dem Ende der Wahl."
    ],
    "options_en": [
      "They help elderly people with voting in the polling booth.",
      "They write the election notifications before the election.",
      "They pass on interim results to the media.",
      "They count the votes after the end of the election."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 106,
    "question_de": "In Deutschland helfen ehrenamtliche Wahlhelferinnen und Wahlhelfer bei den Wahlen. Was ist eine Aufgabe von Wahlhelferinnen / Wahlhelfern?",
    "question_en": "In Germany, voluntary election helpers assist with elections. What is a task of election helpers?",
    "options_de": [
      "Sie helfen Kindern und alten Menschen beim Wählen.",
      "Sie schreiben Karten und Briefe mit der Angabe des Wahllokals.",
      "Sie geben Zwischenergebnisse an Journalisten weiter.",
      "Sie zählen die Stimmen nach dem Ende der Wahl."
    ],
    "options_en": [
      "They help children and elderly people with voting.",
      "They write cards and letters with the polling station information.",
      "They pass on interim results to journalists.",
      "They count the votes after the end of the election."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 107,
    "question_de": "Für wie viele Jahre wird der Bundestag in Deutschland gewählt?",
    "question_en": "For how many years is the Bundestag elected in Germany?",
    "options_de": [
      "2 Jahre",
      "4 Jahre",
      "6 Jahre",
      "8 Jahre"
    ],
    "options_en": [
      "2 years",
      "4 years",
      "6 years",
      "8 years"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 108,
    "question_de": "Bei einer Bundestagswahl in Deutschland darf jede/jeder wählen, die/der …",
    "question_en": "In a federal election in Germany, everyone may vote who...",
    "options_de": [
      "in der Bundesrepublik Deutschland wohnt und wählen möchte.",
      "Bürgerin/Bürger der Bundesrepublik Deutschland ist und mindestens 18 Jahre alt ist.",
      "seit mindestens 3 Jahren in der Bundesrepublik Deutschland lebt.",
      "Bürgerin/Bürger der Bundesrepublik Deutschland ist und mindestens 21 Jahre alt ist."
    ],
    "options_en": [
      "lives in the Federal Republic of Germany and wants to vote.",
      "is a citizen of the Federal Republic of Germany and is at least 18 years old.",
      "has lived in the Federal Republic of Germany for at least 3 years.",
      "is a citizen of the Federal Republic of Germany and is at least 21 years old."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 109,
    "question_de": "Wie oft gibt es normalerweise Bundestagswahlen in Deutschland?",
    "question_en": "How often are there usually federal elections in Germany?",
    "options_de": [
      "alle drei Jahre",
      "alle vier Jahre",
      "alle fünf Jahre",
      "alle sechs Jahre"
    ],
    "options_en": [
      "every three years",
      "every four years",
      "every five years",
      "every six years"
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 110,
    "question_de": "Für wie viele Jahre wird der Bundestag in Deutschland gewählt?",
    "question_en": "For how many years is the Bundestag elected in Germany?",
    "options_de": [
      "2 Jahre",
      "3 Jahre",
      "4 Jahre",
      "5 Jahre"
    ],
    "options_en": [
      "2 years",
      "3 years",
      "4 years",
      "5 years"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 111,
    "question_de": "Welche Handlungen mit Bezug auf den Staat Israel sind in Deutschland verboten?",
    "question_en": "Which actions relating to the State of Israel are prohibited in Germany?",
    "options_de": [
      "die Politik Israels öffentlich kritisieren",
      "das Aufhängen einer israelischen Flagge auf dem Privatgrundstück",
      "eine Diskussion über die Politik Israels",
      "der öffentliche Aufruf zur Vernichtung Israels"
    ],
    "options_en": [
      "publicly criticizing Israel's politics",
      "hanging an Israeli flag on private property",
      "a discussion about Israel's politics",
      "the public call for the destruction of Israel"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 112,
    "question_de": "Die Wahlen in Deutschland sind …",
    "question_en": "Elections in Germany are...",
    "options_de": [
      "speziell.",
      "geheim.",
      "berufsbezogen.",
      "geschlechtsabhängig."
    ],
    "options_en": [
      "special.",
      "secret.",
      "occupation-related.",
      "gender-dependent."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 113,
    "question_de": "Wahlen in Deutschland gewinnt die Partei, die …",
    "question_en": "In German elections, the party wins that...",
    "options_de": [
      "die meisten Stimmen bekommt.",
      "die meisten Männer mehrheitlich gewählt haben.",
      "die meisten Stimmen bei den Arbeiterinnen / Arbeitern bekommen hat.",
      "die meisten Erststimmen für ihre Kanzlerkandidatin / ihren Kanzlerkandidaten erhalten hat."
    ],
    "options_en": [
      "gets the most votes.",
      "has been voted for by the majority of men.",
      "has received the most votes from workers.",
      "has received the most first votes for its chancellor candidate."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 114,
    "question_de": "An demokratischen Wahlen in Deutschland teilzunehmen ist …",
    "question_en": "Participating in democratic elections in Germany is...",
    "options_de": [
      "eine Pflicht.",
      "ein Recht.",
      "ein Zwang.",
      "eine Last."
    ],
    "options_en": [
      "a duty.",
      "a right.",
      "a compulsion.",
      "a burden."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 115,
    "question_de": "Was bedeutet \"aktives Wahlrecht\" in Deutschland?",
    "question_en": "What does \"active voting right\" mean in Germany?",
    "options_de": [
      "Man kann gewählt werden.",
      "Man muss wählen gehen.",
      "Man kann wählen.",
      "Man muss zur Auszählung der Stimmen gehen."
    ],
    "options_en": [
      "One can be elected.",
      "One must go to vote.",
      "One can vote.",
      "One must go to count the votes."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 116,
    "question_de": "Wenn Sie bei einer Bundestagswahl in Deutschland wählen dürfen, heißt das …",
    "question_en": "If you are allowed to vote in a federal election in Germany, this means...",
    "options_de": [
      "aktive Wahlkampagne.",
      "aktives Wahlverfahren.",
      "aktiver Wahlkampf.",
      "aktives Wahlrecht."
    ],
    "options_en": [
      "active election campaign.",
      "active election procedure.",
      "active election fight.",
      "active voting right."
    ],
    "correct_index": 3,
    "category": "Wahlen"
  },
  {
    "id": 117,
    "question_de": "Wie viel Prozent der Zweitstimmen müssen Parteien mindestens bekommen, um in den Deutschen Bundestag gewählt zu werden?",
    "question_en": "What percentage of second votes must parties get at minimum to be elected to the German Bundestag?",
    "options_de": [
      "3%",
      "4%",
      "5%",
      "6%"
    ],
    "options_en": [
      "3%",
      "4%",
      "5%",
      "6%"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 118,
    "question_de": "Wer darf bei den rund 40 jüdischen Makkabi-Sportvereinen Mitglied werden?",
    "question_en": "Who may become a member of the approximately 40 Jewish Maccabi sports clubs?",
    "options_de": [
      "nur Deutsche",
      "nur Israelis",
      "nur religiöse Menschen",
      "alle Menschen"
    ],
    "options_en": [
      "only Germans",
      "only Israelis",
      "only religious people",
      "all people"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 119,
    "question_de": "Wahlen in Deutschland sind frei. Was bedeutet das?",
    "question_en": "Elections in Germany are free. What does this mean?",
    "options_de": [
      "Alle verurteilten Straftäterinnen / Straftäter dürfen nicht wählen.",
      "Wenn ich wählen gehen möchte, muss meine Arbeitgeberin / mein Arbeitgeber mir frei geben.",
      "Jede Person kann ohne Zwang entscheiden, ob sie wählen möchte und wen sie wählen möchte.",
      "Ich kann frei entscheiden, wo ich wählen gehen möchte."
    ],
    "options_en": [
      "All convicted criminals may not vote.",
      "If I want to go voting, my employer must give me time off.",
      "Every person can decide without coercion whether they want to vote and whom they want to vote for.",
      "I can freely decide where I want to go voting."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 120,
    "question_de": "Das Wahlsystem in Deutschland ist ein …",
    "question_en": "The electoral system in Germany is a...",
    "options_de": [
      "Zensuswahlrecht.",
      "Dreiklassenwahlrecht.",
      "Mehrheits- und Verhältniswahlrecht.",
      "allgemeines Männerwahlrecht."
    ],
    "options_en": [
      "census suffrage.",
      "three-class suffrage.",
      "majority and proportional representation system.",
      "universal male suffrage."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 121,
    "question_de": "Eine Partei möchte in den Deutschen Bundestag. Sie muss aber einen Mindestanteil an Wählerstimmen haben. Das heißt …",
    "question_en": "A party wants to enter the German Bundestag. But it must have a minimum share of voter votes. This is called...",
    "options_de": [
      "5%-Hürde.",
      "Zulassungsgrenze.",
      "Basiswert.",
      "Richtlinie."
    ],
    "options_en": [
      "5% threshold.",
      "admission limit.",
      "base value.",
      "guideline."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 122,
    "question_de": "Welchem Grundsatz unterliegen Wahlen in Deutschland? Wahlen in Deutschland sind …",
    "question_en": "What principle do elections in Germany follow? Elections in Germany are...",
    "options_de": [
      "frei, gleich, geheim.",
      "offen, sicher, frei.",
      "geschlossen, gleich, sicher.",
      "sicher, offen, freiwillig."
    ],
    "options_en": [
      "free, equal, secret.",
      "open, secure, free.",
      "closed, equal, secure.",
      "secure, open, voluntary."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 123,
    "question_de": "Was ist in Deutschland die \"5%-Hürde\"?",
    "question_en": "What is the \"5% threshold\" in Germany?",
    "options_de": [
      "Abstimmungsregelung im Bundestag für kleine Parteien",
      "Anwesenheitskontrolle im Bundestag für Abstimmungen",
      "Mindestanteil an Wählerstimmen, um ins Parlament zu kommen",
      "Anwesenheitskontrolle im Bundesrat für Abstimmungen"
    ],
    "options_en": [
      "Voting regulation in the Bundestag for small parties",
      "Attendance control in the Bundestag for votes",
      "Minimum share of voter votes to enter parliament",
      "Attendance control in the Bundesrat for votes"
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 124,
    "question_de": "Die Bundestagswahl in Deutschland ist die Wahl …",
    "question_en": "The federal election in Germany is the election of...",
    "options_de": [
      "der Bundeskanzlerin / des Bundeskanzlers.",
      "der Parlamente der Länder.",
      "des Parlaments für Deutschland.",
      "der Bundespräsidentin / des Bundespräsidenten."
    ],
    "options_en": [
      "the Federal Chancellor.",
      "the state parliaments.",
      "the parliament for Germany.",
      "the Federal President."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 125,
    "question_de": "In einer Demokratie ist eine Funktion von regelmäßigen Wahlen, …",
    "question_en": "In a democracy, one function of regular elections is to...",
    "options_de": [
      "die Bürgerinnen und Bürger zu zwingen, ihre Stimme abzugeben.",
      "nach dem Willen der Wählermehrheit den Wechsel der Regierung zu ermöglichen.",
      "im Land bestehende Gesetze beizubehalten.",
      "den Armen mehr Macht zu geben."
    ],
    "options_en": [
      "force citizens to cast their vote.",
      "enable a change of government according to the will of the voter majority.",
      "maintain existing laws in the country.",
      "give more power to the poor."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 126,
    "question_de": "Was bekommen wahlberechtigte Bürgerinnen und Bürger in Deutschland vor einer Wahl?",
    "question_en": "What do eligible citizens in Germany receive before an election?",
    "options_de": [
      "eine Wahlbenachrichtigung von der Gemeinde",
      "eine Wahlerlaubnis von der Bundespräsidentin / von dem Bundespräsidenten",
      "eine Benachrichtigung von der Bundesversammlung",
      "eine Benachrichtigung vom Pfarramt"
    ],
    "options_en": [
      "an election notification from the municipality",
      "a voting permit from the Federal President",
      "a notification from the Federal Assembly",
      "a notification from the parish office"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 127,
    "question_de": "Warum gibt es die 5%-Hürde im Wahlgesetz der Bundesrepublik Deutschland? Es gibt sie, weil …",
    "question_en": "Why does the 5% threshold exist in the electoral law of the Federal Republic of Germany? It exists because...",
    "options_de": [
      "die Programme von vielen kleinen Parteien viele Gemeinsamkeiten haben.",
      "die Bürgerinnen und Bürger bei vielen kleinen Parteien die Orientierung verlieren können.",
      "viele kleine Parteien die Regierungsbildung erschweren.",
      "die kleinen Parteien nicht so viel Geld haben, um die Politikerinnen und Politiker zu bezahlen."
    ],
    "options_en": [
      "the programs of many small parties have many similarities.",
      "citizens can lose orientation with many small parties.",
      "many small parties make government formation more difficult.",
      "small parties don't have as much money to pay politicians."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 128,
    "question_de": "Parlamentsmitglieder, die von den Bürgerinnen und Bürgern gewählt werden, nennt man …",
    "question_en": "Parliament members who are elected by citizens are called...",
    "options_de": [
      "Abgeordnete.",
      "Kanzlerinnen / Kanzler.",
      "Botschafterinnen / Botschafter.",
      "Ministerpräsidentinnen / Ministerpräsidenten."
    ],
    "options_en": [
      "members of parliament.",
      "chancellors.",
      "ambassadors.",
      "minister presidents."
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 129,
    "question_de": "Vom Volk gewählt wird in Deutschland …",
    "question_en": "In Germany, elected by the people is...",
    "options_de": [
      "die Bundeskanzlerin / der Bundeskanzler.",
      "die Ministerpräsidentin / der Ministerpräsident eines Bundeslandes.",
      "der Bundestag.",
      "die Bundespräsidentin / der Bundespräsident."
    ],
    "options_en": [
      "the Federal Chancellor.",
      "the minister president of a federal state.",
      "the Bundestag.",
      "the Federal President."
    ],
    "correct_index": 2,
    "category": "Wahlen"
  },
  {
    "id": 130,
    "question_de": "Welcher Stimmzettel wäre bei einer Bundestagswahl gültig?",
    "question_en": "Which ballot would be valid in a federal election?",
    "options_de": [
      "1",
      "2",
      "3",
      "4"
    ],
    "options_en": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 131,
    "question_de": "In Deutschland ist eine Bürgermeisterin / ein Bürgermeister …",
    "question_en": "In Germany, a mayor is...",
    "options_de": [
      "die Leiterin / der Leiter einer Schule.",
      "die Chefin / der Chef einer Bank.",
      "das Oberhaupt einer Gemeinde.",
      "die / der Vorsitzende einer Partei."
    ],
    "options_en": [
      "the head of a school.",
      "the head of a bank.",
      "the head of a municipality.",
      "the chairperson of a party."
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 132,
    "question_de": "Viele Menschen in Deutschland arbeiten in ihrer Freizeit ehrenamtlich. Was bedeutet das?",
    "question_en": "Many people in Germany work voluntarily in their free time. What does this mean?",
    "options_de": [
      "Sie arbeiten als Soldatinnen / Soldaten.",
      "Sie arbeiten freiwillig und unbezahlt in Vereinen und Verbänden.",
      "Sie arbeiten in der Bundesregierung.",
      "Sie arbeiten in einem Krankenhaus und verdienen dabei Geld."
    ],
    "options_en": [
      "They work as soldiers.",
      "They work voluntarily and unpaid in clubs and associations.",
      "They work in the federal government.",
      "They work in a hospital and earn money doing so."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 133,
    "question_de": "Was ist bei Bundestags- und Landtagswahlen in Deutschland erlaubt?",
    "question_en": "What is allowed in federal and state elections in Germany?",
    "options_de": [
      "Der Ehemann wählt für seine Frau mit.",
      "Man kann durch Briefwahl seine Stimme abgeben.",
      "Man kann am Wahltag telefonisch seine Stimme abgeben.",
      "Kinder ab dem Alter von 14 Jahren dürfen wählen."
    ],
    "options_en": [
      "The husband votes on behalf of his wife.",
      "One can cast one's vote by postal vote.",
      "One can cast one's vote by phone on election day.",
      "Children from the age of 14 may vote."
    ],
    "correct_index": 1,
    "category": "Wahlen"
  },
  {
    "id": 134,
    "question_de": "Man will die Buslinie abschaffen, mit der Sie immer zur Arbeit fahren. Was können Sie machen, um die Buslinie zu erhalten?",
    "question_en": "They want to abolish the bus line that you always use to go to work. What can you do to preserve the bus line?",
    "options_de": [
      "Ich beteilige mich an einer Bürgerinitiative für die Erhaltung der Buslinie oder gründe selber eine Initiative.",
      "Ich werde Mitglied in einem Sportverein und trainiere Radfahren.",
      "Ich wende mich an das Finanzamt, weil ich als Steuerzahlerin / Steuerzahler ein Recht auf die Buslinie habe.",
      "Ich schreibe einen Brief an das Forstamt der Gemeinde."
    ],
    "options_en": [
      "I participate in a citizens' initiative to preserve the bus line or start one myself.",
      "I become a member of a sports club and practice cycling.",
      "I contact the tax office because as a taxpayer I have a right to the bus line.",
      "I write a letter to the municipal forestry office."
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 135,
    "question_de": "Wen vertreten die Gewerkschaften in Deutschland?",
    "question_en": "Who do trade unions represent in Germany?",
    "options_de": [
      "große Unternehmen",
      "kleine Unternehmen",
      "Selbstständige",
      "Arbeitnehmerinnen und Arbeitnehmer"
    ],
    "options_en": [
      "large companies",
      "small companies",
      "self-employed people",
      "employees"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 136,
    "question_de": "Sie gehen in Deutschland zum Arbeitsgericht bei …",
    "question_en": "You go to labor court in Germany for...",
    "options_de": [
      "falscher Nebenkostenabrechnung.",
      "ungerechtfertigter Kündigung durch Ihre Chefin / Ihren Chef.",
      "Problemen mit den Nachbarinnen / Nachbarn.",
      "Schwierigkeiten nach einem Verkehrsunfall."
    ],
    "options_en": [
      "incorrect utility cost statement.",
      "unjustified dismissal by your boss.",
      "problems with neighbors.",
      "difficulties after a traffic accident."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 137,
    "question_de": "Welches Gericht ist in Deutschland bei Konflikten in der Arbeitswelt zuständig?",
    "question_en": "Which court is responsible for conflicts in the working world in Germany?",
    "options_de": [
      "das Familiengericht",
      "das Strafgericht",
      "das Arbeitsgericht",
      "das Amtsgericht"
    ],
    "options_en": [
      "the family court",
      "the criminal court",
      "the labor court",
      "the local court"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 138,
    "question_de": "Was kann ich in Deutschland machen, wenn mir meine Arbeitgeberin / mein Arbeitgeber zu Unrecht gekündigt hat?",
    "question_en": "What can I do in Germany if my employer has wrongfully dismissed me?",
    "options_de": [
      "weiterarbeiten und freundlich zur Chefin / zum Chef sein",
      "ein Mahnverfahren gegen die Arbeitgeberin / den Arbeitgeber führen",
      "Kündigungsschutzklage erheben",
      "die Arbeitgeberin / den Arbeitgeber bei der Polizei anzeigen"
    ],
    "options_en": [
      "continue working and be friendly to the boss",
      "initiate a dunning procedure against the employer",
      "file a wrongful dismissal lawsuit",
      "report the employer to the police"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 139,
    "question_de": "Wann kommt es in Deutschland zu einem Prozess vor Gericht? Wenn jemand …",
    "question_en": "When does a court process occur in Germany? When someone...",
    "options_de": [
      "zu einer anderen Religion übertritt.",
      "eine Straftat begangen hat und angeklagt wird.",
      "eine andere Meinung als die der Regierung vertritt.",
      "sein Auto falsch geparkt hat und es abgeschleppt wird."
    ],
    "options_en": [
      "converts to another religion.",
      "has committed a crime and is charged.",
      "holds a different opinion than the government.",
      "has parked their car incorrectly and it is towed."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 140,
    "question_de": "Was macht eine Schöffin / ein Schöffe in Deutschland? Sie/Er …",
    "question_en": "What does a lay judge do in Germany? They...",
    "options_de": [
      "entscheidet mit Richterinnen / Richtern über Schuld und Strafe.",
      "gibt Bürgerinnen / Bürgern rechtlichen Rat.",
      "stellt Urkunden aus.",
      "verteidigt die Angeklagte / den Angeklagten."
    ],
    "options_en": [
      "decide together with judges on guilt and punishment.",
      "give citizens legal advice.",
      "issue documents.",
      "defend the accused."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 141,
    "question_de": "Wer berät in Deutschland Personen bei Rechtsfragen und vertritt sie vor Gericht?",
    "question_en": "Who advises people on legal matters and represents them in court in Germany?",
    "options_de": [
      "eine Rechtsanwältin / ein Rechtsanwalt",
      "eine Richterin / ein Richter",
      "eine Schöffin / ein Schöffe",
      "eine Staatsanwältin / ein Staatsanwalt"
    ],
    "options_en": [
      "a lawyer",
      "a judge",
      "a lay judge",
      "a public prosecutor"
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 142,
    "question_de": "Was ist die Hauptaufgabe einer Richterin / eines Richters in Deutschland? Eine Richterin / ein Richter …",
    "question_en": "What is the main task of a judge in Germany? A judge...",
    "options_de": [
      "vertritt Bürgerinnen und Bürger vor einem Gericht.",
      "arbeitet an einem Gericht und spricht Urteile.",
      "ändert Gesetze.",
      "betreut Jugendliche vor Gericht."
    ],
    "options_en": [
      "represents citizens in court.",
      "works at a court and pronounces judgments.",
      "changes laws.",
      "supervises juveniles in court."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 143,
    "question_de": "Eine Richterin / ein Richter in Deutschland gehört zur …",
    "question_en": "A judge in Germany belongs to the...",
    "options_de": [
      "Judikative.",
      "Exekutive.",
      "Operative.",
      "Legislative."
    ],
    "options_en": [
      "Judiciary.",
      "Executive.",
      "Operative.",
      "Legislative."
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 144,
    "question_de": "Eine Richterin / ein Richter gehört in Deutschland zur …",
    "question_en": "A judge in Germany belongs to the...",
    "options_de": [
      "vollziehenden Gewalt.",
      "rechtsprechenden Gewalt.",
      "planenden Gewalt.",
      "gesetzgebenden Gewalt."
    ],
    "options_en": [
      "executive power.",
      "judicial power.",
      "planning power.",
      "legislative power."
    ],
    "correct_index": 1,
    "category": "Grundgesetz"
  },
  {
    "id": 145,
    "question_de": "In Deutschland wird die Staatsgewalt geteilt. Für welche Staatsgewalt arbeitet eine Richterin / ein Richter? Für die …",
    "question_en": "In Germany, state power is separated. For which state power does a judge work? For the...",
    "options_de": [
      "Judikative",
      "Exekutive",
      "Presse",
      "Legislative"
    ],
    "options_en": [
      "Judiciary",
      "Executive",
      "Press",
      "Legislative"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 146,
    "question_de": "Wie nennt man in Deutschland ein Verfahren vor einem Gericht?",
    "question_en": "What is a procedure before a court called in Germany?",
    "options_de": [
      "Programm",
      "Prozedur",
      "Protokoll",
      "Prozess"
    ],
    "options_en": [
      "Program",
      "Procedure",
      "Protocol",
      "Trial"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 147,
    "question_de": "Was ist die Arbeit einer Richterin / eines Richters in Deutschland?",
    "question_en": "What is the work of a judge in Germany?",
    "options_de": [
      "Deutschland regieren",
      "Recht sprechen",
      "Pläne erstellen",
      "Gesetze erlassen"
    ],
    "options_en": [
      "Govern Germany",
      "Administer justice",
      "Create plans",
      "Enact laws"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 148,
    "question_de": "Was ist eine Aufgabe der Polizei in Deutschland?",
    "question_en": "What is a task of the police in Germany?",
    "options_de": [
      "das Land zu verteidigen",
      "die Bürgerinnen und Bürger abzuhören",
      "die Gesetze zu beschließen",
      "die Einhaltung von Gesetzen zu überwachen"
    ],
    "options_en": [
      "defend the country",
      "eavesdrop on citizens",
      "decide on laws",
      "monitor compliance with laws"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 149,
    "question_de": "Was ist ein Beispiel für antisemitisches Verhalten?",
    "question_en": "What is an example of antisemitic behavior?",
    "options_de": [
      "ein jüdisches Fest besuchen",
      "die israelische Regierung kritisieren",
      "den Holocaust leugnen",
      "gegen Juden Fußball spielen"
    ],
    "options_en": [
      "attend a Jewish festival",
      "criticize the Israeli government",
      "deny the Holocaust",
      "play football against Jews"
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 150,
    "question_de": "Eine Gerichtsschöffin / ein Gerichtsschöffe in Deutschland ist …",
    "question_en": "A lay judge in Germany is...",
    "options_de": [
      "die Stellvertreterin / der Stellvertreter des Stadtoberhaupts.",
      "eine ehrenamtliche Richterin / ein ehrenamtlicher Richter.",
      "ein Mitglied eines Gemeinderats.",
      "eine Person, die Jura studiert hat."
    ],
    "options_en": [
      "the deputy of the city head.",
      "an honorary judge.",
      "a member of a municipal council.",
      "a person who has studied law."
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 151,
    "question_de": "Wer baute die Mauer in Berlin?",
    "question_en": "Who built the wall in Berlin?",
    "options_de": [
      "Großbritannien",
      "die DDR",
      "die Bundesrepublik Deutschland",
      "die USA"
    ],
    "options_en": [
      "Great Britain",
      "the GDR",
      "the Federal Republic of Germany",
      "the USA"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 152,
    "question_de": "Wann waren die Nationalsozialisten mit Adolf Hitler in Deutschland an der Macht?",
    "question_en": "When were the National Socialists with Adolf Hitler in power in Germany?",
    "options_de": [
      "1918 bis 1923",
      "1932 bis 1950",
      "1933 bis 1945",
      "1945 bis 1989"
    ],
    "options_en": [
      "1918 to 1923",
      "1932 to 1950",
      "1933 to 1945",
      "1945 to 1989"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 153,
    "question_de": "Was war am 8. Mai 1945?",
    "question_en": "What happened on May 8, 1945?",
    "options_de": [
      "Tod Adolf Hitlers",
      "Beginn des Berliner Mauerbaus",
      "Wahl von Konrad Adenauer zum Bundeskanzler",
      "Ende des Zweiten Weltkriegs in Europa"
    ],
    "options_en": [
      "Death of Adolf Hitler",
      "Beginning of the Berlin Wall construction",
      "Election of Konrad Adenauer as Federal Chancellor",
      "End of the Second World War in Europe"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 154,
    "question_de": "Wann war der Zweite Weltkrieg zu Ende?",
    "question_en": "When did the Second World War end?",
    "options_de": [
      "1933",
      "1945",
      "1949",
      "1961"
    ],
    "options_en": [
      "1933",
      "1945",
      "1949",
      "1961"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 155,
    "question_de": "Wann waren die Nationalsozialisten in Deutschland an der Macht?",
    "question_en": "When were the National Socialists in power in Germany?",
    "options_de": [
      "1888 bis 1918",
      "1921 bis 1934",
      "1933 bis 1945",
      "1949 bis 1963"
    ],
    "options_en": [
      "1888 to 1918",
      "1921 to 1934",
      "1933 to 1945",
      "1949 to 1963"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 156,
    "question_de": "In welchem Jahr wurde Hitler Reichskanzler?",
    "question_en": "In which year did Hitler become Reich Chancellor?",
    "options_de": [
      "1923",
      "1927",
      "1933",
      "1936"
    ],
    "options_en": [
      "1923",
      "1927",
      "1933",
      "1936"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 157,
    "question_de": "Die Nationalsozialisten mit Adolf Hitler errichteten 1933 in Deutschland …",
    "question_en": "The National Socialists with Adolf Hitler established in 1933 in Germany...",
    "options_de": [
      "eine Diktatur.",
      "einen demokratischen Staat.",
      "eine Monarchie.",
      "ein Fürstentum."
    ],
    "options_en": [
      "a dictatorship.",
      "a democratic state.",
      "a monarchy.",
      "a principality."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 158,
    "question_de": "Das \"Dritte Reich\" war eine …",
    "question_en": "The \"Third Reich\" was a...",
    "options_de": [
      "Diktatur.",
      "Demokratie.",
      "Monarchie.",
      "Räterepublik."
    ],
    "options_en": [
      "dictatorship.",
      "democracy.",
      "monarchy.",
      "council republic."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 159,
    "question_de": "Was gab es in Deutschland nicht während der Zeit des Nationalsozialismus?",
    "question_en": "What did not exist in Germany during the time of National Socialism?",
    "options_de": [
      "freie Wahlen",
      "Pressezensur",
      "willkürliche Verhaftungen",
      "Verfolgung von Juden"
    ],
    "options_en": [
      "free elections",
      "press censorship",
      "arbitrary arrests",
      "persecution of Jews"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 160,
    "question_de": "Welcher Krieg dauerte von 1939 bis 1945?",
    "question_en": "Which war lasted from 1939 to 1945?",
    "options_de": [
      "der Erste Weltkrieg",
      "der Zweite Weltkrieg",
      "der Vietnamkrieg",
      "der Golfkrieg"
    ],
    "options_en": [
      "the First World War",
      "the Second World War",
      "the Vietnam War",
      "the Gulf War"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 161,
    "question_de": "Was kennzeichnete den NS-Staat? Eine Politik …",
    "question_en": "What characterized the Nazi state? A policy of...",
    "options_de": [
      "des staatlichen Rassismus",
      "der Meinungsfreiheit",
      "der allgemeinen Religionsfreiheit",
      "der Entwicklung der Demokratie"
    ],
    "options_en": [
      "state racism",
      "freedom of expression",
      "general religious freedom",
      "development of democracy"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 162,
    "question_de": "Claus Schenk Graf von Stauffenberg wurde bekannt durch …",
    "question_en": "Claus Schenk Graf von Stauffenberg became known through...",
    "options_de": [
      "eine Goldmedaille bei den Olympischen Spielen 1936.",
      "den Bau des Reichstagsgebäudes.",
      "den Aufbau der Wehrmacht.",
      "das Attentat auf Hitler am 20. Juli 1944."
    ],
    "options_en": [
      "a gold medal at the 1936 Olympic Games.",
      "the construction of the Reichstag building.",
      "the buildup of the Wehrmacht.",
      "the assassination attempt on Hitler on July 20, 1944."
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 163,
    "question_de": "In welchem Jahr zerstörten die Nationalsozialisten Synagogen und jüdische Geschäfte in Deutschland?",
    "question_en": "In which year did the National Socialists destroy synagogues and Jewish businesses in Germany?",
    "options_de": [
      "1925",
      "1930",
      "1938",
      "1945"
    ],
    "options_en": [
      "1925",
      "1930",
      "1938",
      "1945"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 164,
    "question_de": "Was passierte am 9. November 1938 in Deutschland?",
    "question_en": "What happened on November 9, 1938 in Germany?",
    "options_de": [
      "Mit dem Angriff auf Polen beginnt der Zweite Weltkrieg.",
      "Die Nationalsozialisten verlieren eine Wahl und lösen den Reichstag auf.",
      "Jüdische Geschäfte und Synagogen werden durch Nationalsozialisten und ihre Anhänger zerstört.",
      "Hitler wird Reichspräsident und lässt alle Parteien verbieten."
    ],
    "options_en": [
      "With the attack on Poland, the Second World War begins.",
      "The National Socialists lose an election and dissolve the Reichstag.",
      "Jewish businesses and synagogues are destroyed by National Socialists and their followers.",
      "Hitler becomes Reich President and has all parties banned."
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 165,
    "question_de": "Wie hieß der erste Bundeskanzler der Bundesrepublik Deutschland?",
    "question_en": "What was the name of the first Federal Chancellor of the Federal Republic of Germany?",
    "options_de": [
      "Konrad Adenauer",
      "Kurt Georg Kiesinger",
      "Helmut Schmidt",
      "Willy Brandt"
    ],
    "options_en": [
      "Konrad Adenauer",
      "Kurt Georg Kiesinger",
      "Helmut Schmidt",
      "Willy Brandt"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 166,
    "question_de": "Bei welchen Demonstrationen in Deutschland riefen die Menschen \"Wir sind das Volk\"?",
    "question_en": "At which demonstrations in Germany did people shout \"We are the people\"?",
    "options_de": [
      "beim Arbeiteraufstand 1953 in der DDR",
      "bei den Demonstrationen 1968 in der Bundesrepublik Deutschland",
      "bei den Anti-Atomkraft-Demonstrationen 1985 in der Bundesrepublik Deutschland",
      "bei den Montagsdemonstrationen 1989 in der DDR"
    ],
    "options_en": [
      "during the workers' uprising in 1953 in the GDR",
      "during the demonstrations in 1968 in the Federal Republic of Germany",
      "during the anti-nuclear power demonstrations in 1985 in the Federal Republic of Germany",
      "during the Monday demonstrations in 1989 in the GDR"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 167,
    "question_de": "Welche Länder wurden nach dem Zweiten Weltkrieg in Deutschland als \"Alliierte Besatzungsmächte\" bezeichnet?",
    "question_en": "Which countries were referred to as \"Allied occupying powers\" in Germany after the Second World War?",
    "options_de": [
      "Sowjetunion, Großbritannien, Polen, Schweden",
      "Frankreich, Sowjetunion, Italien, Japan",
      "USA, Sowjetunion, Spanien, Portugal",
      "USA, Sowjetunion, Großbritannien, Frankreich"
    ],
    "options_en": [
      "Soviet Union, Great Britain, Poland, Sweden",
      "France, Soviet Union, Italy, Japan",
      "USA, Soviet Union, Spain, Portugal",
      "USA, Soviet Union, Great Britain, France"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 168,
    "question_de": "Welches Land war keine \"Alliierte Besatzungsmacht\" in Deutschland?",
    "question_en": "Which country was not an \"Allied occupying power\" in Germany?",
    "options_de": [
      "USA",
      "Sowjetunion",
      "Frankreich",
      "Japan"
    ],
    "options_en": [
      "USA",
      "Soviet Union",
      "France",
      "Japan"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 169,
    "question_de": "Wann wurde die Bundesrepublik Deutschland gegründet?",
    "question_en": "When was the Federal Republic of Germany founded?",
    "options_de": [
      "1939",
      "1945",
      "1949",
      "1951"
    ],
    "options_en": [
      "1939",
      "1945",
      "1949",
      "1951"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 170,
    "question_de": "Was gab es während der Zeit des Nationalsozialismus in Deutschland?",
    "question_en": "What existed during the time of National Socialism in Germany?",
    "options_de": [
      "das Verbot von Parteien",
      "das Recht zur freien Entfaltung der Persönlichkeit",
      "Pressefreiheit",
      "den Schutz der Menschenwürde"
    ],
    "options_en": [
      "the banning of parties",
      "the right to free development of personality",
      "freedom of the press",
      "the protection of human dignity"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 171,
    "question_de": "Soziale Marktwirtschaft bedeutet, die Wirtschaft …",
    "question_en": "Social market economy means the economy...",
    "options_de": [
      "steuert sich allein nach Angebot und Nachfrage.",
      "wird vom Staat geplant und gesteuert, Angebot und Nachfrage werden nicht berücksichtigt.",
      "richtet sich nach der Nachfrage im Ausland.",
      "richtet sich nach Angebot und Nachfrage, aber der Staat sorgt für einen sozialen Ausgleich."
    ],
    "options_en": [
      "is controlled solely by supply and demand.",
      "is planned and controlled by the state, supply and demand are not considered.",
      "is oriented towards demand abroad.",
      "is oriented towards supply and demand, but the state ensures social balance."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 172,
    "question_de": "In welcher Besatzungszone wurde die DDR gegründet? In der …",
    "question_en": "In which occupation zone was the GDR founded? In the...",
    "options_de": [
      "amerikanischen Besatzungszone",
      "französischen Besatzungszone",
      "britischen Besatzungszone",
      "sowjetischen Besatzungszone"
    ],
    "options_en": [
      "American occupation zone",
      "French occupation zone",
      "British occupation zone",
      "Soviet occupation zone"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 173,
    "question_de": "Die Bundesrepublik Deutschland ist ein Gründungsmitglied …",
    "question_en": "The Federal Republic of Germany is a founding member of...",
    "options_de": [
      "des Nordatlantikpakts (NATO).",
      "der Vereinten Nationen (VN).",
      "der Europäischen Union (EU).",
      "des Warschauer Pakts."
    ],
    "options_en": [
      "the North Atlantic Treaty (NATO).",
      "the United Nations (UN).",
      "the European Union (EU).",
      "the Warsaw Pact."
    ],
    "correct_index": 2,
    "category": "Geografie"
  },
  {
    "id": 174,
    "question_de": "Wann wurde die DDR gegründet?",
    "question_en": "When was the GDR founded?",
    "options_de": [
      "1947",
      "1949",
      "1953",
      "1956"
    ],
    "options_en": [
      "1947",
      "1949",
      "1953",
      "1956"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 175,
    "question_de": "Wie viele Besatzungszonen gab es in Deutschland nach dem Zweiten Weltkrieg?",
    "question_en": "How many occupation zones were there in Germany after the Second World War?",
    "options_de": [
      "3",
      "4",
      "5",
      "6"
    ],
    "options_en": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 176,
    "question_de": "Wie waren die Besatzungszonen Deutschlands nach 1945 verteilt?",
    "question_en": "How were the occupation zones of Germany distributed after 1945?",
    "options_de": [
      "1=Großbritannien, 2=Sowjetunion, 3=Frankreich, 4=USA",
      "1=Sowjetunion, 2=Großbritannien, 3=USA, 4=Frankreich",
      "1=Großbritannien, 2=Sowjetunion, 3=USA, 4=Frankreich",
      "1=Großbritannien, 2=USA, 3=Sowjetunion, 4=Frankreich"
    ],
    "options_en": [
      "1=Great Britain, 2=Soviet Union, 3=France, 4=USA",
      "1=Soviet Union, 2=Great Britain, 3=USA, 4=France",
      "1=Great Britain, 2=Soviet Union, 3=USA, 4=France",
      "1=Great Britain, 2=USA, 3=Soviet Union, 4=France"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 177,
    "question_de": "Welche deutsche Stadt wurde nach dem Zweiten Weltkrieg in vier Sektoren aufgeteilt?",
    "question_en": "Which German city was divided into four sectors after the Second World War?",
    "options_de": [
      "München",
      "Berlin",
      "Dresden",
      "Frankfurt / Oder"
    ],
    "options_en": [
      "Munich",
      "Berlin",
      "Dresden",
      "Frankfurt / Oder"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 178,
    "question_de": "Vom Juni 1948 bis zum Mai 1949 wurden die Bürgerinnen und Bürger von West-Berlin durch eine Luftbrücke versorgt. Welcher Umstand war dafür verantwortlich?",
    "question_en": "From June 1948 to May 1949, the citizens of West Berlin were supplied by an airlift. Which circumstance was responsible for this?",
    "options_de": [
      "Für Frankreich war eine Versorgung der West-Berliner Bevölkerung mit dem Flugzeug kostengünstiger.",
      "Die amerikanischen Soldatinnen und Soldaten hatten beim Landtransport Angst vor Überfällen.",
      "Für Großbritannien war die Versorgung über die Luftbrücke schneller.",
      "Die Sowjetunion unterbrach den gesamten Verkehr auf dem Landwege."
    ],
    "options_en": [
      "For France, supplying the West Berlin population by plane was more cost-effective.",
      "The American soldiers were afraid of attacks during land transport.",
      "For Great Britain, supply via the airlift was faster.",
      "The Soviet Union interrupted all land traffic."
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 179,
    "question_de": "Wie endete der Zweite Weltkrieg in Europa offiziell?",
    "question_en": "How did the Second World War officially end in Europe?",
    "options_de": [
      "mit dem Tod Adolf Hitlers",
      "durch die bedingungslose Kapitulation Deutschlands",
      "mit dem Rückzug der Deutschen aus den besetzten Gebieten",
      "durch eine Revolution in Deutschland"
    ],
    "options_en": [
      "with the death of Adolf Hitler",
      "through the unconditional surrender of Germany",
      "with the withdrawal of Germans from occupied territories",
      "through a revolution in Germany"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 180,
    "question_de": "Der erste Bundeskanzler der Bundesrepublik Deutschland war …",
    "question_en": "The first Federal Chancellor of the Federal Republic of Germany was...",
    "options_de": [
      "Ludwig Erhard.",
      "Willy Brandt.",
      "Konrad Adenauer.",
      "Gerhard Schröder."
    ],
    "options_en": [
      "Ludwig Erhard.",
      "Willy Brandt.",
      "Konrad Adenauer.",
      "Gerhard Schröder."
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 181,
    "question_de": "Was wollte Willy Brandt mit seinem Kniefall 1970 im ehemaligen jüdischen Ghetto in Warschau ausdrücken?",
    "question_en": "What did Willy Brandt want to express with his kneeling in 1970 in the former Jewish ghetto in Warsaw?",
    "options_de": [
      "Er hat sich den ehemaligen Alliierten unterworfen.",
      "Er bat Polen und die polnischen Juden um Vergebung.",
      "Er zeigte seine Demut vor dem Warschauer Pakt.",
      "Er sprach ein Gebet am Grab des Unbekannten Soldaten."
    ],
    "options_en": [
      "He submitted to the former Allies.",
      "He asked Poland and the Polish Jews for forgiveness.",
      "He showed his humility before the Warsaw Pact.",
      "He said a prayer at the Tomb of the Unknown Soldier."
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 182,
    "question_de": "Wie heißt das jüdische Gebetshaus?",
    "question_en": "What is the Jewish house of prayer called?",
    "options_de": [
      "Basilika",
      "Moschee",
      "Synagoge",
      "Kirche"
    ],
    "options_en": [
      "Basilica",
      "Mosque",
      "Synagogue",
      "Church"
    ],
    "correct_index": 2,
    "category": "Kultur"
  },
  {
    "id": 183,
    "question_de": "Wann war in der Bundesrepublik Deutschland das \"Wirtschaftswunder\"?",
    "question_en": "When was the \"economic miracle\" in the Federal Republic of Germany?",
    "options_de": [
      "40er Jahre",
      "50er Jahre",
      "70er Jahre",
      "80er Jahre"
    ],
    "options_en": [
      "40s",
      "50s",
      "70s",
      "80s"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 184,
    "question_de": "Auf welcher rechtlichen Grundlage wurde der Staat Israel gegründet?",
    "question_en": "On what legal basis was the State of Israel founded?",
    "options_de": [
      "eine Resolution der Vereinten Nationen",
      "ein Beschluss des Zionistenkongresses",
      "ein Vorschlag der Bundesregierung",
      "ein Vorschlag der UdSSR"
    ],
    "options_en": [
      "a United Nations resolution",
      "a decision of the Zionist Congress",
      "a proposal from the federal government",
      "a proposal from the USSR"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 185,
    "question_de": "Wofür stand der Ausdruck \"Eiserner Vorhang\"? Für die Abschottung …",
    "question_en": "What did the expression \"Iron Curtain\" stand for? For the isolation of...",
    "options_de": [
      "des Warschauer Pakts gegen den Westen",
      "Norddeutschlands gegen Süddeutschland",
      "Nazi-Deutschlands gegen die Alliierten",
      "Europas gegen die USA"
    ],
    "options_en": [
      "the Warsaw Pact against the West",
      "Northern Germany against Southern Germany",
      "Nazi Germany against the Allies",
      "Europe against the USA"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 186,
    "question_de": "Im Jahr 1953 gab es in der DDR einen Aufstand, an den lange Zeit in der Bundesrepublik Deutschland ein Feiertag erinnerte. Wann war das?",
    "question_en": "In 1953, there was an uprising in the GDR that was commemorated by a holiday in the Federal Republic of Germany for a long time. When was that?",
    "options_de": [
      "1. Mai",
      "17. Juni",
      "20. Juli",
      "9. November"
    ],
    "options_en": [
      "May 1",
      "June 17",
      "July 20",
      "November 9"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 187,
    "question_de": "Welcher deutsche Staat hatte eine schwarz-rot-goldene Flagge mit Hammer, Zirkel und Ährenkranz?",
    "question_en": "Which German state had a black-red-gold flag with hammer, compass and wreath of ears?",
    "options_de": [
      "Preußen",
      "Bundesrepublik Deutschland",
      "\"Drittes Reich\"",
      "DDR"
    ],
    "options_en": [
      "Prussia",
      "Federal Republic of Germany",
      "\"Third Reich\"",
      "GDR"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 188,
    "question_de": "In welchem Jahr wurde die Mauer in Berlin gebaut?",
    "question_en": "In which year was the Berlin Wall built?",
    "options_de": [
      "1953",
      "1956",
      "1959",
      "1961"
    ],
    "options_en": [
      "1953",
      "1956",
      "1959",
      "1961"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 189,
    "question_de": "Wann baute die DDR die Mauer in Berlin?",
    "question_en": "When did the GDR build the Berlin Wall?",
    "options_de": [
      "1919",
      "1933",
      "1961",
      "1990"
    ],
    "options_en": [
      "1919",
      "1933",
      "1961",
      "1990"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 190,
    "question_de": "Was bedeutet die Abkürzung DDR?",
    "question_en": "What does the abbreviation GDR mean?",
    "options_de": [
      "Dritter Deutscher Rundfunk",
      "Die Deutsche Republik",
      "Dritte Deutsche Republik",
      "Deutsche Demokratische Republik"
    ],
    "options_en": [
      "Third German Broadcasting",
      "The German Republic",
      "Third German Republic",
      "German Democratic Republic"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 191,
    "question_de": "Wann wurde die Mauer in Berlin für alle geöffnet?",
    "question_en": "When was the Berlin Wall opened for everyone?",
    "options_de": [
      "1987",
      "1989",
      "1992",
      "1995"
    ],
    "options_en": [
      "1987",
      "1989",
      "1992",
      "1995"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 192,
    "question_de": "Welches heutige deutsche Bundesland gehörte früher zum Gebiet der DDR?",
    "question_en": "Which current German federal state previously belonged to the territory of the GDR?",
    "options_de": [
      "Brandenburg",
      "Bayern",
      "Saarland",
      "Hessen"
    ],
    "options_en": [
      "Brandenburg",
      "Bavaria",
      "Saarland",
      "Hesse"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 193,
    "question_de": "Von 1961 bis 1989 war Berlin …",
    "question_en": "From 1961 to 1989, Berlin was...",
    "options_de": [
      "ohne Bürgermeister.",
      "ein eigener Staat.",
      "durch eine Mauer geteilt.",
      "nur mit dem Flugzeug erreichbar."
    ],
    "options_en": [
      "without a mayor.",
      "its own state.",
      "divided by a wall.",
      "only reachable by plane."
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 194,
    "question_de": "Am 3. Oktober feiert man in Deutschland den Tag der Deutschen …",
    "question_en": "On October 3, Germany celebrates the Day of German...",
    "options_de": [
      "Einheit.",
      "Nation.",
      "Bundesländer.",
      "Städte."
    ],
    "options_en": [
      "Unity.",
      "Nation.",
      "Federal States.",
      "Cities."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 195,
    "question_de": "Welches heutige deutsche Bundesland gehörte früher zum Gebiet der DDR?",
    "question_en": "Which current German federal state previously belonged to the territory of the GDR?",
    "options_de": [
      "Hessen",
      "Sachsen-Anhalt",
      "Nordrhein-Westfalen",
      "Saarland"
    ],
    "options_en": [
      "Hesse",
      "Saxony-Anhalt",
      "North Rhine-Westphalia",
      "Saarland"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 196,
    "question_de": "Warum nennt man die Zeit im Herbst 1989 in der DDR \"Die Wende\"? In dieser Zeit veränderte sich die DDR politisch …",
    "question_en": "Why is the time in autumn 1989 in the GDR called \"The Turn\"? During this time, the GDR changed politically...",
    "options_de": [
      "von einer Diktatur zur Demokratie.",
      "von einer liberalen Marktwirtschaft zum Sozialismus.",
      "von einer Monarchie zur Sozialdemokratie.",
      "von einem religiösen Staat zu einem kommunistischen Staat."
    ],
    "options_en": [
      "from a dictatorship to a democracy.",
      "from a liberal market economy to socialism.",
      "from a monarchy to social democracy.",
      "from a religious state to a communist state."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 197,
    "question_de": "Welches heutige deutsche Bundesland gehörte früher zum Gebiet der DDR?",
    "question_en": "Which current German federal state previously belonged to the territory of the GDR?",
    "options_de": [
      "Thüringen",
      "Hessen",
      "Bayern",
      "Bremen"
    ],
    "options_en": [
      "Thuringia",
      "Hesse",
      "Bavaria",
      "Bremen"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 198,
    "question_de": "Welches heutige deutsche Bundesland gehörte früher zum Gebiet der DDR?",
    "question_en": "Which current German federal state previously belonged to the territory of the GDR?",
    "options_de": [
      "Bayern",
      "Niedersachsen",
      "Sachsen",
      "Baden-Württemberg"
    ],
    "options_en": [
      "Bavaria",
      "Lower Saxony",
      "Saxony",
      "Baden-Württemberg"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 199,
    "question_de": "Mit der Abkürzung \"Stasi\" meinte man in der DDR …",
    "question_en": "With the abbreviation \"Stasi\" one meant in the GDR...",
    "options_de": [
      "das Parlament.",
      "das Ministerium für Staatssicherheit.",
      "eine regierende Partei.",
      "das Ministerium für Volksbildung."
    ],
    "options_en": [
      "the parliament.",
      "the Ministry for State Security.",
      "a governing party.",
      "the Ministry for People's Education."
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 200,
    "question_de": "Welches heutige deutsche Bundesland gehörte früher zum Gebiet der DDR?",
    "question_en": "Which current German federal state previously belonged to the territory of the GDR?",
    "options_de": [
      "Hessen",
      "Schleswig-Holstein",
      "Mecklenburg-Vorpommern",
      "Saarland"
    ],
    "options_en": [
      "Hesse",
      "Schleswig-Holstein",
      "Mecklenburg-Western Pomerania",
      "Saarland"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 201,
    "question_de": "Welche der folgenden Auflistungen enthält nur Bundesländer, die zum Gebiet der früheren DDR gehörten?",
    "question_en": "Which of the following lists contains only federal states that belonged to the territory of the former GDR?",
    "options_de": [
      "Niedersachsen, Nordrhein-Westfalen, Hessen, Schleswig-Holstein, Brandenburg",
      "Mecklenburg-Vorpommern, Brandenburg, Sachsen, Sachsen-Anhalt, Thüringen",
      "Bayern, Baden-Württemberg, Rheinland-Pfalz, Thüringen, Sachsen",
      "Sachsen, Thüringen, Hessen, Niedersachsen, Brandenburg"
    ],
    "options_en": [
      "Lower Saxony, North Rhine-Westphalia, Hesse, Schleswig-Holstein, Brandenburg",
      "Mecklenburg-Western Pomerania, Brandenburg, Saxony, Saxony-Anhalt, Thuringia",
      "Bavaria, Baden-Württemberg, Rhineland-Palatinate, Thuringia, Saxony",
      "Saxony, Thuringia, Hesse, Lower Saxony, Brandenburg"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 202,
    "question_de": "Zu wem gehörte die DDR im \"Kalten Krieg\"?",
    "question_en": "Who did the GDR belong to in the \"Cold War\"?",
    "options_de": [
      "zu den Westmächten",
      "zum Warschauer Pakt",
      "zur NATO",
      "zu den blockfreien Staaten"
    ],
    "options_en": [
      "to the Western powers",
      "to the Warsaw Pact",
      "to NATO",
      "to the non-aligned states"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 203,
    "question_de": "Wie hieß das Wirtschaftssystem der DDR?",
    "question_en": "What was the economic system of the GDR called?",
    "options_de": [
      "Marktwirtschaft",
      "Planwirtschaft",
      "Angebot und Nachfrage",
      "Kapitalismus"
    ],
    "options_en": [
      "Market economy",
      "Planned economy",
      "Supply and demand",
      "Capitalism"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 204,
    "question_de": "Wie wurden die Bundesrepublik Deutschland und die DDR zu einem Staat?",
    "question_en": "How did the Federal Republic of Germany and the GDR become one state?",
    "options_de": [
      "Die Bundesrepublik hat die DDR besetzt.",
      "Die heutigen fünf östlichen Bundesländer sind der Bundesrepublik Deutschland beigetreten.",
      "Die westlichen Bundesländer sind der DDR beigetreten.",
      "Die DDR hat die Bundesrepublik Deutschland besetzt."
    ],
    "options_en": [
      "The Federal Republic occupied the GDR.",
      "The current five eastern federal states joined the Federal Republic of Germany.",
      "The western federal states joined the GDR.",
      "The GDR occupied the Federal Republic of Germany."
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 205,
    "question_de": "Mit dem Beitritt der DDR zur Bundesrepublik Deutschland gehören die neuen Bundesländer nun auch …",
    "question_en": "With the accession of the GDR to the Federal Republic of Germany, the new federal states now also belong to...",
    "options_de": [
      "zur Europäischen Union.",
      "zum Warschauer Pakt.",
      "zur OPEC.",
      "zur Europäischen Verteidigungsgemeinschaft."
    ],
    "options_en": [
      "the European Union.",
      "the Warsaw Pact.",
      "OPEC.",
      "the European Defense Community."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 206,
    "question_de": "Woran erinnern die sogenannten \"Stolpersteine\" in Deutschland?",
    "question_en": "What do the so-called \"stumbling stones\" in Germany commemorate?",
    "options_de": [
      "an berühmte deutsche Politikerinnen und Politiker",
      "an die Opfer des Nationalsozialismus",
      "an Verkehrstote",
      "an bekannte jüdische Musiker"
    ],
    "options_en": [
      "famous German politicians",
      "the victims of National Socialism",
      "traffic fatalities",
      "famous Jewish musicians"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 207,
    "question_de": "In welchem Militärbündnis war die DDR Mitglied?",
    "question_en": "In which military alliance was the GDR a member?",
    "options_de": [
      "in der NATO",
      "im Rheinbund",
      "im Warschauer Pakt",
      "im Europabündnis"
    ],
    "options_en": [
      "in NATO",
      "in the Confederation of the Rhine",
      "in the Warsaw Pact",
      "in the European Alliance"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 208,
    "question_de": "Was war die \"Stasi\"?",
    "question_en": "What was the \"Stasi\"?",
    "options_de": [
      "der Geheimdienst im \"Dritten Reich\"",
      "eine berühmte deutsche Gedenkstätte",
      "der Geheimdienst der DDR",
      "ein deutscher Sportverein während des Zweiten Weltkrieges"
    ],
    "options_en": [
      "the secret service in the \"Third Reich\"",
      "a famous German memorial",
      "the secret service of the GDR",
      "a German sports club during the Second World War"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 209,
    "question_de": "Welches war das Wappen der Deutschen Demokratischen Republik?",
    "question_en": "Which was the coat of arms of the German Democratic Republic?",
    "options_de": [
      "Bild 1",
      "Bild 2",
      "Bild 3",
      "Bild 4"
    ],
    "options_en": [
      "Image 1",
      "Image 2",
      "Image 3",
      "Image 4"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 210,
    "question_de": "Was ereignete sich am 17. Juni 1953 in der DDR?",
    "question_en": "What happened on June 17, 1953 in the GDR?",
    "options_de": [
      "der feierliche Beitritt zum Warschauer Pakt",
      "landesweite Streiks und ein Volksaufstand",
      "der 1. SED-Parteitag",
      "der erste Besuch Fidel Castros"
    ],
    "options_en": [
      "the ceremonial accession to the Warsaw Pact",
      "nationwide strikes and a popular uprising",
      "the 1st SED party congress",
      "the first visit of Fidel Castro"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 211,
    "question_de": "Welcher Politiker steht für die \"Ostverträge\"?",
    "question_en": "Which politician is associated with the \"Eastern Treaties\"?",
    "options_de": [
      "Helmut Kohl",
      "Willy Brandt",
      "Michail Gorbatschow",
      "Ludwig Erhard"
    ],
    "options_en": [
      "Helmut Kohl",
      "Willy Brandt",
      "Mikhail Gorbachev",
      "Ludwig Erhard"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 212,
    "question_de": "Wie heißt Deutschland mit vollem Namen?",
    "question_en": "What is Germany's full name?",
    "options_de": [
      "Bundesstaat Deutschland",
      "Bundesländer Deutschland",
      "Bundesrepublik Deutschland",
      "Bundesbezirk Deutschland"
    ],
    "options_en": [
      "Federal State of Germany",
      "Federal States of Germany",
      "Federal Republic of Germany",
      "Federal District of Germany"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 213,
    "question_de": "Wie viele Einwohner hat Deutschland?",
    "question_en": "How many inhabitants does Germany have?",
    "options_de": [
      "70 Millionen",
      "78 Millionen",
      "84 Millionen",
      "90 Millionen"
    ],
    "options_en": [
      "70 million",
      "78 million",
      "84 million",
      "90 million"
    ],
    "correct_index": 2,
    "category": "Grundgesetz"
  },
  {
    "id": 214,
    "question_de": "Welche Farben hat die deutsche Flagge?",
    "question_en": "What colors does the German flag have?",
    "options_de": [
      "schwarz-rot-gold",
      "rot-weiß-schwarz",
      "schwarz-rot-grün",
      "schwarz-gelb-rot"
    ],
    "options_en": [
      "black-red-gold",
      "red-white-black",
      "black-red-green",
      "black-yellow-red"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 215,
    "question_de": "Wer wird als \"Kanzler der Deutschen Einheit\" bezeichnet?",
    "question_en": "Who is referred to as the \"Chancellor of German Unity\"?",
    "options_de": [
      "Gerhard Schröder",
      "Helmut Kohl",
      "Konrad Adenauer",
      "Helmut Schmidt"
    ],
    "options_en": [
      "Gerhard Schröder",
      "Helmut Kohl",
      "Konrad Adenauer",
      "Helmut Schmidt"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 216,
    "question_de": "Welches Symbol ist im Plenarsaal des Deutschen Bundestages zu sehen?",
    "question_en": "Which symbol is visible in the plenary hall of the German Bundestag?",
    "options_de": [
      "der Bundesadler",
      "die Fahne der Stadt Berlin",
      "der Reichsadler",
      "die Reichskrone"
    ],
    "options_en": [
      "the federal eagle",
      "the flag of the city of Berlin",
      "the imperial eagle",
      "the imperial crown"
    ],
    "correct_index": 0,
    "category": "Wahlen"
  },
  {
    "id": 217,
    "question_de": "In welchem Zeitraum gab es die Deutsche Demokratische Republik (DDR)?",
    "question_en": "During which period did the German Democratic Republic (GDR) exist?",
    "options_de": [
      "1919 bis 1927",
      "1933 bis 1945",
      "1945 bis 1961",
      "1949 bis 1990"
    ],
    "options_en": [
      "1919 to 1927",
      "1933 to 1945",
      "1945 to 1961",
      "1949 to 1990"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 218,
    "question_de": "Wie viele Bundesländer kamen bei der Wiedervereinigung 1990 zur Bundesrepublik Deutschland hinzu?",
    "question_en": "How many federal states were added to the Federal Republic of Germany during reunification in 1990?",
    "options_de": [
      "4",
      "5",
      "6",
      "7"
    ],
    "options_en": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 219,
    "question_de": "Die Bundesrepublik Deutschland hat die Grenzen von heute seit …",
    "question_en": "The Federal Republic of Germany has had today's borders since...",
    "options_de": [
      "1933",
      "1949",
      "1971",
      "1990"
    ],
    "options_en": [
      "1933",
      "1949",
      "1971",
      "1990"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 220,
    "question_de": "Der 27. Januar ist in Deutschland ein offizieller Gedenktag. Woran erinnert dieser Tag?",
    "question_en": "January 27 is an official memorial day in Germany. What does this day commemorate?",
    "options_de": [
      "an das Ende des Zweiten Weltkrieges",
      "an die Verabschiedung des Grundgesetzes",
      "an die Wiedervereinigung Deutschlands",
      "an die Opfer des Nationalsozialismus (Tag der Befreiung des Vernichtungslagers Auschwitz)"
    ],
    "options_en": [
      "the end of the Second World War",
      "the adoption of the Basic Law",
      "the reunification of Germany",
      "the victims of National Socialism (Day of the Liberation of Auschwitz Concentration Camp)"
    ],
    "correct_index": 3,
    "category": "Geschichte"
  },
  {
    "id": 221,
    "question_de": "Deutschland ist Mitglied des Schengener Abkommens. Was bedeutet das?",
    "question_en": "Germany is a member of the Schengen Agreement. What does this mean?",
    "options_de": [
      "Deutsche können in viele Länder Europas ohne Passkontrolle reisen.",
      "Alle Menschen können ohne Personenkontrolle in Deutschland einreisen.",
      "Deutsche können ohne Passkontrolle in jedes Land reisen.",
      "Deutsche können in jedem Land mit dem Euro bezahlen."
    ],
    "options_en": [
      "Germans can travel to many European countries without passport control.",
      "All people can enter Germany without identity checks.",
      "Germans can travel to any country without passport control.",
      "Germans can pay with the euro in every country."
    ],
    "correct_index": 0,
    "category": "Geografie"
  },
  {
    "id": 222,
    "question_de": "Welches Land ist ein Nachbarland von Deutschland?",
    "question_en": "Which country is a neighboring country of Germany?",
    "options_de": [
      "Ungarn",
      "Portugal",
      "Spanien",
      "Schweiz"
    ],
    "options_en": [
      "Hungary",
      "Portugal",
      "Spain",
      "Switzerland"
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 223,
    "question_de": "Welches Land ist ein Nachbarland von Deutschland?",
    "question_en": "Which country is a neighboring country of Germany?",
    "options_de": [
      "Rumänien",
      "Bulgarien",
      "Polen",
      "Griechenland"
    ],
    "options_en": [
      "Romania",
      "Bulgaria",
      "Poland",
      "Greece"
    ],
    "correct_index": 2,
    "category": "Geografie"
  },
  {
    "id": 224,
    "question_de": "Was bedeutet die Abkürzung EU?",
    "question_en": "What does the abbreviation EU mean?",
    "options_de": [
      "Europäische Unternehmen",
      "Europäische Union",
      "Einheitliche Union",
      "Euro Union"
    ],
    "options_en": [
      "European Companies",
      "European Union",
      "Uniform Union",
      "Euro Union"
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 225,
    "question_de": "In welchem anderen Land gibt es eine große deutschsprachige Bevölkerung?",
    "question_en": "In which other country is there a large German-speaking population?",
    "options_de": [
      "Tschechien",
      "Norwegen",
      "Spanien",
      "Österreich"
    ],
    "options_en": [
      "Czech Republic",
      "Norway",
      "Spain",
      "Austria"
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 226,
    "question_de": "Welche ist die Flagge der Europäischen Union?",
    "question_en": "Which is the flag of the European Union?",
    "options_de": [
      "Bild 1",
      "Bild 2",
      "Bild 3",
      "Bild 4"
    ],
    "options_en": [
      "Image 1",
      "Image 2",
      "Image 3",
      "Image 4"
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 227,
    "question_de": "Welches Land ist ein Nachbarland von Deutschland?",
    "question_en": "Which country is a neighboring country of Germany?",
    "options_de": [
      "Finnland",
      "Dänemark",
      "Norwegen",
      "Schweden"
    ],
    "options_en": [
      "Finland",
      "Denmark",
      "Norway",
      "Sweden"
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 228,
    "question_de": "Wie wird der Beitritt der DDR zur Bundesrepublik Deutschland im Jahr 1990 allgemein genannt?",
    "question_en": "What is the accession of the GDR to the Federal Republic of Germany in 1990 generally called?",
    "options_de": [
      "NATO-Osterweiterung",
      "EU-Osterweiterung",
      "Deutsche Wiedervereinigung",
      "Europäische Gemeinschaft"
    ],
    "options_en": [
      "NATO Eastern Expansion",
      "EU Eastern Expansion",
      "German Reunification",
      "European Community"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 229,
    "question_de": "Welches Land ist ein Nachbarland von Deutschland?",
    "question_en": "Which country is a neighboring country of Germany?",
    "options_de": [
      "Spanien",
      "Bulgarien",
      "Norwegen",
      "Luxemburg"
    ],
    "options_en": [
      "Spain",
      "Bulgaria",
      "Norway",
      "Luxembourg"
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 230,
    "question_de": "Das Europäische Parlament wird regelmäßig gewählt, nämlich alle …",
    "question_en": "The European Parliament is regularly elected, namely every...",
    "options_de": [
      "5 Jahre.",
      "6 Jahre.",
      "7 Jahre.",
      "8 Jahre."
    ],
    "options_en": [
      "5 years.",
      "6 years.",
      "7 years.",
      "8 years."
    ],
    "correct_index": 0,
    "category": "Geografie"
  },
  {
    "id": 231,
    "question_de": "Was bedeutet der Begriff \"europäische Integration\"?",
    "question_en": "What does the term \"European integration\" mean?",
    "options_de": [
      "Damit sind amerikanische Einwanderinnen und Einwanderer in Europa gemeint.",
      "Der Begriff meint den Einwanderungsstopp nach Europa.",
      "Damit sind europäische Auswanderinnen und Auswanderer in den USA gemeint.",
      "Der Begriff meint den Zusammenschluss europäischer Staaten zur EU."
    ],
    "options_en": [
      "This refers to American immigrants in Europe.",
      "The term means the immigration stop to Europe.",
      "This refers to European emigrants in the USA.",
      "The term means the union of European states into the EU."
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 232,
    "question_de": "Wer wird bei der Europawahl gewählt?",
    "question_en": "Who is elected in the European election?",
    "options_de": [
      "die Europäische Kommission",
      "die Länder, die in die EU eintreten dürfen",
      "die Abgeordneten des Europäischen Parlaments",
      "die europäische Verfassung"
    ],
    "options_en": [
      "the European Commission",
      "the countries that may join the EU",
      "the members of the European Parliament",
      "the European constitution"
    ],
    "correct_index": 2,
    "category": "Geografie"
  },
  {
    "id": 233,
    "question_de": "Welches Land ist ein Nachbarland von Deutschland?",
    "question_en": "Which country is a neighboring country of Germany?",
    "options_de": [
      "Tschechien",
      "Bulgarien",
      "Griechenland",
      "Portugal"
    ],
    "options_en": [
      "Czech Republic",
      "Bulgaria",
      "Greece",
      "Portugal"
    ],
    "correct_index": 0,
    "category": "Geografie"
  },
  {
    "id": 234,
    "question_de": "Wo ist ein Sitz des Europäischen Parlaments?",
    "question_en": "Where is a seat of the European Parliament?",
    "options_de": [
      "London",
      "Paris",
      "Berlin",
      "Straßburg"
    ],
    "options_en": [
      "London",
      "Paris",
      "Berlin",
      "Strasbourg"
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 235,
    "question_de": "Der damalige französische Staatspräsident François Mitterrand und der damalige deutsche Bundeskanzler Helmut Kohl gedenken in Verdun gemeinsam der Toten beider Weltkriege. Welches Ziel der Europäischen Union wird bei diesem Treffen deutlich?",
    "question_en": "The then French President François Mitterrand and the then German Federal Chancellor Helmut Kohl commemorate the dead of both world wars together in Verdun. Which goal of the European Union becomes clear at this meeting?",
    "options_de": [
      "Freundschaft zwischen England und Deutschland",
      "Reisefreiheit in alle Länder der EU",
      "Frieden und Sicherheit in den Ländern der EU",
      "einheitliche Feiertage in den Ländern der EU"
    ],
    "options_en": [
      "Friendship between England and Germany",
      "Freedom of travel to all EU countries",
      "Peace and security in the EU countries",
      "Uniform holidays in the EU countries"
    ],
    "correct_index": 2,
    "category": "Geschichte"
  },
  {
    "id": 236,
    "question_de": "Wie viele Mitgliedstaaten hat die EU heute?",
    "question_en": "How many member states does the EU have today?",
    "options_de": [
      "21",
      "23",
      "25",
      "27"
    ],
    "options_en": [
      "21",
      "23",
      "25",
      "27"
    ],
    "correct_index": 3,
    "category": "Geografie"
  },
  {
    "id": 237,
    "question_de": "Was war der Inhalt der \"Römischen Verträge\"?",
    "question_en": "What was the content of the \"Treaties of Rome\"?",
    "options_de": [
      "Beitritt Deutschlands zur NATO",
      "Gründung der Europäischen Wirtschaftsgemeinschaft (EWG)",
      "Verpflichtung Deutschlands zu Reparationsleistungen",
      "Festlegung der Oder-Neiße-Linie als Ostgrenze"
    ],
    "options_en": [
      "Germany's accession to NATO",
      "Foundation of the European Economic Community (EEC)",
      "Germany's obligation to pay reparations",
      "Establishment of the Oder-Neisse line as eastern border"
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 238,
    "question_de": "An welchen Orten arbeitet das Europäische Parlament?",
    "question_en": "At which locations does the European Parliament work?",
    "options_de": [
      "Paris, London und Den Haag",
      "Straßburg, Luxemburg und Brüssel",
      "Rom, Bern und Wien",
      "Bonn, Zürich und Mailand"
    ],
    "options_en": [
      "Paris, London and The Hague",
      "Strasbourg, Luxembourg and Brussels",
      "Rome, Bern and Vienna",
      "Bonn, Zurich and Milan"
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 239,
    "question_de": "Durch welche Verträge schloss sich die Bundesrepublik Deutschland mit anderen Staaten zur Europäischen Wirtschaftsgemeinschaft zusammen?",
    "question_en": "Through which treaties did the Federal Republic of Germany join with other states to form the European Economic Community?",
    "options_de": [
      "durch die \"Hamburger Verträge\"",
      "durch die \"Römischen Verträge\"",
      "durch die \"Pariser Verträge\"",
      "durch die \"Londoner Verträge\""
    ],
    "options_en": [
      "through the \"Hamburg Treaties\"",
      "through the \"Treaties of Rome\"",
      "through the \"Paris Treaties\"",
      "through the \"London Treaties\""
    ],
    "correct_index": 1,
    "category": "Geografie"
  },
  {
    "id": 240,
    "question_de": "Seit wann bezahlt man in Deutschland mit dem Euro in bar?",
    "question_en": "Since when has one paid with the euro in cash in Germany?",
    "options_de": [
      "1995",
      "1998",
      "2002",
      "2005"
    ],
    "options_en": [
      "1995",
      "1998",
      "2002",
      "2005"
    ],
    "correct_index": 2,
    "category": "Geografie"
  },
  {
    "id": 241,
    "question_de": "Frau Seger bekommt ein Kind. Was muss sie tun, um Elterngeld zu erhalten?",
    "question_en": "Ms. Seger is having a child. What does she have to do to receive parental allowance?",
    "options_de": [
      "Sie muss an ihre Krankenkasse schreiben.",
      "Sie muss einen Antrag bei der Elterngeldstelle stellen.",
      "Sie muss nichts tun, denn sie bekommt automatisch Elterngeld.",
      "Sie muss das Arbeitsamt um Erlaubnis bitten."
    ],
    "options_en": [
      "She must write to her health insurance.",
      "She must submit an application to the parental allowance office.",
      "She doesn't have to do anything because she automatically gets parental allowance.",
      "She must ask the employment office for permission."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 242,
    "question_de": "Wer entscheidet, ob ein Kind in Deutschland in den Kindergarten geht?",
    "question_en": "Who decides whether a child goes to kindergarten in Germany?",
    "options_de": [
      "der Staat",
      "die Bundesländer",
      "die Eltern / die Erziehungsberechtigten",
      "die Schulen"
    ],
    "options_en": [
      "the state",
      "the federal states",
      "the parents / legal guardians",
      "the schools"
    ],
    "correct_index": 2,
    "category": "Gesellschaft"
  },
  {
    "id": 243,
    "question_de": "Maik und Sybille wollen mit Freunden an ihrem deutschen Wohnort eine Demonstration auf der Straße abhalten. Was müssen sie vorher tun?",
    "question_en": "Maik and Sybille want to hold a demonstration on the street with friends in their German place of residence. What do they have to do beforehand?",
    "options_de": [
      "Sie müssen die Demonstration anmelden.",
      "Sie müssen nichts tun. Man darf in Deutschland jederzeit überall demonstrieren.",
      "Sie können gar nichts tun, denn Demonstrationen sind in Deutschland grundsätzlich verboten.",
      "Maik und Sybille müssen einen neuen Verein gründen, weil nur Vereine demonstrieren dürfen."
    ],
    "options_en": [
      "They must register the demonstration.",
      "They don't have to do anything. One may demonstrate anywhere at any time in Germany.",
      "They can't do anything at all because demonstrations are generally prohibited in Germany.",
      "Maik and Sybille must found a new association because only associations may demonstrate."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 244,
    "question_de": "Welchen Schulabschluss braucht man normalerweise, um an einer Universität in Deutschland ein Studium zu beginnen?",
    "question_en": "Which school leaving certificate is normally needed to begin studies at a university in Germany?",
    "options_de": [
      "das Abitur",
      "ein Diplom",
      "die Prokura",
      "eine Gesellenprüfung"
    ],
    "options_en": [
      "the Abitur",
      "a diploma",
      "the power of attorney",
      "a journeyman's examination"
    ],
    "correct_index": 0,
    "category": "Bildung"
  },
  {
    "id": 245,
    "question_de": "Wer darf in Deutschland nicht als Paar zusammenleben?",
    "question_en": "Who may not live together as a couple in Germany?",
    "options_de": [
      "Hans (20 Jahre) und Marie (19 Jahre)",
      "Tom (20 Jahre) und Klaus (45 Jahre)",
      "Sofie (35 Jahre) und Lisa (40 Jahre)",
      "Anne (13 Jahre) und Tim (25 Jahre)"
    ],
    "options_en": [
      "Hans (20 years) and Marie (19 years)",
      "Tom (20 years) and Klaus (45 years)",
      "Sofie (35 years) and Lisa (40 years)",
      "Anne (13 years) and Tim (25 years)"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 246,
    "question_de": "Ab welchem Alter ist man in Deutschland volljährig?",
    "question_en": "From what age is one considered an adult in Germany?",
    "options_de": [
      "16",
      "18",
      "19",
      "21"
    ],
    "options_en": [
      "16",
      "18",
      "19",
      "21"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 247,
    "question_de": "Eine Frau ist schwanger. Sie ist kurz vor und nach der Geburt ihres Kindes vom Gesetz besonders beschützt. Wie heißt dieser Schutz?",
    "question_en": "A woman is pregnant. She is specially protected by law shortly before and after the birth of her child. What is this protection called?",
    "options_de": [
      "Elternzeit",
      "Mutterschutz",
      "Geburtsvorbereitung",
      "Wochenbett"
    ],
    "options_en": [
      "Parental leave",
      "Maternity protection",
      "Birth preparation",
      "Postpartum period"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 248,
    "question_de": "Die Erziehung der Kinder ist in Deutschland ist vor allem Aufgabe …",
    "question_en": "The education of children in Germany is primarily the task of...",
    "options_de": [
      "des Staates.",
      "der Eltern.",
      "der Großeltern.",
      "der Schulen"
    ],
    "options_en": [
      "the state.",
      "the parents.",
      "the grandparents.",
      "the schools"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 249,
    "question_de": "Wer ist in Deutschland hauptsächlich verantwortlich für die Kindererziehung?",
    "question_en": "Who is mainly responsible for child rearing in Germany?",
    "options_de": [
      "der Staat",
      "die Eltern",
      "die Verwandten",
      "die Schulen"
    ],
    "options_en": [
      "the state",
      "the parents",
      "the relatives",
      "the schools"
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 250,
    "question_de": "In Deutschland hat man die besten Chancen auf einen gut bezahlten Arbeitsplatz, wenn man …",
    "question_en": "In Germany, one has the best chances for a well-paid job if one...",
    "options_de": [
      "katholisch ist.",
      "gut ausgebildet ist.",
      "eine Frau ist.",
      "Mitglied einer Partei ist."
    ],
    "options_en": [
      "is Catholic.",
      "is well educated.",
      "is a woman.",
      "is a member of a party."
    ],
    "correct_index": 1,
    "category": "Bildung"
  },
  {
    "id": 251,
    "question_de": "Wenn man in Deutschland ein Kind schlägt, …",
    "question_en": "If one hits a child in Germany...",
    "options_de": [
      "geht das niemanden etwas an.",
      "geht das nur die Familie etwas an.",
      "kann man dafür nicht bestraft werden.",
      "kann man dafür bestraft werden."
    ],
    "options_en": [
      "it's nobody's business.",
      "it only concerns the family.",
      "one cannot be punished for it.",
      "one can be punished for it."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 252,
    "question_de": "In Deutschland …",
    "question_en": "In Germany...",
    "options_de": [
      "darf man zur gleichen Zeit nur mit einer Partnerin / einem Partner verheiratet sein.",
      "kann man mehrere Ehepartnerinnen / Ehepartner gleichzeitig haben.",
      "darf man nicht wieder heiraten, wenn man einmal verheiratet war.",
      "darf eine Frau nicht wieder heiraten, wenn ihr Mann gestorben ist."
    ],
    "options_en": [
      "one may only be married to one partner at the same time.",
      "one can have multiple spouses at the same time.",
      "one may not marry again if one was once married.",
      "a woman may not marry again if her husband has died."
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 253,
    "question_de": "Wo müssen Sie sich anmelden, wenn Sie in Deutschland umziehen?",
    "question_en": "Where do you have to register if you move within Germany?",
    "options_de": [
      "beim Einwohnermeldeamt",
      "beim Standesamt",
      "beim Ordnungsamt",
      "beim Gewerbeamt"
    ],
    "options_en": [
      "at the residents' registration office",
      "at the registry office",
      "at the public order office",
      "at the trade office"
    ],
    "correct_index": 0,
    "category": "Grundgesetz"
  },
  {
    "id": 254,
    "question_de": "In Deutschland dürfen Ehepaare sich scheiden lassen. Meistens müssen sie dazu das \"Trennungsjahr\" einhalten. Was bedeutet das?",
    "question_en": "In Germany, married couples may divorce. Usually they must observe the \"separation year\" for this. What does this mean?",
    "options_de": [
      "Der Scheidungsprozess dauert ein Jahr.",
      "Die Ehegatten sind ein Jahr verheiratet, dann ist die Scheidung möglich.",
      "Das Besuchsrecht für die Kinder gilt ein Jahr.",
      "Die Ehegatten führen mindestens ein Jahr getrennt ihr eigenes Leben. Danach ist die Scheidung möglich."
    ],
    "options_en": [
      "The divorce process takes one year.",
      "The spouses are married for one year, then divorce is possible.",
      "The visitation rights for the children are valid for one year.",
      "The spouses lead their own lives separately for at least one year. After that, divorce is possible."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 255,
    "question_de": "Bei Erziehungsproblemen können Eltern in Deutschland Hilfe erhalten vom …",
    "question_en": "For parenting problems, parents in Germany can get help from...",
    "options_de": [
      "Ordnungsamt.",
      "Schulamt.",
      "Jugendamt.",
      "Gesundheitsamt."
    ],
    "options_en": [
      "the public order office.",
      "the school authority.",
      "the youth office.",
      "the health department."
    ],
    "correct_index": 2,
    "category": "Gesellschaft"
  },
  {
    "id": 256,
    "question_de": "Ein Ehepaar möchte in Deutschland ein Restaurant eröffnen. Was braucht es dazu unbedingt?",
    "question_en": "A married couple wants to open a restaurant in Germany. What is absolutely necessary for this?",
    "options_de": [
      "eine Erlaubnis der Polizei",
      "eine Genehmigung einer Partei",
      "eine Genehmigung des Einwohnermeldeamts",
      "eine Gaststättenerlaubnis von der zuständigen Behörde"
    ],
    "options_en": [
      "a permit from the police",
      "an approval from a party",
      "an approval from the residents' registration office",
      "a restaurant license from the responsible authority"
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 257,
    "question_de": "Eine erwachsene Frau möchte in Deutschland das Abitur nachholen. Das kann sie an …",
    "question_en": "An adult woman wants to make up for the Abitur in Germany. She can do this at...",
    "options_de": [
      "einer Hochschule.",
      "einem Abendgymnasium.",
      "einer Hauptschule.",
      "einer Privatuniversität."
    ],
    "options_en": [
      "a university.",
      "an evening grammar school.",
      "a secondary school.",
      "a private university."
    ],
    "correct_index": 1,
    "category": "Bildung"
  },
  {
    "id": 258,
    "question_de": "Was darf das Jugendamt in Deutschland?",
    "question_en": "What may the youth office do in Germany?",
    "options_de": [
      "Es entscheidet, welche Schule das Kind besucht.",
      "Es kann ein Kind, das geschlagen wird oder hungern muss, aus der Familie nehmen.",
      "Es bezahlt das Kindergeld an die Eltern.",
      "Es kontrolliert, ob das Kind einen Kindergarten besucht."
    ],
    "options_en": [
      "It decides which school the child attends.",
      "It can remove a child from the family if the child is beaten or has to go hungry.",
      "It pays child benefits to the parents.",
      "It checks whether the child attends kindergarten."
    ],
    "correct_index": 1,
    "category": "Gesellschaft"
  },
  {
    "id": 259,
    "question_de": "Das Berufsinformationszentrum BIZ bei der Bundesagentur für Arbeit in Deutschland hilft bei der …",
    "question_en": "The Career Information Center BIZ at the Federal Employment Agency in Germany helps with...",
    "options_de": [
      "Rentenberechnung.",
      "Lehrstellensuche.",
      "Steuererklärung.",
      "Krankenversicherung."
    ],
    "options_en": [
      "pension calculation.",
      "apprenticeship search.",
      "tax declaration.",
      "health insurance."
    ],
    "correct_index": 1,
    "category": "Bildung"
  },
  {
    "id": 260,
    "question_de": "In Deutschland hat ein Kind in der Schule …",
    "question_en": "In Germany, a child in school has...",
    "options_de": [
      "Recht auf unbegrenzte Freizeit.",
      "Wahlfreiheit für alle Fächer.",
      "Anspruch auf Schulgeld.",
      "Anwesenheitspflicht."
    ],
    "options_en": [
      "the right to unlimited free time.",
      "freedom of choice for all subjects.",
      "entitlement to school fees.",
      "compulsory attendance."
    ],
    "correct_index": 3,
    "category": "Bildung"
  },
  {
    "id": 261,
    "question_de": "Ein Mann möchte mit 30 Jahren in Deutschland sein Abitur nachholen. Wo kann er das tun? An …",
    "question_en": "A man wants to make up for his Abitur at age 30 in Germany. Where can he do this? At...",
    "options_de": [
      "einer Hochschule.",
      "einem Abendgymnasium.",
      "einer Hauptschule.",
      "einer Privatuniversität."
    ],
    "options_en": [
      "a university.",
      "an evening grammar school.",
      "a secondary school.",
      "a private university."
    ],
    "correct_index": 1,
    "category": "Bildung"
  },
  {
    "id": 262,
    "question_de": "Was bedeutet in Deutschland der Grundsatz der Gleichbehandlung?",
    "question_en": "What does the principle of equal treatment mean in Germany?",
    "options_de": [
      "Niemand darf z.B. wegen einer Behinderung benachteiligt werden.",
      "Man darf andere Personen benachteiligen, wenn ausreichende persönliche Gründe hierfür vorliegen.",
      "Niemand darf gegen Personen klagen, wenn sie benachteiligt wurden.",
      "Es ist für alle Gesetz, benachteiligten Gruppen jährlich Geld zu spenden."
    ],
    "options_en": [
      "No one may be disadvantaged, for example because of a disability.",
      "One may disadvantage other persons if sufficient personal reasons exist for this.",
      "No one may sue persons if they have been disadvantaged.",
      "It is law for everyone to donate money to disadvantaged groups annually."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 263,
    "question_de": "In Deutschland sind Jugendliche ab 14 Jahren strafmündig. Das bedeutet: Jugendliche, die 14 Jahre und älter sind und gegen Strafgesetze verstoßen, …",
    "question_en": "In Germany, young people from age 14 are criminally responsible. This means: Young people who are 14 years and older and violate criminal laws...",
    "options_de": [
      "werden bestraft.",
      "werden wie Erwachsene behandelt.",
      "teilen die Strafe mit ihren Eltern.",
      "werden nicht bestraft."
    ],
    "options_en": [
      "are punished.",
      "are treated like adults.",
      "share the punishment with their parents.",
      "are not punished."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 264,
    "question_de": "Zu welchem Fest tragen Menschen in Deutschland bunte Kostüme und Masken?",
    "question_en": "At which festival do people wear colorful costumes and masks in Germany?",
    "options_de": [
      "am Rosenmontag",
      "am Maifeiertag",
      "beim Oktoberfest",
      "an Pfingsten"
    ],
    "options_en": [
      "on Rose Monday",
      "on May Day",
      "at the Oktoberfest",
      "at Pentecost"
    ],
    "correct_index": 0,
    "category": "Kultur"
  },
  {
    "id": 265,
    "question_de": "Wohin muss man in Deutschland zuerst gehen, wenn man heiraten möchte?",
    "question_en": "Where must one go first in Germany if one wants to marry?",
    "options_de": [
      "zum Einwohnermeldeamt",
      "zum Ordnungsamt",
      "zur Agentur für Arbeit",
      "zum Standesamt"
    ],
    "options_en": [
      "to the residents' registration office",
      "to the public order office",
      "to the employment agency",
      "to the registry office"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 266,
    "question_de": "Wann beginnt die gesetzliche Nachtruhe in Deutschland?",
    "question_en": "When does the legal night rest begin in Germany?",
    "options_de": [
      "wenn die Sonne untergeht",
      "wenn die Nachbarn schlafen gehen",
      "um 0 Uhr, Mitternacht",
      "um 22 Uhr"
    ],
    "options_en": [
      "when the sun sets",
      "when the neighbors go to sleep",
      "at 0 o'clock, midnight",
      "at 10 pm"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 267,
    "question_de": "Eine junge Frau in Deutschland, 22 Jahre alt, lebt mit ihrem Freund zusammen. Die Eltern der Frau finden das nicht gut, weil ihnen der Freund nicht gefällt. Was können die Eltern tun?",
    "question_en": "A young woman in Germany, 22 years old, lives with her boyfriend. The woman's parents don't like this because they don't like the boyfriend. What can the parents do?",
    "options_de": [
      "Sie müssen die Entscheidung der volljährigen Tochter respektieren.",
      "Sie haben das Recht, die Tochter in die elterliche Wohnung zurückzuholen.",
      "Sie können zur Polizei gehen und die Tochter anzeigen.",
      "Sie suchen einen anderen Mann für die Tochter."
    ],
    "options_en": [
      "They must respect the decision of their adult daughter.",
      "They have the right to bring the daughter back to the parental home.",
      "They can go to the police and report the daughter.",
      "They look for another man for the daughter."
    ],
    "correct_index": 0,
    "category": "Gesellschaft"
  },
  {
    "id": 268,
    "question_de": "Eine junge Frau will den Führerschein machen. Sie hat Angst vor der Prüfung, weil ihre Muttersprache nicht Deutsch ist. Was ist richtig?",
    "question_en": "A young woman wants to get her driver's license. She is afraid of the exam because her native language is not German. What is correct?",
    "options_de": [
      "Sie muss mindestens zehn Jahre in Deutschland leben, bevor sie den Führerschein machen kann.",
      "Wenn sie kein Deutsch kann, darf sie keinen Führerschein haben.",
      "Sie muss den Führerschein in dem Land machen, in dem man ihre Sprache spricht.",
      "Sie kann die Theorie-Prüfung vielleicht in ihrer Muttersprache machen. Es gibt mehr als zehn Sprachen zur Auswahl."
    ],
    "options_en": [
      "She must live in Germany for at least ten years before she can get her driver's license.",
      "If she doesn't know German, she may not have a driver's license.",
      "She must get her driver's license in the country where her language is spoken.",
      "She may be able to take the theory exam in her native language. There are more than ten languages to choose from."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 269,
    "question_de": "In Deutschland haben Kinder ab dem Alter von drei Jahren bis zur Ersteinschulung einen Anspruch auf …",
    "question_en": "In Germany, children from the age of three until first school enrollment have a right to...",
    "options_de": [
      "monatliches Taschengeld.",
      "einen Platz in einem Sportverein.",
      "einen Kindergartenplatz.",
      "einen Ferienpass."
    ],
    "options_en": [
      "monthly pocket money.",
      "a place in a sports club.",
      "a kindergarten place.",
      "a holiday pass."
    ],
    "correct_index": 2,
    "category": "Bildung"
  },
  {
    "id": 270,
    "question_de": "Die Volkshochschule in Deutschland ist eine Einrichtung …",
    "question_en": "The adult education center in Germany is an institution for...",
    "options_de": [
      "für den Religionsunterricht.",
      "nur für Jugendliche.",
      "zur Weiterbildung.",
      "nur für Rentnerinnen und Rentner."
    ],
    "options_en": [
      "for religious education.",
      "only for young people.",
      "for continuing education.",
      "only for pensioners."
    ],
    "correct_index": 2,
    "category": "Bildung"
  },
  {
    "id": 271,
    "question_de": "Was ist in Deutschland ein Brauch zu Weihnachten?",
    "question_en": "What is a custom at Christmas in Germany?",
    "options_de": [
      "bunte Eier verstecken",
      "einen Tannenbaum schmücken",
      "sich mit Masken und Kostümen verkleiden",
      "Kürbisse vor die Tür stellen"
    ],
    "options_en": [
      "hide colorful eggs",
      "decorate a Christmas tree",
      "dress up with masks and costumes",
      "place pumpkins in front of the door"
    ],
    "correct_index": 1,
    "category": "Kultur"
  },
  {
    "id": 272,
    "question_de": "Welche Lebensform ist in Deutschland nicht erlaubt?",
    "question_en": "Which lifestyle is not allowed in Germany?",
    "options_de": [
      "Mann und Frau sind geschieden und leben mit neuen Partnern zusammen.",
      "Zwei Frauen leben zusammen.",
      "Ein alleinerziehender Vater lebt mit seinen zwei Kindern zusammen.",
      "Ein Mann ist mit zwei Frauen zur selben Zeit verheiratet."
    ],
    "options_en": [
      "A man and woman are divorced and live with new partners.",
      "Two women live together.",
      "A single father lives with his two children.",
      "A man is married to two women at the same time."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 273,
    "question_de": "Bei Erziehungsproblemen gehen Sie in Deutschland …",
    "question_en": "For parenting problems, you go in Germany to...",
    "options_de": [
      "zur Ärztin / zum Arzt.",
      "zum Gesundheitsamt.",
      "zum Einwohnermeldeamt.",
      "zum Jugendamt."
    ],
    "options_en": [
      "the doctor.",
      "the health department.",
      "the residents' registration office.",
      "the youth office."
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 274,
    "question_de": "Sie haben in Deutschland absichtlich einen Brief geöffnet, der an eine andere Person adressiert ist. Was haben Sie nicht beachtet?",
    "question_en": "You have intentionally opened a letter in Germany that was addressed to another person. What have you not observed?",
    "options_de": [
      "das Schweigerecht",
      "das Briefgeheimnis",
      "die Schweigepflicht",
      "die Meinungsfreiheit"
    ],
    "options_en": [
      "the right to remain silent",
      "the secrecy of correspondence",
      "the duty of confidentiality",
      "freedom of expression"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 275,
    "question_de": "Was braucht man in Deutschland für eine Ehescheidung?",
    "question_en": "What is needed for a divorce in Germany?",
    "options_de": [
      "die Einwilligung der Eltern",
      "ein Attest einer Ärztin / eines Arztes",
      "die Einwilligung der Kinder",
      "die Unterstützung einer Anwältin / eines Anwalts"
    ],
    "options_en": [
      "the consent of the parents",
      "a medical certificate from a doctor",
      "the consent of the children",
      "the support of a lawyer"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 276,
    "question_de": "Was sollten Sie tun, wenn Sie von Ihrer Ansprechpartnerin / Ihrem Ansprechpartner in einer deutschen Behörde schlecht behandelt werden?",
    "question_en": "What should you do if you are treated badly by your contact person in a German authority?",
    "options_de": [
      "Ich kann nichts tun.",
      "Ich muss mir diese Behandlung gefallen lassen.",
      "Ich drohe der Person.",
      "Ich kann mich bei der Behördenleiterin / beim Behördenleiter beschweren."
    ],
    "options_en": [
      "I can do nothing.",
      "I have to accept this treatment.",
      "I threaten the person.",
      "I can complain to the head of the authority."
    ],
    "correct_index": 3,
    "category": "Grundgesetz"
  },
  {
    "id": 277,
    "question_de": "Eine Frau, die ein zweijähriges Kind hat, bewirbt sich in Deutschland um eine Stelle. Was ist ein Beispiel für Diskriminierung? Sie bekommt die Stelle nur deshalb nicht, weil sie …",
    "question_en": "A woman who has a two-year-old child applies for a job in Germany. What is an example of discrimination? She doesn't get the job only because she...",
    "options_de": [
      "kein Englisch spricht.",
      "zu hohe Gehaltsvorstellungen hat.",
      "keine Erfahrungen in diesem Beruf hat.",
      "Mutter ist"
    ],
    "options_en": [
      "doesn't speak English.",
      "has salary expectations that are too high.",
      "has no experience in this profession.",
      "is a mother"
    ],
    "correct_index": 3,
    "category": "Grundrechte"
  },
  {
    "id": 278,
    "question_de": "Ein Mann im Rollstuhl hat sich auf eine Stelle als Buchhalter beworben. Was ist ein Beispiel für Diskriminierung? Er bekommt die Stelle nur deshalb nicht, weil er …",
    "question_en": "A man in a wheelchair has applied for a position as an accountant. What is an example of discrimination? He doesn't get the position only because he...",
    "options_de": [
      "im Rollstuhl sitzt.",
      "keine Erfahrung hat.",
      "zu hohe Gehaltsvorstellungen hat.",
      "kein Englisch spricht."
    ],
    "options_en": [
      "is in a wheelchair.",
      "has no experience.",
      "has salary expectations that are too high.",
      "doesn't speak English."
    ],
    "correct_index": 0,
    "category": "Grundrechte"
  },
  {
    "id": 279,
    "question_de": "In den meisten Mietshäusern in Deutschland gibt es eine \"Hausordnung\". Was steht in einer solchen \"Hausordnung\"? Sie nennt …",
    "question_en": "In most rental buildings in Germany, there is a \"house rules\". What is in such \"house rules\"? It lists...",
    "options_de": [
      "Regeln für die Benutzung öffentlicher Verkehrsmittel.",
      "alle Mieterinnen und Mieter im Haus.",
      "Regeln, an die sich alle Bewohnerinnen und Bewohner halten müssen.",
      "die Adresse des nächsten Ordnungsamtes."
    ],
    "options_en": [
      "rules for using public transportation.",
      "all tenants in the building.",
      "rules that all residents must follow.",
      "the address of the nearest public order office."
    ],
    "correct_index": 2,
    "category": "Gesellschaft"
  },
  {
    "id": 280,
    "question_de": "Wenn Sie sich in Deutschland gegen einen falschen Steuerbescheid wehren wollen, müssen Sie …",
    "question_en": "If you want to fight against an incorrect tax assessment in Germany, you must...",
    "options_de": [
      "nichts machen.",
      "den Bescheid wegwerfen.",
      "Einspruch einlegen.",
      "warten, bis ein anderer Bescheid kommt."
    ],
    "options_en": [
      "do nothing.",
      "throw away the assessment.",
      "file an objection.",
      "wait until another assessment comes."
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 281,
    "question_de": "Zwei Freunde wollen in ein öffentliches Schwimmbad in Deutschland. Beide haben eine dunkle Hautfarbe und werden deshalb nicht hineingelassen. Welches Recht wird in dieser Situation verletzt? Das Recht auf …",
    "question_en": "Two friends want to go to a public swimming pool in Germany. Both have dark skin color and are therefore not admitted. Which right is violated in this situation? The right to...",
    "options_de": [
      "Meinungsfreiheit",
      "Gleichbehandlung",
      "Versammlungsfreiheit",
      "Freizügigkeit"
    ],
    "options_en": [
      "freedom of expression",
      "equal treatment",
      "freedom of assembly",
      "freedom of movement"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 282,
    "question_de": "Welches Ehrenamt müssen deutsche Staatsbürgerinnen und Staatsbürger übernehmen, wenn sie dazu aufgefordert werden?",
    "question_en": "Which honorary office must German citizens take on if they are requested to do so?",
    "options_de": [
      "Vereinstrainerin / Vereinstrainer",
      "Wahlhelferin / Wahlhelfer",
      "Bibliotheksaufsicht",
      "Lehrerin / Lehrer"
    ],
    "options_en": [
      "club trainer",
      "election helper",
      "library supervision",
      "teacher"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 283,
    "question_de": "Was tun Sie, wenn Sie eine falsche Rechnung von einer deutschen Behörde bekommen?",
    "question_en": "What do you do if you receive an incorrect bill from a German authority?",
    "options_de": [
      "Ich lasse die Rechnung liegen.",
      "Ich lege Widerspruch bei der Behörde ein.",
      "Ich schicke die Rechnung an die Behörde zurück.",
      "Ich gehe mit der Rechnung zum Finanzamt"
    ],
    "options_en": [
      "I leave the bill alone.",
      "I file an objection with the authority.",
      "I send the bill back to the authority.",
      "I go to the tax office with the bill"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 284,
    "question_de": "Was man für die Arbeit können muss, ändert sich in Zukunft sehr schnell. Was kann man tun?",
    "question_en": "What one needs to know for work will change very quickly in the future. What can one do?",
    "options_de": [
      "Es ist egal, was man lernt.",
      "Erwachsene müssen auch nach der Ausbildung immer weiter lernen.",
      "Kinder lernen in der Schule alles, was im Beruf wichtig ist. Nach der Schule muss man nicht weiter lernen.",
      "Alle müssen früher aufhören zu arbeiten, weil sich alles ändert."
    ],
    "options_en": [
      "It doesn't matter what one learns.",
      "Adults must also continue learning after their training.",
      "Children learn everything that is important for the profession in school. After school, one doesn't need to learn further.",
      "Everyone must stop working earlier because everything is changing."
    ],
    "correct_index": 1,
    "category": "Bildung"
  },
  {
    "id": 285,
    "question_de": "Frau Frost arbeitet als fest angestellte Mitarbeiterin in einem Büro. Was muss sie nicht von ihrem Gehalt bezahlen?",
    "question_en": "Ms. Frost works as a permanent employee in an office. What does she not have to pay from her salary?",
    "options_de": [
      "Lohnsteuer",
      "Beiträge zur Arbeitslosenversicherung",
      "Beiträge zur Renten- und Krankenversicherung",
      "Umsatzsteuer"
    ],
    "options_en": [
      "income tax",
      "contributions to unemployment insurance",
      "contributions to pension and health insurance",
      "value added tax"
    ],
    "correct_index": 3,
    "category": "Bildung"
  },
  {
    "id": 286,
    "question_de": "Welche Organisation in einer Firma hilft den Arbeitnehmerinnen und Arbeitnehmern bei Problemen mit der Arbeitgeberin / dem Arbeitgeber?",
    "question_en": "Which organization in a company helps employees with problems with the employer?",
    "options_de": [
      "der Betriebsrat",
      "die Betriebsprüferin / der Betriebsprüfer",
      "die Betriebsgruppe",
      "das Betriebsmanagement"
    ],
    "options_en": [
      "the works council",
      "the company auditor",
      "the company group",
      "the company management"
    ],
    "correct_index": 0,
    "category": "Bildung"
  },
  {
    "id": 287,
    "question_de": "Sie möchten bei einer Firma in Deutschland ihr Arbeitsverhältnis beenden. Was müssen Sie beachten?",
    "question_en": "You want to end your employment relationship with a company in Germany. What do you have to consider?",
    "options_de": [
      "die Gehaltszahlungen",
      "die Arbeitszeit",
      "die Kündigungsfrist",
      "die Versicherungspflicht"
    ],
    "options_en": [
      "the salary payments",
      "the working hours",
      "the notice period",
      "the insurance obligation"
    ],
    "correct_index": 2,
    "category": "Bildung"
  },
  {
    "id": 288,
    "question_de": "Woraus begründet sich Deutschlands besondere Verantwortung für Israel?",
    "question_en": "What is the basis for Germany's special responsibility for Israel?",
    "options_de": [
      "aus der Mitgliedschaft in der Europäischen Union (EU)",
      "aus den nationalsozialistischen Verbrechen gegen Juden",
      "aus dem Grundgesetz der Bundesrepublik Deutschland",
      "aus der christlichen Tradition"
    ],
    "options_en": [
      "from membership in the European Union (EU)",
      "from the National Socialist crimes against Jews",
      "from the Basic Law of the Federal Republic of Germany",
      "from the Christian tradition"
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 289,
    "question_de": "Ein Mann mit dunkler Hautfarbe bewirbt sich um eine Stelle als Kellner in einem Restaurant in Deutschland. Was ist ein Beispiel für Diskriminierung? Er bekommt die Stelle nur deshalb nicht, weil …",
    "question_en": "A man with dark skin color applies for a position as a waiter in a restaurant in Germany. What is an example of discrimination? He doesn't get the position only because...",
    "options_de": [
      "seine Deutschkenntnisse zu gering sind.",
      "er zu hohe Gehaltsvorstellungen hat.",
      "er eine dunkle Haut hat.",
      "er keine Erfahrungen im Beruf hat."
    ],
    "options_en": [
      "his German skills are too low.",
      "he has salary expectations that are too high.",
      "he has dark skin.",
      "he has no experience in the profession."
    ],
    "correct_index": 2,
    "category": "Grundrechte"
  },
  {
    "id": 290,
    "question_de": "Sie haben in Deutschland einen Fernseher gekauft. Zu Hause packen Sie den Fernseher aus, doch er funktioniert nicht. Der Fernseher ist kaputt. Was können Sie machen?",
    "question_en": "You bought a television in Germany. At home you unpack the television, but it doesn't work. The television is broken. What can you do?",
    "options_de": [
      "eine Anzeige schreiben",
      "den Fernseher reklamieren",
      "das Gerät ungefragt austauschen",
      "die Garantie verlängern"
    ],
    "options_en": [
      "write a complaint",
      "file a complaint about the television",
      "exchange the device without asking",
      "extend the guarantee"
    ],
    "correct_index": 1,
    "category": "Grundrechte"
  },
  {
    "id": 291,
    "question_de": "Warum muss man in Deutschland bei der Steuererklärung aufschreiben, ob man zu einer Kirche gehört oder nicht? Weil …",
    "question_en": "Why does one have to write down in the tax declaration in Germany whether one belongs to a church or not? Because...",
    "options_de": [
      "es eine Kirchensteuer gibt, die an die Einkommen- und Lohnsteuer geknüpft ist.",
      "das für die Statistik in Deutschland wichtig ist.",
      "man mehr Steuern zahlen muss, wenn man nicht zu einer Kirche gehört.",
      "die Kirche für die Steuererklärung verantwortlich ist."
    ],
    "options_en": [
      "there is a church tax that is linked to income and wage tax.",
      "this is important for statistics in Germany.",
      "one has to pay more taxes if one doesn't belong to a church.",
      "the church is responsible for the tax declaration."
    ],
    "correct_index": 0,
    "category": "Kultur"
  },
  {
    "id": 292,
    "question_de": "Die Menschen in Deutschland leben nach dem Grundsatz der religiösen Toleranz. Was bedeutet das?",
    "question_en": "People in Germany live according to the principle of religious tolerance. What does this mean?",
    "options_de": [
      "Es dürfen keine Moscheen gebaut werden.",
      "Alle Menschen glauben an Gott.",
      "Jeder kann glauben, was er möchte.",
      "Der Staat entscheidet, an welchen Gott die Menschen glauben."
    ],
    "options_en": [
      "No mosques may be built.",
      "All people believe in God.",
      "Everyone can believe what they want.",
      "The state decides which God people believe in."
    ],
    "correct_index": 2,
    "category": "Kultur"
  },
  {
    "id": 293,
    "question_de": "Was ist in Deutschland ein Brauch zu Ostern?",
    "question_en": "What is a custom at Easter in Germany?",
    "options_de": [
      "Kürbisse vor die Tür stellen",
      "einen Tannenbaum schmücken",
      "Eier bemalen",
      "Raketen in die Luft schießen"
    ],
    "options_en": [
      "place pumpkins in front of the door",
      "decorate a Christmas tree",
      "paint eggs",
      "shoot rockets into the air"
    ],
    "correct_index": 2,
    "category": "Kultur"
  },
  {
    "id": 294,
    "question_de": "Pfingsten ist ein …",
    "question_en": "Pentecost is a...",
    "options_de": [
      "christlicher Feiertag.",
      "deutscher Gedenktag.",
      "internationaler Trauertag.",
      "bayerischer Brauch"
    ],
    "options_en": [
      "Christian holiday.",
      "German memorial day.",
      "international day of mourning.",
      "Bavarian custom"
    ],
    "correct_index": 0,
    "category": "Kultur"
  },
  {
    "id": 295,
    "question_de": "Welche Religion hat die europäische und deutsche Kultur geprägt?",
    "question_en": "Which religion has shaped European and German culture?",
    "options_de": [
      "der Hinduismus",
      "das Christentum",
      "der Buddhismus",
      "der Islam"
    ],
    "options_en": [
      "Hinduism",
      "Christianity",
      "Buddhism",
      "Islam"
    ],
    "correct_index": 1,
    "category": "Kultur"
  },
  {
    "id": 296,
    "question_de": "In Deutschland nennt man die letzten vier Wochen vor Weihnachten …",
    "question_en": "In Germany, the last four weeks before Christmas are called...",
    "options_de": [
      "den Buß- und Bettag.",
      "das Erntedankfest.",
      "die Adventszeit.",
      "Allerheiligen."
    ],
    "options_en": [
      "the Day of Repentance and Prayer.",
      "the Harvest Festival.",
      "the Advent season.",
      "All Saints' Day."
    ],
    "correct_index": 2,
    "category": "Kultur"
  },
  {
    "id": 297,
    "question_de": "Aus welchem Land sind die meisten Migrantinnen und Migranten nach Deutschland gekommen?",
    "question_en": "From which country have most migrants come to Germany?",
    "options_de": [
      "Italien",
      "Polen",
      "Marokko",
      "Türkei"
    ],
    "options_en": [
      "Italy",
      "Poland",
      "Morocco",
      "Turkey"
    ],
    "correct_index": 3,
    "category": "Gesellschaft"
  },
  {
    "id": 298,
    "question_de": "In der DDR lebten vor allem Migrantinnen und Migranten aus …",
    "question_en": "In the GDR, migrants mainly came from...",
    "options_de": [
      "Vietnam, Polen, Mosambik.",
      "Frankreich, Rumänien, Somalia.",
      "Chile, Ungarn, Simbabwe.",
      "Nordkorea, Mexiko, Ägypten."
    ],
    "options_en": [
      "Vietnam, Poland, Mozambique.",
      "France, Romania, Somalia.",
      "Chile, Hungary, Zimbabwe.",
      "North Korea, Mexico, Egypt."
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 299,
    "question_de": "Ausländische Arbeitnehmerinnen und Arbeitnehmer, die in den 50er und 60er Jahren von der Bundesrepublik Deutschland angeworben wurden, nannte man …",
    "question_en": "Foreign workers who were recruited by the Federal Republic of Germany in the 50s and 60s were called...",
    "options_de": [
      "Schwarzarbeiterinnen / Schwarzarbeiter.",
      "Gastarbeiterinnen / Gastarbeiter.",
      "Zeitarbeiterinnen / Zeitarbeiter.",
      "Schichtarbeiterinnen / Schichtarbeiter."
    ],
    "options_en": [
      "illegal workers.",
      "guest workers.",
      "temporary workers.",
      "shift workers."
    ],
    "correct_index": 1,
    "category": "Geschichte"
  },
  {
    "id": 300,
    "question_de": "Aus welchem Land kamen die ersten Gastarbeiterinnen und Gastarbeiter in die Bundesrepublik Deutschland?",
    "question_en": "From which country did the first guest workers come to the Federal Republic of Germany?",
    "options_de": [
      "Italien",
      "Spanien",
      "Portugal",
      "Türkei"
    ],
    "options_en": [
      "Italy",
      "Spain",
      "Portugal",
      "Turkey"
    ],
    "correct_index": 0,
    "category": "Geschichte"
  },
  {
    "id": 301,
    "question_de": "Welches Wappen gehört zum Bundesland Berlin?",
    "question_en": "Which coat of arms belongs to the federal state of Berlin?",
    "options_de": [
      "Bild 1",
      "Bild 2",
      "Bild 3",
      "Bild 4"
    ],
    "options_en": [
      "Image 1",
      "Image 2",
      "Image 3",
      "Image 4"
    ],
    "correct_index": 3,
    "category": "Berlin"
  },
  {
    "id": 302,
    "question_de": "Welches ist ein Bezirk von Berlin?",
    "question_en": "Which is a district of Berlin?",
    "options_de": [
      "Altona",
      "Prignitz",
      "Pankow",
      "Mecklenburgische Seenplatte"
    ],
    "options_en": [
      "Altona",
      "Prignitz",
      "Pankow",
      "Mecklenburg Lake District"
    ],
    "correct_index": 2,
    "category": "Berlin"
  },
  {
    "id": 303,
    "question_de": "Für wie viele Jahre wird das Landesparlament in Berlin gewählt?",
    "question_en": "For how many years is the state parliament in Berlin elected?",
    "options_de": [
      "3",
      "4",
      "5",
      "6"
    ],
    "options_en": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correct_index": 2,
    "category": "Berlin"
  },
  {
    "id": 304,
    "question_de": "Ab welchem Alter darf man in Berlin bei Kommunalwahlen (Wahl der Bezirksverordnetenversammlung) wählen?",
    "question_en": "From what age can one vote in local elections (election of the district assembly) in Berlin?",
    "options_de": [
      "14",
      "16",
      "18",
      "20"
    ],
    "options_en": [
      "14",
      "16",
      "18",
      "20"
    ],
    "correct_index": 1,
    "category": "Berlin"
  },
  {
    "id": 305,
    "question_de": "Welche Farben hat die Landesflagge von Berlin?",
    "question_en": "What colors does the state flag of Berlin have?",
    "options_de": [
      "blau-weiß-rot",
      "weiß-rot",
      "grün-weiß-rot",
      "schwarz-gold"
    ],
    "options_en": [
      "blue-white-red",
      "white-red",
      "green-white-red",
      "black-gold"
    ],
    "correct_index": 1,
    "category": "Berlin"
  },
  {
    "id": 306,
    "question_de": "Wo können Sie sich in Berlin über politische Themen informieren?",
    "question_en": "Where can you get information about political topics in Berlin?",
    "options_de": [
      "beim Ordnungsamt der Gemeinde",
      "bei den Kirchen",
      "bei der Verbraucherzentrale",
      "bei der Landeszentrale für politische Bildung"
    ],
    "options_en": [
      "at the municipal public order office",
      "at the churches",
      "at the consumer advice center",
      "at the State Agency for Civic Education"
    ],
    "correct_index": 3,
    "category": "Berlin"
  },
  {
    "id": 307,
    "question_de": "Welches Bundesland ist ein Stadtstaat?",
    "question_en": "Which federal state is a city-state?",
    "options_de": [
      "Berlin",
      "Saarland",
      "Brandenburg",
      "Hessen"
    ],
    "options_en": [
      "Berlin",
      "Saarland",
      "Brandenburg",
      "Hesse"
    ],
    "correct_index": 0,
    "category": "Berlin"
  },
  {
    "id": 308,
    "question_de": "Welches Bundesland ist Berlin?",
    "question_en": "Which federal state is Berlin?",
    "options_de": [
      "1",
      "2",
      "3",
      "4"
    ],
    "options_en": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 3,
    "category": "Berlin"
  },
  {
    "id": 309,
    "question_de": "Wie nennt man die Regierungschefin / den Regierungschef des Stadtstaates Berlin?",
    "question_en": "What is the head of government of the city-state Berlin called?",
    "options_de": [
      "Ministerpräsidentin / Ministerpräsident",
      "Oberbürgermeisterin / Oberbürgermeister",
      "Präsidentin / Präsident des Senates",
      "Regierende Bürgermeisterin / Regierender Bürgermeister"
    ],
    "options_en": [
      "Minister President",
      "Lord Mayor",
      "President of the Senate",
      "Governing Mayor"
    ],
    "correct_index": 3,
    "category": "Berlin"
  },
  {
    "id": 310,
    "question_de": "Welche Senatorin / welchen Senator hat Berlin nicht?",
    "question_en": "Which senator does Berlin not have?",
    "options_de": [
      "Finanzsenatorin / Finanzsenator",
      "Innensenatorin / Innensenator",
      "Senatorin / Senator für Außenbeziehungen",
      "Justizsenatorin / Justizsenator"
    ],
    "options_en": [
      "Finance Senator",
      "Interior Senator",
      "Senator for External Relations",
      "Justice Senator"
    ],
    "correct_index": 2,
    "category": "Berlin"
  }
];

// Category icons mapping
export const CATEGORY_ICONS = {
  'Grundrechte': Scale,
  'Grundgesetz': Landmark,
  'Rechtsstaat': Scale,
  'Politik': Landmark,
  'Wahlen': Users,
  'Geschichte': History,
  'Geografie': Map,
  'Symbole': Award,
  'Bildung': GraduationCap,
  'Gesellschaft': Users,
  'Kultur': Heart,
  'Berlin': Home
};