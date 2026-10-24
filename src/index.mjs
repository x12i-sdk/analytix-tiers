import assert from 'node:assert/strict';
import { TierEngine } from '@x12i/analytix-tiers';
const timestamp = '2026-01-01T00:00:00.000Z';
const common = { _catalogId: 'fixture', id: 'fixture', version: 1, status: 'active', title: 'Example',
  createdAt: timestamp, updatedAt: timestamp, createdBy: 'example', updatedBy: 'example', metadata: {},
};
function analyticResult(id, data) { return { analyticId: id, analyticType: 'query', version: 1, status: 'active', data,
  meta: { cache: { hit: false, key: 'fixture' }, probes: [], execution: { durationMs: 0, startedAt: timestamp, finishedAt: timestamp, traceId: 'fixture-trace' } },
}; }
const definition = { ...common, tierId: 'fixture-tier', levels: [{ level: 1, analytics: ['base'] }, { level: 2, analytics: ['summary'] }],
  materialization: { enabled: true, storeIntermediateOutputs: true, reuseWithinRun: true },
};
const order = TierEngine.compileTierDag(definition, id => id === 'summary' ? ['base'] : []);
assert.deepEqual(order, ['base', 'summary']);
const materialized = new Map();
const calls = [];
const runner = async id => { calls.push(id); return id === 'base' ? 3 : 6; };
await TierEngine.executeTier(definition, order, runner, materialized);
const repeat = await TierEngine.executeTier(definition, order, runner, materialized);
assert.deepEqual(calls, ['base', 'summary']);
assert.equal(repeat.summary, 6);
console.log({ order, repeat, calls });
