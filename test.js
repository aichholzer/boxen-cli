import test from 'ava';
import execa from 'execa';

const fixtureDefault = `
┌─┐
│a│
└─┘
`.trim();

const fixtureCenteredText = `
┌───────┐
│       │
│   a   │
│       │
└───────┘
`.trim();

let padSize = Math.ceil((process.stdout.columns - 5) / 2);
let padding = new Array(padSize).join(' ');
const fixtureFloatCenter = `${padding}┌──────┐
${padding}│center│
${padding}└──────┘`;

padSize = Math.max(process.stdout.columns - 6, 0);
padding = new Array(padSize).join(' ');
const fixtureFloatRight = `${padding}┌─────┐
${padding}│right│
${padding}└─────┘`;

const fixtureMargin = `
   ┌─┐
   │a│
   └─┘
`;

const fixtureDouble = `
╔═╗
║a║
╚═╝
`.trim();

const fixtureCustom = `
152
6a6
354
`.trim();

test('main', async t => {
	t.is(await execa.stdout('./cli.js', ['a']), fixtureDefault);
});

test('stdin', async t => {
	t.is(await execa.stdout('./cli.js', {input: 'a'}), fixtureDefault);
});

test('option `--align` center', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--align', 'center', '--padding', '1']), fixtureCenteredText);
});

test('option `--float` center', async t => {
	const opts = {env: {STDOUT_COLUMNS: process.stdout.columns}};
	t.is(await execa.stdout('./cli.js', ['center', '--float', 'center'], opts), fixtureFloatCenter);
});

test('option `--float` right', async t => {
	const opts = {env: {STDOUT_COLUMNS: process.stdout.columns}};
	t.is(await execa.stdout('./cli.js', ['right', '--float', 'right'], opts), fixtureFloatRight);
});

test('option `--margin`', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--margin', '1']), fixtureMargin);
});

test('option `--border-style` - named', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=double']), fixtureDouble);
});

test('option `--border-style` - custom', async t => {
	t.is(await execa.stdout('./cli.js', ['a', '--border-style=123456']), fixtureCustom);
});
