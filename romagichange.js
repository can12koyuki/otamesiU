// 自分の入力した名前やルーム名をひらがな⇒ローマ字変換
// あとで二つの変換表見比べる（ローマ字はこれで変換される）

// 変換表（「しゃ」は「sixya」になる）伸ばし棒もいけた
const romagichange = {
	'あ' : 'a', 'い' : 'i', 'う' : 'u', 'え' : 'e', 'お' : 'o',
	'か' : 'ka', 'き' : 'ki', 'く' : 'ku', 'け' : 'ke', 'こ' : 'ko',
	'さ' : 'sa', 'し' : 'si', 'す' : 'su', 'せ' : 'se', 'そ' : 'so',
	'た' : 'ta', 'ち' : 'ti', 'つ' : 'tu', 'て' : 'te', 'と' : 'to',
	'な' : 'na', 'に' : 'ni', 'ぬ' : 'nu', 'ね' : 'ne', 'の' : 'no',
	'は' : 'ha', 'ひ' : 'hi', 'ふ' : 'hu', 'へ' : 'he', 'ほ' : 'ho',
	'ま' : 'ma', 'み' : 'mi', 'む' : 'mu', 'め' : 'me', 'も' : 'mo',
	'や' : 'ya', 'ゆ' : 'yu', 'よ' : 'yo',
	'ら' : 'ra', 'り' : 'ri', 'る' : 'ru', 'れ' : 're', 'ろ' : 'ro',
	'わ' : 'wa', 'を' : 'wo', 'ん' : 'n',
		
	'が' : 'ga', 'ぎ' : 'gi', 'ぐ' : 'gu', 'げ' : 'ge', 'ご' : 'go',
	'ざ' : 'za', 'じ' : 'zi', 'ず' : 'zu', 'ぜ' : 'ze', 'ぞ' : 'zo',
	'だ' : 'da', 'ぢ' : 'di', 'づ' : 'du', 'で' : 'de', 'ど' : 'do',
	'ば' : 'ba', 'び' : 'bi', 'ぶ' : 'bu', 'べ' : 'be', 'ぼ' : 'bo',
	'ぱ' : 'pa', 'ぴ' : 'pi', 'ぷ' : 'pu', 'ぺ' : 'pe', 'ぽ' : 'po',
	
	'ぁ' : 'xa', 'ぃ' : 'xi', 'ぅ' : 'xu', 'ぇ' : 'xe', 'ぉ' : 'xo',
	'ゃ' : 'xya', 'ゅ' : 'xyu', 'ょ' : 'xyo', 'っ' : 'xtu',
	'ヴ' : 'vu',
	'ー' : '-',
};


function roma(kana) {
	var i, iz, match, regex,
		hiragana = '', table = romagichange;
  
	regex = new RegExp((function(table){
	  var key,
		  s = '^(?:';
  
	  for (key in table) if (table.hasOwnProperty(key)) {
		s += key + '|';
	  }
	  return s + '(?:n(?![aiueo]|y[aiueo]|$))|' + '([^aiueon])\\1)';
	})(table));
	for (i = 0, iz = kana.length; i < iz; ++i) {
	  if (match = kana.slice(i).match(regex)) {
		hiragana += table[match[0]];
		i += match[0].length - 1;
	  } else {
		hiragana += kana[i];
	  }
	}
	return hiragana;
}

window.globalFunction =[]
window.globalFunction.roma = roma