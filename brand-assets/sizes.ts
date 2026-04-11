export interface AssetSize {
  name: string;
  platform: string;
  width: number;
  height: number;
  template: "banner" | "post" | "story" | "og" | "email";
}

export const sizes: AssetSize[] = [
  // LinkedIn
  { name: "linkedin-personal-banner", platform: "linkedin", width: 1584, height: 396, template: "banner" },
  { name: "linkedin-company-banner",  platform: "linkedin", width: 1128, height: 191, template: "banner" },
  { name: "linkedin-post-square",     platform: "linkedin", width: 1080, height: 1080, template: "post" },
  { name: "linkedin-post-landscape",  platform: "linkedin", width: 1200, height: 627, template: "post" },
  { name: "linkedin-article-cover",   platform: "linkedin", width: 1920, height: 1080, template: "post" },
  { name: "linkedin-story",           platform: "linkedin", width: 1080, height: 1920, template: "story" },

  // Facebook
  { name: "facebook-cover",           platform: "facebook", width: 820,  height: 312, template: "banner" },
  { name: "facebook-post-square",     platform: "facebook", width: 1080, height: 1080, template: "post" },
  { name: "facebook-post-portrait",   platform: "facebook", width: 1080, height: 1350, template: "post" },
  { name: "facebook-og",              platform: "facebook", width: 1200, height: 630, template: "og" },
  { name: "facebook-story",           platform: "facebook", width: 1080, height: 1920, template: "story" },

  // Instagram
  { name: "instagram-post-square",    platform: "instagram", width: 1080, height: 1080, template: "post" },
  { name: "instagram-post-portrait",  platform: "instagram", width: 1080, height: 1350, template: "post" },
  { name: "instagram-story",          platform: "instagram", width: 1080, height: 1920, template: "story" },

  // Twitter / X
  { name: "twitter-header",           platform: "twitter", width: 1500, height: 500, template: "banner" },
  { name: "twitter-post",             platform: "twitter", width: 1600, height: 900, template: "post" },
  { name: "twitter-card",             platform: "twitter", width: 1200, height: 630, template: "og" },

  // Email
  { name: "email-header",             platform: "email", width: 600, height: 200, template: "email" },

  // Slides
  { name: "slide-16-9",               platform: "slides", width: 1920, height: 1080, template: "post" },
];
