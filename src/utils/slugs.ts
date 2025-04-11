/**
 * Utility functions for handling slug-based URLs and mapping them to UUIDs
 * This helps maintain SEO-friendly URLs while working with UUIDs in the database
 */

// Known slug to UUID mappings for funding opportunities
const fundingSlugMappings: Record<string, string> = {
  'ained-programme': 'cf84493c-fdb5-41f3-9ad6-143195019ea2',
  'innovatiekrediet': '53fcb7b1-482e-4fe7-b76e-ce2723e31deb', // Innovation Credit
  'wbso-2025': '2bd9f8e2-0ea9-49ad-8f26-56c77db5654e',        // WBSO (R&D Tax Credit) - 2025
  'antler-amsterdam': 'e84bcc06-0598-4682-b9f1-b50bfdefb28b', // Antler Amsterdam
  'startup-in-residence': 'd6e603a5-8b40-4bfc-bcd9-0efbba38b247', // Startup in Residence (SiR)
  'rockstart-emerging-tech': 'ba751fbb-6116-4adb-a3af-77334bff5ece', // Rockstart Emerging Tech Track
  'lumo-labs': '9bf2f53b-0ea8-481d-8d12-087e4fcaa6fc', // LUMO Labs Pre-seed AI Fund
  'forward-incubator': 'e74cf349-d344-43fa-8a96-0acc93faa270', // Forward Incubator
  'robust-ai': 'c5584865-ca83-479b-a271-c70be7ae4aa4', // ROBUST AI Programme
  'circular-batteries': '44079245-49d7-423c-b95a-742e9eacb333' // Circular Batteries Subsidy
};

// Reverse mapping (UUID to slug)
const uuidToSlugMappings: Record<string, string> = 
  Object.entries(fundingSlugMappings).reduce((acc, [slug, uuid]) => {
    acc[uuid] = slug;
    return acc;
  }, {} as Record<string, string>);

/**
 * Convert a slug to a UUID
 * @param slug The slug to convert
 * @returns The UUID if found, or the original slug if no mapping exists
 */
export function slugToUuid(slug: string): string {
  return fundingSlugMappings[slug] || slug;
}

/**
 * Convert a UUID to a slug
 * @param uuid The UUID to convert
 * @returns The slug if found, or the original UUID if no mapping exists
 */
export function uuidToSlug(uuid: string): string {
  return uuidToSlugMappings[uuid] || uuid;
}

/**
 * Check if a string is a valid UUID
 * @param str The string to check
 * @returns True if the string is a valid UUID
 */
export function isUuid(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
} 