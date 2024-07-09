import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'AI Flavoured';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '28rem',
            height: '20rem',
            border: '1px solid',
            margin: '5px',
            borderRadius: '0.75rem',
            transform: 'rotate(-6deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            boxShadow: '0 0 50px 1px gray',
            backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          }}
        >
          <h1
            style={{
              fontSize: '4.375rem',
              transform: 'rotate(6deg)',
              whiteSpace: 'nowrap',
              padding: '0.5rem',
              backgroundImage:
                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              fontFamily: 'Arial, sans-serif', // Use a web-safe font
            }}
          >
            AI Flavoured
          </h1>
        </div>
        <div
          style={{
            borderRight: '2px solid',
            height: '75%',
            marginRight: '20px',
            transform: 'rotate(6deg)',
            boxShadow: '0 0 10px #ff1493, 0 0 20px #ff1493',
            color: 'white',
            marginLeft: '80px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '20px',
            justifyContent: 'center',
            width: '50%',
            height: '100%',
          }}
        >
          <h1
            style={{
              backgroundColor: '#d1d5db',
              height: '2.5rem',
              borderRadius: '1.5rem',
              width: '20rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
            }}
          >
            <a href="https://www.aiflavoured.com" style={{ textDecoration: 'none', color: 'black' }}>
              www.aiflavoured.com
            </a>
          </h1>
          <h1
            style={{
              width: '35rem',
              fontWeight: 'bold',
              fontSize: '1.875rem',
              marginTop: '5rem',
              letterSpacing: '0.05em',
              lineHeight: '1.3',
              color: 'white',
            }}
          >
            AI Flavoured | AI Image Generation, AI Presentations, AI Audio
            Creation, and AI PDF Summarization
          </h1>
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '1rem',
              marginTop: '5rem',
              width: '18rem',
              borderRadius: '9999px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '1px 5px 20px 0.5px gray',
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
