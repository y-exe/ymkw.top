<script setup lang="ts">
import HomeScene from "./components/HomeScene.vue";
import ReelLabel from "./components/ReelLabel.vue";
import SiteLoader from "./components/SiteLoader.vue";
import SocialBar from "./components/SocialBar.vue";

const tickerRows = 8;
const tickerSpans = 6;
</script>

<template>
  <main class="home" aria-label="やまかわてるき">
    <div class="tick" aria-hidden="true">
      <div v-for="row in tickerRows" :key="row" class="row">
        <span v-for="span in tickerSpans" :key="span">ymkw.top</span>
      </div>
    </div>
    <HomeScene />
    <div class="content-shade" aria-hidden="true"></div>
    <div class="frame" aria-hidden="true"></div>
    <section class="home-intro" aria-label="ホームメニュー">
      <div
        class="rotating-yamakawa"
        style="--rotating-logo-size: var(--yamakawa-size)"
        role="img"
        aria-label="回るやまかわロゴ"
      >
        <div class="rotating-yamakawa-grid" aria-hidden="true">
          <span class="rotating-yamakawa-char rotating-yamakawa-ya">や</span>
          <span class="rotating-yamakawa-char rotating-yamakawa-ma">ま</span>
          <span class="rotating-yamakawa-char rotating-yamakawa-ka">か</span>
          <span class="rotating-yamakawa-char rotating-yamakawa-wa">わ</span>
        </div>
      </div>
      <h1 class="site-title"><span>ymkw.top</span></h1>
      <p class="site-copy">やまかわてるき鯖分析サイト</p>
      <nav class="navigation" aria-label="統計ページ">
        <a
          class="home-action"
          href="https://analytics.yexe.top/month/latest"
          aria-label="月間レポート"
        >
          <ReelLabel text="月間レポート" />
        </a>
        <a
          class="home-action"
          href="https://analytics.yexe.top/all"
          aria-label="累計ランキング"
        >
          <ReelLabel text="累計ランキング" />
        </a>
      </nav>
      <div class="event-link">
        <a
          class="home-action home-action--event"
          href="https://event.ymkw.top"
          aria-label="第一回やまかわ編集大会"
        >
          <ReelLabel text="第一回やまかわ編集大会" />
        </a>
      </div>
    </section>
    <SocialBar />
    <nav class="legal-links" aria-label="サイトポリシー">
      <a href="https://analytics.yexe.top/terms">terms</a>
      <a href="https://analytics.yexe.top/privacy">privacy</a>
    </nav>
    <span class="copyright">© 2026 ymkw.top</span>
    <SiteLoader />
  </main>
</template>
