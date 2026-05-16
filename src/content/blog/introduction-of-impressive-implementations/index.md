---
title: "現場でこれすげぇって感心した実装"
description: "現場ですげぇって感心した実装を紹介します。"
pubDate: 2026-05-16
---

少し前、リードエンジニアの方がサラッとアドバイスしていった実装に感動しました。

その紹介です。

## 対象のコード

キャッシュをインメモリで実装するクラスで、[cache-manager](https://www.npmjs.com/package/cache-manager)をラップする感じで実装しました。

```ts title="infrastructure/.../inMemoryCacheManager.ts"
import type { Cache } from "cache-manager";

export class ImMemoryCacheManager implements CacheManager {
  public constructor(
    private readonly cache: Cache,
    private readonly groupName: string = "",
  ) {}

  public async get<T>(key: string): Promise<T | undefined> {
    return await this.cache.get<T>(this.buildGroupKey(this.groupName, key));
  }

  public async set<T>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    await this.cache.set(
      this.buildGroupKey(this.groupName, key),
      value,
      ttlSeconds,
    );
  }

  // ...

  public group(name: string): CacheManager {
    return new ImMemoryCacheManager(
      this.cache,
      this.buildGroupKey(this.groupName, name),
    );
  }

  private buildGroupKey(groupName: string, key: string): string {
    return groupName ? `${groupName}.${key}` : key;
  }
}
```

## どこがすごいと感じたのか？

### groupメソッドによるネームスペース管理のシンプルさ

この`group`メソッドは、キャッシュキーの衝突を防ぐためのネームスペース管理を非常にシンプルに実現しています。

### 不変（Immutable）な設計

`group`メソッドは新しいインスタンスを返すため、元のキャッシュマネージャーは変更されません。これにより、コードの安全性と予測可能性が向上します。

## まとめ

シンプルですが、自分でこれを思いついて実装できるかというと、なかなか難しいと思います。

こういうコードをサラッと書けるようになりたいですね。

絶賛、この本を読んで勉強中です。いい本です！

https://www.oreilly.co.jp/books/9784814400331/
