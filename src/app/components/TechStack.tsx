const STACK = [
  {
    label: 'Embedded & Hardware',
    tags: ['ESP32','Arduino','C / C++','Arduino IDE','IoT Automation','Sensors','Relays'],
  },
  {
    label: 'Web & Database',
    tags: ['PHP','MySQL','HTML','CSS','JavaScript','C++','XAMPP'],
  },
  {
    label: 'AI & Integration',
    tags: ['AI Chatbot Development','Prompt Engineering','API Integration'],
  },
  {
    label: 'Tools & Platforms',
    tags: ['Git','GitHub','Vercel','React Native','Tailwind','Expo','AWS Lambda','AWS S3'],
  },
];

export default function TechStack() {
  return (
    <section className="section reveal" id="stack">
      <div className="section__hdr">
        <h2 className="section__title">Tech Stack</h2>
      </div>
      <div className="stack-grid">
        {STACK.map(group => (
          <div className="stack-group" key={group.label}>
            <h3 className="stack-group__label">{group.label}</h3>
            <div className="tag-list">
              {group.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
