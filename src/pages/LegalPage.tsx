import { ArrowLeft, Building2, Mail, Globe, Shield, Scale, FileText, ExternalLink } from 'lucide-react';

interface LegalPageProps {
  lang: 'de' | 'en';
  setPage: (page: string) => void;
  initialSection?: 'impressum' | 'datenschutz';
}

export default function LegalPage({ lang, setPage, initialSection = 'impressum' }: LegalPageProps) {
  const section = initialSection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setPage('settings')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">{lang === 'de' ? 'Zurück' : 'Back'}</span>
        </button>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setPage('impressum')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              section === 'impressum'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {lang === 'de' ? 'Impressum' : 'Legal Notice'}
          </button>
          <button
            onClick={() => setPage('datenschutz')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              section === 'datenschutz'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}
          </button>
        </div>

        {section === 'impressum' && <ImpressumContent lang={lang} />}
        {section === 'datenschutz' && <DatenschutzContent lang={lang} />}
      </div>
    </div>
  );
}

function ImpressumContent({ lang }: { lang: 'de' | 'en' }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Scale size={28} />
          <h1 className="text-2xl font-bold">
            {lang === 'de' ? 'Impressum' : 'Legal Notice (Impressum)'}
          </h1>
        </div>
        <p className="text-indigo-200 text-sm">
          {lang === 'de'
            ? 'Angaben gemäß § 5 TMG (Telemediengesetz)'
            : 'Information pursuant to § 5 TMG (German Telemedia Act)'}
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Building2 size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {lang === 'de' ? 'Betreiber / Diensteanbieter' : 'Operator / Service Provider'}
          </h2>
        </div>
        <div className="space-y-2 text-gray-700">
          <p className="font-semibold text-lg">D TechFarm UG (haftungsbeschränkt)</p>
          <div className="space-y-1 text-sm">
            <p>{lang === 'de' ? 'Vertreten durch die Geschäftsführung' : 'Represented by the management'}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Mail size={20} className="text-purple-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {lang === 'de' ? 'Kontakt' : 'Contact'}
          </h2>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400" />
            <span>E-Mail: info@dtechfarm.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-gray-400" />
            <a
              href="https://www.dtechfarm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1"
            >
              www.dtechfarm.com
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <FileText size={20} className="text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {lang === 'de' ? 'Haftungsausschluss' : 'Disclaimer'}
          </h2>
        </div>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {lang === 'de' ? 'Haftung für Inhalte' : 'Liability for Content'}
            </h3>
            <p>
              {lang === 'de'
                ? 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                : 'The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para.1 TMG. According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {lang === 'de' ? 'Haftung für Links' : 'Liability for Links'}
            </h3>
            <p>
              {lang === 'de'
                ? 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
                : 'Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {lang === 'de' ? 'Urheberrecht' : 'Copyright'}
            </h3>
            <p>
              {lang === 'de'
                ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
                : 'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator.'}
            </p>
          </div>
        </div>
      </div>

      {/* Exam Content Disclaimer */}
      <div className="bg-amber-50 rounded-2xl p-6 shadow-lg border border-amber-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-200 p-2 rounded-lg">
            <Shield size={20} className="text-amber-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {lang === 'de' ? 'Hinweis zum Prüfungsinhalt' : 'Exam Content Notice'}
          </h2>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Die in dieser App enthaltenen 310 Fragen basieren auf dem öffentlich zugänglichen Fragenkatalog des Bundesamtes für Migration und Flüchtlinge (BAMF). Diese App steht in keiner Verbindung zum BAMF oder zu staatlichen Behörden. Die App dient ausschließlich Übungszwecken und ersetzt nicht die offizielle Prüfungsvorbereitung.'
            : 'The 310 questions contained in this app are based on the publicly available question catalog of the Federal Office for Migration and Refugees (BAMF). This app is not affiliated with BAMF or any governmental authority. The app is intended solely for practice purposes and does not replace official exam preparation.'}
        </p>
      </div>

      {/* EU Dispute Resolution */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? 'EU-Streitschlichtung' : 'EU Dispute Resolution'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:'
            : 'The European Commission provides a platform for online dispute resolution (ODR):'}
          {' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className="text-sm text-gray-700 mt-2">
          {lang === 'de'
            ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
            : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
        </p>
      </div>
    </div>
  );
}

function DatenschutzContent({ lang }: { lang: 'de' | 'en' }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={28} />
          <h1 className="text-2xl font-bold">
            {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </h1>
        </div>
        <p className="text-indigo-200 text-sm">
          {lang === 'de'
            ? 'Gemäß Art. 13, 14 DSGVO (Datenschutz-Grundverordnung)'
            : 'In accordance with Art. 13, 14 GDPR (General Data Protection Regulation)'}
        </p>
      </div>

      {/* Overview */}
      <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? 'Überblick' : 'Overview'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Erhebung und Verwendung Ihrer Daten durch unsere App „Einbürger Coach", betrieben von D TechFarm UG (haftungsbeschränkt).'
            : 'The protection of your personal data is important to us. This privacy policy informs you about the type, scope, and purpose of the collection and use of your data by our app "Einbürger Coach", operated by D TechFarm UG (haftungsbeschränkt).'}
        </p>
      </div>

      {/* Responsible Party */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '1. Verantwortlicher' : '1. Data Controller'}
        </h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-semibold">D TechFarm UG (haftungsbeschränkt)</p>
          <p>E-Mail: info@dtechfarm.com</p>
          <p>Web: <a href="https://www.dtechfarm.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">www.dtechfarm.com</a></p>
        </div>
      </div>

      {/* Data Collection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '2. Erhobene Daten' : '2. Data Collected'}
        </h2>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {lang === 'de' ? 'a) Lokale Daten (ohne Konto)' : 'a) Local Data (without account)'}
            </h3>
            <p className="mb-2">
              {lang === 'de'
                ? 'Wenn Sie die App ohne Benutzerkonto verwenden, werden Ihre Daten ausschließlich lokal in Ihrem Browser (localStorage) gespeichert. Wir haben keinen Zugriff auf diese Daten. Dazu gehören:'
                : 'When using the app without a user account, your data is stored exclusively locally in your browser (localStorage). We have no access to this data. This includes:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{lang === 'de' ? 'Lernfortschritt und Statistiken' : 'Learning progress and statistics'}</li>
              <li>{lang === 'de' ? 'Quiz-Ergebnisse' : 'Quiz results'}</li>
              <li>{lang === 'de' ? 'Einstellungen und Präferenzen' : 'Settings and preferences'}</li>
              <li>{lang === 'de' ? 'Vokabel-Fortschritt' : 'Vocabulary progress'}</li>
              <li>{lang === 'de' ? 'Errungenschaften (Badges)' : 'Achievements (badges)'}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {lang === 'de' ? 'b) Kontodaten (mit Registrierung)' : 'b) Account Data (with registration)'}
            </h3>
            <p className="mb-2">
              {lang === 'de'
                ? 'Wenn Sie ein Konto erstellen, erheben wir folgende Daten zur Bereitstellung des Cloud-Sync-Dienstes:'
                : 'When you create an account, we collect the following data to provide the cloud sync service:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{lang === 'de' ? 'E-Mail-Adresse' : 'Email address'}</li>
              <li>{lang === 'de' ? 'Anzeigename' : 'Display name'}</li>
              <li>{lang === 'de' ? 'Profilbild (bei Google-Anmeldung)' : 'Profile picture (for Google sign-in)'}</li>
              <li>{lang === 'de' ? 'Lernfortschritt (für geräteübergreifende Synchronisation)' : 'Learning progress (for cross-device sync)'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Firebase / Google */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '3. Dienste Dritter' : '3. Third-Party Services'}
        </h2>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {lang === 'de' ? 'a) Firebase (Google LLC)' : 'a) Firebase (Google LLC)'}
            </h3>
            <p>
              {lang === 'de'
                ? 'Wir nutzen Firebase von Google LLC für Authentifizierung und Datenspeicherung. Wenn Sie ein Konto erstellen, werden Ihre Daten auf Firebase-Servern gespeichert. Firebase unterliegt den Datenschutzbestimmungen von Google und ist EU-DSGVO-konform. Weitere Informationen:'
                : 'We use Firebase by Google LLC for authentication and data storage. When you create an account, your data is stored on Firebase servers. Firebase is subject to Google\'s privacy policy and is EU-GDPR compliant. More information:'}
            </p>
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline mt-1 inline-block"
            >
              Firebase Privacy Policy
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {lang === 'de' ? 'b) Vercel (Hosting)' : 'b) Vercel (Hosting)'}
            </h3>
            <p>
              {lang === 'de'
                ? 'Unsere Webseite wird über Vercel Inc. gehostet. Bei jedem Zugriff werden automatisch Server-Logdaten erfasst (IP-Adresse, Zeitpunkt, Browsertyp). Diese Daten werden zur Sicherstellung des Betriebs verwendet und nicht mit anderen Daten zusammengeführt.'
                : 'Our website is hosted by Vercel Inc. Server log data is automatically collected with each access (IP address, timestamp, browser type). This data is used to ensure operation and is not merged with other data.'}
            </p>
          </div>
        </div>
      </div>

      {/* Cookies */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '4. Cookies & localStorage' : '4. Cookies & localStorage'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Diese App verwendet keine Tracking-Cookies. Wir nutzen localStorage zur lokalen Speicherung Ihres Lernfortschritts. Dies sind technisch notwendige Speicherungen gemäß § 25 TTDSG, die keiner Einwilligung bedürfen. Firebase-Authentifizierung verwendet technisch notwendige Cookies zur Aufrechterhaltung der Sitzung.'
            : 'This app does not use tracking cookies. We use localStorage for local storage of your learning progress. These are technically necessary storage operations pursuant to § 25 TTDSG, which do not require consent. Firebase authentication uses technically necessary cookies to maintain the session.'}
        </p>
      </div>

      {/* Your Rights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '5. Ihre Rechte (DSGVO Art. 15–21)' : '5. Your Rights (GDPR Art. 15–21)'}
        </h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          <p className="mb-3">
            {lang === 'de'
              ? 'Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:'
              : 'You have the following rights regarding your personal data:'}
          </p>
          <ul className="space-y-2">
            {[
              lang === 'de' ? 'Recht auf Auskunft (Art. 15 DSGVO)' : 'Right of access (Art. 15 GDPR)',
              lang === 'de' ? 'Recht auf Berichtigung (Art. 16 DSGVO)' : 'Right to rectification (Art. 16 GDPR)',
              lang === 'de' ? 'Recht auf Löschung (Art. 17 DSGVO)' : 'Right to erasure (Art. 17 GDPR)',
              lang === 'de' ? 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)' : 'Right to restriction of processing (Art. 18 GDPR)',
              lang === 'de' ? 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)' : 'Right to data portability (Art. 20 GDPR)',
              lang === 'de' ? 'Recht auf Widerspruch (Art. 21 DSGVO)' : 'Right to object (Art. 21 GDPR)',
            ].map((right, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{right}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            {lang === 'de'
              ? 'Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter: info@dtechfarm.com'
              : 'To exercise your rights, contact us at: info@dtechfarm.com'}
          </p>
        </div>
      </div>

      {/* Data Export & Deletion */}
      <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-blue-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '6. Datenexport & Löschung' : '6. Data Export & Deletion'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Sie können Ihre Daten jederzeit unter Einstellungen → Datenverwaltung exportieren oder löschen. Bei lokaler Nutzung (ohne Konto) werden alle Daten durch Löschen des Browser-Speichers entfernt. Bei Nutzung mit Konto können Sie eine vollständige Datenlöschung bei uns beantragen.'
            : 'You can export or delete your data at any time under Settings → Data Management. For local usage (without account), all data is removed by clearing browser storage. For account usage, you can request complete data deletion from us.'}
        </p>
      </div>

      {/* Data Security */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '7. Datensicherheit' : '7. Data Security'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder Zugriff unberechtigter Personen zu schützen. Die Übertragung erfolgt ausschließlich über verschlüsselte HTTPS-Verbindungen.'
            : 'We implement technical and organizational security measures to protect your data against manipulation, loss, destruction, or access by unauthorized persons. Data transmission occurs exclusively via encrypted HTTPS connections.'}
        </p>
      </div>

      {/* Changes */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '8. Änderungen dieser Datenschutzerklärung' : '8. Changes to This Privacy Policy'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um sie an geänderte Rechtslagen oder Änderungen unseres Dienstes anzupassen. Die aktuelle Fassung finden Sie stets in der App.'
            : 'We reserve the right to update this privacy policy to adapt it to changed legal situations or changes to our service. The current version is always available in the app.'}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          {lang === 'de' ? 'Stand: Februar 2026' : 'Last updated: February 2026'}
        </p>
      </div>

      {/* Supervisory Authority */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {lang === 'de' ? '9. Beschwerderecht bei einer Aufsichtsbehörde' : '9. Right to Complain to a Supervisory Authority'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'de'
            ? 'Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, bei einer Datenschutz-Aufsichtsbehörde Beschwerde einzulegen (Art. 77 DSGVO).'
            : 'If you believe that the processing of your personal data violates the GDPR, you have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).'}
        </p>
      </div>
    </div>
  );
}
