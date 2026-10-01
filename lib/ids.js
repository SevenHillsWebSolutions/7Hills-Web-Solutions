import getDb from './db.js';

export function generateCustomerCode() {
  const db = getDb();
  const latest = db.prepare('SELECT customer_code FROM customers ORDER BY id DESC LIMIT 1').get();
  let nextNum = 1;
  if (latest && latest.customer_code) {
    const match = latest.customer_code.match(/(\d+)$/);
    if (match) {
      nextNum = parseInt(match[1], 10) + 1;
    }
  }
  return `7HWS-CUS-${String(nextNum).padStart(4, '0')}`;
}

export function generateRequirementCode() {
  const db = getDb();
  const year = new Date().getFullYear();
  const latest = db.prepare('SELECT requirement_code FROM requirements ORDER BY id DESC LIMIT 1').get();
  let nextNum = 1;
  if (latest && latest.requirement_code) {
    const match = latest.requirement_code.match(/(\d+)$/);
    if (match) {
      nextNum = parseInt(match[1], 10) + 1;
    }
  }
  return `7HWS-REQ-${year}-${String(nextNum).padStart(4, '0')}`;
}

export function generateProjectCode() {
  const db = getDb();
  const year = new Date().getFullYear();
  const latest = db.prepare('SELECT project_code FROM projects ORDER BY id DESC LIMIT 1').get();
  let nextNum = 1;
  if (latest && latest.project_code) {
    const match = latest.project_code.match(/(\d+)$/);
    if (match) {
      nextNum = parseInt(match[1], 10) + 1;
    }
  }
  return `7HWS-PRJ-${year}-${String(nextNum).padStart(4, '0')}`;
}

export function generateEnquiryCode() {
  const db = getDb();
  const year = new Date().getFullYear();
  const latest = db.prepare('SELECT enquiry_code FROM enquiries ORDER BY id DESC LIMIT 1').get();
  let nextNum = 1;
  if (latest && latest.enquiry_code) {
    const match = latest.enquiry_code.match(/(\d+)$/);
    if (match) {
      nextNum = parseInt(match[1], 10) + 1;
    }
  }
  return `7HWS-ENQ-${year}-${String(nextNum).padStart(4, '0')}`;
}
