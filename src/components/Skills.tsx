import React from 'react';

interface Skill {
  name: string;
  slug: string;
  color: string;
}

export const Skills: React.FC = () => {
  const track1: Skill[] = [
    { name: "C", slug: "c", color: "A8B9CC" },
    { name: "C++", slug: "cplusplus", color: "00599C" },
    { name: "CSS3", slug: "css", color: "1572B6" },
    { name: "HTML5", slug: "html5", color: "E34F26" },
    { name: "Java", slug: "openjdk", color: "ED8B00" },
    { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
    { name: "Python", slug: "python", color: "3776AB" },
    { name: "Google Cloud", slug: "googlecloud", color: "4285F4" }
  ];

  const track2: Skill[] = [
    { name: "FastAPI", slug: "fastapi", color: "05998B" },
    { name: "Express.js", slug: "express", color: "818181" },
    { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
    { name: "Node.js", slug: "nodedotjs", color: "339933" },
    { name: "React", slug: "react", color: "61DAFB" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" }
  ];

  const track3: Skill[] = [
    { name: "SQLite", slug: "sqlite", color: "003B57" },
    { name: "MySQL", slug: "mysql", color: "4479A1" },
    { name: "MongoDB", slug: "mongodb", color: "47A248" },
    { name: "Canva", slug: "canva", color: "00C4CC" },
    { name: "Figma", slug: "figma", color: "F24E1E" },
    { name: "Matplotlib", slug: "matplotlib", color: "11557C" },
    { name: "NumPy", slug: "numpy", color: "013243" }
  ];

  const track4: Skill[] = [
    { name: "Pandas", slug: "pandas", color: "150458" },
    { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
    { name: "Scikit-learn", slug: "scikitlearn", color: "F7931E" },
    { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
    { name: "Git", slug: "git", color: "F05033" },
    { name: "GitHub", slug: "github", color: "FFFFFF" }
  ];

  // Helper to double the track items for seamless loop
  const prepareTrack = (skills: Skill[]) => [...skills, ...skills];

  // Helper to get inline SVGs for non-working logos or fallback to CDN
  const renderSkillIcon = (skill: Skill) => {
    if (skill.slug === 'aws') {
      return (
        <svg className="w-4.5 h-4.5 shrink-0" fill="#FF9900" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>AWS</title>
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
        </svg>
      );
    }
    if (skill.slug === 'amazondynamodb') {
      return (
        <svg className="w-4.5 h-4.5 shrink-0" fill="#4053D6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Amazon DynamoDB</title>
          <path d="M16.606 20.705v-2.371c-1.263 1.082-3.884 1.795-7.066 1.795-3.184 0-5.805-.714-7.068-1.797v2.369c0 1.168 2.903 2.47 7.068 2.47 4.16 0 7.06-1.3 7.066-2.466zm.001-6.765l.817-.005v.005c0 .517-.258.998-.75 1.441.601.54.75 1.071.75 1.449a1661.7 1661.7 0 0 0 0 3.87c0 1.881-3.389 3.3-7.884 3.3-4.471 0-7.846-1.404-7.88-3.27a583.119 583.119 0 0 1-.003-3.909c.001-.375.15-.9.745-1.437-.592-.538-.743-1.062-.746-1.435v-3.892c.002-.377.153-.903.747-1.438-.593-.54-.744-1.062-.747-1.435 0-1.357-.002-2.735.002-3.897C1.674 1.412 5.056 0 9.54 0c2.159 0 4.233.356 5.689.974l-.315.766c-1.36-.58-3.319-.91-5.374-.91-4.165 0-7.067 1.3-7.067 2.47 0 1.168 2.902 2.47 7.067 2.47.115 0 .222 0 .334-.005l.033.828c-.122.006-.245.006-.367.006-3.184 0-5.805-.714-7.068-1.798v2.38c.005.45.45.843.821 1.093 1.116.736 3.114 1.239 5.34 1.342l-.037.829c-2.254-.105-4.23-.59-5.5-1.332-.318.245-.623.573-.623.952 0 1.168 2.902 2.47 7.067 2.47.411 0 .812-.014 1.203-.042l.06.826c-.41.03-.833.045-1.263.045-3.184 0-5.805-.713-7.068-1.797v2.368c.005.462.449.855.821 1.104 1.275.842 3.67 1.366 6.247 1.366h.182v.83H9.54c-2.62 0-4.99-.507-6.444-1.359-.317.245-.623.574-.623.954 0 1.168 2.902 2.47 7.067 2.47 4.159 0 7.058-1.298 7.066-2.465v-.007c0-.377-.303-.705-.62-.948a5.732 5.732 0 0 1-.662.336l-.316-.764c.3-.128.56-.266.776-.412.376-.254.823-.651.823-1.1zm4.377-6.915h-2.717a.406.406 0 0 1-.332-.173.42.42 0 0 1-.055-.375l1.204-3.597h-5.403l-2.583 4.974h2.623c.128 0 .248.06.325.164a.418.418 0 0 1 .069.36l-2.249 8.365zm1.249-.128l-10.89 11.608a.408.408 0 0 1-.498.075.418.418 0 0 1-.192-.471l2.534-9.426h-2.766a.407.407 0 0 1-.349-.2.418.418 0 0 1-.012-.407l3.014-5.804a.408.408 0 0 1 .36-.222h6.22c.132 0 .256.065.332.174a.422.422 0 0 1 .055.374l-1.204 3.598h3.1c.164 0 .31.099.375.251a.422.422 0 0 1-.08.45zM3.085 20.723a8.107 8.107 0 0 0 1.72.72l.233-.794a7.32 7.32 0 0 1-1.546-.645zm1.72-5.984l.233-.795a7.262 7.262 0 0 1-1.546-.646l-.407.72a8.051 8.051 0 0 0 1.72.72zm-1.72-7.427l.407-.719c.418.244.939.462 1.546.646l-.232.794a8.046 8.046 0 0 1-1.72-.72Z"/>
        </svg>
      );
    }
    if (skill.slug === 'powerbi') {
      return (
        <svg className="w-4.5 h-4.5 shrink-0" fill="#F2C811" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Power BI</title>
          <path d="M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z"/>
        </svg>
      );
    }
    if (skill.slug === 'canva') {
      return (
        <svg className="w-4.5 h-4.5 shrink-0" fill="#00C4CC" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Canva</title>
          <path d="M12.4 20.3c-.9 0-1.8-.1-2.5-.4-1-.3-1.8-.9-2.5-1.7-.7-.8-1.2-1.8-1.6-2.9-.4-1.2-.5-2.5-.5-3.9 0-1.5.2-2.8.6-4 .4-1.1.9-2.1 1.6-2.9.7-.8 1.5-1.4 2.5-1.8.9-.3 1.8-.5 2.8-.5.8 0 1.6.1 2.3.3.7.2 1.3.5 1.9.9l-.7 1.3c-.5-.3-1-.5-1.5-.7-.5-.1-1.1-.2-1.7-.2-.8 0-1.5.1-2.2.4-.7.3-1.3.7-1.8 1.3-.5.6-.9 1.4-1.2 2.3-.3 1-.4 2-.4 3.1 0 1.2.1 2.2.4 3.1.3 1 .7 1.7 1.2 2.3.5.6 1.1 1.1 1.8 1.4.7.3 1.4.4 2.2.4.6 0 1.2-.1 1.7-.2.5-.1 1.1-.3 1.6-.7l.7 1.3c-.6.4-1.2.7-1.9.9-.7.2-1.5.3-2.3.3z" />
        </svg>
      );
    }
    if (skill.slug === 'matplotlib') {
      return (
        <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="#11557C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <title>Matplotlib</title>
          <path d="M3 3v18h18" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          <circle cx="7" cy="14.3" r="1.5" fill="#11557C" stroke="none" />
          <circle cx="10.8" cy="10.5" r="1.5" fill="#11557C" stroke="none" />
          <circle cx="13.6" cy="13.2" r="1.5" fill="#11557C" stroke="none" />
          <circle cx="18.7" cy="8" r="1.5" fill="#11557C" stroke="none" />
        </svg>
      );
    }
    return (
      <img 
        src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} 
        alt={skill.name} 
        className="w-4.5 h-4.5 object-contain shrink-0"
        loading="lazy"
      />
    );
  };

  return (
    <section id="skills" className="w-full relative py-20 md:py-28 overflow-hidden bg-brand-bg border-t border-brand-border/40">
      {/* Edge fade overlay gradients matching theme background */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none z-10"></div>

      <div className="w-full relative z-10">
        {/* Title Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-wide uppercase">
            My Skills
          </h2>
          <div className="h-1 w-16 bg-brand-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Marquee Rows - Full Bleed Edge to Edge */}
        <div className="space-y-6 md:space-y-8 w-full">
          {/* Row 1 - Left */}
          <div className="flex overflow-hidden select-none gap-4 py-1">
            <div className="animate-marquee flex gap-4 shrink-0">
              {prepareTrack(track1).map((skill, idx) => (
                <div 
                  key={`t1-${idx}`} 
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-all duration-300 shadow-sm cursor-default"
                >
                  {renderSkillIcon(skill)}
                  <span className="text-xs md:text-sm font-semibold text-brand-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right */}
          <div className="flex overflow-hidden select-none gap-4 py-1">
            <div className="animate-marquee-reverse flex gap-4 shrink-0">
              {prepareTrack(track2).map((skill, idx) => (
                <div 
                  key={`t2-${idx}`} 
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-all duration-300 shadow-sm cursor-default"
                >
                  {renderSkillIcon(skill)}
                  <span className="text-xs md:text-sm font-semibold text-brand-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Left */}
          <div className="flex overflow-hidden select-none gap-4 py-1">
            <div className="animate-marquee flex gap-4 shrink-0">
              {prepareTrack(track3).map((skill, idx) => (
                <div 
                  key={`t3-${idx}`} 
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-all duration-300 shadow-sm cursor-default"
                >
                  {renderSkillIcon(skill)}
                  <span className="text-xs md:text-sm font-semibold text-brand-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4 - Right */}
          <div className="flex overflow-hidden select-none gap-4 py-1">
            <div className="animate-marquee-reverse flex gap-4 shrink-0">
              {prepareTrack(track4).map((skill, idx) => (
                <div 
                  key={`t4-${idx}`} 
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-all duration-300 shadow-sm cursor-default"
                >
                  {renderSkillIcon(skill)}
                  <span className="text-xs md:text-sm font-semibold text-brand-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
