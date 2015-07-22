ECMAScript 6で記述したアプリをHerokuにデプロイしてみました。  

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)  

Herokuボタンから、自分のアカウントで簡単に試してみることができます。  

# ECMAScript 6(ES6)について
ECMAScriptは[Ecma International](http://www.ecma-international.org/)によるJavaScriptの標準です。  
実装ごとの互換性が低かったJavaScriptの標準を定めたものであり、モダンブラウザやNode.jsはECMAScript 5(ES5)に基づいて実装されています。  
その言語仕様である[ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm)の最新バージョン、6thエディションの承認が2015年6月に発表されました。  
ES6では、クラスやモジュール、アロー関数、let、constなどの新たな機能が追加され、従来よりも簡潔に安全なプログラムを書くことができるようになります。  

ES6の新機能やどのように記述するかなどは、[lukehoban/es6features](https://github.com/lukehoban/es6features)が参考になります。  

# ES6を利用するには
現時点での実装状況を[ECMAScript compatibility table](http://kangax.github.io/compat-table/es6/)で確認することができます。  
一部の機能は先行実装されていますが、まだまだ対応しているブラウザやランタイムは多くありません。  

しかし、ES6をES5に変換するトランスパイラやES5でES6の機能を実装したpolyfillライブラリを用いることで、今からでもES6の機能を用いて開発することができます。  

今回は、トランスパイラである[Babel](https://babeljs.io/)を用いています。  

# サンプルアプリケーションについて
Expressを利用した簡単なアプリケーションです。  
Herokuボタンを使ってHeroku上で動作を確認できますし、ローカルでも以下の手順で実行することができます。  

    $ git clone https://github.com/flect-miyake/heroku-es6.git
    $ cd heroku-es6
    $ npm install
    $ gulp build
    $ npm start

`npm start`でサーバを起動後、ブラウザから`localhost:3000`でアクセスできます。  

ディレクトリ構成は、`express-generator`で生成されるプロジェクトの構成をほぼ踏襲しています。  
`src`にES6で記述するソースコードを配置し、`dist`にES5に変換されたコードが出力されます。  
`src/public`に配置したコードはブラウザで動作し、それ以外のコードはサーバサイドで動作します。  

タスクランナーとして[gulp](http://gulpjs.com/)を利用しています。  
Node.jsではCommonJSによるモジュール化が可能なので、gulp-babelを用いて変換したものをそのまま出力。  
ブラウザで実行されるスクリプトは、[Browserify](http://browserify.org/)を用いて、`bundle.js`にコンパイルしています。  
BrowserifyはクラインアントサイドのJavaScriptでもCommonJSスタイルのモジュール化を実現するためのツールですが、`transform`を追加することでES6からES5へのトランスパイルや、CoffeeScriptで記述したコードの変換なども同時に行ってくれます。  

# Herokuデプロイ時のビルドタスクの実行
アプリケーションとして実際に動作するコードはES5に変換された`dist`以下のものになるのですが、このような構成のプロジェクトの場合、バージョン管理とHerokuへのデプロイの際に少し問題が出てきます。  
`dist`ディレクトリ以下のコードは変換された結果であるため、バージョン管理の対象にはしたくないのですが、それではHerokuへのデプロイ時の対象からも外れてしまいます。  
デプロイ用のブランチを作るなどいくつか方法はあるのですが、今回はHeroku上でビルドを実行する方法をとっています。  

HerokuにNode.jsのプロジェクトをデプロイした際に、package.jsonに記述されたnpmが自動でインストールされるのですが、その後に`gulpfile.js`に定義したタスクを実行することができます。  
方法は簡単で、`package.json`の`postinstall`を追加するだけ。  

    "scripts": {
      "start": "node ./bin/www",
      "postinstall": "gulp build"
    }

これで、Heroku上で依存パッケージのインストールが完了した後に、gulpのビルドタスクが実行されます。  
注意点としては、通常開発のみに利用するパッケージは`devDependencies`に記載するのですが、`Dependencies`に記載する必要があります。  
Heroku上では、`Dependencies`に記載されたパッケージのみがインストールされるためです。  

---

ES6の仕様が承認されたことにより、ブラウザなどの対応が今後加速していくことが予想されます。  
しかし、Babelなどを用いることで今からでもES6を用いた開発を行うことが可能です。  
ES6の新機能を用いることで、よりも簡潔に安全なプログラムを書くことができるようになるため積極的に利用してもよいのではと考えています。
