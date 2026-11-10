// Kryptonite UI: a fast ~40 s promo for Reddit. 16:9, dark, Kryptonite green.
// Screenshots are real captures of https://kryptonite-ui.vercel.app (2880x1800).
const CAP = 'assets/capture/kryptonite-ui.vercel.app';

export default {
  hook(s) {
    const { cx, top, h } = s.safe;
    s.image('assets/logo.png', { x: cx, y: top + h * 0.3, w: 230, frame: 'none', shadow: false, enter: 'pop', at: -1 });
    s.title('Kryptonite UI', { y: top + h * 0.56, size: 132, at: 'meet' });
    s.subtitle('Flashy React components, ready to drop in', { y: top + h * 0.72, size: 46, at: '#flashy' });
    s.burst({ x: cx, y: top + h * 0.3, at: 'meet', count: 22, colors: ['accent', '#2de2e6', '#ffffff'] });
  },

  count(s) {
    const { left, top, w, h } = s.safe;
    const lx = left + w * 0.27;
    s.number(86, { x: lx, y: top + h * 0.38, size: 260, color: 'accent', from: 0, dur: 1.1, at: '#count' });
    s.text('components', { x: lx, y: top + h * 0.6, size: 52, at: '#count' });
    s.note('free · open source · MIT', { x: lx, y: top + h * 0.72, size: 34, at: 'free' });
    s.terminal(
      [
        '$ copy ShimmerButton.tsx',
        { out: '✓ pasted into components/', color: 'accent' },
        '$ npm run dev',
        { out: '✓ shipped', color: 'accent' },
      ],
      { x: left + w * 0.72, y: top + h * 0.48, w: 760, size: 34, title: 'your-app', cps: 40, at: '#copy' },
    );
  },

  home(s) {
    const { left, top, w, h } = s.safe;
    const img = s.image(`${CAP}/home/page.png`, {
      x: left + 520,
      y: top + h * 0.47,
      w: 1020,
      frame: 'browser',
      url: 'kryptonite-ui.vercel.app',
      kenburns: false,
      at: '#home',
    });
    s.list(
      [
        { text: 'shadcn/ui', at: '#home', icon: 'layers' },
        { text: 'Base UI', at: '#base', icon: 'box' },
        { text: 'Tailwind CSS', at: '#tailwind', icon: 'wind' },
        { text: 'Dark + light', at: 'dark', icon: 'sun-moon' },
      ],
      { x: left + w - 300, y: top + h * 0.47, size: 40, width: 420, bullet: 'check', gap: 30, enter: 'slide-left' },
    );
  },

  flashy(s) {
    const { left, top, w, h } = s.safe;
    s.title('The fun stuff', { y: top + 60, size: 70, at: '#fun' });
    // 3D Activity Terrain card, cropped out of its docs page
    const t = s.image(`${CAP}/terrain/page.png`, {
      x: left + w * 0.27,
      y: top + h * 0.56,
      w: 820,
      crop: [1080, 821, 1371, 762],
      frame: 'card',
      enter: 'pop',
      at: '#terrain',
    });
    s.note('3D Activity Terrain', { x: t.x, y: t.bottom + 34, size: 30, at: '#terrain' });
    // AI chat input
    const a = s.image(`${CAP}/aiinput/page.png`, {
      x: left + w * 0.76,
      y: top + h * 0.34,
      w: 760,
      crop: [1077, 880, 1374, 300],
      frame: 'card',
      enter: 'slide-left',
      at: '#ai',
    });
    s.note('AI chat input', { x: a.x, y: a.bottom + 30, size: 30, at: '#ai' });
    // Buttons with loading states
    const b = s.image(`${CAP}/docs/page.png`, {
      x: left + w * 0.76,
      y: top + h * 0.72,
      w: 760,
      crop: [1023, 960, 1488, 240],
      frame: 'card',
      enter: 'slide-left',
      at: '#states',
    });
    s.note('Buttons that handle loading', { x: b.x, y: b.bottom + 30, size: 30, at: '#states' });
  },

  docs(s) {
    const { left, top, w, h } = s.safe;
    const img = s.image(`${CAP}/terrain/page.png`, {
      x: left + 520,
      y: top + h * 0.47,
      w: 1020,
      frame: 'browser',
      url: 'kryptonite-ui.vercel.app/docs',
      kenburns: false,
      at: '#docs',
    });
    s.list(
      [
        { text: 'Live preview', at: '#docs', icon: 'play' },
        { text: 'Full code', at: '#code', icon: 'code' },
        { text: 'Install steps', at: '#install', icon: 'terminal' },
      ],
      { x: left + w - 300, y: top + h * 0.47, size: 40, width: 420, bullet: 'check', gap: 36, enter: 'slide-left' },
    );
  },

  community(s) {
    const { left, top, w, h } = s.safe;
    s.title('Missing something?', { x: left + w * 0.3, y: top + h * 0.38, size: 84, at: '#missing' });
    s.subtitle('Request it in the community', { x: left + w * 0.3, y: top + h * 0.54, size: 44, at: '#ask' });
    const card = s.box('Make a Kanban board', {
      id: 'req',
      x: left + w * 0.74,
      y: top + h * 0.42,
      size: 40,
      icon: 'message-square',
      enter: 'pop',
      at: '#ask',
    });
    s.box('▲ 128 upvotes', { x: card.x, y: card.bottom + 70, size: 38, color: 'accent', enter: 'pop', at: 'upvote' });
    s.sfx('ding', 'upvote');
  },

  outro(s) {
    const { cx, top, h } = s.safe;
    s.image('assets/logo.png', { x: cx, y: top + h * 0.28, w: 200, frame: 'none', shadow: false, enter: 'pop', at: '#brand' });
    s.title('Kryptonite UI', { y: top + h * 0.52, size: 120, at: '#brand' });
    s.text('kryptonite-ui.vercel.app', { y: top + h * 0.7, size: 58, color: 'accent', font: 'mono', at: '#url' });
    s.note('free · open source · React + Tailwind', { y: top + h * 0.84, size: 32, at: '#url' });
  },
};
