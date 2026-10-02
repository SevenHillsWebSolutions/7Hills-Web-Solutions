export function generateCustomerCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `7HWS-CUS-${num}`;
}

export function generateRequirementCode() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `7HWS-REQ-${year}-${num}`;
}

export function generateProjectCode() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `7HWS-PRJ-${year}-${num}`;
}

export function generateEnquiryCode() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `7HWS-ENQ-${year}-${num}`;
}
