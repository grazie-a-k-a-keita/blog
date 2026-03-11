---
title: "CSS で 3D な本を作る"
description: "CSS（Tailwind）で作る本の3Dアニメーションの実装方法。"
pubDate: 2025-10-12
updatedDate: 2026-03-12
---

Tailwind CSSを使って、3Dに動作する本を実装します。

今回は、私がよく使っているTailwindCSSを使用していますが、ピュアなCSSでも同じように実装できると思います。

## サンプル紹介

まず、完成サンプルはこちらです。

https://play.tailwindcss.com/4QYTVhgDC4

黄色の背景の箇所をホバーすると、3Dに回転して本が開くアニメーションが実装されていると思います。

画面をホバーしたときに本を開くだけのシンプルな実装です。

## 実装解説

具体的な実装を見ていきます。

#### 1. 親要素にperspectiveを設定する

ここでポイントになるのは`perspective`プロパティで、物体に遠近感を与えてくれます。

```html
<div
  class="group flex w-full justify-center bg-amber-50 p-32 perspective-distant"
>
  ...
</div>
```

| プロパティ  | 効果                                                                | 参考                                                                                                    |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| perspective | 物体に遠近感を与える                                                | [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/perspective)                                        |
| group       | 子要素で group-hover とすることで親要素のホバー時に子要素も反応する | [Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state) |
| その他      | スタイルの調整                                                      | -                                                                                                       |

#### 2. 本の要素にtransform-styleを設定する

ここでのポイントは`transform-3d`で、子要素を3D空間に配置するようになっています。

```html
<div
  class="relative aspect-3/4 h-80 transition duration-700 transform-3d group-hover:-rotate-y-20"
>
  ...
</div>
```

| プロパティ                    | 効果                                                                                    | 参考                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| transform-3d                  | 子要素を 3D 空間に配置する                                                              | [MDN](http://developer.mozilla.org/ja/docs/Web/CSS/transform-style)             |
| transition duration-700       | アニメーションにかかる時間                                                              | -                                                                               |
| group-hover:-rotate-y-[20deg] | group 要素がホバーされたときに Y 軸を中心に 20 度回転させる<br/>単位が deg なのは注意！ | [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/transform-function/rotateY) |
| その他                        | スタイルの調整                                                                          | -                                                                               |

#### 3. 本の表紙を作る

表紙だけたくさん回転させて、表紙を開いているように見せたいので、回転の角度を大きく設定しています。

```html
<div
  class="absolute inset-0 origin-left rounded-md bg-[#06B6D4] transition duration-1000 group-hover:-rotate-y-45"
>
  <div class="space-y-4 py-16 text-center text-sm font-semibold text-gray-50">
    <p>【Tailwind CSS】</p>
    <p>CSSで3Dな本を作る</p>
    <svg ... class="mx-auto size-16 fill-gray-50">...</svg>
  </div>
</div>
```

| プロパティ               | 効果                                                 | 参考                                                                  |
| ------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------- |
| absolute inset-0         | 親の relative 要素に対して、目一杯広がる             | [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/inset)            |
| origin-left              | Y 軸の回転の基準点を左端に設定                       | [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/transform-origin) |
| group-hover:-rotate-y-45 | Y 軸の回転（本全体の回転の角度より大きく設定してる） | -                                                                     |
| その他                   | スタイルの調整                                       | -                                                                     |

#### 4. 本のページを作る

Z軸にページをずらしていくことで、本のページが重なっているようにして、厚みを表現しています。

また、1ページ目だけ、少しテキストを入れてみました。

```html
<div
  class="absolute inset-1 -translate-z-0.75 rounded-md border border-gray-300 bg-gray-50 p-8"
>
  <p class="text-xs">...</p>
</div>
<div
  class="absolute inset-1 -translate-z-1.5 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-2.25 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-3 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-3.75 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-4.5 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-5.25 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-6 rounded-md border border-gray-300 bg-gray-50"
></div>
<div
  class="absolute inset-1 -translate-z-6.75 rounded-md border border-gray-300 bg-gray-50"
></div>
```

Z軸について別角度から見たら、どうなっているかわかりやすいと思います！

背表紙がないですが今回の実装では見えない部分なので、OKとしています。

| プロパティ        | 効果                                       | 参考                                                                               |
| ----------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| absolute inset-1  | 親の relative 要素に対して少し内側に広がる | -                                                                                  |
| -translate-z[...] | 各ページを Z 軸（奥）にずらす              | [MDN](https://developer.mozilla.org/ja/docs/Web/CSS/transform-function/translateZ) |
| その他            | スタイルの調整                             | -                                                                                  |

#### 5. 裏表紙を作る

各ページを作ったときと同じ要領で、裏表紙も作ります。

```html
<div class="absolute inset-0 -translate-z-7.5 rounded-md bg-[#06B6D4]"></div>
```

たったこれだけで、完成です🎉

後は、各々でカスタマイズしてみてください！

## 参考

https://developer.mozilla.org/ja/

https://tailwindcss.com/
