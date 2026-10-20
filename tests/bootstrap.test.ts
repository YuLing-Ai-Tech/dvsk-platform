import assert from 'node:assert/strict';
import test from 'node:test';
import { BOOTSTRAP_VERSION } from '../src/index.js';

void test('bootstrap remains explicitly non-executable', () => {
  assert.equal(BOOTSTRAP_VERSION, '0.0.0-private');
});
