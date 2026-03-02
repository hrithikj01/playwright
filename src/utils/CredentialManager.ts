import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../data/credentials.json');

// Simple file lock mechanism
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function acquireCredential() {
  while (true) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const index = data.findIndex((c: any) => !c.inUse);

    if (index !== -1) {
      data[index].inUse = true;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return { ...data[index], index };
    }
    
    // No credential free → wait and retry
    await wait(500);
  }
}

export function releaseCredential(index: number) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data[index].inUse = false;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}