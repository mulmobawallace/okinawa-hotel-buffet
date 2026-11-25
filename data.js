/*
 * 沖縄ホテルブッフェ データ
 * ------------------------------------------------------------
 * 1件追加するときは、下の配列にオブジェクトを1つ足すだけでOKです。
 *
 *  id        : 半角英数字の一意なID
 *  hotel     : ホテル名
 *  restaurant: レストラン名（不明なら空文字）
 *  area      : "naha" | "south" | "central" | "west" | "north" | "islands"
 *  city      : 市町村名（表示用）
 *  lat, lng  : 地図のピンの位置（緯度・経度）。住所から調べる。分からなければ null（地図に出ない）
 *  meals     : 提供している時間帯 ["breakfast","lunch","dinner"] のうち該当するもの
 *  prices    : { lunch: {adult, child}, dinner: {adult, child} }  ※円・不明なら null
 *  priceNote : 料金についての補足（土日祝のみ・サービス料別 など）
 *  hours     : 営業時間の補足
 *  tags      : 特徴タグ
 *  description: 紹介文
 *  source    : 情報の出典URL（ない場合は null）
 *  checked   : 情報を確認した日（YYYY-MM-DD）
 *
 * 料金は時期・曜日・宿泊有無で変わります。掲載前に必ず公式サイトで再確認してください。
 */
window.BUFFETS = [
  {
    id: "royalpark-iconic-naha",
    hotel: "ザ ロイヤルパークホテル アイコニック 那覇",
    restaurant: "THE 7th TERRACE RYUKYU",
    area: "naha",
    city: "那覇市（県庁前駅すぐ）",
    lat: 26.21473,
    lng: 127.67904,
    meals: ["lunch"],
    prices: { lunch: { adult: 4400, child: 2700 }, dinner: null },
    priceNote: "土日祝ランチ・90分制／大人4,400円〜、小人2,700円〜、幼児1,000円〜（税込）",
    hours: "土日祝ランチ",
    tags: ["駅近", "ローストビーフ", "期間限定フェアあり", "県産食材"],
    description:
      "7階のオールデイダイニング。GWやシルバーウィークには寿司職人の握りなど限定ブッフェも開催。",
    source: "https://ryukyushimpo.jp/prtimes/entry-5471629.html",
    checked: "2026-11-11"
  },
  {
    id: "harborview-printemps",
    hotel: "沖縄ハーバービューホテル",
    restaurant: "プランタン",
    area: "naha",
    city: "那覇市（壺川駅から徒歩約10分）",
    lat: 26.2089,
    lng: 127.6805,
    meals: ["lunch", "dinner"],
    prices: { lunch: { adult: 4000, child: 2800 }, dinner: null },
    priceNote: "ランチ大人4,000円・6〜11歳2,800円（税・サ込／2025年時点の予約サイト掲載）",
    hours: "ランチ 11:30〜15:00",
    tags: ["ライブキッチン", "老舗ホテル", "子連れOK"],
    description: "ライブキッチンが人気の本格ブッフェ。クリスマス期間は特別プランあり。",
    source: "https://restaurant.ikyu.com/104761/plan12625030",
    checked: "2026-11-11"
  },
  {
    id: "southgate-sail-kitchen",
    hotel: "サウスゲートホテル沖縄",
    restaurant: "The Sail Kitchen",
    area: "naha",
    city: "那覇市前島（美栄橋駅から徒歩約6分）",
    lat: 26.2238,
    lng: 127.68389,
    meals: ["lunch", "dinner"],
    prices: { lunch: { adult: 3000, child: null }, dinner: { adult: 5000, child: null } },
    priceNote: "ランチ3,000円〜／ディナー5,000円〜（目安。予約サイトにより4,000円・6,000円のプランもあり）",
    hours: "ランチ 11:00〜15:00／ディナー 17:00〜21:30（予約サイト掲載）",
    tags: ["オールデイブッフェ", "世界の料理", "駐車場あり"],
    description: "世界各国の料理が並ぶオールデイブッフェ。ブッフェに加えてオーダー式の料理も選べる。",
    source: "https://www.tablecheck.com/ja/southgatehotel-thesailkitchen",
    checked: "2026-11-25"
  },
  {
    id: "prince-ginowan-jinon",
    hotel: "沖縄プリンスホテル オーシャンビューぎのわん",
    restaurant: "ジノン",
    area: "central",
    city: "宜野湾市",
    lat: 26.27717,
    lng: 127.7324,
    meals: ["lunch", "dinner"],
    prices: { lunch: null, dinner: null },
    priceNote: "料金はフェアごとに変動。公式サイトで確認してください",
    hours: "ランチ 11:30〜15:00／ディナー 17:30〜21:30",
    tags: ["オーシャンビュー", "季節フェア", "県産食材"],
    description: "「食のいちゃりば」シリーズなど季節ごとにテーマを変えるブッフェフェアを開催。",
    source: "https://www.princehotels.co.jp/ginowan/plan/jinon/2026season-buffet_summer/",
    checked: "2026-11-11"
  },
  {
    id: "hilton-chatan",
    hotel: "ヒルトン沖縄北谷リゾート",
    restaurant: "",
    area: "central",
    city: "北谷町（アメリカンビレッジ隣接）",
    lat: 26.31867,
    lng: 127.75485,
    meals: ["dinner"],
    prices: { lunch: null, dinner: { adult: 4700, child: null } },
    priceNote: "ディナー4,700円（2026年8月・旅行会社プラン掲載価格）",
    hours: "",
    tags: ["アメリカンビレッジ", "サンセット", "リゾート"],
    description: "美浜アメリカンビレッジに隣接。夕日を眺めたあとにディナーブッフェを楽しめる。",
    source: "https://www.his-j.com/okinawa/op/activity/detail/?opid=5204",
    checked: "2026-11-11"
  },
  {
    id: "ana-manza",
    hotel: "ANAインターコンチネンタル万座ビーチリゾート",
    restaurant: "",
    area: "west",
    city: "恩納村",
    lat: 26.5057,
    lng: 127.85966,
    meals: ["dinner"],
    prices: { lunch: null, dinner: { adult: 6000, child: 3500 } },
    priceNote: "琉球料理ディナーブッフェ 大人6,000円・小学生3,500円（ソフトドリンク・ショーチャージ込、サービス料15%別）",
    hours: "",
    tags: ["琉球料理", "ショーあり", "リゾート"],
    description: "琉球料理を中心にしたディナーブッフェ。伝統芸能ショーとセットで楽しめる。",
    source: "https://www.tablecheck.com/ja/anaintercontinental-manza-orchid",
    checked: "2026-11-11"
  },
  {
    id: "sheraton-sunmarina",
    hotel: "シェラトン沖縄サンマリーナリゾート",
    restaurant: "",
    area: "west",
    city: "恩納村",
    lat: 26.46102,
    lng: 127.81181,
    meals: ["lunch"],
    prices: { lunch: { adult: 3800, child: null }, dinner: null },
    priceNote: "夏季（2026年7〜9月）土日祝ランチ 大人3,800円",
    hours: "土日祝ランチ（夏季）",
    tags: ["リゾート", "ビーチ", "週末限定"],
    description: "ビーチ目の前のリゾート。夏の週末限定でランチブッフェを実施。",
    source: null,
    checked: "2026-11-11"
  },
  {
    id: "renaissance-okinawa",
    hotel: "ルネッサンス リゾート オキナワ",
    restaurant: "",
    area: "west",
    city: "恩納村",
    lat: 26.43534,
    lng: 127.78845,
    meals: ["dinner"],
    prices: { lunch: null, dinner: null },
    priceNote: "料金は要確認（過去の期間限定開催時は大人6,000円）",
    hours: "",
    tags: ["琉球芸能", "子連れOK", "リゾート"],
    description: "「琉球の宴×The Buffet」として伝統芸能とブッフェを一緒に楽しめるディナーを展開。",
    source: "https://kids.rurubu.jp/article/81713/",
    checked: "2026-11-11"
  }
];

window.AREAS = {
  naha: "那覇",
  south: "南部",
  central: "中部",
  west: "西海岸（恩納村など）",
  north: "北部",
  islands: "離島"
};

window.MEALS = { breakfast: "朝食", lunch: "ランチ", dinner: "ディナー" };
