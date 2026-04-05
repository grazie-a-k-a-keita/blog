---
title: "Terraformのサンプル集"
description: "「詳解 Terraform 第3版」を読んで、Terraformのナレッジとして使えそうな内容をまとめてみました。"
pubDate: 2026-04-06
---

「[詳解 Terraform 第3版](https://www.oreilly.co.jp/books/9784814400522/)」を読んでいる。

Terraformのナレッジとして使えそうな内容があったので、まとめてみる。

## ディレクトリ構成例

- stage
  - 本番直前（ステージング）用の環境（テスト用など）
- prod
  - 本番用の環境（ユーザがアクセスするアプリケーションなど）
- mgmt
  - DevOpsツール用の環境（踏み台サーバ、CIサーバなど）
- global
  - 全環境をまたいで使用するリソースを入れる環境（S3、IAMなど）

```bash
/
├─ stage
│  └─ vpc
├─ services
│  ├─ frontend-app
│  └─ backend-app
│     ├─ variables.tf
│     ├─ outputs.tf
│     └─ main.tf
├─ data-storage
│  ├─ mysql
│  └─ redis
├─ prod
│     └─ vpc
├─ services
│  ├─ frontend-app
│  └─ backend-app
├─ data-storage
│  ├─ mysql
│  └─ redis
├─ mgmt
│     └─ vpc
├─ services
│  ├─ bastion-host
│  └─ jenkins
└─ global
   ├─ iam
   └─ s3
```

## ファイル名の規則例

- `dependencies.tf`
  - データソースをすべて`dependencies.tf`ファイルに入れることで、コードが外部に依存している部分を分かりやすくする
- `providers.tf`
  - providerブロックを`providers.tf`ファイルに入れると、使用するプロバイダとどんな認証情報を提供する必要があるのかが一目でわかるようになります。
- `main-xxx.tf`
  - リソースが増えて`main.tf`ファイルが非常に長くなってきたら、何らかの論理的な区別に従ってグループ分けして小さなファイルに分割してもよい。例えば、`main-iam.tf`がIAMリソースを、`main-s3.tf`はS3リソースなど。`main-`プレフィックスを使うと、アルファベット順にファイルが整理されている時にリソースがグループになるので、ファイルを見つけやすくなる。
