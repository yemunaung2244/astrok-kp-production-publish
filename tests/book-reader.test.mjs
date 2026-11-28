import test from 'node:test';
import assert from 'node:assert/strict';
import { bookPdfUrl } from '../src/systems/book-reader.js';

const gateway = 'https://gateway.example';
const path = '/storage/v1/object/sign/astrok-books/Example%20book.pdf';

test('reader preserves the private PDF signature and routes the file through the AstroK gateway', () => {
  const signed = `https://ntiyedmlflgzqtjppgxu.supabase.co${path}?token=abc.def&download=Example.pdf`;
  assert.equal(bookPdfUrl(signed, gateway), `${gateway}${path}?token=abc.def`);
  assert.equal(bookPdfUrl(`${gateway}${path}?token=abc.def`, gateway), `${gateway}${path}?token=abc.def`);
});

test('reader refuses unknown hosts, other buckets, and URLs with credentials', () => {
  for (const url of [
    `https://unknown.example${path}?token=test`,
    `${gateway}/storage/v1/object/sign/other-bucket/Example.pdf?token=test`,
    `https://name:password@gateway.example${path}?token=test`,
  ]) {
    assert.throws(() => bookPdfUrl(url, gateway), /Invalid book URL/);
  }
});
