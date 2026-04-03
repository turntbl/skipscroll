'use client';

import React, { useState } from 'react';
import { SparklesIcon } from './icons';

interface ContentIdea {
  format: string;
  idea: string;
  hook: string;
  platform: string;
  outline: string[];
  example: string;
  tactics: string[];
  cta: string;
}

const contentTemplates = [
  {
    template: '5 Things You Didn\'t Know About {trend}',
    hook: 'Everyone\'s talking about {trend}, but here\'s what they\'re missing...',
    type: 'listicle',
    outline: [
      'Hook: "Most people are doing {trend} wrong..."',
      'Point #1: Lesser-known fact with quick example',
      'Point #2-4: Build momentum with surprising insights',
      'Point #5: Game-changing revelation',
      'CTA: "Which one surprised you most?"'
    ],
    example: 'If trend is "BookTok": "5 BookTok secrets publishers don\'t want you to know - #3 will change how you discover books forever"',
    tactics: [
      'Start with your strongest point to hook viewers',
      'Use on-screen text to highlight each number',
      'Keep each point to 5-10 seconds max',
      'End with a question to drive comments'
    ]
  },
  {
    template: 'I Tried {trend} For 7 Days',
    hook: 'I tested {trend} so you don\'t have to. Here\'s what happened...',
    type: 'challenge',
    outline: [
      'Day 1: Skepticism and setup',
      'Day 3: First real results (positive or negative)',
      'Day 5: The turning point',
      'Day 7: Final results and verdict',
      'Would I recommend it? (Yes/no with caveats)'
    ],
    example: 'If trend is "5AM club": Show split screen - you exhausted at 5AM vs. you energized by noon. Fast-cut through 7 days.',
    tactics: [
      'Film quick daily check-ins for authenticity',
      'Show both wins and struggles (relatability)',
      'Use B-roll to show passage of time',
      'Include measurable results (data, screenshots)'
    ]
  },
  {
    template: 'The REAL Reason {trend} Is Blowing Up',
    hook: 'Everyone thinks {trend} is about X, but it\'s actually about...',
    type: 'analysis',
    outline: [
      'Surface-level explanation (what most people think)',
      'The deeper truth (psychology/data)',
      'Why this matters for your strategy',
      'How to apply this insight',
      'What\'s next for this trend'
    ],
    example: 'If trend is "De-influencing": "It\'s not anti-consumerism—it\'s the new influencer marketing. Here\'s why brands are actually winning..."',
    tactics: [
      'Lead with contrarian angle to stop scroll',
      'Back claims with data/examples',
      'Use diagrams or text overlays for clarity',
      'Position yourself as an expert'
    ]
  },
  {
    template: '{trend} Explained in 60 Seconds',
    hook: 'Still confused about {trend}? Here\'s the simplest breakdown...',
    type: 'explainer',
    outline: [
      '0-10s: What it is in one sentence',
      '10-25s: Why it matters/why people care',
      '25-45s: How it works (step-by-step)',
      '45-55s: Common mistakes to avoid',
      '55-60s: One action step to try it'
    ],
    example: 'If trend is "Threads algorithm": Diagram showing content flow → engagement → reach. Highlight key difference from Instagram.',
    tactics: [
      'Script word-for-word to nail 60s timing',
      'Use analogies for complex concepts',
      'On-screen text for key takeaways',
      'Fast-paced editing to maintain attention'
    ]
  },
  {
    template: 'Unpopular Opinion: {trend} Is Overrated/Underrated',
    hook: 'I\'m about to say something controversial about {trend}...',
    type: 'hot-take',
    outline: [
      'State your controversial opinion directly',
      'Acknowledge the popular view',
      'Present your 3 reasons why you disagree',
      'Address obvious counterarguments',
      'Invite debate in comments'
    ],
    example: 'If trend is "AI content": "AI content is NOT killing creativity—it\'s exposing lazy creators. Here\'s why that\'s a good thing..."',
    tactics: [
      'Lead with the hot take in first 3 seconds',
      'Use strong, specific language (not wishy-washy)',
      'Provide evidence, not just opinion',
      'End with "change my mind" to drive comments'
    ]
  },
  {
    template: 'How I Used {trend} to [Achieve Goal]',
    hook: 'Here\'s how {trend} helped me [specific result] in [timeframe]...',
    type: 'case-study',
    outline: [
      'The specific result (10K followers, $5K revenue, etc.)',
      'Where I started (relatable struggle)',
      'The strategy I used with {trend}',
      'What worked and what didn\'t',
      'Exact steps you can copy'
    ],
    example: 'If trend is "LinkedIn carousels": "I gained 15K followers in 60 days using this 5-slide carousel framework. Here\'s the template..."',
    tactics: [
      'Lead with the result (numbers grab attention)',
      'Show proof (screenshots, analytics)',
      'Make it actionable (template/framework)',
      'Offer free resource in comments'
    ]
  },
  {
    template: '{trend} vs Reality (Expectation vs Reality)',
    hook: 'What they show you about {trend} vs what actually happens...',
    type: 'comparison',
    outline: [
      'The Instagram version (perfect, glamorous)',
      'The reality version (messy, authentic)',
      'Why the reality is actually better/worse',
      'Tips for managing expectations',
      'The honest verdict'
    ],
    example: 'If trend is "content batching": Split screen - Left: "batch 30 Reels in 2 hours!" Right: You redoing the same take 47 times.',
    tactics: [
      'Use split-screen or before/after format',
      'Exaggerate for comedic effect',
      'End on an encouraging/helpful note',
      'Relate to viewer frustrations'
    ]
  },
  {
    template: 'Things I Wish I Knew Before Starting {trend}',
    hook: 'Don\'t make the same mistakes I did with {trend}...',
    type: 'lessons-learned',
    outline: [
      'Mistake #1: [Common beginner error]',
      'What I should have done instead',
      'Mistake #2-3: Progressive revelations',
      'The #1 thing that would\'ve saved me time/money',
      'Start here instead (action step)'
    ],
    example: 'If trend is "Notion templates": "I wasted 40 hours building templates no one wanted. Here\'s what I\'d do differently..."',
    tactics: [
      'Be specific about mistakes (builds trust)',
      'Show the cost (time, money, frustration)',
      'Provide clear alternative path',
      'Save beginners from your pain points'
    ]
  },
  {
    template: '{trend} Starter Pack (Everything You Need)',
    hook: 'Want to try {trend}? Here\'s everything you actually need...',
    type: 'resource-guide',
    outline: [
      'The essential tools/resources (not everything)',
      'Free alternatives to expensive options',
      'Common upsells you DON\'T need',
      'The one thing worth investing in',
      'Getting started checklist'
    ],
    example: 'If trend is "UGC creator": "You don\'t need a $2K camera. Here\'s my $200 setup that landed me 10 brand deals..."',
    tactics: [
      'Show actual products/tools',
      'Include price points (builds trust)',
      'Link to resources in bio/comments',
      'Focus on minimum viable setup'
    ]
  },
  {
    template: 'Reacting to {trend} Takes',
    hook: 'Let\'s react to what people are saying about {trend}...',
    type: 'reaction',
    outline: [
      'Show popular take #1 (agree or disagree)',
      'Your expert commentary on it',
      'Show controversial take #2',
      'Why they\'re right/wrong',
      'Your final take'
    ],
    example: 'If trend is "Brat summer": Green screen reactions to wild Brat summer videos. "This is camp." / "This is trying too hard."',
    tactics: [
      'Use duet/stitch feature',
      'React genuinely (facial expressions matter)',
      'Add value, don\'t just agree/disagree',
      'Tag original creators for visibility'
    ]
  }
];

const platformSpecificTactics: Record<string, {angle: string; execution: string}[]> = {
  tiktok: [
    {
      angle: 'Use trending sound with your unique twist',
      execution: 'Find sound trending in your niche (not oversaturated). Add your industry-specific spin. Example: Financial advisor using "Material Girl" sound to talk about investing.'
    },
    {
      angle: 'Create a duet responding to viral take',
      execution: 'Find viral video in your niche with comments disagreeing. Duet with your expert take. Split screen shows their take vs. your response.'
    },
    {
      angle: 'POV format from unique perspective',
      execution: 'Start with "POV:" then show scenario from unusual angle. Example: "POV: You\'re the trend that died after 3 days" - show lifecycle of viral trend.'
    },
    {
      angle: 'Storytime with text overlay',
      execution: 'Start with "This is crazy..." Show yourself talking with captions highlighting key moments. Build suspense. Reveal at end.'
    }
  ],
  instagram: [
    {
      angle: 'Carousel breaking down the trend step-by-step',
      execution: '10 slides: Slide 1 is hook (bold claim), Slides 2-9 are steps, Slide 10 is CTA. Use consistent design template. Swipe-worthy insights on each slide.'
    },
    {
      angle: 'Reel showing the trend in action',
      execution: 'B-roll of you executing the trend + voiceover explaining what you\'re doing. Fast cuts every 2-3 seconds. Add trending audio at 20-30% volume.'
    },
    {
      angle: 'Story poll series asking followers opinions',
      execution: 'Day 1: Poll "Have you tried {trend}?" Day 2-3: Share results + stories. Day 4: Create Reel based on most popular answer.'
    },
    {
      angle: 'Collab post with expert in the trend',
      execution: 'Interview format or split expertise. Both accounts share post. You bring audience, they bring authority. Both grow.'
    }
  ],
  youtube: [
    {
      angle: 'Long-form deep dive (8-15 min)',
      execution: 'Chapter 1: What is {trend}. Chapter 2: How it works. Chapter 3: My experience. Chapter 4: Should you try it? Timestamps in description.'
    },
    {
      angle: 'Shorts compilation of trend moments',
      execution: 'Create 5-10 Shorts showing different angles of trend. Compile into longer video. "Every {trend} moment explained." Great for repurposing.'
    },
    {
      angle: 'Tutorial on how to participate',
      execution: 'Screen record or show hands. Step 1, Step 2, etc. Include common mistakes section. Provide downloadable template.'
    },
    {
      angle: 'Commentary/hot take video',
      execution: 'Use green screen to show examples while you talk. Structured opinion: "Here\'s what people get wrong...Here\'s what to do instead..." End with prediction.'
    }
  ],
  twitter: [
    {
      angle: 'Thread with data and insights',
      execution: 'Tweet 1: Hook with stat. Tweets 2-8: One insight per tweet. Tweet 9: Conclusion. Tweet 10: "If you found this helpful..." Include graphs/screenshots.'
    },
    {
      angle: 'Hot take to spark conversation',
      execution: 'Bold statement about {trend}. No context (quote tweet yourself with context). Let others QT. Engage in replies. Controversy drives reach.'
    },
    {
      angle: 'Poll to gauge community sentiment',
      execution: 'Ask specific question about trend. 4 options covering spectrum. Quote tweet your own poll with analysis. Share results in follow-up thread.'
    },
    {
      angle: 'Live-tweeting your experience with trend',
      execution: 'Tweet every step as you try it. Real-time reactions. Honest failures. End with compiled thread. Authentic > polished.'
    }
  ],
  reddit: [
    {
      angle: 'Start discussion with thought-provoking question',
      execution: 'Title: "{trend}: What am I missing?" Body: Your take + genuine question. Engage with every comment. Award insightful answers. Build rep.'
    },
    {
      angle: 'Write comprehensive guide',
      execution: 'Format: TL;DR at top. Table of contents. Detailed sections. FAQs at bottom. Update post based on comments. Becomes subreddit resource.'
    },
    {
      angle: 'Share your data/analysis',
      execution: 'Title: "I analyzed 500 {trend} posts. Here\'s what I found." Tables, graphs, insights. Link to full data. Offer to answer questions.'
    },
    {
      angle: 'AMA as someone who [achieved result] with trend',
      execution: 'Title: "I made $10K using {trend}. AMA." Proof in post. Answer every question. Be humble. Provide actionable advice.'
    }
  ]
};

export function ContentIdeaGenerator() {
  const [trendInput, setTrendInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedIdeas, setExpandedIdeas] = useState<Set<number>>(new Set());

  const toggleIdea = (index: number) => {
    const newExpanded = new Set(expandedIdeas);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIdeas(newExpanded);
  };

  const generateIdeas = () => {
    if (!trendInput.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const trendName = trendInput.trim().replace(/^#/, '');
      const generatedIdeas: ContentIdea[] = [];

      const platforms = selectedPlatform === 'all'
        ? ['tiktok', 'instagram', 'youtube', 'twitter', 'reddit']
        : [selectedPlatform];

      platforms.forEach(platform => {
        const shuffledTemplates = [...contentTemplates].sort(() => Math.random() - 0.5);
        const selectedTemplates = shuffledTemplates.slice(0, 2);

        selectedTemplates.forEach(template => {
          const formats: Record<string, string[]> = {
            tiktok: ['15-30s Reel', '60s Reel', 'Series (Part 1/3)', 'Duet/Stitch'],
            instagram: ['Reel (30-60s)', '10-Slide Carousel', 'Story Series', 'Collab Post'],
            youtube: ['8-12 min Video', 'YouTube Short', '3-min Tutorial', '15-min Deep Dive'],
            twitter: ['8-Tweet Thread', 'Quote Tweet', 'Poll + Analysis', 'Live Tweet Series'],
            reddit: ['Long-Form Post', 'Discussion Thread', 'AMA Format', 'Data Analysis Post'],
          };

          const format = formats[platform]?.[Math.floor(Math.random() * formats[platform].length)] || 'Post';

          const idea = template.template.replace(/{trend}/g, trendName);
          const hook = template.hook.replace(/{trend}/g, trendName);
          const outline = template.outline.map(item => item.replace(/{trend}/g, trendName));
          const example = template.example.replace(/{trend}/g, trendName);

          const platformTactics = platformSpecificTactics[platform] || [];
          const selectedTactic = platformTactics[Math.floor(Math.random() * platformTactics.length)];

          const tactics = [
            ...template.tactics,
            selectedTactic?.angle || ''
          ].filter(Boolean);

          const ctas = [
            'Comment "saved" if you\'re trying this',
            'Share this with someone who needs to see it',
            'Which point hit hardest? Let me know below',
            'Save this for when you\'re ready to create',
            'Tag a creator who should try this',
            'Drop a 🔥 if this was helpful'
          ];
          const cta = ctas[Math.floor(Math.random() * ctas.length)];

          generatedIdeas.push({
            format,
            idea,
            hook,
            platform: platform.charAt(0).toUpperCase() + platform.slice(1),
            outline,
            example: `💡 Example: ${example}${selectedTactic ? `\n\n🎯 Tactic: ${selectedTactic.execution}` : ''}`,
            tactics,
            cta
          });
        });
      });

      setIdeas(generatedIdeas);
      setExpandedIdeas(new Set()); // Reset expanded state
      setIsGenerating(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateIdeas();
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '48px 24px',
      borderRadius: '16px',
      margin: '40px 0',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <SparklesIcon style={{ width: '32px', height: '32px', color: '#fff' }} />
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              margin: 0
            }}>
              AI Content Idea Generator
            </h2>
          </div>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Turn any trend into detailed content ideas with hooks, outlines, examples, and execution tactics.
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Enter a trending topic or hashtag
            </label>
            <input
              type="text"
              placeholder="e.g., BookTok, AI art, productivity hacks, de-influencing..."
              value={trendInput}
              onChange={(e) => setTrendInput(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Platform
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '8px'
            }}>
              {['all', 'tiktok', 'instagram', 'youtube', 'twitter', 'reddit'].map(platform => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  style={{
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: selectedPlatform === platform ? '#667eea' : '#f3f4f6',
                    color: selectedPlatform === platform ? '#fff' : '#4b5563',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPlatform !== platform) {
                      e.currentTarget.style.background = '#e5e7eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPlatform !== platform) {
                      e.currentTarget.style.background = '#f3f4f6';
                    }
                  }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateIdeas}
            disabled={!trendInput.trim() || isGenerating}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              cursor: trendInput.trim() ? 'pointer' : 'not-allowed',
              background: trendInput.trim()
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#9ca3af',
              color: '#fff',
              transition: 'transform 0.2s, opacity 0.2s',
              opacity: isGenerating ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (trendInput.trim() && !isGenerating) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isGenerating ? 'Generating Detailed Ideas...' : '✨ Generate Content Ideas'}
          </button>
        </div>

        {ideas.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {ideas.length} Detailed Content Ideas for "{trendInput.replace(/^#/, '')}"
            </h3>
            <div style={{
              display: 'grid',
              gap: '16px',
            }}>
              {ideas.map((idea, index) => {
                const isExpanded = expandedIdeas.has(index);
                return (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        background: '#667eea',
                        color: '#fff',
                      }}>
                        {idea.platform}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#6b7280',
                      }}>
                        {idea.format}
                      </span>
                    </div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>
                      {idea.idea}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      fontStyle: 'italic',
                      marginBottom: '16px',
                      lineHeight: '1.5'
                    }}>
                      🎣 Hook: "{idea.hook}"
                    </p>

                    <button
                      onClick={() => toggleIdea(index)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        background: isExpanded ? '#f3f4f6' : '#fff',
                        color: '#667eea',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#fff';
                        }
                      }}
                    >
                      {isExpanded ? '▲ Hide Details' : '▼ Show Full Outline, Examples & Tactics'}
                    </button>

                    {isExpanded && (
                      <div style={{
                        marginTop: '16px',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ marginBottom: '20px' }}>
                          <h5 style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            📋 Content Outline
                          </h5>
                          <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            fontSize: '14px',
                            lineHeight: '1.8',
                            color: '#4b5563'
                          }}>
                            {idea.outline.map((point, i) => (
                              <li key={i} style={{
                                paddingLeft: '24px',
                                position: 'relative',
                                marginBottom: '8px'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  color: '#667eea',
                                  fontWeight: '600'
                                }}>
                                  {i + 1}.
                                </span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                          <h5 style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '8px'
                          }}>
                            {idea.example}
                          </h5>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <h5 style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            ⚡ Execution Tactics
                          </h5>
                          <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '13px',
                            lineHeight: '1.7',
                            color: '#4b5563'
                          }}>
                            {idea.tactics.map((tactic, i) => (
                              <li key={i} style={{ marginBottom: '6px' }}>{tactic}</li>
                            ))}
                          </ul>
                        </div>

                        <div style={{
                          padding: '12px',
                          background: '#667eea15',
                          borderRadius: '6px',
                          borderLeft: '3px solid #667eea'
                        }}>
                          <p style={{
                            fontSize: '13px',
                            color: '#667eea',
                            fontWeight: '600',
                            margin: 0
                          }}>
                            💬 CTA: {idea.cta}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.95)',
                margin: '0 0 8px 0',
                fontWeight: '600'
              }}>
                💡 Pro Tips:
              </p>
              <ul style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
                paddingLeft: '20px',
                lineHeight: '1.7'
              }}>
                <li>Test 2-3 of these ideas and analyze which format performs best for your audience</li>
                <li>Customize the hooks to match your brand voice—these are frameworks, not scripts</li>
                <li>Combine ideas (e.g., "7-day challenge" + "expectation vs reality" format)</li>
                <li>Check trending data below to find more topics to run through this generator</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
