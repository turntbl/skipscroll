'use client';

import React, { useState } from 'react';
import { SparklesIcon } from './icons';

interface ContentIdea {
  format: string;
  idea: string;
  hook: string;
  platform: string;
}

const contentFormats = {
  tiktok: ['15s Reel', '30s Reel', '60s Reel', 'Series', 'Duet/Stitch'],
  instagram: ['Reel', 'Carousel', 'Single Post', 'Story Series'],
  youtube: ['Short', 'Tutorial', 'Vlog', 'Commentary'],
  twitter: ['Thread', 'Poll', 'Hot Take', 'Meme'],
  reddit: ['Discussion Post', 'AMA', 'Guide', 'Question'],
};

const contentFrameworks = [
  {
    template: '5 Things You Didn\'t Know About {trend}',
    hook: 'Everyone\'s talking about {trend}, but here\'s what they\'re missing...',
    type: 'listicle'
  },
  {
    template: 'How {trend} Changed My Perspective',
    hook: 'I was skeptical about {trend} until...',
    type: 'personal-story'
  },
  {
    template: 'Trying {trend} For 7 Days',
    hook: 'I tested {trend} so you don\'t have to. Here\'s what happened...',
    type: 'challenge'
  },
  {
    template: 'The REAL Reason {trend} Is Blowing Up',
    hook: 'Everyone thinks {trend} is about X, but it\'s actually about...',
    type: 'analysis'
  },
  {
    template: '{trend} Explained in 60 Seconds',
    hook: 'Still confused about {trend}? Here\'s the breakdown...',
    type: 'explainer'
  },
  {
    template: 'Unpopular Opinion: {trend}',
    hook: 'I\'m about to say something controversial about {trend}...',
    type: 'hot-take'
  },
  {
    template: 'How to Use {trend} to [Achieve Goal]',
    hook: 'Here\'s how I used {trend} to grow my following by 10K...',
    type: 'tutorial'
  },
  {
    template: '{trend} vs Reality',
    hook: 'What they show you about {trend} vs what actually happens...',
    type: 'comparison'
  },
  {
    template: 'Behind the Scenes of {trend}',
    hook: 'You won\'t believe what goes into creating {trend} content...',
    type: 'bts'
  },
  {
    template: 'Why {trend} Won\'t Last (Or Will It?)',
    hook: 'Everyone\'s jumping on {trend}, but is it sustainable?',
    type: 'prediction'
  },
];

const platformSpecificAngles: Record<string, string[]> = {
  tiktok: [
    'Use trending sound with your unique twist',
    'Create a duet responding to the trend',
    'Show before/after transformation',
    'POV: You\'re experiencing this trend',
    'Stitch with your expert take'
  ],
  instagram: [
    'Carousel breaking down the trend step-by-step',
    'Reel showing the trend in action',
    'Story poll asking followers\' opinions',
    'Behind-the-scenes of you creating trend content',
    'Collab post with someone in the trend niche'
  ],
  youtube: [
    'Long-form deep dive analysis',
    'Shorts compilation of trend moments',
    'Tutorial on how to participate',
    'Reaction/commentary video',
    'Interview someone at the center of the trend'
  ],
  reddit: [
    'Start a discussion thread with thought-provoking question',
    'Share your unique experience with the trend',
    'Create a comprehensive guide/resource',
    'Ask for others\' perspectives (AMA style)',
    'Share data/analysis you\'ve gathered'
  ],
  twitter: [
    'Create a viral thread breaking it down',
    'Hot take that sparks conversation',
    'Poll to gauge community sentiment',
    'Humorous meme perspective',
    'Quick tips in a tweetstorm'
  ],
};

export function ContentIdeaGenerator() {
  const [trendInput, setTrendInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateIdeas = () => {
    if (!trendInput.trim()) return;

    setIsGenerating(true);

    // Simulate generation delay for better UX
    setTimeout(() => {
      const trendName = trendInput.trim().replace(/^#/, '');
      const generatedIdeas: ContentIdea[] = [];

      // Determine which platforms to generate for
      const platforms = selectedPlatform === 'all'
        ? ['tiktok', 'instagram', 'youtube', 'twitter', 'reddit']
        : [selectedPlatform];

      // Generate 2 ideas per platform
      platforms.forEach(platform => {
        // Randomly select frameworks
        const shuffledFrameworks = [...contentFrameworks].sort(() => Math.random() - 0.5);
        const selectedFrameworks = shuffledFrameworks.slice(0, 2);

        selectedFrameworks.forEach((framework, index) => {
          const formats = contentFormats[platform as keyof typeof contentFormats] || ['Post'];
          const format = formats[Math.floor(Math.random() * formats.length)];

          const idea = framework.template.replace(/{trend}/g, trendName);
          const hook = framework.hook.replace(/{trend}/g, trendName);

          // Add platform-specific angle
          const angles = platformSpecificAngles[platform] || [];
          const angle = angles[Math.floor(Math.random() * angles.length)];

          generatedIdeas.push({
            format,
            idea: `${idea}${angle ? ' - ' + angle : ''}`,
            hook,
            platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          });
        });
      });

      setIdeas(generatedIdeas);
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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            Turn any trend into 10+ content ideas instantly. Beat writer's block and stay ahead of the algorithm.
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
              placeholder="e.g., BookTok, AI art, productivity hacks..."
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
            {isGenerating ? 'Generating Ideas...' : '✨ Generate Content Ideas'}
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
              {ideas.length} Content Ideas for "{trendInput.replace(/^#/, '')}"
            </h3>
            <div style={{
              display: 'grid',
              gap: '16px',
            }}>
              {ideas.map((idea, index) => (
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
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Hook: "{idea.hook}"
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                margin: 0
              }}>
                💡 <strong>Pro tip:</strong> Test 2-3 of these ideas and double down on what performs best.
                Use our trend tracker below to find more trending topics.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
