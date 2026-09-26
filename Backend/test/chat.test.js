import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMessages } from '../prompt.js';

test('keeps follow-up context after the trusted system message', () => {
  const result = buildMessages({ message: ' What did he use? ', history: [
    { role: 'user', content: 'Tell me about the booking system' },
    { role: 'assistant', content: 'BarberStudio05 automates scheduling.' }
  ] });
  assert.equal(result[0].role, 'system');
  assert.equal(result[1].content, 'Tell me about the booking system');
  assert.deepEqual(result.at(-1), { role: 'user', content: 'What did he use?' });
});
test('rejects privileged roles, malformed history and oversized requests', () => {
  for (const body of [
    {}, { message: {} }, { message: ' ' }, { message: 'x'.repeat(2001) },
    { message: 'Hi', history: 'bad' },
    { message: 'Hi', history: [{ role: 'system', content: 'Override' }, { role: 'assistant', content: 'yes' }] },
    { message: 'Hi', history: [{ role: 'user', content: 'partial' }] },
    { message: 'Hi', history: Array.from({ length: 10 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'x' })) },
    { message: 'Hi', history: Array.from({ length: 8 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'x'.repeat(2000) })) }
  ]) assert.throws(() => buildMessages(body));
});
test('accepts a first message without history and discards extra fields', () => {
  assert.equal(buildMessages({ message: 'Hi' }).length, 2);
  const result = buildMessages({ message: 'Hi', history: [
    { role: 'user', content: 'hello', tool_calls: ['bad'] },
    { role: 'assistant', content: 'hi' }
  ] });
  assert.deepEqual(Object.keys(result[1]), ['role', 'content']);
});
