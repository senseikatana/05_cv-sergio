import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SEED_MD = resolve(import.meta.dirname, '../data/seed.md');
const SEED_JSON = resolve(import.meta.dirname, '../data/seed.json');

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function coerce(val: string): JsonValue {
  const t = val.trim();
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (t === 'null') return null;
  if (/^\d+$/.test(t)) return Number(t);
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  // inline JSON array: e.g. ["Power BI", "SQL", "Automatización"]
  if (t.startsWith('[') && t.endsWith(']')) {
    try { return JSON.parse(t); } catch { /* fallthrough */ }
  }
  return t;
}

function parse(): Record<string, JsonValue> {
  const raw = readFileSync(SEED_MD, 'utf-8');
  const lines = raw.split('\n');

  const result: Record<string, JsonValue> = {};
  let currentSection = '';
  let currentItems: Record<string, JsonValue>[] = [];
  let currentItem: Record<string, JsonValue> = {};

  // State for grouped sections (skills with ### subsections)
  let currentGroup: Record<string, JsonValue> | null = null;

  function flushItem() {
    if (Object.keys(currentItem).length > 0) {
      // If we're inside a group, push to group's sub-array
      if (currentGroup && currentSection === 'skills') {
        const skills = currentGroup.skills as JsonValue[] | undefined;
        if (skills) {
          (currentGroup.skills as JsonValue[]).push(currentItem);
        }
      } else {
        currentItems.push(currentItem);
      }
      currentItem = {};
    }
  }

  function flushGroup() {
    if (currentGroup) {
      currentItems.push(currentGroup);
      currentGroup = null;
    }
  }

  function flushSection() {
    flushGroup();
    flushItem();
    if (currentSection && currentItems.length > 0) {
      if (currentSection === 'hero') {
        result[currentSection] = currentItems[0];
      } else if (currentSection === 'skills') {
        // skills is array of groups
        result[currentSection] = currentItems;
      } else {
        result[currentSection] = currentItems;
      }
    }
    currentItems = [];
  }

  for (const line of lines) {
    // H2 section heading
    const sectionMatch = line.match(/^##\s+(.+)/);
    if (sectionMatch) {
      flushSection();
      currentSection = sectionMatch[1]!.trim();
      continue;
    }

    if (!currentSection) continue;

    // H3 sub-heading (for skill groups)
    const subMatch = line.match(/^###\s+(.+)/);
    if (subMatch) {
      if (currentSection === 'skills') {
        flushGroup();
        currentGroup = {
          titleI18n: subMatch[1]!.trim(),
          skills: [],
        };
      }
      continue;
    }

    // Key-value line: - key: value
    const itemMatch = line.match(/^-\s+(.+?):\s+(.*)/);
    if (itemMatch) {
      const key = itemMatch[1]!.trim();
      const val = itemMatch[2] ?? '';
      // If we're in a group and the key is 'title', set it on the group
      if (currentGroup && key === 'title') {
        currentGroup.title = coerce(val);
      } else {
        currentItem[key] = coerce(val);
      }
      continue;
    }

    // Empty line flushes the current item
    if (line.trim() === '' && Object.keys(currentItem).length > 0) {
      flushItem();
    }
  }

  flushSection();

  return result;
}

const data = parse();
writeFileSync(SEED_JSON, JSON.stringify(data, null, 2) + '\n', 'utf-8');
console.log('✓ seed.json regenerated from seed.md');
