#!/usr/bin/env bash
# AdSense 爬虫放行自测
# 用 Google 爬虫 UA 访问关键 URL，判断是否被防火墙/CDN 拦截（5秒盾/挑战页/403）。
# 用法： bash check-crawlers.sh
# 前提：代码已上线到 tapzens.com，且已在 Cloudflare/宝塔 后台放行爬虫 UA。
set -u

# 需要能正常访问的 Google 爬虫 UA
UA_LIST=("Mediapartners-Google" "Googlebot" "AdsBot-Google")

# 关键 URL（合规页 + ads.txt + robots.txt + 子域 ads.txt）
URLS=(
  "https://tapzens.com/contact.html"
  "https://tapzens.com/ads.txt"
  "https://tapzens.com/robots.txt"
  "https://puzzle-yarnfun.tapzens.com/ads.txt"
)

# 命中这些特征 = 被防火墙/CDN 挑战或拒绝
is_challenge() {
  printf '%s' "$1" | grep -qiE "cf-browser-verification|challenge-platform|Just a moment|Attention Required|Ray ID|__cf_chl|Enable JavaScript and cookies to continue|Access denied|error 1020|Access to this page has been denied|PERMISSION_DENIED"
}

pass=0; fail=0
for ua in "${UA_LIST[@]}"; do
  for url in "${URLS[@]}"; do
    code=$(curl -sS -A "$ua" --max-time 20 -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    body=$(curl -sS -A "$ua" --max-time 20 "$url" 2>/dev/null | head -c 2000)
    if [ "$code" = "200" ] && ! is_challenge "$body"; then
      printf 'PASS  [%-20s] %s  (HTTP %s)\n' "$ua" "$url" "$code"
      pass=$((pass+1))
    else
      printf 'FAIL  [%-20s] %s  (HTTP %s)  <- 疑似被拦截/挑战\n' "$ua" "$url" "$code"
      fail=$((fail+1))
    fi
  done
done

echo "----------------------------------------"
echo "PASS=$pass  FAIL=$fail"
if [ "$fail" -eq 0 ]; then
  echo "✅ 全部通过：谷歌爬虫可正常访问，可去 AdSense 重新提审。"
else
  echo "❌ 仍有被拦项：请到 Cloudflare/宝塔 后台放行 Googlebot / Mediapartners-Google / AdsBot-Google 后重试。"
fi
