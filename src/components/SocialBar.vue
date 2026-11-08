<script setup lang="ts">
const socials = [
  {
    label: "YouTubeを開く",
    href: "https://youtube.com/@yamakawateruki?si=Hb3Fn6Wdkz4tyfs5",
    reel: "YouTube",
    icon: "youtube",
  },
  {
    label: "X（旧Twitter）を開く",
    href: "https://x.com/YamakawaTeruki",
    reel: "X（旧Twitter）",
    icon: "x",
  },
  {
    label: "Discord鯖を開く",
    href: "https://discord.gg/Cn7GV9rn7Y",
    reel: "Discord鯖",
    icon: "discord",
  },
] as const;
</script>

<template>
  <nav class="social-bar" aria-label="ソーシャルメディア">
    <a
      v-for="social in socials"
      :key="social.label"
      class="social-link"
      :href="social.href"
      target="_blank"
      rel="noreferrer"
      :aria-label="social.label"
    >
      <svg v-if="social.icon === 'youtube'" class="youtube-icon" viewBox="0 0 28 20" aria-hidden="true">
        <path fill="#ff0033" d="M27.4 3.1A3.5 3.5 0 0 0 25 .6C22.8 0 18.5 0 14 0S5.2 0 3 .6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 7.7.6 10s0 4.7.6 6.9A3.5 3.5 0 0 0 3 19.4c2.2.6 6.5.6 11 .6s8.8 0 11-.6a3.5 3.5 0 0 0 2.4-2.5c.6-2.2.6-4.6.6-6.9s0-4.7-.6-6.9Z"></path>
        <path fill="#fff" d="m11.2 14.3 7.3-4.3-7.3-4.3z"></path>
      </svg>
      <svg v-else-if="social.icon === 'x'" class="x-icon" viewBox="0 0 512 512" aria-hidden="true">
        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.299 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253Z"></path>
      </svg>
      <svg v-else class="discord-icon" viewBox="0 0 32 24" aria-hidden="true">
        <path fill="currentColor" d="M25.8 3.2A22 22 0 0 0 20.3 1.5l-.7 1.4a20.3 20.3 0 0 0-7.2 0l-.7-1.4a22 22 0 0 0-5.5 1.7C2.7 8.3 1.7 13.3 2.2 18.2a22 22 0 0 0 6.7 3.4l1.7-2.3a14.7 14.7 0 0 1-2.7-1.4l.7-.5a16.8 16.8 0 0 0 14.8 0l.7.5a15 15 0 0 1-2.7 1.4l1.7 2.3a22 22 0 0 0 6.7-3.4c.6-5.7-1-10.7-4-15ZM11.4 15.3c-1.6 0-2.9-1.5-2.9-3.3s1.3-3.3 2.9-3.3 2.9 1.5 2.9 3.3-1.3 3.3-2.9 3.3Zm9.2 0c-1.6 0-2.9-1.5-2.9-3.3s1.3-3.3 2.9-3.3 2.9 1.5 2.9 3.3-1.3 3.3-2.9 3.3Z"></path>
      </svg>
      <span class="social-reel" aria-hidden="true">
        <span
          v-for="(char, index) in [...social.reel]"
          :key="index"
          class="social-reel-character"
        >
          <span class="social-reel-track" :style="{ '--reel-index': index }">
            <span>{{ char }}</span><span>{{ char }}</span>
          </span>
        </span>
      </span>
    </a>
  </nav>
</template>
