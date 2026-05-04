'use client';

import { useEffect, useState } from 'react';

/* ── Weather code → emoji ── */
function weatherEmoji(code: number): string {
  if (code === 0)                          return '☀️';
  if (code <= 2)                           return '🌤️';
  if (code === 3)                          return '⛅';
  if (code === 45 || code === 48)          return '🌫️';
  if (code >= 51 && code <= 57)           return '🌦️';
  if (code >= 61 && code <= 67)           return '🌧️';
  if (code >= 71 && code <= 77)           return '❄️';
  if (code >= 80 && code <= 82)           return '🌦️';
  if (code >= 95)                          return '⛈️';
  return '🌡️';
}

/* ── Manila coordinates ── */
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast' +
  '?latitude=14.5995&longitude=120.9842' +
  '&current=temperature_2m,weather_code' +
  '&timezone=Asia%2FManila';

export default function StatusWidget() {
  const [time, setTime]       = useState('');
  const [weather, setWeather] = useState<{ temp: number; emoji: string } | null>(null);
  const [ping, setPing]       = useState<number | null>(null);

  /* Clock — ticks every second */
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Weather — fetch once, refresh every 10 min */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res  = await fetch(WEATHER_URL);
        const data = await res.json();
        setWeather({
          temp:  Math.round(data.current.temperature_2m),
          emoji: weatherEmoji(data.current.weather_code),
        });
      } catch {
        /* silently fail — widget just won't show weather */
      }
    };
    fetchWeather();
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  /* Ping — measure round-trip to same origin favicon */
  useEffect(() => {
    const measurePing = async () => {
      try {
        const t0 = performance.now();
        await fetch('/favicon.ico', { cache: 'no-store', method: 'HEAD' });
        setPing(Math.round(performance.now() - t0));
      } catch {
        setPing(null);
      }
    };
    measurePing();
    const id = setInterval(measurePing, 30_000);
    return () => clearInterval(id);
  }, []);

  /* Ping quality color class */
  const pingClass =
    ping === null    ? 'status-pill--neutral'
    : ping < 80      ? 'status-pill--good'
    : ping < 200     ? 'status-pill--ok'
    : 'status-pill--bad';

  return (
    <div className="status-widget" aria-label="Live status">
      {/* Clock */}
      {time && (
        <span className="status-pill status-pill--neutral" title="Current time in Manila">
          <span className="status-pill__icon">🕐</span>
          <span className="status-pill__text">{time}</span>
        </span>
      )}

      {/* Weather */}
      {weather && (
        <span className="status-pill status-pill--neutral" title="Current weather in Manila">
          <span className="status-pill__icon">{weather.emoji}</span>
          <span className="status-pill__text">{weather.temp}°C Manila</span>
        </span>
      )}

      {/* Ping */}
      {ping !== null && (
        <span className={`status-pill ${pingClass}`} title="Your connection latency">
          <span className="status-pill__dot" />
          <span className="status-pill__text">{ping} ms</span>
        </span>
      )}
    </div>
  );
}
